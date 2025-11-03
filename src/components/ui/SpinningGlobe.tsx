// app/components/ui/SpinningGlobe.tsx
'use client'

import { useEffect, useRef } from 'react';

interface SpinningGlobeProps {
  message?: string;
  autoHide?: boolean;
  autoHideDelay?: number;
}

export default function SpinningGlobe({ 
  message = 'Loading', 
  autoHide = false,
  autoHideDelay = 1000 
}: SpinningGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateSize = () => {
      const size = Math.min(window.innerWidth, window.innerHeight) * 0.8;
      canvas.width = size;
      canvas.height = size;
      return { size, centerX: size / 2, centerY: size / 2, radius: size * 0.4 };
    };

    let { size, centerX, centerY, radius } = updateSize();
    let rotation = 0;
    let animationFrame: number;
    let imageLoaded = false;
    
    // Load texture image
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = '/images/night_earth.jpg';
    img.onload = () => { imageLoaded = true; };
    img.onerror = () => { console.log('Texture not found, using gradient fallback'); };

    function draw() {
      if (!ctx || !canvas) return;

      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, size, size);

      // Clip to circle and draw sphere
      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.clip();

      if (imageLoaded && img.complete) {
        // Draw rotating texture
        const imgWidth = img.width;
        const imgHeight = img.height;
        const textureOffset = (rotation * radius * 2) % (imgWidth * (radius * 2) / imgHeight);
        
        // Draw texture multiple times for seamless wrapping
        for (let i = -1; i <= 2; i++) {
          ctx.drawImage(
            img,
            centerX - radius + textureOffset + i * imgWidth * (radius * 2) / imgHeight,
            centerY - radius,
            imgWidth * (radius * 2) / imgHeight,
            radius * 2
          );
        }
      } else {
        // Gradient fallback while loading or if image fails
        const gradient = ctx.createLinearGradient(
          centerX - radius + rotation * 50,
          0,
          centerX + radius + rotation * 50,
          0
        );
        gradient.addColorStop(0, '#1a1a2e');
        gradient.addColorStop(0.3, '#0f3460');
        gradient.addColorStop(0.6, '#16213e');
        gradient.addColorStop(1, '#1a1a2e');
        ctx.fillStyle = gradient;
        ctx.fillRect(centerX - radius, centerY - radius, radius * 2, radius * 2);
      }
      
      ctx.restore();

      // Sphere outline
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(100, 150, 255, 0.3)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Terminator shadow (left side)
      const shadowGradient = ctx.createRadialGradient(
        centerX - radius * 0.3,
        centerY,
        radius * 0.3,
        centerX,
        centerY,
        radius
      );
      shadowGradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
      shadowGradient.addColorStop(0.7, 'rgba(0, 0, 0, 0.3)');
      shadowGradient.addColorStop(1, 'rgba(0, 0, 0, 0.8)');

      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.clip();
      ctx.fillStyle = shadowGradient;
      ctx.fillRect(centerX - radius, centerY - radius, radius * 2, radius * 2);
      ctx.restore();

      // Outer glow
      const glowGradient = ctx.createRadialGradient(
        centerX,
        centerY,
        radius,
        centerX,
        centerY,
        radius * 1.3
      );
      glowGradient.addColorStop(0, 'rgba(100, 150, 255, 0.3)');
      glowGradient.addColorStop(1, 'rgba(100, 150, 255, 0)');

      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.3, 0, Math.PI * 2);
      ctx.fill();

      // Specular highlight (top right)
      const highlightGradient = ctx.createRadialGradient(
        centerX + radius * 0.3,
        centerY - radius * 0.3,
        0,
        centerX + radius * 0.3,
        centerY - radius * 0.3,
        radius * 0.5
      );
      highlightGradient.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
      highlightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.clip();
      ctx.fillStyle = highlightGradient;
      ctx.fillRect(centerX - radius, centerY - radius, radius * 2, radius * 2);
      ctx.restore();

      rotation += 0.005;
      animationFrame = requestAnimationFrame(draw);
    }

    const handleResize = () => {
      const dims = updateSize();
      size = dims.size;
      centerX = dims.centerX;
      centerY = dims.centerY;
      radius = dims.radius;
    };

    window.addEventListener('resize', handleResize);
    draw();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (autoHide && containerRef.current) {
      const timer = setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.style.opacity = '0';
          setTimeout(() => {
            if (containerRef.current) {
              containerRef.current.style.display = 'none';
            }
          }, 500);
        }
      }, autoHideDelay);

      return () => clearTimeout(timer);
    }
  }, [autoHide, autoHideDelay]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '2rem',
        zIndex: 999999,
        transition: 'opacity 0.5s ease-out'
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          maxWidth: '80vmin',
          maxHeight: '80vmin',
          filter: 'drop-shadow(0 0 50px rgba(100, 150, 255, 0.3))'
        }}
      />

      <div
        style={{
          color: '#fff',
          fontSize: '1.5rem',
          fontWeight: '300',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          animation: 'pulse 2s ease-in-out infinite',
          opacity: 0.8
        }}
      >
        {message}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// Vanilla JS version for static HTML (paste into layout.tsx <head> or before </body>)
