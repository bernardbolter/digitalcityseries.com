import { get } from 'lodash';
import React, { useRef, useCallback, useEffect, useState } from 'react';

interface DraggableArtworkProps {
  src: string;
  alt: string;
  artworkContainerRef: React.RefObject<HTMLDivElement | null>;
  className?: string;
}

interface Position {
  x: number;
  y: number;
}

interface DragState {
  isDragging: boolean;
  startPosition: Position;
  initialImagePosition: Position;
}

interface Velocity {
  x: number;
  y: number;
}

const DraggableArtwork: React.FC<DraggableArtworkProps> = ({
  src,
  alt,
  artworkContainerRef,
  className = ''
}) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const animationRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const velocityRef = useRef<Velocity>({ x: 0, y: 0 });
  const lastPositionRef = useRef<Position>({ x: 0, y: 0 });
  const dampingFactor = 0.92; // For momentum/inertia effect
  const velocityThreshold = 0.1; // Stop animation when velocity is too low
  
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    startPosition: { x: 0, y: 0 },
    initialImagePosition: { x: 0, y: 0 }
  });

    // Calculate boundaries to keep image within container
  const getBoundaries = useCallback((): { minX: number; maxX: number; minY: number; maxY: number } => {
    if (!artworkContainerRef.current || !imageRef.current) {
      return { minX: 0, maxX: 0, minY: 0, maxY: 0 };
    }

    const containerRect = artworkContainerRef.current.getBoundingClientRect();
    const imageRect = imageRef.current.getBoundingClientRect();
    
    const minX = Math.min(0, containerRect.width - imageRect.width);
    const maxX = Math.max(0, containerRect.width - imageRect.width);
    const minY = Math.min(0, containerRect.height - imageRect.height);
    const maxY = Math.max(0, containerRect.height - imageRect.height);

    return { minX, maxX, minY, maxY };
  }, [artworkContainerRef]);

  // Constrain position within boundaries
  const constrainPosition = useCallback((pos: Position): Position => {
    const { minX, maxX, minY, maxY } = getBoundaries();
    return {
      x: Math.max(minX, Math.min(maxX, pos.x)),
      y: Math.max(minY, Math.min(maxY, pos.y))
    };
  }, [getBoundaries]);

  // Center the image on initial load and when resized
    useEffect(() => {
    const centerImage = () => {
        if (!artworkContainerRef.current || !imageRef.current) return;

        const containerRect = artworkContainerRef.current.getBoundingClientRect();
        const imageRect = imageRef.current.getBoundingClientRect();

        const x = (containerRect.width - imageRect.width) / 2;
        const y = (containerRect.height - imageRect.height) / 2;

        const centered = constrainPosition({ x, y });
        setPosition(centered);
        lastPositionRef.current = centered;
    };

    const img = imageRef.current;
    if (img && !img.complete) {
        img.onload = centerImage;
    } else {
        centerImage();
    }

    window.addEventListener('resize', centerImage);
    return () => {
        window.removeEventListener('resize', centerImage);
        if (img) img.onload = null;
    };
    }, [artworkContainerRef, constrainPosition, src]);


  // Smooth animation loop with momentum
  const animate = useCallback(() => {
    if (dragState.isDragging) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }

    const currentVelocity = velocityRef.current;
    const currentPosition = lastPositionRef.current;

    // Apply damping to velocity
    const newVelocity = {
      x: currentVelocity.x * dampingFactor,
      y: currentVelocity.y * dampingFactor
    };

    // Stop animation if velocity is too low
    if (Math.abs(newVelocity.x) < velocityThreshold && Math.abs(newVelocity.y) < velocityThreshold) {
      velocityRef.current = { x: 0, y: 0 };
      return;
    }

    // Calculate new position
    const newPosition = constrainPosition({
      x: currentPosition.x + newVelocity.x,
      y: currentPosition.y + newVelocity.y
    });

    // Update position and velocity
    setPosition(newPosition);
    lastPositionRef.current = newPosition;
    velocityRef.current = newVelocity;

    // Continue animation
    animationRef.current = requestAnimationFrame(animate);
  }, [dragState.isDragging, constrainPosition]);

  // Interpolated position update for smoother dragging
  const updatePosition = useCallback((newPos: Position, currentTime: number) => {
    const deltaTime = currentTime - lastTimeRef.current;
    
    if (deltaTime > 0) {
      // Calculate velocity for momentum
      const velocity = {
        x: (newPos.x - lastPositionRef.current.x) / deltaTime * 16.67, // Normalize to 60fps
        y: (newPos.y - lastPositionRef.current.y) / deltaTime * 16.67
      };
      
      velocityRef.current = velocity;
    }
    
    setPosition(newPos);
    lastPositionRef.current = newPos;
    lastTimeRef.current = currentTime;
  }, []);

  // Utility to get pointer position from mouse or touch event
    const getPointerPosition = useCallback((e: MouseEvent | TouchEvent) => {
        if ('touches' in e && e.touches.length > 0) {
            return { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }
        return { x: (e as MouseEvent).clientX, y: (e as MouseEvent).clientY };
    }, []);

  // Start drag
const handlePointerDown = useCallback((e: React.MouseEvent | React.TouchEvent) => {
  e.preventDefault();

  if (animationRef.current) {
    cancelAnimationFrame(animationRef.current);
  }

  const pointerPos = getPointerPosition(e.nativeEvent as MouseEvent | TouchEvent);
  const currentTime = performance.now();

  setDragState({
    isDragging: true,
    startPosition: pointerPos,
    initialImagePosition: lastPositionRef.current
  });

  // Reset velocity and time tracking
  lastTimeRef.current = currentTime;

  // Use refs for position to avoid stale closure
  const startPos = pointerPos;
  const startImagePos = lastPositionRef.current;

  const handlePointerMove = (moveEvent: MouseEvent | TouchEvent) => {
    const currentPointerPos = getPointerPosition(moveEvent);
    const currentTime = performance.now();
    const deltaX = currentPointerPos.x - startPos.x;
    const deltaY = currentPointerPos.y - startPos.y;

    const newPosition = constrainPosition({
      x: startImagePos.x + deltaX,
      y: startImagePos.y + deltaY
    });

    updatePosition(newPosition, currentTime);
  };

  const handlePointerUp = () => {
    setDragState(prev => ({ ...prev, isDragging: false }));

    // Start momentum animation if there's enough velocity
    const currentVelocity = velocityRef.current;
    if (Math.abs(currentVelocity.x) > velocityThreshold || Math.abs(currentVelocity.y) > velocityThreshold) {
      animationRef.current = requestAnimationFrame(animate);
    }

    document.removeEventListener('mousemove', handlePointerMove);
    document.removeEventListener('mouseup', handlePointerUp);
    document.removeEventListener('touchmove', handlePointerMove);
    document.removeEventListener('touchend', handlePointerUp);
  };

  document.addEventListener('mousemove', handlePointerMove, { passive: false });
  document.addEventListener('mouseup', handlePointerUp);
  document.addEventListener('touchmove', handlePointerMove, { passive: false });
  document.addEventListener('touchend', handlePointerUp);
}, [constrainPosition, updatePosition, animate, getPointerPosition]);

  // Reset position when container size changes
  useEffect(() => {
    const handleResize = () => {
      const constrainedPosition = constrainPosition(position);
      if (constrainedPosition.x !== position.x || constrainedPosition.y !== position.y) {
        setPosition(constrainedPosition);
        lastPositionRef.current = constrainedPosition;
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [position, constrainPosition]);

  // Cleanup animation on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Prevent default drag behavior on image
  const handleDragStart = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  return (
    <img
      ref={imageRef}
      src={src}
      alt={alt}
      className={`draggable-artwork ${dragState.isDragging ? 'draggable-image--dragging' : ''} ${className}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        width: '1500px',
        height: '1500px',
      }}
      onMouseDown={handlePointerDown}
      onTouchStart={handlePointerDown}
      onDragStart={handleDragStart}
      draggable={false}
    />
  );
};

export default DraggableArtwork;