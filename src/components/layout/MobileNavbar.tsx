'use client';

import React from 'react';
import Link from 'next/link';
import { UNITS_DATA } from '@/lib/constants';
import { LogIn, ArrowRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { cn } from '@/lib/utils';

interface MobileNavbarProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch?: () => void;
  navLinks: { href: string; label: string; icon: React.ReactNode }[];
  currentPath: string;
}

export const MobileNavbar: React.FC<MobileNavbarProps> = ({
  isOpen,
  onClose,
  onOpenSearch,
  navLinks,
  currentPath,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={onClose} />

      {/* Drawer */}
      <div className="fixed top-16 bottom-0 right-0 w-full max-w-xs bg-white dark:bg-[#151F2B] border-l border-[#E2E8F0] dark:border-[#2E3B4A] shadow-xl flex flex-col justify-between overflow-y-auto">
        <div className="p-4 space-y-6">
          {/* Quick Search Button */}
          {onOpenSearch && (
            <button
              onClick={onOpenSearch}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-[#2E3B4A] bg-[#F8FAFC] dark:bg-[#101923] text-xs font-medium text-[#64748B] dark:text-[#CBD5E1] hover:border-[#CBD5E1] dark:hover:border-[#3D4F63] transition-colors"
            >
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-[#94A3B8] dark:text-[#91B9E8]" />
                <span>Search curriculum...</span>
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white dark:bg-[#202D3B] border border-[#E2E8F0] dark:border-[#2E3B4A] text-[#94A3B8] dark:text-[#CBD5E1]">
                ⌘K
              </span>
            </button>
          )}

          {/* Main Navigation Links */}
          <div className="space-y-1">
            <div className="px-3 py-1 text-[11px] font-bold text-[#94A3B8] dark:text-[#7F8B99] uppercase tracking-wider">
              Navigation
            </div>
            {navLinks.map((link) => {
              const isActive = currentPath === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-[#F1F5F9] dark:bg-[#202D3B] text-[#172033] dark:text-[#F1F5F9] font-semibold'
                      : 'text-[#64748B] dark:text-[#B8C4D1] hover:text-[#172033] dark:hover:text-[#F1F5F9] hover:bg-[#F8FAFC] dark:hover:bg-[#1B2735]'
                  )}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Theme Switcher in Mobile Drawer */}
          <div className="px-3 py-2 bg-slate-50 dark:bg-[#1B2735] rounded-xl border border-slate-100 dark:border-[#2E3B4A] space-y-2">
            <span className="text-[11px] font-bold text-[#94A3B8] dark:text-[#7F8B99] uppercase tracking-wider block">
              Color Theme
            </span>
            <ThemeToggle compact />
          </div>

          {/* Units Navigation List */}
          <div className="space-y-1 pt-2 border-t border-[#F1F5F9] dark:border-[#2E3B4A]">
            <div className="px-3 py-1 text-[11px] font-bold text-[#94A3B8] dark:text-[#7F8B99] uppercase tracking-wider">
              Course Units
            </div>
            {UNITS_DATA.map((unit) => (
              <Link
                key={unit.id}
                href={`/units/${unit.unitNumber}`}
                onClick={onClose}
                className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-[#334155] dark:text-[#B8C4D1] hover:bg-[#F8FAFC] dark:hover:bg-[#1B2735] transition-colors"
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: unit.accentColor }}
                  />
                  <span className="truncate">
                    Unit {unit.unitNumber}: {unit.shortTitle}
                  </span>
                </div>
                <span className="text-[10px] font-semibold text-[#94A3B8] dark:text-[#7F8B99] bg-[#F1F5F9] dark:bg-[#202D3B] px-1.5 py-0.5 rounded">
                  Unit {unit.unitNumber}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-[#E2E8F0] dark:border-[#2E3B4A] bg-[#F8FAFC] dark:bg-[#151F2B] space-y-2">
          <Link href="/login" onClick={onClose} className="block w-full">
            <Button
              variant="outline"
              fullWidth
              size="sm"
              leftIcon={<LogIn className="w-4 h-4 text-[#64748B] dark:text-[#B8C4D1]" />}
            >
              Sign In
            </Button>
          </Link>
          <Link href="/dashboard" onClick={onClose} className="block w-full">
            <Button
              variant="primary"
              fullWidth
              size="sm"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Open Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
