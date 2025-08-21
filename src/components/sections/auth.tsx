'use client';
import { Container } from '@/components/shared/container';
import { Section } from '@/components/shared/section';
import { TelegramAuthButton } from '@/components/ui/telegram-auth-button';
import { TextEffect } from '@/components/ui/text-effect';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

const texts = [
  "Прикоснуться к тайне",
  "Құпияға қол тигізу", 
  "Touch the mystery"
];

const authenticatedTexts = [
  "Скоро все станет понятно",
  "Жақында бәрі түсінікті болады",
  "Everything will become clear soon"
];

export function Auth() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % (isAuthenticated ? authenticatedTexts.length : texts.length));
    }, 3000);

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const handleTelegramAuth = async () => {
    setIsLoading(true);
    
    try {
      // Фейковый запрос для демонстрации
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Имитация успешной авторизации
      setIsAuthenticated(true);
      console.log('Успешная авторизация через Telegram');
    } catch (error) {
      console.error('Ошибка авторизации:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Section id="auth-section" className="min-h-screen flex items-center justify-center">
      <Container>
        <AnimatePresence mode="wait">
          {!isAuthenticated ? (
            <motion.div
              key="auth-form"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -50 }}
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
                <TelegramAuthButton 
                  onAuth={handleTelegramAuth} 
                  isLoading={isLoading}
                />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="authenticated-content"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="text-center space-y-8 flex flex-col items-center justify-center"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
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
                  {authenticatedTexts[currentTextIndex]}
                </TextEffect>
              </motion.div>
              
              {/* <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="text-white/70 text-lg"
              >
                Авторизация прошла успешно
              </motion.div> */}
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </Section>
  );
}