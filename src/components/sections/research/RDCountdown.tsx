"use client";

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

const RDCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const targetDate = new Date("April 1, 2026 00:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    // GSAP entrance
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.querySelectorAll(".r-timer-digit"),
        { opacity: 0, y: 12, filter: "blur(6px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", stagger: 0.1, duration: 1.2, ease: "power4.out", delay: 0.3 }
      );
    }

    return () => clearInterval(interval);
  }, []);

  const units = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Mins" },
    { value: timeLeft.seconds, label: "Secs" },
  ];

  return (
    <div className="r-countdown-wrap ra" data-delay="0.3" ref={containerRef}>
      <div className="r-countdown-label">R&D Launch Countdown</div>
      <div className="r-countdown">
        {units.map((unit, i) => (
          <React.Fragment key={unit.label}>
            {i > 0 && <span className="r-timer-sep">:</span>}
            <div className="r-timer-unit">
              <div className="r-timer-digit">
                {unit.value.toString().padStart(2, '0')}
              </div>
              <div className="r-timer-label">{unit.label}</div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default RDCountdown;
