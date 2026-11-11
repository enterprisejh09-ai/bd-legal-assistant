import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'gold' | 'navy' | 'success' | 'warning' | 'error';
  className?: string;
}

const variants: Record<string, string> = {
  default: 'bg-navy/5 text-ink',
  gold: 'bg-gold-soft text-navy',
  navy: 'bg-navy text-white',
  success: 'bg-green-50 text-green-700',
  warning: 'bg-amber-50 text-amber-700',
  error: 'bg-red-50 text-red-700',
};

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
