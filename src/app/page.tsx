import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Sigma,
  Sparkles,
  Layers,
  FlaskConical,
  BarChart3,
  Cpu,
  FolderGit2,
  TableProperties,
  BrainCircuit,
  Eye,
  Activity,
} from 'lucide-react';
import { UNITS_DATA } from '@/lib/constants';
import { CourseCard } from '@/components/cards/CourseCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* Editorial Hero Section */}
      <section className="relative rounded-3xl bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#334155] p-6 sm:p-10 lg:p-14 shadow-xs overflow-hidden transition-colors">
        {/* Subtle geometric background accents */}
        <div className="absolute -right-16 -top-16 w-96 h-96 rounded-full bg-[#FCE5DC]/60 dark:bg-blue-900/10 blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-96 h-96 rounded-full bg-[#FAF2D8]/50 dark:bg-amber-900/10 blur-3xl pointer-events-none" />

        <div className="max-w-3xl space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F1F5F9] dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] text-xs font-bold text-[#172033] dark:text-[#F8FAFC]">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            <span>DATA SCIENCE · BSH22BS04 · PCCOE CSE AI&amp;ML · 2025–26</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#172033] dark:text-[#F8FAFC] leading-[1.12]">
            Six units, one comprehensive mathematical &amp; ML learning platform.
          </h1>

          <p className="text-base sm:text-lg text-[#475569] dark:text-[#CBD5E1] leading-relaxed font-normal">
            Every unit of your Data Science curriculum with 60 interactive lessons, 24 computational labs, 74+ visualization playgrounds, 240+ flashcards, and real-time Python math solvers.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link href="/dashboard">
              <Button
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Launch Scholar Portal →
              </Button>
            </Link>
            <Link href="/units/1">
              <Button
                variant="outline"
                size="lg"
                leftIcon={<FlaskConical className="w-4 h-4 text-[#9E513B] dark:text-[#FFC4B3]" />}
              >
                Explore Unit 1 EDA
              </Button>
            </Link>
            <Link href="/tutor">
              <Button
                variant="outline"
                size="lg"
                leftIcon={<BrainCircuit className="w-4 h-4 text-[#68539A] dark:text-[#DFD3F8]" />}
              >
                AI Math Tutor
              </Button>
            </Link>
          </div>

          {/* Animated Curriculum Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-[#F1F5F9] dark:border-[#334155]">
            <AnimatedCounter end={6} label="Curriculum Units" />
            <AnimatedCounter end={60} label="Interactive Lessons" />
            <AnimatedCounter end={24} label="Applied Labs" />
            <AnimatedCounter end={6} label="Capstone Mini Projects" />
          </div>
        </div>
      </section>

      {/* "Learn Through Experiments" Section */}
      <section className="space-y-6">
        <SectionHeader
          title="Learn Through Experiments"
          subtitle="Our 4-pillar pedagogical framework transforms abstract equations into intuitive working knowledge."
          badge={
            <span className="p-1 rounded bg-[#FAF2D8] dark:bg-amber-950/60 text-[#806A28] dark:text-[#FBE6A6] border border-[#EBD99A] dark:border-amber-900">
              <Activity className="w-4 h-4" />
            </span>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Visualize - Peach Accent */}
          <div className="p-5 bg-white dark:bg-[#111827] rounded-2xl border border-[#E2E8F0] dark:border-[#334155] shadow-xs space-y-2.5 hover-lift">
            <div className="w-10 h-10 rounded-xl bg-[#FCE5DC] dark:bg-[#F4A58A]/20 text-[#9E513B] dark:text-[#FFC4B3] border border-[#EFC0B0] dark:border-[#F4A58A]/30 flex items-center justify-center">
              <Eye className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-[#172033] dark:text-[#F8FAFC]">1. Visualize</h4>
            <p className="text-xs text-[#475569] dark:text-[#CBD5E1] leading-relaxed">
              Interact with real-time vector coordinate planes, matrix transformations, probability curves, and decision boundaries.
            </p>
          </div>

          {/* Card 2: Experiment - Lavender Accent */}
          <div className="p-5 bg-white dark:bg-[#111827] rounded-2xl border border-[#E2E8F0] dark:border-[#334155] shadow-xs space-y-2.5 hover-lift">
            <div className="w-10 h-10 rounded-xl bg-[#EEE9F8] dark:bg-[#B7A3E3]/20 text-[#68539A] dark:text-[#DFD3F8] border border-[#CFC2EA] dark:border-[#B7A3E3]/30 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-[#172033] dark:text-[#F8FAFC]">2. Experiment</h4>
            <p className="text-xs text-[#475569] dark:text-[#CBD5E1] leading-relaxed">
              Inject outliers, tune learning rates, adjust classification thresholds, and run Monte Carlo simulations.
            </p>
          </div>

          {/* Card 3: Analyze - Sage Accent */}
          <div className="p-5 bg-white dark:bg-[#111827] rounded-2xl border border-[#E2E8F0] dark:border-[#334155] shadow-xs space-y-2.5 hover-lift">
            <div className="w-10 h-10 rounded-xl bg-[#E5F3E9] dark:bg-[#8FC7A3]/20 text-[#3F7951] dark:text-[#BCE8CC] border border-[#B8DCC3] dark:border-[#8FC7A3]/30 flex items-center justify-center">
              <TableProperties className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-[#172033] dark:text-[#F8FAFC]">3. Analyze</h4>
            <p className="text-xs text-[#475569] dark:text-[#CBD5E1] leading-relaxed">
              Study side-by-side comparison tables, mathematical proofs, residual diagnostics, and full KaTeX formula sheets.
            </p>
          </div>

          {/* Card 4: Apply - Dusty Rose Accent */}
          <div className="p-5 bg-white dark:bg-[#111827] rounded-2xl border border-[#E2E8F0] dark:border-[#334155] shadow-xs space-y-2.5 hover-lift">
            <div className="w-10 h-10 rounded-xl bg-[#F6E5EB] dark:bg-[#D99AAF]/20 text-[#8A4E63] dark:text-[#FACCDA] border border-[#E5BBC9] dark:border-[#D99AAF]/30 flex items-center justify-center">
              <FolderGit2 className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-[#172033] dark:text-[#F8FAFC]">4. Apply</h4>
            <p className="text-xs text-[#475569] dark:text-[#CBD5E1] leading-relaxed">
              Solve industrial mini projects in retail sales, recommendation cosine embeddings, A/B testing, and spam detection.
            </p>
          </div>
        </div>
      </section>

      {/* Dual-Track Curriculum Pathway */}
      <section id="curriculum" className="space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#F1F5F9] dark:border-[#334155] pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1 rounded bg-[#F1F5F9] dark:bg-[#1E293B] text-[#172033] dark:text-[#F8FAFC]">
                <Layers className="w-4 h-4" />
              </span>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#172033] dark:text-[#F1F5F9]">
                Structured Six-Unit Curriculum Tracks
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#475569] dark:text-[#CBD5E1]">
              Press keys <kbd className="px-1.5 py-0.5 rounded bg-[#F1F5F9] dark:bg-[#1E293B] font-mono border border-[#E2E8F0] dark:border-[#334155] text-[11px]">1</kbd>–<kbd className="px-1.5 py-0.5 rounded bg-[#F1F5F9] dark:bg-[#1E293B] font-mono border border-[#E2E8F0] dark:border-[#334155] text-[11px]">6</kbd> to jump directly to any unit workspace.
            </p>
          </div>
        </div>

        {/* Track 1: Foundations & Math (Units 1, 2, 3) */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F4A58A]" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#172033] dark:text-[#F1F5F9]">
              Track 1: Mathematical Foundations &amp; Exploratory Analysis (Units 1–3)
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {UNITS_DATA.slice(0, 3).map((unit) => (
              <div key={unit.id} className="hover-lift">
                <CourseCard unit={unit} />
              </div>
            ))}
          </div>
        </div>

        {/* Track 2: Statistical Inference & Core Machine Learning (Units 4, 5, 6) */}
        <div className="space-y-4 pt-4 border-t border-[#F1F5F9] dark:border-[#334155]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B7A3E3]" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#172033] dark:text-[#F1F5F9]">
              Track 2: Statistical Foundations &amp; Machine Learning (Units 4–6)
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {UNITS_DATA.slice(3, 6).map((unit) => (
              <div key={unit.id} className="hover-lift">
                <CourseCard unit={unit} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#334155] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#FCE5DC] dark:bg-[#F4A58A]/20 text-[#9E513B] dark:text-[#FFC4B3] flex items-center justify-center">
            <BarChart3 className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-[#172033] dark:text-[#F8FAFC]">
            Interactive Visualizations
          </h3>
          <p className="text-xs text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
            KDE density estimates, ECDF curves, vector projections, matrix determinant areas, and ROC / PR curves.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#334155] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#E5EFFB] dark:bg-[#91B9E8]/20 text-[#416B9E] dark:text-[#C6DEFA] flex items-center justify-center">
            <FlaskConical className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-[#172033] dark:text-[#F8FAFC]">
            Applied Computational Labs
          </h3>
          <p className="text-xs text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
            24 structured experimental workspaces with data cleaning, OLS optimization, PCA, and KNN decision boundaries.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#334155] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#EEE9F8] dark:bg-[#B7A3E3]/20 text-[#68539A] dark:text-[#DFD3F8] flex items-center justify-center">
            <Sigma className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-[#172033] dark:text-[#F8FAFC]">
            Zero-Compromise Mathematical Rigor
          </h3>
          <p className="text-xs text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
            Every concept couples geometric intuition with exact algebraic formulas, KaTeX notation, and step-by-step solver derivations.
          </p>
        </div>
      </section>
    </div>
  );
}
