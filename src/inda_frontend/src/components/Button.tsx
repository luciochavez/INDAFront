
import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  hasArrow?: boolean;
  onClick?: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  hasArrow = false,
  onClick,
  ...props
}) => {
  const variants = {
    primary: 'bg-inda-blue text-white hover:bg-inda-blue/90',
    secondary: 'bg-inda-purple text-white hover:bg-inda-purple/90',
    outline: 'bg-transparent border border-current hover:bg-gray-100/10',
    ghost: 'bg-transparent hover:bg-gray-100/10'
  };

  const sizes = {
    sm: 'py-1.5 px-3 text-sm',
    md: 'py-2 px-4 text-base',
    lg: 'py-2.5 px-6 text-lg'
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        variants[variant],
        sizes[size],
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
      {hasArrow && <ArrowRight className="ml-2 h-4 w-4" />}
    </button>
  );
};

export default Button;
