import { useEffect, useRef } from 'react';

export function useSnapScroll() {
  const containerRef = useRef<HTMLElement>(null);
  const isScrolling = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const container = containerRef.current || document.querySelector('main');
    if (!container) return;

    let startY = 0;
    let currentY = 0;
    let isDragging = false;
    let resistance = 0;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      if (isScrolling.current) return;

      const delta = e.deltaY;
      const scrollTop = container.scrollTop;
      const maxScroll = container.scrollHeight - container.clientHeight;

      // Определяем направление скролла
      const isScrollingDown = delta > 0;
      const isScrollingUp = delta < 0;

      // Проверяем границы
      const isAtTop = scrollTop <= 0;
      const isAtBottom = scrollTop >= maxScroll;

      // Применяем сопротивление на границах
      if ((isAtTop && isScrollingUp) || (isAtBottom && isScrollingDown)) {
        resistance = 0.3;
      } else {
        resistance = 1;
      }

      // Вычисляем новую позицию с учетом сопротивления
      const newScrollTop = scrollTop + (delta * resistance);

      // Плавный скролл с эффектом "натяжения"
      isScrolling.current = true;
      
      container.scrollTo({
        top: newScrollTop,
        behavior: 'smooth'
      });

      // Сбрасываем флаг скролла через некоторое время
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      
      scrollTimeout.current = setTimeout(() => {
        isScrolling.current = false;
      }, 800);
    };

    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
      isDragging = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      
      e.preventDefault();
      currentY = e.touches[0].clientY;
      const deltaY = startY - currentY;
      
      const scrollTop = container.scrollTop;
      const maxScroll = container.scrollHeight - container.clientHeight;

      // Применяем сопротивление
      let resistance = 1;
      if ((scrollTop <= 0 && deltaY < 0) || (scrollTop >= maxScroll && deltaY > 0)) {
        resistance = 0.3;
      }

      container.scrollTop = scrollTop + (deltaY * resistance);
      startY = currentY;
    };

    const handleTouchEnd = () => {
      isDragging = false;
      
      // Snap к ближайшей секции
      const sections = container.querySelectorAll('.snap-start');
      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.top + containerRect.height / 2;

      let closestSection: Element | null = null;
      let minDistance = Infinity;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const distance = Math.abs(containerCenter - sectionCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestSection = section;
        }
      });

      if (closestSection) {
        (closestSection as HTMLElement).scrollIntoView({ behavior: 'smooth' });
      }
    };

    // Добавляем обработчики событий
    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  return containerRef;
}