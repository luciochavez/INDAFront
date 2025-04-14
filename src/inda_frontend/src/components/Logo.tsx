import React from 'react';
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: 'default' | 'white';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ variant = 'default', className }) => {
  return (
    <div className={cn("flex items-center", className)}>
      <h1 
        className={cn(
          "text-2xl font-bold tracking-tight transition-all duration-300",
          variant === 'default' ? 'text-inda-black' : 'text-white',
        )}
      >
        Inda<span className="text-inda-blue">social</span>
      </h1>
    </div>
  );
};

export default Logo;