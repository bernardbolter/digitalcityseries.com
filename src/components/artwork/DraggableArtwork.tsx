"use client";

import React, { useRef, useCallback, useEffect, useState } from "react"
import LoadingImage from "../ui/LoadingImage"
import Image from "next/image"

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

const MAGNIFIED_SIZE = 1500;

const DraggableArtwork: React.FC<DraggableArtworkProps> = ({
  src,
  alt,
  artworkContainerRef,
  className = "",
}) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const animationRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const velocityRef = useRef<Velocity>({ x: 0, y: 0 });
  const lastPositionRef = useRef<Position>({ x: 0, y: 0 });
  const dampingFactor = 0.92;
  const velocityThreshold = 0.1;

  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    startPosition: { x: 0, y: 0 },
    initialImagePosition: { x: 0, y: 0 },
  });
  const [isLoaded, setIsLoaded] = useState(false);

  // Calculate boundaries to keep image within container
  const getBoundaries = useCallback(() => {
    if (!artworkContainerRef.current)
      return { minX: 0, maxX: 0, minY: 0, maxY: 0 };

    const containerRect = artworkContainerRef.current.getBoundingClientRect();
    const imageWidth = MAGNIFIED_SIZE;
    const imageHeight = MAGNIFIED_SIZE;
    const containerWidth = containerRect.width;
    const containerHeight = containerRect.height;

    const minX =
      imageWidth > containerWidth ? containerWidth - imageWidth : (containerWidth - imageWidth) / 2;
    const maxX = imageWidth > containerWidth ? 0 : minX;
    const minY =
      imageHeight > containerHeight ? containerHeight - imageHeight : (containerHeight - imageHeight) / 2;
    const maxY = imageHeight > containerHeight ? 0 : minY;

    return { minX, maxX, minY, maxY };
  }, [artworkContainerRef]);

  const constrainPosition = useCallback(
    (pos: Position): Position => {
      const { minX, maxX, minY, maxY } = getBoundaries();
      return {
        x: Math.max(minX, Math.min(maxX, pos.x)),
        y: Math.max(minY, Math.min(maxY, pos.y)),
      };
    },
    [getBoundaries]
  );

  // Center the image
  useEffect(() => {
    const centerImage = () => {
      if (!artworkContainerRef.current) return;
      const containerRect = artworkContainerRef.current.getBoundingClientRect();
      const x = (containerRect.width - MAGNIFIED_SIZE) / 2;
      const y = (containerRect.height - MAGNIFIED_SIZE) / 2;
      const centered = constrainPosition({ x, y });
      setPosition(centered);
      lastPositionRef.current = centered;
    };

    centerImage();
    window.addEventListener("resize", centerImage);
    return () => window.removeEventListener("resize", centerImage);
  }, [artworkContainerRef, constrainPosition, src]);

  // Animation with momentum
  const animate = useCallback(() => {
    if (dragState.isDragging) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }

    const currentVelocity = velocityRef.current;
    const currentPosition = lastPositionRef.current;
    const newVelocity = {
      x: currentVelocity.x * dampingFactor,
      y: currentVelocity.y * dampingFactor,
    };

    if (
      Math.abs(newVelocity.x) < velocityThreshold &&
      Math.abs(newVelocity.y) < velocityThreshold
    ) {
      velocityRef.current = { x: 0, y: 0 };
      return;
    }

    const newPosition = constrainPosition({
      x: currentPosition.x + newVelocity.x,
      y: currentPosition.y + newVelocity.y,
    });

    setPosition(newPosition);
    lastPositionRef.current = newPosition;
    velocityRef.current = newVelocity;
    animationRef.current = requestAnimationFrame(animate);
  }, [dragState.isDragging, constrainPosition]);

  const updatePosition = useCallback((newPos: Position, currentTime: number) => {
    const deltaTime = currentTime - lastTimeRef.current;
    if (deltaTime > 0) {
      const velocity = {
        x: ((newPos.x - lastPositionRef.current.x) / deltaTime) * 16.67,
        y: ((newPos.y - lastPositionRef.current.y) / deltaTime) * 16.67,
      };
      velocityRef.current = velocity;
    }
    setPosition(newPos);
    lastPositionRef.current = newPos;
    lastTimeRef.current = currentTime;
  }, []);

  const getPointerPosition = useCallback((e: MouseEvent | TouchEvent) => {
    if ("touches" in e && e.touches.length > 0)
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    return { x: (e as MouseEvent).clientX, y: (e as MouseEvent).clientY };
  }, []);

  const handlePointerDown = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      if (animationRef.current) cancelAnimationFrame(animationRef.current);

      const pointerPos = getPointerPosition(e.nativeEvent as MouseEvent | TouchEvent);
      const currentTime = performance.now();

      setDragState({
        isDragging: true,
        startPosition: pointerPos,
        initialImagePosition: lastPositionRef.current,
      });

      lastTimeRef.current = currentTime;

      const startPos = pointerPos;
      const startImagePos = lastPositionRef.current;

      const handlePointerMove = (moveEvent: MouseEvent | TouchEvent) => {
        const currentPointerPos = getPointerPosition(moveEvent);
        const now = performance.now();
        const deltaX = currentPointerPos.x - startPos.x;
        const deltaY = currentPointerPos.y - startPos.y;
        const newPosition = constrainPosition({
          x: startImagePos.x + deltaX,
          y: startImagePos.y + deltaY,
        });
        updatePosition(newPosition, now);
      };

      const handlePointerUp = () => {
        setDragState((prev) => ({ ...prev, isDragging: false }));
        const currentVelocity = velocityRef.current;
        if (
          Math.abs(currentVelocity.x) > velocityThreshold ||
          Math.abs(currentVelocity.y) > velocityThreshold
        ) {
          animationRef.current = requestAnimationFrame(animate);
        }
        document.removeEventListener("mousemove", handlePointerMove);
        document.removeEventListener("mouseup", handlePointerUp);
        document.removeEventListener("touchmove", handlePointerMove);
        document.removeEventListener("touchend", handlePointerUp);
      };

      document.addEventListener("mousemove", handlePointerMove, { passive: false });
      document.addEventListener("mouseup", handlePointerUp);
      document.addEventListener("touchmove", handlePointerMove, { passive: false });
      document.addEventListener("touchend", handlePointerUp);
    },
    [constrainPosition, updatePosition, animate, getPointerPosition]
  );

  // Cleanup
  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      {!isLoaded && (
        <LoadingImage loadingImageText={alt || 'loading photo image'} />
      )}
      <div
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          width: MAGNIFIED_SIZE,
          height: MAGNIFIED_SIZE,
          touchAction: "none",
        }}
      >
        <Image
          ref={imageRef}
          src={src}
          alt={alt}
          width={MAGNIFIED_SIZE}
          height={MAGNIFIED_SIZE}
          draggable={false}
          onLoadingComplete={() => setIsLoaded(true)}
          style={{
            opacity: isLoaded ? 100 : 0
          }}
          onMouseDown={handlePointerDown}
          onTouchStart={handlePointerDown}
        />
      </div>
    </div>
  );
};

export default DraggableArtwork;
