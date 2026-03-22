import React, { useRef, useEffect } from 'react';

const FloatingLines = ({
  enabledWaves = ["top", "middle", "bottom"],
  lineCount = 5,
  lineDistance = 5,
  bendRadius = 5,
  bendStrength = -0.5,
  interactive = true,
  parallax = true
}) => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('resize', resize);
    if (interactive) window.addEventListener('mousemove', handleMouseMove);
    resize();

    const waves = enabledWaves.map((pos) => ({
      y: pos === "top" ? canvas.height * 0.2 : pos === "middle" ? canvas.height * 0.5 : canvas.height * 0.8,
      phase: Math.random() * Math.PI * 2,
      speed: 0.005 + Math.random() * 0.01,
      amplitude: 20 + Math.random() * 30
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      waves.forEach((wave, waveIdx) => {
        wave.phase += wave.speed;

        for (let i = 0; i < lineCount; i++) {
          ctx.beginPath();
          ctx.lineWidth = 1;
          ctx.strokeStyle = `rgba(16, 185, 129, ${0.1 - i * 0.01})`; // Emerald green fade
          
          const yOffset = i * lineDistance;
          
          for (let x = 0; x <= canvas.width; x += 10) {
            let dx = x;
            let dy = wave.y + Math.sin(x * 0.002 + wave.phase) * wave.amplitude + yOffset;

            if (interactive) {
              const dist = Math.sqrt((x - mouseRef.current.x) ** 2 + (dy - mouseRef.current.y) ** 2);
              if (dist < bendRadius * 20) {
                const angle = Math.atan2(dy - mouseRef.current.y, x - mouseRef.current.x);
                const force = (bendRadius * 20 - dist) * bendStrength;
                dx += Math.cos(angle) * force;
                dy += Math.sin(angle) * force;
              }
            }

            if (x === 0) ctx.moveTo(dx, dy);
            else ctx.lineTo(dx, dy);
          }
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [enabledWaves, lineCount, lineDistance, bendRadius, bendStrength, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
};

export default FloatingLines;