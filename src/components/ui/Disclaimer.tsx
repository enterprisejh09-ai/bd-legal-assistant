import { AlertTriangle, Info } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function Disclaimer({ variant = 'inline' }: { variant?: 'inline' | 'banner' }) {
  const { t } = useLanguage();
  if (variant === 'banner') {
    return (
      <div className="rounded-xl border border-gold/30 bg-gold-soft/40 px-4 py-3 flex gap-3 items-start">
        <AlertTriangle size={18} className="text-gold-dark mt-0.5 shrink-0" />
        <p className="text-xs text-navy leading-relaxed">{t('disclaimer')}</p>
      </div>
    );
  }
  return (
    <div className="flex gap-2 items-start text-xs text-muted bg-surface rounded-lg p-3">
      <Info size={14} className="mt-0.5 shrink-0 text-muted" />
      <p className="leading-relaxed">{t('disclaimer')}</p>
    </div>
  );
}

export function DemoLabel() {
  const { t } = useLanguage();
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-700">
      <Info size={10} />
      {t('demoLabel')}
    </span>
  );
}
