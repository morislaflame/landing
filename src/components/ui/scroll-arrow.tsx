'use client';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

interface ScrollArrowProps {
  targetId: string;
  className?: string;
}

export function ScrollArrow({ targetId, className }: ScrollArrowProps) {
  const scrollToSection = () => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.button
      onClick={scrollToSection}
      className={`p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors ${className}`}
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
  );
}