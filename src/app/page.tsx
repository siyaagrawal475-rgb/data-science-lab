import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Sigma,
  Sparkles,
  Layers,
  GraduationCap,
  FlaskConical,
  BarChart3,
  Binary,
} from 'lucide-react';
import { UNITS_DATA, SAMPLE_FORMULAS, SAMPLE_FLASHCARDS } from '@/lib/constants';
import { CourseCard } from '@/components/cards/CourseCard';
import { FormulaCard } from '@/components/cards/FormulaCard';
import { Flashcard } from '@/components/cards/Flashcard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* Editorial Hero Section */}
      <section className="relative rounded-3xl bg-white dark:bg-[#151F2B] border border-[#E2E8F0] dark:border-[#2E3B4A] p-6 sm:p-10 lg:p-12 shadow-xs overflow-hidden transition-colors">
        {/* Subtle geometric background accents */}
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-blue-100/40 dark:bg-blue-900/10 blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-80 h-80 rounded-full bg-amber-100/30 dark:bg-amber-900/10 blur-3xl pointer-events-none" />

        <div className="max-w-3xl space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F1F5F9] dark:bg-[#202D3B] border border-[#E2E8F0] dark:border-[#2E3B4A] text-xs font-semibold text-[#475569] dark:text-[#CBD5E1]">
            <Sparkles className="w-3.5 h-3.5 text-[#91B9E8]" />
            <span>Interactive Scientific Learning Platform</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#172033] dark:text-[#F1F5F9] leading-[1.15]">
            Master Data Science through mathematical rigor and interactive labs.
          </h1>

          <p className="text-base sm:text-lg text-[#475569] dark:text-[#B8C4D1] leading-relaxed font-normal">
            A structured six-unit curriculum spanning Exploratory Data Analysis, Linear Algebra, Matrix Transformations, Probability Theory, Regression Optimization, and Machine Learning.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link href="/dashboard">
              <Button
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Start Learning →
              </Button>
            </Link>
            <Link href="/labs/eda">
              <Button
                variant="outline"
                size="lg"
                leftIcon={<FlaskConical className="w-4 h-4 text-[#64748B] dark:text-[#B8C4D1]" />}
              >
                Explore Labs
              </Button>
            </Link>
          </div>

          {/* Animated Curriculum Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-[#F1F5F9] dark:border-[#2E3B4A]">
            <AnimatedCounter end={6} label="Curriculum Units" />
            <AnimatedCounter end={60} label="Interactive Lessons" />
            <AnimatedCounter end={24} label="Applied Labs" />
            <AnimatedCounter end={86} label="Math Formulas" />
          </div>
        </div>
      </section>

      {/* Six Units Grid */}
      <section id="curriculum" className="space-y-6">
        <SectionHeader
          title="The Six-Course Curriculum"
          subtitle="A progressive, prerequisite-driven path from foundational data manipulation to machine learning algorithms."
          badge={
            <span className="p-1 rounded bg-[#F1F5F9] dark:bg-[#202D3B] text-[#172033] dark:text-[#F1F5F9]">
              <Layers className="w-4 h-4" />
            </span>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {UNITS_DATA.map((unit) => (
            <div key={unit.id} className="hover-lift">
              <CourseCard unit={unit} />
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Feature Highlights */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-[#151F2B] border border-[#E2E8F0] dark:border-[#2E3B4A] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#FCE5DC] dark:bg-[#202D3B] text-[#9E513B] dark:text-[#F4A58A] flex items-center justify-center">
            <BarChart3 className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-[#172033] dark:text-[#F1F5F9]">
            Interactive Visualizations
          </h3>
          <p className="text-xs text-[#64748B] dark:text-[#B8C4D1] leading-relaxed">
            Real-time interactive Chart.js & SVG graphics for vector fields, transformations, probability curves, and decision boundaries.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-[#151F2B] border border-[#E2E8F0] dark:border-[#2E3B4A] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#E5EFFB] dark:bg-[#202D3B] text-[#416B9E] dark:text-[#91B9E8] flex items-center justify-center">
            <FlaskConical className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-[#172033] dark:text-[#F1F5F9]">
            Custom CSV Analysis Labs
          </h3>
          <p className="text-xs text-[#64748B] dark:text-[#B8C4D1] leading-relaxed">
            Upload your own local CSV files to compute distributions, fit OLS regression models, and inspect correlation matrices.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-[#151F2B] border border-[#E2E8F0] dark:border-[#2E3B4A] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#EEE9F8] dark:bg-[#202D3B] text-[#68539A] dark:text-[#B7A3E3] flex items-center justify-center">
            <Binary className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-[#172033] dark:text-[#F1F5F9]">
            Zero-Compromise Mathematics
          </h3>
          <p className="text-xs text-[#64748B] dark:text-[#B8C4D1] leading-relaxed">
            Every lesson couples intuitive geometry with complete algebraic proofs, KaTeX notation, and deterministic math engines.
          </p>
        </div>
      </section>

      {/* Educational Toolkit Highlights */}
      <section className="bg-white dark:bg-[#151F2B] rounded-3xl border border-[#E2E8F0] dark:border-[#2E3B4A] p-6 sm:p-10 shadow-xs space-y-8 transition-colors">
        <SectionHeader
          title="Interactive Educational Toolkit"
          subtitle="Explore the interactive study tools built into every unit, including KaTeX formula reference cards and spaced-repetition flashcards."
          badge={
            <span className="p-1 rounded bg-[#F1F5F9] dark:bg-[#202D3B] text-[#172033] dark:text-[#F1F5F9]">
              <GraduationCap className="w-4 h-4" />
            </span>
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#64748B] dark:text-[#B8C4D1] uppercase tracking-wider">
              <Sigma className="w-4 h-4 text-[#416B9E] dark:text-[#91B9E8]" />
              <span>KaTeX Mathematical Formulas</span>
            </div>
            <FormulaCard formula={SAMPLE_FORMULAS[1]} />
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#64748B] dark:text-[#B8C4D1] uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#68539A] dark:text-[#B7A3E3]" />
              <span>Interactive Concept Flashcard (Click to Flip)</span>
            </div>
            <Flashcard card={SAMPLE_FLASHCARDS[1]} />
          </div>
        </div>
      </section>
    </div>
  );
}
