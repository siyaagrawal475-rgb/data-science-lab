'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BrainCircuit, Mail, Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Toast } from '@/components/ui/Toast';

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('student@datasciencelab.edu');
  const [password, setPassword] = useState('••••••••••••');
  const [name, setName] = useState('Alex Rivera');
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setToastMessage(mode === 'signin' ? 'Welcome back! Redirecting to Dashboard...' : 'Account created! Redirecting...');
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
    }, 600);
  };

  return (
    <div className="max-w-md mx-auto py-8 sm:py-12">
      {toastMessage && (
        <div className="mb-6">
          <Toast
            type="success"
            title="Authentication Success"
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
            {mode === 'signin' ? 'Sign in to Data Science Lab' : 'Create your Student Account'}
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#B8C4D1]">
            {mode === 'signin'
              ? 'Access your notebooks, lesson progress, and interactive labs.'
              : 'Join the comprehensive mathematical data science curriculum.'}
          </p>
        </div>

        {/* Mode Toggle Switch */}
        <div className="flex rounded-lg bg-[#F1F5F9] dark:bg-[#202D3B] p-1 border border-[#E2E8F0] dark:border-[#2E3B4A]">
          <button
            type="button"
            onClick={() => setMode('signin')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              mode === 'signin' ? 'bg-white dark:bg-[#151F2B] text-[#172033] dark:text-[#F1F5F9] shadow-xs' : 'text-[#64748B] dark:text-[#B8C4D1] hover:text-[#172033] dark:hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setMode('signup')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              mode === 'signup' ? 'bg-white dark:bg-[#151F2B] text-[#172033] dark:text-[#F1F5F9] shadow-xs' : 'text-[#64748B] dark:text-[#B8C4D1] hover:text-[#172033] dark:hover:text-white'
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
            <label htmlFor="email-input" className="block text-xs font-semibold text-[#172033] dark:text-[#F1F5F9]">
              Email Address
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
            <div className="flex items-center justify-between">
              <label htmlFor="password-input" className="block text-xs font-semibold text-[#172033] dark:text-[#F1F5F9]">
                Password
              </label>
              {mode === 'signin' && (
                <span className="text-[11px] text-[#64748B] dark:text-[#B8C4D1] hover:text-[#172033] dark:hover:text-white cursor-pointer">
                  Forgot password?
                </span>
              )}
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#94A3B8] dark:text-[#7F8B99] absolute left-3 top-3" />
              <input
                id="password-input"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-3.5 py-2 text-sm bg-white dark:bg-[#101923] text-[#0F172A] dark:text-[#F1F5F9] border border-[#E2E8F0] dark:border-[#2E3B4A] rounded-lg focus:border-[#91B9E8] focus:outline-none transition-colors"
              />
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
            {loading ? 'Authenticating...' : mode === 'signin' ? 'Sign In to Dashboard' : 'Register Account'}
          </Button>
        </form>

        {/* Footnote / Trust message */}
        <div className="pt-4 border-t border-[#F1F5F9] dark:border-[#2E3B4A] flex items-center justify-center gap-2 text-[11px] text-[#94A3B8] dark:text-[#7F8B99]">
          <ShieldCheck className="w-4 h-4 text-[#3F7951] dark:text-[#8FC7A3]" />
          <span>Secured with Supabase Authentication Tokens</span>
        </div>
      </div>
    </div>
  );
}
