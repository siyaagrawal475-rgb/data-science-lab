'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  User,
  Download,
  LogOut,
  Clock,
  BookOpen,
  FlaskConical,
  Award,
  Activity,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useGlobalProgress, useStudyTimer, getRecentActivity, exportStudyReportCSV, ActivityEvent } from '@/lib/progress';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { UNITS_DATA } from '@/lib/constants';

export default function ProfilePage() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const {
    overallPercentage,
    totalLessonsCompleted,
    totalLabsCompleted,
    unitPercentages,
  } = useGlobalProgress();
  const { formattedTime } = useStudyTimer();
  const [activities, setActivities] = useState<ActivityEvent[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      return getRecentActivity();
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const handleUpdate = () => setActivities(getRecentActivity());
    window.addEventListener('dsl-activity-updated', handleUpdate);
    return () => window.removeEventListener('dsl-activity-updated', handleUpdate);
  }, []);

  const handleExport = () => {
    exportStudyReportCSV(user?.name || 'Scholar', user?.prn || 'GUEST-MODE');
  };

  const handleSignOut = () => {
    signOut();
    router.push('/login');
  };

  return (
    <div className="space-y-10">
      <PageHeader
        title="Student Profile & Dossier"
        description="Review your registered scholar credentials, curriculum milestones, recorded study sessions, and data exports."
        breadcrumbs={[{ label: 'Profile' }]}
        actions={
          <div className="flex items-center gap-2.5">
            <Button
              onClick={handleExport}
              variant="outline"
              size="sm"
              leftIcon={<Download className="w-4 h-4 text-[#416B9E] dark:text-[#91B9E8]" />}
            >
              Export Report
            </Button>
            <Button
              onClick={handleSignOut}
              variant="ghost"
              size="sm"
              leftIcon={<LogOut className="w-4 h-4 text-red-500" />}
            >
              Sign Out
            </Button>
          </div>
        }
      />

      {/* Profile Overview Card */}
      <div className="bg-white dark:bg-[#151F2B] rounded-2xl border border-[#E2E8F0] dark:border-[#2E3B4A] p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#172033] dark:bg-[#202D3B] text-white flex items-center justify-center text-xl font-bold border border-transparent dark:border-[#2E3B4A] shadow-xs">
              <User className="w-8 h-8 text-[#91B9E8]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-[#172033] dark:text-[#F1F5F9]">
                  {user?.name || 'Alex Rivera'}
                </h1>
                {user?.isGuest ? (
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700">
                    Guest Scholar
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                    Enrolled Student
                  </span>
                )}
              </div>
              <p className="text-xs text-[#64748B] dark:text-[#B8C4D1] font-mono mt-0.5">
                {user?.prn || 'PRN-2026-8492'} • {user?.email || 'student@datasciencelab.edu'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
          </div>
        </div>

        {user?.isGuest && (
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
            <span className="font-bold">Notice on Guest Session:</span> Your curriculum progress and study time are stored locally in your browser session. Register or sign in anytime with a student PRN to personalize your permanent record.
          </div>
        )}

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-[#101923] border border-[#E2E8F0] dark:border-[#2E3B4A] space-y-1">
            <div className="flex items-center justify-between text-[#64748B] dark:text-[#B8C4D1] text-xs">
              <span>Mastery</span>
              <Award className="w-3.5 h-3.5 text-[#9E513B] dark:text-[#F4A58A]" />
            </div>
            <div className="text-2xl font-mono font-extrabold text-[#172033] dark:text-[#F1F5F9]">
              {overallPercentage}%
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-[#101923] border border-[#E2E8F0] dark:border-[#2E3B4A] space-y-1">
            <div className="flex items-center justify-between text-[#64748B] dark:text-[#B8C4D1] text-xs">
              <span>Lessons Done</span>
              <BookOpen className="w-3.5 h-3.5 text-[#3F7951] dark:text-[#8FC7A3]" />
            </div>
            <div className="text-2xl font-mono font-extrabold text-[#172033] dark:text-[#F1F5F9]">
              {totalLessonsCompleted} <span className="text-xs font-normal text-[#94A3B8]">/ 60</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-[#101923] border border-[#E2E8F0] dark:border-[#2E3B4A] space-y-1">
            <div className="flex items-center justify-between text-[#64748B] dark:text-[#B8C4D1] text-xs">
              <span>Labs Run</span>
              <FlaskConical className="w-3.5 h-3.5 text-[#68539A] dark:text-[#B7A3E3]" />
            </div>
            <div className="text-2xl font-mono font-extrabold text-[#172033] dark:text-[#F1F5F9]">
              {totalLabsCompleted} <span className="text-xs font-normal text-[#94A3B8]">/ 24</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-[#101923] border border-[#E2E8F0] dark:border-[#2E3B4A] space-y-1">
            <div className="flex items-center justify-between text-[#64748B] dark:text-[#B8C4D1] text-xs">
              <span>Study Time</span>
              <Clock className="w-3.5 h-3.5 text-[#416B9E] dark:text-[#91B9E8]" />
            </div>
            <div className="text-2xl font-mono font-extrabold text-[#172033] dark:text-[#F1F5F9]">
              {formattedTime}
            </div>
          </div>
        </div>
      </div>

      {/* Unit Mastery Status */}
      <section className="bg-white dark:bg-[#151F2B] rounded-2xl border border-[#E2E8F0] dark:border-[#2E3B4A] p-6 sm:p-8 shadow-xs space-y-6">
        <SectionHeader
          title="Curriculum Unit Progress"
          subtitle="Real-time completion percentage calculated directly from your stored workspace milestones."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {UNITS_DATA.map((unit) => {
            const pct = unitPercentages[unit.id] || 0;
            return (
              <div
                key={unit.id}
                className="p-4 rounded-xl border border-[#E2E8F0] dark:border-[#2E3B4A] bg-[#F8FAFC] dark:bg-[#101923] space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#172033] dark:text-[#F1F5F9]">
                    Unit {unit.unitNumber}: {unit.shortTitle}
                  </span>
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: unit.accentColor }}
                  />
                </div>
                <ProgressBar progress={pct} unitId={unit.id} height="sm" />
                <div className="flex items-center justify-between text-[11px] text-[#64748B] dark:text-[#B8C4D1]">
                  <span>{pct}% complete</span>
                  <Link
                    href={`/units/${unit.unitNumber}`}
                    className="text-[#416B9E] dark:text-[#91B9E8] font-semibold hover:underline"
                  >
                    Open Unit →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Recorded Activity Stream */}
      <section className="bg-white dark:bg-[#151F2B] rounded-2xl border border-[#E2E8F0] dark:border-[#2E3B4A] p-6 sm:p-8 shadow-xs space-y-6">
        <SectionHeader
          title="Recorded Learning Activity"
          subtitle="Chronological log of verified lessons completed, computational labs run, and quizzes submitted."
          badge={
            <span className="p-1 rounded bg-[#F1F5F9] dark:bg-[#202D3B] text-[#172033] dark:text-[#F1F5F9]">
              <Activity className="w-4 h-4" />
            </span>
          }
        />

        {activities.length === 0 ? (
          <div className="py-8 text-center text-[#64748B] dark:text-[#B8C4D1] space-y-2">
            <Activity className="w-8 h-8 mx-auto text-[#94A3B8] dark:text-[#7F8B99]" />
            <p className="text-sm font-semibold">No recent activity logged yet</p>
            <p className="text-xs">Complete lessons or execute interactive labs to record verifiable learning events.</p>
          </div>
        ) : (
          <div className="divide-y divide-[#F1F5F9] dark:divide-[#202D3B]">
            {activities.map((act) => (
              <div key={act.id} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#F1F5F9] dark:bg-[#202D3B] text-[#172033] dark:text-[#F1F5F9]">
                    {act.type === 'lesson' && <BookOpen className="w-4 h-4 text-[#3F7951]" />}
                    {act.type === 'lab' && <FlaskConical className="w-4 h-4 text-[#68539A]" />}
                    {act.type === 'quiz' && <Award className="w-4 h-4 text-[#9E513B]" />}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#172033] dark:text-[#F1F5F9]">
                      {act.title}
                    </p>
                    {act.unitId && (
                      <span className="text-[10px] text-[#64748B] dark:text-[#B8C4D1] uppercase font-bold">
                        {act.unitId.replace('-', ' ')}
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-xs text-[#94A3B8] dark:text-[#7F8B99] font-mono shrink-0">
                  {new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
