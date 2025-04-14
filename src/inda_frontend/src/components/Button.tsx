import React from 'react';
import { cn } from "@/lib/utils";
import { ArrowRight, ChevronRight } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  hasArrow?: boolean;
  hasChevron?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  hasArrow = false,
  hasChevron = false,
  children,
  className,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  
  const variants = {
    primary: "bg-inda-blue text-white hover:bg-inda-blue/90 focus-visible:ring-inda-blue",
    secondary: "bg-inda-light text-inda-black hover:bg-inda-light/80 focus-visible:ring-inda-light",
    outline: "border border-inda-black bg-transparent text-inda-black hover:bg-inda-light focus-visible:ring-inda-black",
    ghost: "bg-transparent text-inda-black hover:bg-inda-light focus-visible:ring-inda-black",
    link: "bg-transparent text-inda-blue underline-offset-4 hover:underline focus-visible:ring-inda-blue p-0",
  };
  
  const sizes = {
    sm: "h-9 px-3 text-sm",
    md: "h-10 px-4 text-base",
    lg: "h-12 px-6 text-lg",
  };
  
  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : null}
      {children}
      {hasArrow && <ArrowRight className="ml-2 h-4 w-4" />}
      {hasChevron && <ChevronRight className="ml-1 h-4 w-4" />}
    </button>
  );
};

export default Button;