export function getStaticGlobeScript() {
  return `
    <div id="static-loading-screen" style="position:fixed;inset:0;background:#000;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:2rem;z-index:999999;">
      <canvas id="static-loading-canvas" style="max-width:80vmin;max-height:80vmin;filter:drop-shadow(0 0 50px rgba(100, 150, 255, 0.3));"></canvas>
      <div style="color:#fff;font-size:1.5rem;font-weight:300;letter-spacing:0.3em;text-transform:uppercase;animation:pulse 2s ease-in-out infinite;opacity:0.8;">LOADING</div>
      <style>@keyframes pulse{0%,100%{opacity:0.6}50%{opacity:1}}</style>
    </div>
    <script>
      (function() {
        const canvas = document.getElementById('static-loading-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        const updateSize = () => {
          const size = Math.min(window.innerWidth, window.innerHeight) * 0.8;
          canvas.width = size;
          canvas.height = size;
          return { size, centerX: size / 2, centerY: size / 2, radius: size * 0.4 };
        };
        
        let { size, centerX, centerY, radius } = updateSize();
        let rotation = 0;
        
        function draw() {
          ctx.fillStyle = '#000';
          ctx.fillRect(0, 0, size, size);
          
          const gradient = ctx.createLinearGradient(centerX - radius + rotation * 50, 0, centerX + radius + rotation * 50, 0);
          gradient.addColorStop(0, '#1a1a2e');
          gradient.addColorStop(0.3, '#0f3460');
          gradient.addColorStop(0.6, '#16213e');
          gradient.addColorStop(1, '#1a1a2e');
          
          ctx.save();
          ctx.beginPath();
          ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
          ctx.clip();
          ctx.fillStyle = gradient;
          ctx.fillRect(centerX - radius, centerY - radius, radius * 2, radius * 2);
          ctx.restore();
          
          ctx.beginPath();
          ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(100, 150, 255, 0.3)';
          ctx.lineWidth = 2;
          ctx.stroke();
          
          const shadowGrad = ctx.createRadialGradient(centerX - radius * 0.3, centerY, radius * 0.3, centerX, centerY, radius);
          shadowGrad.addColorStop(0, 'rgba(0,0,0,0)');
          shadowGrad.addColorStop(0.7, 'rgba(0,0,0,0.3)');
          shadowGrad.addColorStop(1, 'rgba(0,0,0,0.8)');
          ctx.save();
          ctx.beginPath();
          ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
          ctx.clip();
          ctx.fillStyle = shadowGrad;
          ctx.fillRect(centerX - radius, centerY - radius, radius * 2, radius * 2);
          ctx.restore();
          
          const glowGrad = ctx.createRadialGradient(centerX, centerY, radius, centerX, centerY, radius * 1.3);
          glowGrad.addColorStop(0, 'rgba(100, 150, 255, 0.3)');
          glowGrad.addColorStop(1, 'rgba(100, 150, 255, 0)');
          ctx.fillStyle = glowGrad;
          ctx.beginPath();
          ctx.arc(centerX, centerY, radius * 1.3, 0, Math.PI * 2);
          ctx.fill();
          
          const highlightGrad = ctx.createRadialGradient(centerX + radius * 0.3, centerY - radius * 0.3, 0, centerX + radius * 0.3, centerY - radius * 0.3, radius * 0.5);
          highlightGrad.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
          highlightGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.save();
          ctx.beginPath();
          ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
          ctx.clip();
          ctx.fillStyle = highlightGrad;
          ctx.fillRect(centerX - radius, centerY - radius, radius * 2, radius * 2);
          ctx.restore();
          
          rotation += 0.005;
          requestAnimationFrame(draw);
        }
        
        window.addEventListener('resize', () => {
          const dims = updateSize();
          size = dims.size;
          centerX = dims.centerX;
          centerY = dims.centerY;
          radius = dims.radius;
        });
        
        draw();
        
        window.addEventListener('load', function() {
          setTimeout(function() {
            const screen = document.getElementById('static-loading-screen');
            if (screen) {
              screen.style.opacity = '0';
              screen.style.transition = 'opacity 0.5s';
              setTimeout(function() { screen.style.display = 'none'; }, 500);
            }
          }, 500);
        });
      })();
    </script>
  `;
}