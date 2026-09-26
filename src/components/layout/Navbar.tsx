'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BrainCircuit,
  LayoutDashboard,
  BookOpen,
  FlaskConical,
  BarChart3,
  LogIn,
  Menu,
  X,
  Search,
  Bot,
  FileText,
  User,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { VisitorCounter } from '@/components/ui/VisitorCounter';
import { GlobalSearchModal } from '@/components/search/GlobalSearchModal';
import { cn } from '@/lib/utils';
import { MobileNavbar } from './MobileNavbar';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Global hotkey Ctrl+K / Cmd+K listener
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { href: '/', label: 'Curriculum', icon: <BookOpen className="w-4 h-4" /> },
    { href: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { href: '/visualizations', label: 'Visualizations', icon: <BarChart3 className="w-4 h-4" /> },
    { href: '/labs/eda', label: 'Labs', icon: <FlaskConical className="w-4 h-4" /> },
    { href: '/revision', label: 'Revision', icon: <FileText className="w-4 h-4" /> },
    { href: '/tutor', label: 'AI Tutor', icon: <Bot className="w-4 h-4" /> },
    { href: '/progress', label: 'Progress', icon: <BarChart3 className="w-4 h-4" /> },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-[#151F2B]/95 backdrop-blur-xs border-b border-[#E2E8F0] dark:border-[#2E3B4A] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Brand / Logo */}
            <div className="flex items-center gap-6 lg:gap-8">
              <Link href="/" className="flex items-center gap-2.5 group shrink-0">
                <div className="w-9 h-9 rounded-lg bg-[#172033] dark:bg-[#202D3B] border border-transparent dark:border-[#2E3B4A] flex items-center justify-center text-white shadow-xs group-hover:bg-black dark:group-hover:bg-[#2A3B4D] transition-colors">
                  <BrainCircuit className="w-5 h-5 text-[#91B9E8]" />
                </div>
                <div>
                  <span className="text-base font-bold tracking-tight text-[#172033] dark:text-[#F1F5F9] block leading-tight">
                    Data Science Lab
                  </span>
                  <span className="text-[10px] font-semibold text-[#64748B] dark:text-[#B8C4D1] uppercase tracking-wider block">
                    Core Curriculum
                  </span>
                </div>
              </Link>

              {/* Desktop Nav Links */}
              <nav className="hidden xl:flex items-center gap-1">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        'flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors',
                        isActive
                          ? 'text-[#172033] dark:text-[#F1F5F9] bg-[#F1F5F9] dark:bg-[#202D3B] font-semibold'
                          : 'text-[#64748B] dark:text-[#B8C4D1] hover:text-[#172033] dark:hover:text-[#F1F5F9] hover:bg-[#F8FAFC] dark:hover:bg-[#1B2735]'
                      )}
                    >
                      {link.icon}
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Right: Search, Actions, Profile & Theme Toggle */}
            <div className="hidden md:flex items-center gap-2.5">
              <VisitorCounter className="hidden xl:inline-flex" />

              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#E2E8F0] dark:border-[#2E3B4A] bg-[#F8FAFC] dark:bg-[#101923] text-xs text-[#64748B] dark:text-[#CBD5E1] hover:border-[#CBD5E1] dark:hover:border-[#3D4F63] hover:text-[#172033] dark:hover:text-white transition-all cursor-pointer shadow-2xs"
                title="Search topics, lessons, labs (Ctrl+K)"
              >
                <Search className="w-3.5 h-3.5 text-[#94A3B8] dark:text-[#91B9E8]" />
                <span>Search...</span>
                <kbd className="hidden lg:inline-flex text-[10px] font-mono px-1.5 py-0.5 rounded bg-white dark:bg-[#202D3B] border border-[#E2E8F0] dark:border-[#2E3B4A] text-[#94A3B8] dark:text-[#CBD5E1]">
                  ⌘K
                </kbd>
              </button>

              <ThemeToggle />

              {user ? (
                <Link
                  href="/profile"
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-[#E2E8F0] dark:border-[#2E3B4A] bg-white dark:bg-[#151F2B] hover:bg-[#F8FAFC] dark:hover:bg-[#202D3B] text-xs font-semibold text-[#172033] dark:text-[#F1F5F9] transition-colors cursor-pointer"
                  title="View Student Dossier & Profile"
                >
                  <div className="w-5 h-5 rounded-md bg-[#172033] dark:bg-[#202D3B] text-[#91B9E8] flex items-center justify-center text-[10px]">
                    <User className="w-3 h-3" />
                  </div>
                  <span className="max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
                </Link>
              ) : (
                <Link href="/login">
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<LogIn className="w-4 h-4 text-[#64748B] dark:text-[#B8C4D1]" />}
                  >
                    Sign In
                  </Button>
                </Link>
              )}

              <Link href="/dashboard">
                <Button variant="primary" size="sm">
                  Dashboard
                </Button>
              </Link>
            </div>

            {/* Mobile Actions Button */}
            <div className="flex md:hidden items-center gap-1.5">
              <button
                onClick={() => setIsSearchOpen(true)}
                aria-label="Open search"
                className="p-2 rounded-lg text-[#64748B] dark:text-[#CBD5E1] hover:text-[#172033] dark:hover:text-[#F1F5F9] hover:bg-[#F1F5F9] dark:hover:bg-[#202D3B] transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
              <ThemeToggle compact />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle navigation menu"
                className="p-2 rounded-lg text-[#64748B] dark:text-[#CBD5E1] hover:text-[#172033] dark:hover:text-[#F1F5F9] hover:bg-[#F1F5F9] dark:hover:bg-[#202D3B] transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Global Search Dialog */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Mobile Drawer Navigation */}
      <MobileNavbar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenSearch={() => {
          setIsMobileMenuOpen(false);
          setIsSearchOpen(true);
        }}
        navLinks={navLinks}
        currentPath={pathname}
      />
    </>
  );
};
