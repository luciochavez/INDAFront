import React, { useEffect, useRef, useState } from 'react';
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: 'fadeIn' | 'slideUp' | 'slideDown' | 'scaleUp';
  duration?: 'fast' | 'normal' | 'slow';
  delay?: number;
  className?: string;
  threshold?: number;
  once?: boolean;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  animation = 'fadeIn',
  duration = 'normal',
  delay = 0,
  className,
  threshold = 0.1,
  once = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const durations = {
    fast: 'duration-300',
    normal: 'duration-500',
    slow: 'duration-700',
  };

  const animations = {
    fadeIn: 'animate-fadeIn',
    slideUp: 'animate-slideUp',
    slideDown: 'animate-slideDown',
    scaleUp: 'animate-scaleUp',
  };

  const delayClasses = [
    'delay-0',
    'delay-100',
    'delay-200',
    'delay-300',
    'delay-400',
    'delay-500',
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, once]);

  const delayClass = delay <= 500 ? delayClasses[Math.floor(delay / 100)] : '';

  return (
    <div
      ref={ref}
      className={cn(
        "opacity-0",
        isVisible && animations[animation],
        isVisible && durations[duration],
        isVisible && delayClass,
        className
      )}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
