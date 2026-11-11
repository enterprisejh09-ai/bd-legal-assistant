import type { ReactNode } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export function PageHeader({ title, subtitle, icon, action }: PageHeaderProps) {
  const { isBn } = useLanguage();
  return (
    <div className="flex items-start justify-between gap-4 flex-wrap mb-6 animate-fadeIn">
      <div className="flex items-start gap-3">
        {icon && (
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy text-gold shrink-0">
            {icon}
          </div>
        )}
        <div>
          <h1 className={`text-xl font-bold text-navy ${isBn ? 'bn' : ''}`}>{title}</h1>
          {subtitle && <p className={`text-sm text-muted mt-0.5 ${isBn ? 'bn' : ''}`}>{subtitle}</p>}
        </div>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function EmptyState({ icon, title, description, action }: { icon?: ReactNode; title: string; description?: string; action?: ReactNode }) {
  const { isBn } = useLanguage();
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center animate-fadeIn">
      {icon && <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-navy/5 text-muted">{icon}</div>}
      <h3 className={`font-semibold text-navy ${isBn ? 'bn' : ''}`}>{title}</h3>
      {description && <p className={`mt-1 text-sm text-muted max-w-sm ${isBn ? 'bn' : ''}`}>{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function LoadingDots() {
  return (
    <div className="flex items-center gap-1.5 py-1">
      <span className="typing-dot h-2 w-2 rounded-full bg-gold" />
      <span className="typing-dot h-2 w-2 rounded-full bg-gold" />
      <span className="typing-dot h-2 w-2 rounded-full bg-gold" />
    </div>
  );
}
