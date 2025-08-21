'use client';
import { GlowEffect } from '@/components/ui/glow-effect';
import { motion } from 'motion/react';

interface TelegramAuthButtonProps {
  onAuth?: () => void;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

export function TelegramAuthButton({ 
  onAuth, 
  className, 
  disabled = false,
  isLoading = false 
}: TelegramAuthButtonProps) {
  const handleAuth = () => {
    if (isLoading || disabled) return;
    
    if (onAuth) {
      onAuth();
    } else {
      // Заглушка для демонстрации
      console.log('Telegram авторизация');
    }
  };

  return (
    <div className='relative active:scale-95 transition-all duration-100' 
    onClick={handleAuth}>
        <GlowEffect
        colors={['#023e8a', '#f72585', '#4cc9f0', '#b5179e']}
        mode='flowHorizontal'
        blur={isLoading ? 'soft' : 'softest'}
        duration={5}
      />
    <button
      disabled={disabled || isLoading}
      className={`relative inline-flex items-center gap-3 rounded-md bg-zinc-950 px-2.5 py-1.5 text-lg outline outline-1 outline-[#fff2f21f] cursor-pointer`}
    >
      {isLoading ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
        />
      ) : (
        <svg 
          className="w-5 h-5" 
          viewBox="0 0 24 24" 
          fill="currentColor"
        >
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
        </svg>
      )}
      Telegram
    </button>
    </div>
  );
}