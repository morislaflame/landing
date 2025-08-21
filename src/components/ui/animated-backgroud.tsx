'use client';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export function AnimatedBackground() {
  const [circles, setCircles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    color: string;
    delay: number;
  }>>([]);

  useEffect(() => {
    const generateCircle = () => {
      const newCircle = {
        id: Date.now() + Math.random(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 200 + 100,
        color: Math.random() > 0.5 ? 'white' : 'white',
        delay: Math.random() * 2,
      };
      
      setCircles(prev => [...prev, newCircle]);
      
      // Удаляем круг через 4 секунды
      setTimeout(() => {
        setCircles(prev => prev.filter(circle => circle.id !== newCircle.id));
      }, 4000);
    };

    // Создаем первый круг
    generateCircle();

    // Создаем новые круги каждые 2-4 секунды
    const interval = setInterval(() => {
      generateCircle();
    }, Math.random() * 2000 + 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
      
      {circles.map((circle) => (
        <motion.div
          key={circle.id}
          className="absolute rounded-full blur-3xl bg-white/10"
          style={{
            left: `${circle.x}%`,
            top: `${circle.y}%`,
            width: `${circle.size}px`,
            height: `${circle.size}px`,
          }}
          initial={{ 
            opacity: 0, 
            scale: 0,
            x: '-50%',
            y: '-50%'
          }}
          animate={{ 
            opacity: [0, 0.2, 0.15, 0],
            scale: [0, 1, 1.2, 0],
          }}
          transition={{
            duration: 4,
            delay: circle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}