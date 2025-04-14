
import React from 'react';
import { cn } from '@/lib/utils';

type LogoProps = {
  variant?: 'default' | 'white';
  className?: string;
};

const Logo: React.FC<LogoProps> = ({ variant = 'default', className }) => {
  const textColor = variant === 'white' ? 'text-white' : 'text-inda-black';
  const accentColor = variant === 'white' ? 'text-white' : 'text-inda-blue';

  return (
    <div className={cn('flex items-center', className)}>
      <svg 
        width="32" 
        height="32" 
        viewBox="0 0 32 32" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="mr-2"
      >
        <path 
          d="M16 2C8.268 2 2 8.268 2 16C2 23.732 8.268 30 16 30C23.732 30 30 23.732 30 16C30 8.268 23.732 2 16 2Z" 
          className={variant === 'white' ? 'fill-white' : 'fill-inda-blue'} 
          fillOpacity="0.2"
        />
        <path 
          d="M22 10H10V22H22V10Z" 
          className={variant === 'white' ? 'fill-white' : 'fill-inda-blue'} 
        />
      </svg>
      <span className={cn('text-xl font-bold', textColor)}>
        Inda<span className={accentColor}>social</span>
      </span>
    </div>
  );
};

export default Logo;
