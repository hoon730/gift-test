import React from 'react';

interface BadgeProps {
  variant?: 'primary' | 'accent' | 'neutral';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  children,
  className = '',
}) => {
  const variants = {
    primary: 'bg-primary-200 text-primary-800',
    accent: 'bg-accent-100 text-accent-800',
    neutral: 'bg-neutral-200 text-neutral-700',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
