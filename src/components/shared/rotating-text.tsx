'use client';
import { TextEffect } from '@/components/ui/text-effect';
import { useState, useEffect, useRef } from 'react';

interface RotatingTextProps {
  texts: string[];
  className?: string;
  preset?: 'blur' | 'fade-in-blur' | 'scale' | 'fade' | 'slide';
  per?: 'word' | 'char' | 'line';
  speedReveal?: number;
  interval?: number;
  delay?: number;
}

export function RotatingText({
  texts,
  className,
  preset = 'fade-in-blur',
  per = 'word',
  speedReveal = 1,
  interval = 3000,
  delay = 0
}: RotatingTextProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Intersection Observer для отслеживания видимости
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setIsMounted(true);
        } else {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.3, // Секция считается видимой, когда 30% её содержимого видно
        rootMargin: '0px 0px -100px 0px' // Небольшой отступ снизу
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  // Интервал для смены текста только когда секция видима
  useEffect(() => {
    if (!isVisible || !isMounted) return;

    const timer = setTimeout(() => {
      setCurrentTextIndex((prev) => (prev + 1) % texts.length);
    }, delay);

    const intervalTimer = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % texts.length);
    }, interval);

    return () => {
      clearTimeout(timer);
      clearInterval(intervalTimer);
    };
  }, [isVisible, isMounted, texts.length, interval, delay]);

  if (!isMounted) {
    return (
      <div ref={ref} className={className}>
        <div className="text-transparent">{texts[0]}</div>
      </div>
    );
  }

  return (
    <div ref={ref} className={className}>
      <TextEffect
        key={currentTextIndex}
        className={className}
        preset={preset}
        per={per}
        speedReveal={speedReveal}
        trigger={isVisible}
      >
        {texts[currentTextIndex]}
      </TextEffect>
    </div>
  );
}