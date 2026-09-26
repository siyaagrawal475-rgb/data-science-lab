'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  FlaskConical,
  HelpCircle,
  Clock,
  Sigma,
  Layers,
  BarChart2,
  Cpu,
  FolderGit2,
  TableProperties,
  Briefcase,
  ArrowRight,
} from 'lucide-react';

import { UnitInfo, UnitId, FlashcardItem } from '@/types';
import { LessonData } from '@/data/unit1/lessons';
import { QuizData } from '@/data/unit1/quizzes';
import { DetailedFormulaItem } from '@/data/unit1/formulas';
import { ComparisonTableData, MiniProjectData, RealLifeExample } from '@/types/experiences';
import { UnitHeader } from '@/components/units/UnitHeader';
import { LearningPath } from '@/components/units/LearningPath';
import { AITutorBanner } from '@/components/units/AITutorBanner';
import { QuizEngine } from '@/components/quiz/QuizEngine';
import { FlashcardDeck } from '@/components/flashcards/FlashcardDeck';
import { FormulaSheet } from '@/components/formulas/FormulaSheet';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ComparisonTable } from '@/components/ui/ComparisonTable';
import { MiniProjectRunner } from '@/components/ui/MiniProjectRunner';
import { RealLifeExampleCard } from '@/components/ui/RealLifeExampleCard';

interface UnitWorkspaceTabsProps {
  unit: UnitInfo;
  unitId: UnitId;
  unitNumber: number;
  lessons: LessonData[];
  labs: {
    id: string;
    slug: string;
    title: string;
    description: string;
    duration: string;
    difficulty: string;
  }[];
  quiz: QuizData;
  flashcards: FlashcardItem[];
  formulas: DetailedFormulaItem[];
  comparisons: ComparisonTableData[];
  miniProject: MiniProjectData;
  realLifeExamples: RealLifeExample[];
  simulationComponent: React.ReactNode;
  visualizationComponent: React.ReactNode;
  initialTab?: 'overview' | 'lessons' | 'visualizations' | 'labs' | 'simulations' | 'projects' | 'tables' | 'examples' | 'flashcards' | 'formulas' | 'quiz';
}

