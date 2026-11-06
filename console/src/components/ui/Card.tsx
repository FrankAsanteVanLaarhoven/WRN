import React from 'react';

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement> & { isTube?: boolean }> = ({
  children,
  className = '',
  isTube = true,
  ...props
}) => {
  return (
    <div
      className={`rounded-xl p-5 ${isTube ? 'neon-tube-card' : 'bg-surface-card border border-border'} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <div className={`space-y-1 mb-3 ${className}`} {...props}>
    {children}
  </div>
);

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <h3 className={`text-sm font-bold text-white tracking-tight ${className}`} {...props}>
    {children}
  </h3>
);

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <p className={`text-xs text-slate-400 ${className}`} {...props}>
    {children}
  </p>
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <div className={`space-y-3 ${className}`} {...props}>
    {children}
  </div>
);

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <div className={`pt-3 mt-3 border-t border-border/80 flex items-center justify-between text-xs ${className}`} {...props}>
    {children}
  </div>
);

