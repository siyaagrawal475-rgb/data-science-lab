import React from 'react';
import Link from 'next/link';
import { BrainCircuit, BookOpen, FlaskConical, BarChart2 } from 'lucide-react';
import { UNITS_DATA } from '@/lib/constants';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-[#151F2B] border-t border-[#E2E8F0] dark:border-[#2E3B4A] mt-16 text-xs text-[#64748B] dark:text-[#B8C4D1] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-[#172033] dark:bg-[#202D3B] flex items-center justify-center text-white">
                <BrainCircuit className="w-4 h-4 text-[#91B9E8]" />
              </div>
              <span className="text-sm font-bold text-[#172033] dark:text-[#F1F5F9]">Data Science Lab</span>
            </div>
            <p className="text-xs text-[#64748B] dark:text-[#B8C4D1] leading-relaxed">
              A modern, scientific learning platform dedicated to mathematical rigor, exploratory data analysis, and machine learning foundations.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2.5">
            <span className="font-bold text-[#172033] dark:text-[#F1F5F9] text-xs uppercase tracking-wider block">
              Curriculum Units (1–3)
            </span>
            <ul className="space-y-1.5">
              {UNITS_DATA.slice(0, 3).map((u) => (
                <li key={u.id}>
                  <Link
                    href={`/units/${u.id}`}
                    className="hover:text-[#172033] dark:hover:text-[#F1F5F9] transition-colors"
                  >
                    Unit {u.unitNumber}: {u.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2.5">
            <span className="font-bold text-[#172033] dark:text-[#F1F5F9] text-xs uppercase tracking-wider block">
              Curriculum Units (4–6)
            </span>
            <ul className="space-y-1.5">
              {UNITS_DATA.slice(3, 6).map((u) => (
                <li key={u.id}>
                  <Link
                    href={`/units/${u.id}`}
                    className="hover:text-[#172033] dark:hover:text-[#F1F5F9] transition-colors"
                  >
                    Unit {u.unitNumber}: {u.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform tools */}
          <div className="space-y-2.5">
            <span className="font-bold text-[#172033] dark:text-[#F1F5F9] text-xs uppercase tracking-wider block">
              Platform Features
            </span>
            <ul className="space-y-1.5">
              <li className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#94A3B8]" />
                <Link href="/" className="hover:text-[#172033] dark:hover:text-[#F1F5F9]">
                  All Six Units
                </Link>
              </li>
              <li className="flex items-center gap-1.5">
                <FlaskConical className="w-3.5 h-3.5 text-[#94A3B8]" />
                <Link href="/labs/eda" className="hover:text-[#172033] dark:hover:text-[#F1F5F9]">
                  Computational Labs
                </Link>
              </li>
              <li className="flex items-center gap-1.5">
                <BarChart2 className="w-3.5 h-3.5 text-[#94A3B8]" />
                <Link href="/progress" className="hover:text-[#172033] dark:hover:text-[#F1F5F9]">
                  Progress Metrics
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#F1F5F9] dark:border-[#2E3B4A] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#94A3B8] dark:text-[#7F8B99]">
          <p>© {new Date().getFullYear()} Data Science Lab. All educational rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">● Systems Nominal</span>
            <span>TypeScript & Next.js Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