export const UnitWorkspaceTabs: React.FC<UnitWorkspaceTabsProps> = ({
  unit,
  unitId,
  unitNumber,
  lessons,
  labs,
  quiz,
  flashcards,
  formulas,
  comparisons,
  miniProject,
  realLifeExamples,
  simulationComponent,
  visualizationComponent,
  initialTab = 'overview',
}) => {
  const [activeTab, setActiveTab] = useState<
    | 'overview'
    | 'lessons'
    | 'visualizations'
    | 'labs'
    | 'simulations'
    | 'projects'
    | 'tables'
    | 'examples'
    | 'flashcards'
    | 'formulas'
    | 'quiz'
  >(initialTab);

  const tabList = [
    { id: 'overview', label: 'Overview', icon: Layers },
    { id: 'lessons', label: `Lessons (${lessons.length})`, icon: BookOpen },
    { id: 'visualizations', label: 'Visualizations', icon: BarChart2 },
    { id: 'labs', label: `Labs (${labs.length})`, icon: FlaskConical },
    { id: 'simulations', label: 'Simulations', icon: Cpu },
    { id: 'projects', label: 'Mini Project', icon: FolderGit2 },
    { id: 'tables', label: `Comparison Tables (${comparisons.length})`, icon: TableProperties },
    { id: 'examples', label: `Real-World (${realLifeExamples.length})`, icon: Briefcase },
    { id: 'flashcards', label: `Flashcards (${flashcards.length})`, icon: Layers },
    { id: 'formulas', label: `Formulas (${formulas.length})`, icon: Sigma },
    { id: 'quiz', label: 'Assessment Quiz', icon: HelpCircle },
  ] as const;

  return (
    <div className="space-y-8 pb-20">
      {/* Unit Top Header */}
      <UnitHeader
        unitId={unitId}
        unitNumber={unitNumber}
        title={unit.title}
        description={unit.description}
        totalLessons={lessons.length}
        totalLabs={labs.length}
        totalQuizzes={1}
        estimatedHours={unit.estimatedHours}
        firstLessonSlug={lessons[0]?.slug || ''}
      />

      {/* Navigation Tab Bar */}
      <div className="border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#111827] rounded-2xl p-2 shadow-xs overflow-x-auto">
        <div className="flex items-center gap-1.5 min-w-max">
          {tabList.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={
                  isActive
                    ? {
                        backgroundColor: unit.colorTokens.soft,
                        color: unit.colorTokens.text,
                        borderColor: unit.colorTokens.border,
                      }
                    : undefined
                }
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap border ${
                  isActive
                    ? 'shadow-xs scale-[1.02]'
                    : 'border-transparent text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white hover:bg-[#F8FAFC] dark:hover:bg-[#172033]'
                }`}
              >
                <Icon
                  className="w-3.5 h-3.5"
                  style={isActive ? { color: unit.colorTokens.primary } : undefined}
                />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-8">
              {/* Sequential Lesson Path */}
              <section className="space-y-4">
                <SectionHeader
                  title={`Unit ${unitNumber} Sequential Learning Path`}
                  subtitle="Master foundational concepts through structured step-by-step educational modules."
                  badge={
                    <span
                      className="p-1.5 rounded-lg border"
                      style={{
                        backgroundColor: unit.colorTokens.soft,
                        color: unit.colorTokens.text,
                        borderColor: unit.colorTokens.border,
                      }}
                    >
                      <BookOpen className="w-4 h-4" />
                    </span>
                  }
                />

                <LearningPath
                  unitId={unitId}
                  unitNumber={unitNumber}
                  lessons={lessons}
                />
              </section>

              {/* Applied Labs Grid */}
              <section className="space-y-4 pt-4 border-t border-[#F1F5F9] dark:border-[#334155]">
                <SectionHeader
                  title="Applied Computational Labs"
                  subtitle="Hands-on interactive experiments and live data transformation workspaces."
                  badge={
                    <span
                      className="p-1.5 rounded-lg border"
                      style={{
                        backgroundColor: unit.colorTokens.soft,
                        color: unit.colorTokens.text,
                        borderColor: unit.colorTokens.border,
                      }}
                    >
                      <FlaskConical className="w-4 h-4" />
                    </span>
                  }
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {labs.map((lab) => (
                    <div
                      key={lab.id}
                      className="p-5 bg-white dark:bg-[#111827] rounded-2xl border border-[#E2E8F0] dark:border-[#334155] shadow-xs hover-lift flex flex-col justify-between space-y-4 transition-colors"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span
                            className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border"
                            style={{
                              backgroundColor: unit.colorTokens.soft,
                              color: unit.colorTokens.text,
                              borderColor: unit.colorTokens.border,
                            }}
                          >
                            {lab.difficulty}
                          </span>
                          <span className="text-[11px] text-[#64748B] dark:text-[#94A3B8] flex items-center gap-1 font-mono">
                            <Clock className="w-3.5 h-3.5" />
                            {lab.duration}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                          {lab.title}
                        </h4>
                        <p className="text-xs text-[#475569] dark:text-[#CBD5E1] leading-relaxed">
                          {lab.description}
                        </p>
                      </div>

                      <Link href={`/labs/${lab.slug}`}>
                        <button className="w-full py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-[#0F172A] dark:text-[#F8FAFC] font-semibold text-xs border border-[#E2E8F0] dark:border-[#334155] flex items-center justify-center gap-1.5 transition-colors cursor-pointer">
                          <span>Launch Lab</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </Link>
                    </div>
                  ))}
                </div>
              </section>

              {/* AI Tutor Banner */}
              <section className="pt-2">
                <AITutorBanner unitTitle={unit.title} />
              </section>
            </div>

            {/* Right Column: Mini Project & Quick Shortcuts */}
            <div className="space-y-6 sticky top-6">
              {/* Mini Project Quick Teaser Card */}
              <div className="p-5 bg-white dark:bg-[#111827] rounded-2xl border border-[#E2E8F0] dark:border-[#334155] shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-[#F1F5F9] dark:border-[#334155] pb-2.5">
                  <h4 className="text-xs font-bold text-[#0F172A] dark:text-[#F8FAFC] flex items-center gap-1.5">
                    <FolderGit2 className="w-4 h-4" style={{ color: unit.colorTokens.primary }} />
                    <span>Unit {unitNumber} Mini Project</span>
                  </h4>
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full border"
                    style={{
                      backgroundColor: unit.colorTokens.soft,
                      color: unit.colorTokens.text,
                      borderColor: unit.colorTokens.border,
                    }}
                  >
                    Hands-On
                  </span>
                </div>
                <p className="text-xs text-[#475569] dark:text-[#CBD5E1] font-semibold">
                  {miniProject.title}
                </p>
                <p className="text-[11px] text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
                  {miniProject.problemStatement.slice(0, 120)}...
                </p>
                <button
                  onClick={() => setActiveTab('projects')}
                  className="w-full py-2 px-3 rounded-xl font-bold text-xs border flex items-center justify-center gap-1 cursor-pointer transition-opacity hover:opacity-90"
                  style={{
                    backgroundColor: unit.colorTokens.soft,
                    color: unit.colorTokens.text,
                    borderColor: unit.colorTokens.border,
                  }}
                >
                  <span>Open Mini Project</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Simulation Teaser Card */}
              <div className="p-5 bg-white dark:bg-[#111827] rounded-2xl border border-[#E2E8F0] dark:border-[#334155] shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-[#F1F5F9] dark:border-[#334155] pb-2.5">
                  <h4 className="text-xs font-bold text-[#0F172A] dark:text-[#F8FAFC] flex items-center gap-1.5">
                    <Cpu className="w-4 h-4" style={{ color: unit.colorTokens.primary }} />
                    <span>Live Simulation Lab</span>
                  </h4>
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full border"
                    style={{
                      backgroundColor: unit.colorTokens.soft,
                      color: unit.colorTokens.text,
                      borderColor: unit.colorTokens.border,
                    }}
                  >
                    Interactive
                  </span>
                </div>
                <p className="text-xs text-[#475569] dark:text-[#CBD5E1]">
                  Tweak parameters and observe mathematical response curves in real-time.
                </p>
                <button
                  onClick={() => setActiveTab('simulations')}
                  className="w-full py-2 px-3 rounded-xl font-bold text-xs border flex items-center justify-center gap-1 cursor-pointer transition-opacity hover:opacity-90"
                  style={{
                    backgroundColor: unit.colorTokens.soft,
                    color: unit.colorTokens.text,
                    borderColor: unit.colorTokens.border,
                  }}
                >
                  <span>Run Simulator</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Flashcards Deck Card */}
              <div className="p-5 bg-white dark:bg-[#111827] rounded-2xl border border-[#E2E8F0] dark:border-[#334155] shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-[#F1F5F9] dark:border-[#334155] pb-2.5">
                  <h4 className="text-xs font-bold text-[#0F172A] dark:text-[#F8FAFC] flex items-center gap-1.5">
                    <Layers className="w-4 h-4" style={{ color: unit.colorTokens.primary }} />
                    <span>Concept Flashcards</span>
                  </h4>
                  <span className="text-[10px] text-[#64748B] dark:text-[#94A3B8]">{flashcards.length} Cards</span>
                </div>
                <FlashcardDeck cards={flashcards} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LESSONS */}
      {activeTab === 'lessons' && (
        <div className="space-y-6">
          <SectionHeader
            title={`Unit ${unitNumber} Curriculum Modules`}
            subtitle="Complete all sequential lessons with conceptual explanations, LaTeX derivations, and interactive exercises."
          />
          <LearningPath
            unitId={unitId}
            unitNumber={unitNumber}
            lessons={lessons}
          />
        </div>
      )}

      {/* TAB 3: VISUALIZATIONS */}
      {activeTab === 'visualizations' && (
        <div className="space-y-6">
          <SectionHeader
            title={`Unit ${unitNumber} Interactive Visualization Playground`}
            subtitle="Explore statistical encodings, geometric diagrams, and interactive mathematical plots."
          />
          <div className="space-y-6">
            {visualizationComponent}
          </div>
        </div>
      )}

      {/* TAB 4: LABS */}
      {activeTab === 'labs' && (
        <div className="space-y-6">
          <SectionHeader
            title={`Unit ${unitNumber} Computational Labs`}
            subtitle="Run live Python data transformations, verify mathematical outcomes, and complete coding challenges."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {labs.map((lab) => (
              <div
                key={lab.id}
                className="p-6 bg-white dark:bg-[#111827] rounded-2xl border border-[#E2E8F0] dark:border-[#334155] shadow-xs space-y-4 hover-lift"
              >
                <div className="flex items-center justify-between text-xs">
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border"
                    style={{
                      backgroundColor: unit.colorTokens.soft,
                      color: unit.colorTokens.text,
                      borderColor: unit.colorTokens.border,
                    }}
                  >
                    {lab.difficulty}
                  </span>
                  <span className="text-xs text-[#64748B] dark:text-[#94A3B8] flex items-center gap-1 font-mono">
                    <Clock className="w-3.5 h-3.5" />
                    {lab.duration}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                  {lab.title}
                </h3>
                <p className="text-xs text-[#475569] dark:text-[#CBD5E1] leading-relaxed">
                  {lab.description}
                </p>
                <Link href={`/labs/${lab.slug}`} className="block pt-2">
                  <button className="w-full py-2.5 px-4 rounded-xl bg-[#172033] dark:bg-[#1E293B] hover:bg-black text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer">
                    <span>Open Interactive Lab</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: SIMULATIONS */}
      {activeTab === 'simulations' && (
        <div className="space-y-6">
          <SectionHeader
            title={`Unit ${unitNumber} Simulation Experiment`}
            subtitle="Change independent parameters, inject noise, and observe real-time mathematical convergence."
          />
          {simulationComponent}
        </div>
      )}

      {/* TAB 6: MINI PROJECTS */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          <SectionHeader
            title={`Unit ${unitNumber} Applied Mini Project`}
            subtitle="Solve an authentic industrial problem statement with real data schemas and guided analytical tasks."
          />
          <MiniProjectRunner project={miniProject} />
        </div>
      )}

      {/* TAB 7: COMPARISON TABLES */}
      {activeTab === 'tables' && (
        <div className="space-y-8">
          <SectionHeader
            title={`Unit ${unitNumber} Concept Comparison Matrices`}
            subtitle="Side-by-side mathematical breakdowns, trade-offs, and decision matrices."
          />
          <div className="space-y-8">
            {comparisons.map((table) => (
              <ComparisonTable key={table.id} data={table} />
            ))}
          </div>
        </div>
      )}

      {/* TAB 8: REAL-LIFE EXAMPLES */}
      {activeTab === 'examples' && (
        <div className="space-y-8">
          <SectionHeader
            title={`Unit ${unitNumber} Industrial Case Studies & Real-World Examples`}
            subtitle="How concepts from this unit power production systems in healthcare, finance, NLP, and logistics."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {realLifeExamples.map((ex) => (
              <RealLifeExampleCard key={ex.id} example={ex} />
            ))}
          </div>
        </div>
      )}

      {/* TAB 9: FLASHCARDS */}
      {activeTab === 'flashcards' && (
        <div className="space-y-6 max-w-2xl mx-auto">
          <SectionHeader
            title={`Unit ${unitNumber} Spaced-Repetition Concept Flashcards`}
            subtitle="Flip cards to test your conceptual recall before taking the unit assessment."
          />
          <div className="p-6 bg-white dark:bg-[#111827] rounded-2xl border border-[#E2E8F0] dark:border-[#334155] shadow-xs">
            <FlashcardDeck cards={flashcards} />
          </div>
        </div>
      )}

      {/* TAB 10: FORMULAS */}
      {activeTab === 'formulas' && (
        <div className="space-y-6">
          <SectionHeader
            title={`Unit ${unitNumber} Mathematical Formula Sheet`}
            subtitle="High-yield formula reference rendered with full KaTeX notation and explanations."
          />
          <FormulaSheet formulas={formulas} />
        </div>
      )}

      {/* TAB 11: ASSESSMENT QUIZ */}
      {activeTab === 'quiz' && (
        <div className="space-y-6 max-w-3xl mx-auto">
          <SectionHeader
            title={`Unit ${unitNumber} Mastery Assessment`}
            subtitle="Validate your analytical understanding across all 10 lessons in this unit."
          />
          <QuizEngine quiz={quiz} unitId={unitId} />
        </div>
      )}
    </div>
  );
};
