"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  baseAlpha: number;
}

export default function QuantumPerspective() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Size the canvas
    const resize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    // Create particles
    const particleCount = 120;
    const particles: Particle[] = [];
    const w = () => container.getBoundingClientRect().width;
    const h = () => container.getBoundingClientRect().height;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * w(),
        y: Math.random() * h(),
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.5 + 0.15,
        baseAlpha: Math.random() * 0.5 + 0.15,
      });
    }

    // Scroll-driven progress
    const progress = { value: 0 };
    const st = ScrollTrigger.create({
      trigger: container,
      start: "top 80%",
      end: "bottom 20%",
      onUpdate: (self) => {
        progress.value = self.progress;
      },
    });

    // Wireframe hexagon
    const drawHexagon = (cx: number, cy: number, r: number, rotation: number) => {
      ctx.beginPath();
      for (let i = 0; i <= 6; i++) {
        const angle = (Math.PI / 3) * i + rotation;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(229, 64, 79, ${0.06 + progress.value * 0.08})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();
    };

    // Animation loop
    let time = 0;
    const animate = () => {
      time += 0.005;
      const cw = w();
      const ch = h();
      ctx.clearRect(0, 0, cw, ch);

      // Draw wireframe hexagons
      const centerX = cw / 2;
      const centerY = ch / 2;
      for (let i = 1; i <= 4; i++) {
        drawHexagon(centerX, centerY, 50 * i + progress.value * 20, time * (0.3 + i * 0.1));
      }

      // Draw and connect particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx + Math.sin(time + i) * 0.15;
        p.y += p.vy + Math.cos(time + i) * 0.15;

        // Wrap around
        if (p.x < 0) p.x = cw;
        if (p.x > cw) p.x = 0;
        if (p.y < 0) p.y = ch;
        if (p.y > ch) p.y = 0;

        // Pulse alpha
        p.alpha = p.baseAlpha + Math.sin(time * 2 + i) * 0.15;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(229, 64, 79, ${p.alpha})`;
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.04 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // GSAP entrance
    gsap.fromTo(container,
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1, scale: 1, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: container, start: "top 80%" },
      }
    );

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
      st.kill();
    };
  }, []);

  return (
    <section className="r-quantum">
      <div className="r-eyebrow r-eyebrow--dark ra" data-delay="0">
        <span className="r-eyebrow-dot" />
        Quantum Perspective
      </div>

      <h2 className="r-quantum-heading ra" data-delay="0.06">
        Visualizing the <em style={{ fontWeight: 300, color: "rgba(255,255,255,0.4)" }}>Quantum Layer</em>
      </h2>
      <p className="r-quantum-sub ra" data-delay="0.12">
        An interactive view into quantum-level details — particle interactions,
        entanglement patterns, and the architecture of our research systems.
      </p>

      <div className="r-quantum-canvas" ref={containerRef}>
        <canvas ref={canvasRef} />
      </div>
    </section>
  );
}
