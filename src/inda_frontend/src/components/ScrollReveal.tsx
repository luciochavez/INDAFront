
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type ScrollRevealProps = {
  children: React.ReactNode;
  animation?: 'fadeIn' | 'slideUp' | 'scaleUp' | 'fadeInUp';
  delay?: number;
  duration?: 'fast' | 'normal' | 'slow';
  className?: string;
  threshold?: number;
};

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  animation = 'fadeIn',
  delay = 0,
  duration = 'normal',
  className,
  threshold = 0.1,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px',
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
  }, [threshold]);

  const animationClasses = {
    fadeIn: 'opacity-0 transition-opacity',
    slideUp: 'opacity-0 translate-y-10 transition-all',
    scaleUp: 'opacity-0 scale-95 transition-all',
    fadeInUp: 'opacity-0 translate-y-6 transition-all',
  };

  const durationClasses = {
    fast: 'duration-500',
    normal: 'duration-700',
    slow: 'duration-1000',
  };

  const visibleClasses = {
    fadeIn: 'opacity-100',
    slideUp: 'opacity-100 translate-y-0',
    scaleUp: 'opacity-100 scale-100',
    fadeInUp: 'opacity-100 translate-y-0',
  };

  return (
    <div
      ref={ref}
      className={cn(
        animationClasses[animation],
        durationClasses[duration],
        isVisible ? visibleClasses[animation] : '',
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
