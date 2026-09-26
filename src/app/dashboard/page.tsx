'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  FlaskConical,
  GraduationCap,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Download,
  User,
  BrainCircuit,
  FileSpreadsheet,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { UNITS_DATA } from '@/lib/constants';
import { useGlobalProgress, getRecentActivity, exportStudyReportCSV, ActivityEvent } from '@/lib/progress';
import { useAuth } from '@/context/AuthContext';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { CourseCard } from '@/components/cards/CourseCard';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { UnitBadge } from '@/components/ui/UnitBadge';
import { Button } from '@/components/ui/Button';
import { StudyTimerWidget } from '@/components/ui/StudyTimerWidget';

export default function DashboardPage() {
  const { user } = useAuth();
  const {
    overallPercentage,
    totalLessonsCompleted,
    totalLabsCompleted,
    totalQuizzesCompleted,
    unitPercentages,
    activeUnitId,
  } = useGlobalProgress();

  const [recentActivities, setRecentActivities] = useState<ActivityEvent[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      return getRecentActivity();
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const handleUpdate = () => setRecentActivities(getRecentActivity());
    window.addEventListener('dsl-activity-updated', handleUpdate);
    window.addEventListener('dsl-progress-updated', handleUpdate);
    return () => {
      window.removeEventListener('dsl-activity-updated', handleUpdate);
      window.removeEventListener('dsl-progress-updated', handleUpdate);
    };
  }, []);

  const activeUnit = UNITS_DATA.find((u) => u.id === activeUnitId) || UNITS_DATA[0];
  const activeUnitPercent = unitPercentages[activeUnit.id] || 0;
  const isBrandNew = totalLessonsCompleted === 0 && totalLabsCompleted === 0;

  // Dynamic unit cards with live calculated percentages
  const dynamicUnits = UNITS_DATA.map((u) => ({
    ...u,
    progressPercent: unitPercentages[u.id] || 0,
  }));

  const handleExportCSV = () => {
    exportStudyReportCSV(user?.name || 'Scholar', user?.prn || 'GUEST-MODE');
  };

  return (
    <div className="space-y-10">
      {/* Dashboard Page Header */}
      <PageHeader
        title={
          user
            ? `Welcome back, ${user.name}`
            : 'Student Dashboard'
        }
        description={
          user?.prn
            ? `PRN: ${user.prn} • Real-time curriculum tracking, interactive labs, and computational revision.`
            : 'Track your mastery across the six Data Science units, resume lessons, and run interactive computational labs.'
        }
        breadcrumbs={[{ label: 'Dashboard' }]}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportCSV}
              leftIcon={<Download className="w-4 h-4" />}
            >
              Export Report
            </Button>
            <Link href={`/units/${activeUnit.unitNumber}`}>
              <Button
                variant="unit"
                unitId={activeUnit.id}
                size="sm"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                {isBrandNew ? `Start Unit ${activeUnit.unitNumber}` : `Resume Unit ${activeUnit.unitNumber}`}
              </Button>
            </Link>
          </div>
        }
      />

      {/* Top Banner: Quick Access Hub & Focus Timer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Study Focus Timer */}
        <div className="lg:col-span-1">
          <StudyTimerWidget />
        </div>

        {/* Right: Quick Revision & Tutor Launchers */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/revision"
            className="p-5 rounded-2xl bg-white dark:bg-[#151F2B] border border-[#E2E8F0] dark:border-[#2E3B4A] shadow-xs hover-lift flex flex-col justify-between group transition-colors"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#FAF2D8] dark:bg-[#E8C878]/20 text-[#806A28] dark:text-[#FBE6A6] border border-[#EBD99A] dark:border-[#E8C878]/30 flex items-center justify-center">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-[#172033] dark:text-[#F1F5F9] group-hover:text-[#806A28] dark:group-hover:text-[#FBE6A6] transition-colors">
                Revision & Formula Center
              </h4>
              <p className="text-xs text-[#64748B] dark:text-[#B8C4D1] leading-relaxed">
                Formulas with LaTeX copy, key equations, common pitfalls, and print-ready summary sheets.
              </p>
            </div>
            <div className="pt-4 flex items-center text-xs font-semibold text-[#806A28] dark:text-[#FBE6A6]">
              <span>Open Quick Revision</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          <Link
            href="/tutor"
            className="p-5 rounded-2xl bg-white dark:bg-[#151F2B] border border-[#E2E8F0] dark:border-[#2E3B4A] shadow-xs hover-lift flex flex-col justify-between group transition-colors"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#EEE9F8] dark:bg-[#B7A3E3]/20 text-[#68539A] dark:text-[#DFD3F8] border border-[#CFC2EA] dark:border-[#B7A3E3]/30 flex items-center justify-center">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-[#172033] dark:text-[#F1F5F9] group-hover:text-[#68539A] dark:group-hover:text-[#DFD3F8] transition-colors">
                Local AI Tutor & Solver
              </h4>
              <p className="text-xs text-[#64748B] dark:text-[#B8C4D1] leading-relaxed">
                Deterministic step-by-step math solver, conceptual breakdown, and code generation across Units 1–6.
              </p>
            </div>
            <div className="pt-4 flex items-center text-xs font-semibold text-[#68539A] dark:text-[#DFD3F8]">
              <span>Ask AI Tutor</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        </div>
      </div>

      {/* Metrics Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white dark:bg-[#151F2B] rounded-2xl border border-[#E2E8F0] dark:border-[#2E3B4A] shadow-xs space-y-2 hover-lift">
          <div className="flex items-center justify-between text-[#64748B] dark:text-[#B8C4D1]">
            <span className="text-xs font-semibold uppercase tracking-wider">Overall Mastery</span>
            <TrendingUp className="w-4 h-4 text-[#416B9E] dark:text-[#91B9E8]" />
          </div>
          <div className="text-2xl font-extrabold text-[#172033] dark:text-[#F1F5F9] font-mono">
            {overallPercentage}%
          </div>
          <ProgressBar progress={overallPercentage} height="sm" />
        </div>

        <div className="p-5 bg-white dark:bg-[#151F2B] rounded-2xl border border-[#E2E8F0] dark:border-[#2E3B4A] shadow-xs space-y-2 hover-lift">
          <div className="flex items-center justify-between text-[#64748B] dark:text-[#B8C4D1]">
            <span className="text-xs font-semibold uppercase tracking-wider">Lessons Done</span>
            <BookOpen className="w-4 h-4 text-[#3F7951] dark:text-[#8FC7A3]" />
          </div>
          <div className="text-2xl font-extrabold text-[#172033] dark:text-[#F1F5F9] font-mono">
            {totalLessonsCompleted}{' '}
            <span className="text-xs font-normal text-[#94A3B8] dark:text-[#7F8B99]">/ 60</span>
          </div>
          <p className="text-[11px] text-[#64748B] dark:text-[#B8C4D1]">Across 6 curriculum units</p>
        </div>

        <div className="p-5 bg-white dark:bg-[#151F2B] rounded-2xl border border-[#E2E8F0] dark:border-[#2E3B4A] shadow-xs space-y-2 hover-lift">
          <div className="flex items-center justify-between text-[#64748B] dark:text-[#B8C4D1]">
            <span className="text-xs font-semibold uppercase tracking-wider">Labs Completed</span>
            <FlaskConical className="w-4 h-4 text-[#68539A] dark:text-[#B7A3E3]" />
          </div>
          <div className="text-2xl font-extrabold text-[#172033] dark:text-[#F1F5F9] font-mono">
            {totalLabsCompleted}{' '}
            <span className="text-xs font-normal text-[#94A3B8] dark:text-[#7F8B99]">/ 24</span>
          </div>
          <p className="text-[11px] text-[#64748B] dark:text-[#B8C4D1]">Applied notebooks</p>
        </div>

        <div className="p-5 bg-white dark:bg-[#151F2B] rounded-2xl border border-[#E2E8F0] dark:border-[#2E3B4A] shadow-xs space-y-2 hover-lift">
          <div className="flex items-center justify-between text-[#64748B] dark:text-[#B8C4D1]">
            <span className="text-xs font-semibold uppercase tracking-wider">Quizzes Passed</span>
            <GraduationCap className="w-4 h-4 text-[#806A28] dark:text-[#E8C878]" />
          </div>
          <div className="text-2xl font-extrabold text-[#172033] dark:text-[#F1F5F9] font-mono">
            {totalQuizzesCompleted}{' '}
            <span className="text-xs font-normal text-[#94A3B8] dark:text-[#7F8B99]">/ 6</span>
          </div>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">Unit mastery checks</p>
        </div>
      </div>

      {/* Active Unit Spotlight Banner */}
      <section className="bg-white dark:bg-[#151F2B] rounded-2xl border border-[#E2E8F0] dark:border-[#2E3B4A] p-6 sm:p-8 shadow-xs relative overflow-hidden transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <UnitBadge unitId={activeUnit.id} unitNumber={activeUnit.unitNumber} size="sm" />
              <span className="text-xs font-semibold text-[#64748B] dark:text-[#B8C4D1]">
                {isBrandNew ? 'Recommended Starting Unit' : 'Currently In Progress'}
              </span>
            </div>
            <h3 className="text-xl font-bold text-[#172033] dark:text-[#F1F5F9]">{activeUnit.title}</h3>
            <p className="text-xs sm:text-sm text-[#475569] dark:text-[#B8C4D1] leading-relaxed">
              {activeUnit.description}
            </p>
            <div className="pt-1">
              <div className="flex justify-between text-xs text-[#64748B] dark:text-[#B8C4D1] font-medium mb-1">
                <span>Unit {activeUnit.unitNumber} Completion</span>
                <span className="font-semibold text-[#172033] dark:text-[#F1F5F9]">{activeUnitPercent}%</span>
              </div>
              <ProgressBar progress={activeUnitPercent} unitId={activeUnit.id} height="sm" />
            </div>
          </div>

          <div className="shrink-0 flex sm:flex-col gap-2">
            <Link href={`/units/${activeUnit.unitNumber}`}>
              <Button
                variant="unit"
                unitId={activeUnit.id}
                size="md"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                {isBrandNew ? 'Start Unit' : 'Continue Unit'}
              </Button>
            </Link>
            <Link href="/labs/eda">
              <Button variant="outline" size="md">
                Open Labs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Six Units Grid */}
      <section className="space-y-6">
        <SectionHeader
          title="All Curriculum Units"
          subtitle="Your real-time progress across all six modular Data Science courses. Press keys 1-6 on your keyboard to navigate."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dynamicUnits.map((unit) => (
            <div key={unit.id} className="hover-lift">
              <CourseCard unit={unit} />
            </div>
          ))}
        </div>
      </section>

      {/* Real Learning Activity Stream */}
      <section className="bg-white dark:bg-[#151F2B] rounded-2xl border border-[#E2E8F0] dark:border-[#2E3B4A] p-6 shadow-xs space-y-4 transition-colors">
        <div className="flex items-center justify-between">
          <SectionHeader
            title="Recent Learning Activity"
            subtitle="Real logged actions from your study sessions."
          />
          <Link href="/profile" className="text-xs font-semibold text-[#475569] dark:text-[#CBD5E1] hover:text-[#172033] dark:hover:text-white hover:underline flex items-center gap-1">
            <User className="w-3.5 h-3.5 text-[#91B9E8]" />
            Scholar Profile
          </Link>
        </div>

        {recentActivities.length === 0 ? (
          <div className="p-8 text-center bg-[#F8FAFC] dark:bg-[#101923] rounded-xl border border-dashed border-[#CBD5E1] dark:border-[#2E3B4A] space-y-3">
            <div className="inline-flex p-3 rounded-full bg-white dark:bg-[#1B2735] border border-[#E2E8F0] dark:border-[#2E3B4A] text-[#64748B] dark:text-[#B8C4D1]">
              <Sparkles className="w-5 h-5 text-amber-500" />
            </div>
            <h4 className="text-sm font-bold text-[#172033] dark:text-[#F1F5F9]">
              Start your first lesson to begin building your progress
            </h4>
            <p className="text-xs text-[#64748B] dark:text-[#B8C4D1] max-w-md mx-auto">
              Your completed lessons, computational labs, and assessment scores will automatically appear here as you advance through the curriculum.
            </p>
            <div className="pt-2">
              <Link href="/units/1">
                <Button variant="primary" size="sm">
                  Start Unit 1: Foundations & EDA
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {recentActivities.slice(0, 5).map((act) => (
              <div
                key={act.id}
                className="p-3.5 bg-[#F8FAFC] dark:bg-[#101923] rounded-xl border border-[#E2E8F0] dark:border-[#2E3B4A] flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                    act.type === 'lesson'
                      ? 'bg-[#FCE5DC] text-[#9E513B] border-[#EFC0B0]'
                      : act.type === 'lab'
                      ? 'bg-[#E5F3E9] text-[#3F7951] border-[#B8DCC3]'
                      : act.type === 'quiz'
                      ? 'bg-[#FAF2D8] text-[#806A28] border-[#EBD99A]'
                      : 'bg-[#EEE9F8] text-[#68539A] border-[#CFC2EA]'
                  }`}>
                    {act.type === 'lesson' ? (
                      <BookOpen className="w-4 h-4" />
                    ) : act.type === 'lab' ? (
                      <FlaskConical className="w-4 h-4" />
                    ) : act.type === 'quiz' ? (
                      <GraduationCap className="w-4 h-4" />
                    ) : (
                      <Clock className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[#172033] dark:text-[#F1F5F9] block">
                      {act.title}
                    </span>
                    <span className="text-[11px] text-[#64748B] dark:text-[#B8C4D1]">
                      {new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {act.type.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Recorded</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
