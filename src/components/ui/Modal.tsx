import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  maxWidth?: string;
}

export function Modal({ open, onClose, title, children, footer, maxWidth = 'max-w-md' }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="absolute inset-0 bg-navy/40 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative w-full ${maxWidth} card max-h-[90vh] overflow-hidden flex flex-col`}>
        {title && (
          <div className="flex items-center justify-between border-b border-navy/5 px-5 py-4">
            <h3 className="font-semibold text-navy">{title}</h3>
            <button onClick={onClose} className="btn-ghost p-1.5 rounded-lg" aria-label="Close">
              <X size={18} />
            </button>
          </div>
        )}
        <div className="overflow-y-auto scrollbar-thin px-5 py-4">{children}</div>
        {footer && <div className="border-t border-navy/5 px-5 py-3 flex justify-end gap-2">{footer}</div>}
      </div>
    </div>
  );
}
