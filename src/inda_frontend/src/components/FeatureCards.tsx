import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  delay?: number;
  variant?: 'default' | 'glass';
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon: Icon,
  delay = 0,
  variant = 'default',
  className,
}) => {
  return (
    <ScrollReveal 
      animation="slideUp" 
      delay={delay}
      className={cn(
        'rounded-xl p-6 md:p-8 transition-all duration-300 h-full',
        variant === 'default' 
          ? 'bg-white border border-gray-200 hover:shadow-lg' 
          : 'glass-panel',
        className
      )}
    >
      <div className={cn(
        'w-12 h-12 rounded-lg flex items-center justify-center mb-5',
        variant === 'default' ? 'bg-inda-blue/10' : 'bg-white/20 backdrop-blur-sm'
      )}>
        <Icon className={cn(
          'w-6 h-6',
          variant === 'default' ? 'text-inda-blue' : 'text-white'
        )} />
      </div>
      <h3 className={cn(
        'text-xl font-bold mb-3',
        variant === 'default' ? 'text-inda-black' : 'text-white'
      )}>
        {title}
      </h3>
      <p className={cn(
        'text-base',
        variant === 'default' ? 'text-gray-600' : 'text-white/80'
      )}>
        {description}
      </p>
    </ScrollReveal>
  );
};

export default FeatureCard;
