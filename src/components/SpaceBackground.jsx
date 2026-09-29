"use client";

import React, { useEffect, useRef, useState } from "react";

const SpaceBackground = () => {
  const canvasRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;
    let width, height;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Mesh gradient blobs — large, soft, slow-moving
    const blobs = [
      {
        x: 0.15, y: 0.2,
        radius: 0.4,
        color: [0, 80, 50],       // Deep muted emerald
        speedX: 0.0003, speedY: 0.0004,
        phaseX: 0, phaseY: 0.5,
      },
      {
        x: 0.8, y: 0.3,
        radius: 0.35,
        color: [10, 60, 55],      // Dark teal
        speedX: 0.00025, speedY: 0.00035,
        phaseX: 1.2, phaseY: 2.1,
      },
      {
        x: 0.5, y: 0.75,
        radius: 0.38,
        color: [5, 70, 45],       // Muted forest
        speedX: 0.00035, speedY: 0.0002,
        phaseX: 2.5, phaseY: 1.0,
      },
      {
        x: 0.3, y: 0.55,
        radius: 0.3,
        color: [8, 55, 65],       // Deep cyan-teal
        speedX: 0.0002, speedY: 0.0003,
        phaseX: 3.8, phaseY: 0.3,
      },
    ];

    let time = 0;

    const animate = () => {
      time++;
      ctx.clearRect(0, 0, width, height);

      // Solid dark base
      ctx.fillStyle = "#050907";
      ctx.fillRect(0, 0, width, height);

      // Draw mesh gradient blobs
      blobs.forEach((blob) => {
        const cx = width * blob.x + Math.sin(time * blob.speedX + blob.phaseX) * width * 0.08;
        const cy = height * blob.y + Math.cos(time * blob.speedY + blob.phaseY) * height * 0.06;
        const r = Math.min(width, height) * blob.radius;

        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        gradient.addColorStop(0, `rgba(${blob.color[0]}, ${blob.color[1]}, ${blob.color[2]}, 0.25)`);
        gradient.addColorStop(0.4, `rgba(${blob.color[0]}, ${blob.color[1]}, ${blob.color[2]}, 0.12)`);
        gradient.addColorStop(0.7, `rgba(${blob.color[0]}, ${blob.color[1]}, ${blob.color[2]}, 0.04)`);
        gradient.addColorStop(1, "transparent");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      });

      // Subtle grain noise via semi-random dots (very sparse)
      if (time % 3 === 0) {
        for (let i = 0; i < 30; i++) {
          const nx = Math.random() * width;
          const ny = Math.random() * height;
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.03})`;
          ctx.fillRect(nx, ny, 1, 1);
        }
      }

      // Edge vignette
      const vignette = ctx.createRadialGradient(
        width / 2, height / 2, height * 0.3,
        width / 2, height / 2, height
      );
      vignette.addColorStop(0, "transparent");
      vignette.addColorStop(1, "rgba(5, 9, 7, 0.55)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [mounted]);

  return (
    <div className='fixed inset-0 w-full h-full -z-50 overflow-hidden pointer-events-none select-none'>
      {mounted && (
        <canvas
          ref={canvasRef}
          className='w-full h-full'
          style={{ display: "block" }}
        />
      )}
    </div>
  );
};

export default SpaceBackground;
