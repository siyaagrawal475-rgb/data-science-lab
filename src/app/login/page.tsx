'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  BrainCircuit,
  Mail,
  Lock,
  User,
  ArrowRight,
  ShieldCheck,
  Eye,
  EyeOff,
  UserCheck,
  KeyRound,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Toast } from '@/components/ui/Toast';

export default function LoginPage() {
  const router = useRouter();
  const { signIn, signUp, enterGuestMode } = useAuth();

  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [prn, setPrn] = useState('PRN-2026-8492');
  const [email, setEmail] = useState('student@datasciencelab.edu');
  const [password, setPassword] = useState('math-rigor-2026');
  const [name, setName] = useState('Alex Rivera');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'signin') {
        await signIn(prn || email, password);
        setToastMessage('Authentication verified! Redirecting to Student Portal...');
      } else {
        await signUp(name, prn, email, password);
        setToastMessage('Student account created! Initializing curriculum workspace...');
      }

      setTimeout(() => {
        router.push('/dashboard');
      }, 700);
    } finally {
      setLoading(false);
    }
  };

  const handleGuestEntry = () => {
    enterGuestMode();
    setToastMessage('Guest Scholar mode initialized! Redirecting...');
    setTimeout(() => {
      router.push('/dashboard');
    }, 500);
  };

  return (
    <div className="max-w-md mx-auto py-8 sm:py-12">
      {toastMessage && (
        <div className="mb-6">
          <Toast
            type="success"
            title="Authentication State"
            message={toastMessage}
            onClose={() => setToastMessage(null)}
          />
        </div>
      )}

      <div className="bg-white dark:bg-[#151F2B] rounded-2xl border border-[#E2E8F0] dark:border-[#2E3B4A] shadow-xs p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-xl bg-[#172033] dark:bg-[#202D3B] text-white shadow-xs">
            <BrainCircuit className="w-6 h-6 text-[#91B9E8]" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#172033] dark:text-[#F1F5F9]">
            {mode === 'signin' ? 'Sign in to Student Portal' : 'Register Student Scholar'}
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#B8C4D1]">
            {mode === 'signin'
              ? 'Access verified lesson milestones, computational notebooks, and revision decks.'
              : 'Enroll in the comprehensive 6-unit mathematical curriculum.'}
          </p>
        </div>

        {/* Mode Toggle Switch */}
        <div className="flex rounded-lg bg-[#F1F5F9] dark:bg-[#202D3B] p-1 border border-[#E2E8F0] dark:border-[#2E3B4A]">
          <button
            type="button"
            onClick={() => setMode('signin')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              mode === 'signin'
                ? 'bg-white dark:bg-[#151F2B] text-[#172033] dark:text-[#F1F5F9] shadow-xs'
                : 'text-[#64748B] dark:text-[#B8C4D1] hover:text-[#172033] dark:hover:text-white'
            }`}
          >
            Student Sign In
          </button>
          <button
            type="button"
            onClick={() => setMode('signup')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              mode === 'signup'
                ? 'bg-white dark:bg-[#151F2B] text-[#172033] dark:text-[#F1F5F9] shadow-xs'
                : 'text-[#64748B] dark:text-[#B8C4D1] hover:text-[#172033] dark:hover:text-white'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div className="space-y-1.5">
              <label htmlFor="name-input" className="block text-xs font-semibold text-[#172033] dark:text-[#F1F5F9]">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#94A3B8] dark:text-[#7F8B99] absolute left-3 top-3" />
                <input
                  id="name-input"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ada Lovelace"
                  className="w-full pl-9 pr-3.5 py-2 text-sm bg-white dark:bg-[#101923] text-[#0F172A] dark:text-[#F1F5F9] border border-[#E2E8F0] dark:border-[#2E3B4A] rounded-lg focus:border-[#91B9E8] focus:outline-none transition-colors"
                />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label htmlFor="prn-input" className="block text-xs font-semibold text-[#172033] dark:text-[#F1F5F9]">
              Student PRN / Roll Number
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-[#94A3B8] dark:text-[#7F8B99] absolute left-3 top-3" />
              <input
                id="prn-input"
                type="text"
                required
                value={prn}
                onChange={(e) => setPrn(e.target.value)}
                placeholder="PRN-2026-8492"
                className="w-full pl-9 pr-3.5 py-2 text-sm font-mono bg-white dark:bg-[#101923] text-[#0F172A] dark:text-[#F1F5F9] border border-[#E2E8F0] dark:border-[#2E3B4A] rounded-lg focus:border-[#91B9E8] focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="email-input" className="block text-xs font-semibold text-[#172033] dark:text-[#F1F5F9]">
              Institutional Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#94A3B8] dark:text-[#7F8B99] absolute left-3 top-3" />
              <input
                id="email-input"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@datasciencelab.edu"
                className="w-full pl-9 pr-3.5 py-2 text-sm bg-white dark:bg-[#101923] text-[#0F172A] dark:text-[#F1F5F9] border border-[#E2E8F0] dark:border-[#2E3B4A] rounded-lg focus:border-[#91B9E8] focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="password-input" className="block text-xs font-semibold text-[#172033] dark:text-[#F1F5F9]">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#94A3B8] dark:text-[#7F8B99] absolute left-3 top-3" />
              <input
                id="password-input"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-10 py-2 text-sm bg-white dark:bg-[#101923] text-[#0F172A] dark:text-[#F1F5F9] border border-[#E2E8F0] dark:border-[#2E3B4A] rounded-lg focus:border-[#91B9E8] focus:outline-none transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-[#94A3B8] dark:text-[#7F8B99] hover:text-[#0F172A] dark:hover:text-white cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            size="md"
            disabled={loading}
            rightIcon={!loading && <ArrowRight className="w-4 h-4" />}
          >
            {loading ? 'Authenticating...' : mode === 'signin' ? 'Sign In to Portal' : 'Register Account'}
          </Button>
        </form>

        {/* Guest Mode Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#E2E8F0] dark:border-[#2E3B4A]" />
          </div>
          <div className="relative flex justify-center text-[11px] uppercase tracking-wider font-bold">
            <span className="bg-white dark:bg-[#151F2B] px-3 text-[#94A3B8] dark:text-[#7F8B99]">
              Or Explore Without Account
            </span>
          </div>
        </div>

        {/* Guest Mode CTA Button */}
        <Button
          onClick={handleGuestEntry}
          variant="outline"
          fullWidth
          size="md"
          leftIcon={<UserCheck className="w-4 h-4 text-[#416B9E] dark:text-[#91B9E8]" />}
        >
          Continue as Guest Scholar
        </Button>

        {/* Footnote */}
        <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-[#94A3B8] dark:text-[#7F8B99]">
          <ShieldCheck className="w-4 h-4 text-[#3F7951] dark:text-[#8FC7A3]" />
          <span>Local session isolation • Zero external telemetry</span>
        </div>
      </div>
    </div>
  );
}
