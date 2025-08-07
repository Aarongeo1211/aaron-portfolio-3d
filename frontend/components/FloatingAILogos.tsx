import React, { useEffect, useRef } from 'react';
import { Brain, Cpu, Zap, Bot, Network, Sparkles, Code, Database, Shield } from 'lucide-react';

interface FloatingLogo {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  scale: number;
  opacity: number;
  icon: React.ComponentType<any>;
  color: string;
}

export default function FloatingAILogos() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logosRef = useRef<FloatingLogo[]>([]);
  const animationRef = useRef<number>();
  const scrollY = useRef(0);

  const icons = [Brain, Cpu, Zap, Bot, Network, Sparkles, Code, Database, Shield];
  const colors = [
    'text-orange-400/30',
    'text-orange-500/20',
    'text-orange-300/40',
    'text-orange-600/25',
    'text-orange-400/35',
    'text-orange-500/30',
    'text-orange-300/25',
    'text-orange-400/20',
    'text-orange-500/35'
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createLogos = () => {
      const logos: FloatingLogo[] = [];
      const logoCount = 8;

      for (let i = 0; i < logoCount; i++) {
        logos.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 1,
          scale: 0.4 + Math.random() * 0.3,
          opacity: 0.05 + Math.random() * 0.1,
          icon: icons[Math.floor(Math.random() * icons.length)],
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }

      logosRef.current = logos;
    };

    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };

    const animate = () => {
      logosRef.current.forEach((logo) => {
        // Update position based on scroll
        logo.y += logo.vy + scrollY.current * 0.0005;
        logo.x += logo.vx;
        logo.rotation += logo.rotationSpeed;

        // Wrap around screen
        if (logo.x < -50) logo.x = window.innerWidth + 50;
        if (logo.x > window.innerWidth + 50) logo.x = -50;
        if (logo.y < -50) logo.y = window.innerHeight + 50;
        if (logo.y > window.innerHeight + 50) logo.y = -50;

        // Update opacity based on scroll speed
        const scrollSpeed = Math.abs(scrollY.current * 0.005) % 1;
        logo.opacity = 0.05 + scrollSpeed * 0.15;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    createLogos();
    animate();

    window.addEventListener('scroll', handleScroll);
    
    const handleResize = () => {
      createLogos();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0">
      {logosRef.current.map((logo) => {
        const IconComponent = logo.icon;
        return (
          <div
            key={logo.id}
            className="absolute transition-all duration-100"
            style={{
              left: `${logo.x}px`,
              top: `${logo.y}px`,
              transform: `rotate(${logo.rotation}deg) scale(${logo.scale})`,
              opacity: logo.opacity,
            }}
          >
            <IconComponent className={`w-6 h-6 ${logo.color}`} />
          </div>
        );
      })}
    </div>
  );
}
