import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'tube' | 'outline' | 'success' | 'destructive' | 'warning';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className = '',
  variant = 'default',
  ...props
}) => {
  const variantClasses = {
    default: 'bg-surface border-border text-slate-300',
    tube: 'bg-illum-muted text-illum border-illum-muted',
    outline: 'bg-transparent border-border text-slate-400',
    success: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40',
    destructive: 'bg-rose-500/15 text-rose-400 border-rose-500/40',
    warning: 'bg-amber-500/15 text-amber-400 border-amber-500/40'
  }[variant];

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold border transition-all ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

