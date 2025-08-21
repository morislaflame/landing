'use client';
import { TextEffect } from '@/components/ui/text-effect';
import { Container } from '@/components/shared/container';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const texts = [
  "Вы ещё не готовы",
  "Әлі дайын емессіз", 
  "You're not ready yet"
];

export function Hero() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % texts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const scrollToTimer = () => {
    const element = document.getElementById('timer-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative">
      <Container className="flex-1 flex items-center justify-center w-[90%]">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center w-full"
        >
          <div className="flex items-center justify-center relative w-full ">
            <div className="relative z-10 w-[90vw] h-full rounded-lg ">
            <TextEffect
              key={currentTextIndex}
              className="text-2xl md:text-6xl lg:text-7xl text-white text-glow"
              preset="fade-in-blur"
              per="word"
              speedReveal={1}
              trigger={true}
            >
              {texts[currentTextIndex]}
            </TextEffect>
            </div>
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
          onClick={scrollToTimer}
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
    </div>
  );
}