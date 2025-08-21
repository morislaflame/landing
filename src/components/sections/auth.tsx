'use client';
import { Container } from '@/components/shared/container';
import { Section } from '@/components/shared/section';
import { TelegramAuthButton } from '@/components/ui/telegram-auth-button';
import { TextEffect } from '@/components/ui/text-effect';
import { ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

const texts = [
  "Прикоснуться к тайне",
  "Құпияға қол тигізу", 
  "Touch the mystery"
];

export function Auth() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % texts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleTelegramAuth = () => {
    // Здесь будет логика авторизации
    console.log('Начинаем авторизацию через Telegram');
  };

  return (
    <Section id="auth-section" className="min-h-screen flex items-center justify-center">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center space-y-8 flex flex-col items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex items-center justify-center"
          >
            <TextEffect
              key={currentTextIndex}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-glow"
              preset="fade-in-blur"
              per="char"
              speedReveal={0.8}
              trigger={true}
            >
              {texts[currentTextIndex]}
            </TextEffect>
          </motion.div>

          <ChevronDown className="w-6 h-6 text-white" />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex justify-center"
          >
            <TelegramAuthButton onAuth={handleTelegramAuth} />
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}