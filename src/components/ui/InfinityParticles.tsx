"use client";

import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  tBase: number;
  tOffset: number;
  scatterAngle: number;
  scatterRadius: number;
  color: string;
  size: number;
  vx: number;
  vy: number;
  noiseOffsetX: number;
  noiseOffsetY: number;
}

export default function InfinityParticles({ className = "", style }: { className?: string; style?: React.CSSProperties } = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let scaleBase = 0;
    let centerX = 0;
    let centerY = 0;
    let animationFrameId: number;

    const colors = ["#E5404F", "#124898", "#CD5473", "#767676", "#323232"];

    const initParticles = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

      const isMobile = window.innerWidth < 768;
      const numParticles = isMobile ? 400 : 1200;
      particles = [];

      if (isMobile) {
        const target = document.getElementById("infinity-target");
        if (target) {
          const targetRect = target.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          centerX = targetRect.left - containerRect.left + targetRect.width / 2;
          centerY = targetRect.top - containerRect.top + targetRect.height / 2;
          scaleBase = targetRect.width * 0.45;
        } else {
          centerX = width / 2;
          centerY = height * 0.3;
          scaleBase = 60;
        }
      } else {
        centerX = width * 0.775;
        centerY = height / 2;
        scaleBase = Math.min(width * 0.45, height) * 0.35;
      }

      const maxScatter = isMobile ? 6 : 28;
      const baseSize = isMobile ? 0.8 : 1.5;

      for (let i = 0; i < numParticles; i++) {
        const originX = Math.random() * width;
        const originY = Math.random() * height;

        const t = (i / numParticles) * Math.PI * 2;
        const tOffset = (Math.random() - 0.5) * 0.2;

        const scatterRadius = Math.random() * maxScatter;
        const scatterAngle = Math.random() * Math.PI * 2;

        particles.push({
          x: originX,
          y: originY,
          originX,
          originY,
          tBase: t,
          tOffset,
          scatterAngle,
          scatterRadius,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * baseSize + (isMobile ? 0.3 : 0.5),
          vx: 0,
          vy: 0,
          noiseOffsetX: Math.random() * 1000,
          noiseOffsetY: Math.random() * 1000,
        });
      }
    };

    let time = 0;
    let frameCount = 0;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.005;
      frameCount++;

      const isMobile = window.innerWidth < 768;
      const isHovered = isMobile ? true : hoverRef.current;
      const lerpFactor = isHovered ? (isMobile ? 0.05 : 0.08) : 0.04;

      // Update target periodically and safely to catch layout/font shifts on mobile
      if (isMobile && frameCount % 60 === 0) {
        const target = document.getElementById("infinity-target");
        if (target && container) {
          const targetRect = target.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          centerX = targetRect.left - containerRect.left + targetRect.width / 2;
          centerY = targetRect.top - containerRect.top + targetRect.height / 2;
          scaleBase = targetRect.width * 0.45;
        }
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        let destX = p.originX;
        let destY = p.originY;

        if (isHovered) {
          // Dynamic calculation allows particles to flow continuously
          const currentT = p.tBase + p.tOffset + time * 0.5; // Flow speed
          const xMath = (scaleBase * Math.cos(currentT)) / (1 + Math.sin(currentT) * Math.sin(currentT));
          const yMath = (scaleBase * Math.cos(currentT) * Math.sin(currentT)) / (1 + Math.sin(currentT) * Math.sin(currentT));

          destX = centerX + xMath + Math.cos(p.scatterAngle) * p.scatterRadius;
          destY = centerY + yMath + Math.sin(p.scatterAngle) * p.scatterRadius;
        } else {
          p.noiseOffsetX += 0.002;
          p.noiseOffsetY += 0.002;
          destX = p.originX + Math.sin(p.noiseOffsetX) * 20;
          destY = p.originY + Math.cos(p.noiseOffsetY) * 20;
        }

        p.vx = (destX - p.x) * lerpFactor;
        p.vy = (destY - p.y) * lerpFactor;

        p.x += p.vx;
        p.y += p.vy;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = isHovered ? p.color : "rgba(118, 118, 118, 0.4)";
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        hoverRef.current = true;
      } else {
        hoverRef.current = e.clientX >= window.innerWidth * 0.55;
      }
    };

    initParticles();
    animate();

    let lastWidth = window.innerWidth;
    const handleResize = () => {
      // Mobile devices trigger resize events frequently when the address bar hides/shows on scroll.
      // Ignoring vertical-only resizes avoids completely destroying and recreating particles!
      if (Math.abs(window.innerWidth - lastWidth) > 10) {
        lastWidth = window.innerWidth;
        initParticles();
      } else {
        // Just quietly update dimensions to contain bounds without restarting everything.
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight;
        if (newWidth !== width || newHeight !== height) {
          width = newWidth;
          height = newHeight;
          canvas.width = width * window.devicePixelRatio;
          canvas.height = height * window.devicePixelRatio;
          ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        }
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`particle-container ${className}`}
      style={style}
    >
      <style>{`
        .particle-container {
          position: absolute;
          inset: 0;
          z-index: 0;
          width: 100%;
          height: 100%;
        }
      `}</style>
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          pointerEvents: "none"
        }}
      />
    </div>
  );
}
