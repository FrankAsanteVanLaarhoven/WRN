import React from 'react';
import { animateClick } from '../../hooks/useGsapAnimation';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'tube' | 'outline' | 'ghost' | 'destructive' | 'secondary';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  variant = 'default',
  size = 'md',
  onClick,
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3.5 py-1.5 text-xs',
    lg: 'px-4 py-2 text-sm',
    icon: 'p-1.5 text-xs w-8 h-8 flex items-center justify-center'
  }[size];

  const variantClasses = {
    default: 'bg-surface-elevated hover:bg-surface border border-border text-slate-200 hover:text-white',
    tube: 'neon-tube-button font-bold',
    outline: 'border border-border bg-transparent hover:bg-surface text-slate-300 hover:text-white',
    ghost: 'bg-transparent hover:bg-surface text-slate-400 hover:text-white',
    destructive: 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30',
    secondary: 'bg-surface border border-border text-slate-300 hover:border-illum-muted'
  }[variant];

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    animateClick(e.currentTarget);
    if (onClick) onClick(e);
  };

  return (
    <button
      onClick={handleClick}
      className={`rounded-lg font-medium transition-all select-none cursor-pointer flex items-center justify-center space-x-1.5 ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
