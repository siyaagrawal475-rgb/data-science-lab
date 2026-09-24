'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  maxWidth = 'md',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const widthClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className={cn(
          'w-full bg-white dark:bg-[#151F2B] rounded-2xl shadow-xl border border-[#E2E8F0] dark:border-[#2E3B4A] overflow-hidden transform transition-all',
          widthClasses[maxWidth]
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between p-5 border-b border-[#E2E8F0] dark:border-[#2E3B4A]">
          <div>
            <h3 className="text-lg font-bold text-[#172033] dark:text-[#F1F5F9]">{title}</h3>
            {description && <p className="text-xs text-[#64748B] dark:text-[#B8C4D1] mt-0.5">{description}</p>}
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="text-[#64748B] dark:text-[#B8C4D1] hover:text-[#172033] dark:hover:text-[#F1F5F9] p-1 rounded-lg hover:bg-[#F1F5F9] dark:hover:bg-[#202D3B] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 max-h-[70vh] overflow-y-auto text-slate-700 dark:text-slate-300">{children}</div>

        {footer && (
          <div className="flex items-center justify-end gap-3 p-4 bg-[#F8FAFC] dark:bg-[#101923] border-t border-[#E2E8F0] dark:border-[#2E3B4A]">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
