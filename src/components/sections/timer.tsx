'use client';
import { Container } from '@/components/shared/container';
import { Section } from '@/components/shared/section';
import { TextEffect } from '@/components/ui/text-effect';
import { ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

const texts = [
  "Все изменится через",
  "Бәрі өзгереді", 
  "Everything will change in"
];

export function Timer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const targetDate = new Date('2026-02-15T00:00:00');

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Обновляем каждую секунду
    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft(); // Первоначальный расчет

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % texts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  const scrollToAuth = () => {
    const authSection = document.getElementById('auth-section');
    if (authSection) {
      authSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Section id="timer-section" className="min-h-screen flex flex-col items-center justify-center relative">
      <Container className='flex flex-col items-center justify-center flex-1'>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-center space-y-8"
        >
          {/* Подпись над таймером */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex items-center justify-center"
          >
            <TextEffect
              key={currentTextIndex}
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-white text-glow"
              preset="fade-in-blur"
              per="char"
              speedReveal={0.8}
              trigger={true}
            >
              {texts[currentTextIndex]}
            </TextEffect>
          </motion.div>

          {/* Таймер */}
          <div className="text-6xl md:text-8xl lg:text-9xl font-bold text-white text-glow" >
            <span className="text-white">{formatNumber(timeLeft.days)}</span>
            <span className="text-white">:</span>
            <span className="text-white">{formatNumber(timeLeft.hours)}</span>
            <span className="text-white">:</span>
            <span className="text-white">{formatNumber(timeLeft.minutes)}</span>
            <span className="text-white">:</span>
            <span className="text-white">{formatNumber(timeLeft.seconds)}</span>
          </div>
          
        </motion.div>
        
      </Container>
      {/* Стрелочка внизу секции */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="mb-8"
      >
        <motion.button
          onClick={scrollToAuth}
          className="p-3 rounded-full bg-zinc-950 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ChevronDown className="w-6 h-6 text-white" />
        </motion.button>
      </motion.div>
    </Section>
  );
}