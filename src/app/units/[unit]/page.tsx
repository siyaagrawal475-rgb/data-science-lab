import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  BookOpen,
  FlaskConical,
  HelpCircle,
  Clock,
  Sigma,
  Layers,
} from 'lucide-react';

import { UNITS_DATA } from '@/lib/constants';
import { UNIT_1_LESSONS } from '@/data/unit1/lessons';
import { UNIT_1_QUIZ } from '@/data/unit1/quizzes';
import { UNIT_1_FLASHCARDS } from '@/data/unit1/flashcards';
import { UNIT_1_FORMULAS } from '@/data/unit1/formulas';

import { UNIT_2_LESSONS } from '@/data/unit2/lessons';
import { UNIT_2_QUIZ } from '@/data/unit2/quizzes';
import { UNIT_2_FLASHCARDS } from '@/data/unit2/flashcards';
import { UNIT_2_FORMULAS } from '@/data/unit2/formulas';

import { UNIT_3_LESSONS } from '@/data/unit3/lessons';
import { UNIT_3_QUIZ } from '@/data/unit3/quizzes';
import { UNIT_3_FLASHCARDS } from '@/data/unit3/flashcards';
import { UNIT_3_FORMULAS } from '@/data/unit3/formulas';

import { UNIT_4_LESSONS } from '@/data/unit4/lessons';
import { UNIT_4_QUIZ } from '@/data/unit4/quizzes';
import { UNIT_4_FLASHCARDS } from '@/data/unit4/flashcards';
import { UNIT_4_FORMULAS } from '@/data/unit4/formulas';

import { UNIT_5_LESSONS } from '@/data/unit5/lessons';
import { UNIT_5_QUIZ } from '@/data/unit5/quizzes';
import { UNIT_5_FLASHCARDS } from '@/data/unit5/flashcards';
import { UNIT_5_FORMULAS } from '@/data/unit5/formulas';

import { UNIT_6_LESSONS } from '@/data/unit6/lessons';
import { UNIT_6_QUIZ } from '@/data/unit6/quizzes';
import { UNIT_6_FLASHCARDS } from '@/data/unit6/flashcards';
import { UNIT_6_FORMULAS } from '@/data/unit6/formulas';

import { UnitHeader } from '@/components/units/UnitHeader';
import { LearningPath } from '@/components/units/LearningPath';
import { AITutorBanner } from '@/components/units/AITutorBanner';
import { QuizEngine } from '@/components/quiz/QuizEngine';
import { FlashcardDeck } from '@/components/flashcards/FlashcardDeck';
import { FormulaSheet } from '@/components/formulas/FormulaSheet';
import { SectionHeader } from '@/components/ui/SectionHeader';

interface PageProps {
  params: Promise<{
    unit: string;
  }>;
}

export default async function UnitPage({ params }: PageProps) {
  const resolvedParams = await params;
  const unitParam = resolvedParams.unit.toLowerCase();

  const isUnit1 = unitParam === '1' || unitParam === 'unit-1';
  const isUnit2 = unitParam === '2' || unitParam === 'unit-2';
  const isUnit3 = unitParam === '3' || unitParam === 'unit-3';
  const isUnit4 = unitParam === '4' || unitParam === 'unit-4';
  const isUnit5 = unitParam === '5' || unitParam === 'unit-5';
  const isUnit6 = unitParam === '6' || unitParam === 'unit-6';

  if (!isUnit1 && !isUnit2 && !isUnit3 && !isUnit4 && !isUnit5 && !isUnit6) {
    notFound();
  }

  // Unit 1 Render
  if (isUnit1) {
    const unit = UNITS_DATA.find((u) => u.id === 'unit-1') || UNITS_DATA[0];

    const labs = [
      {
        id: 'eda',
        slug: 'eda',
        title: 'Exploratory Data Analysis Lab',
        description: 'Profile distributions, compute 5-number summaries, and examine statistical moments across multi-sensor telemetry.',
        duration: '20 min',
        difficulty: 'Intermediate',
      },
      {
        id: 'cleaning',
        slug: 'cleaning',
        title: 'Interactive Data Cleaning Lab',
        description: 'Execute deduplication, categorical standardization, median imputation, and Tukey fence outlier filtering.',
        duration: '25 min',
        difficulty: 'Intermediate',
      },
      {
        id: 'visualization',
        slug: 'visualization',
        title: 'Data Visualization Encoding Lab',
        description: 'Test perceptual mappings across Line, Bar, Scatter, and Histogram charts to discover hidden multivariate relationships.',
        duration: '20 min',
        difficulty: 'Beginner',
      },
      {
        id: 'correlation',
        slug: 'correlation',
        title: 'Bivariate Correlation Lab',
        description: 'Evaluate Pearson r, R², ordinary least squares linear regression fits, and learn non-causal statistical interpretations.',
        duration: '15 min',
        difficulty: 'Intermediate',
      },
    ];

    return (
      <div className="space-y-12 pb-20">
        <UnitHeader
          unitId="unit-1"
          unitNumber={1}
          title={unit.title}
          description={unit.description}
          totalLessons={UNIT_1_LESSONS.length}
          totalLabs={labs.length}
          totalQuizzes={1}
          estimatedHours={unit.estimatedHours}
          firstLessonSlug={UNIT_1_LESSONS[0].slug}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-10">
            <section className="space-y-4">
              <SectionHeader
                title="Unit 1 Sequential Learning Path"
                subtitle="Master foundational concepts through structured step-by-step educational modules."
                badge={
                  <span className="p-1.5 rounded-lg bg-[#FCE5DC] text-[#9E513B]">
                    <BookOpen className="w-4 h-4" />
                  </span>
                }
              />

              <LearningPath
                unitId="unit-1"
                unitNumber={1}
                lessons={UNIT_1_LESSONS}
              />
            </section>

            <section className="space-y-4 pt-4 border-t border-[#F1F5F9] dark:border-[#2E3B4A]">
              <SectionHeader
                title="Applied Computational Labs"
                subtitle="Hands-on interactive experiments and live data transformation workspaces."
                badge={
                  <span className="p-1.5 rounded-lg bg-[#FCE5DC] dark:bg-[#432820] text-[#9E513B] dark:text-[#F8B4A6]">
                    <FlaskConical className="w-4 h-4" />
                  </span>
                }
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {labs.map((lab) => (
                  <div
                    key={lab.id}
                    className="p-5 bg-white dark:bg-[#151F2B] rounded-xl border border-[#E2E8F0] dark:border-[#2E3B4A] shadow-xs hover:border-[#CBD5E1] dark:hover:border-[#3D4F63] transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-[#64748B] dark:text-[#B8C4D1]">
                        <span className="px-2 py-0.5 rounded-md bg-[#F8FAFC] dark:bg-[#101923] border border-[#E2E8F0] dark:border-[#2E3B4A] font-medium text-[#475569] dark:text-[#CBD5E1]">
                          {lab.difficulty}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#94A3B8] dark:text-[#7F8B99]" />
                          {lab.duration}
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-[#0F172A] dark:text-[#F1F5F9] tracking-tight">
                        {lab.title}
                      </h4>

                      <p className="text-xs text-[#64748B] dark:text-[#B8C4D1] leading-relaxed">
                        {lab.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#F1F5F9] dark:border-[#2E3B4A]">
                      <Link
                        href={`/labs/${lab.slug}`}
                        className="inline-flex items-center justify-center w-full py-2 px-3 rounded-lg text-xs font-semibold bg-[#F8FAFC] dark:bg-[#101923] hover:bg-[#FCE5DC] dark:hover:bg-[#432820] text-[#0F172A] dark:text-[#F1F5F9] hover:text-[#9E513B] dark:hover:text-[#F8B4A6] border border-[#E2E8F0] dark:border-[#2E3B4A] hover:border-[#EFC0B0] dark:hover:border-[#6B3B2E] transition-colors"
                      >
                        Open Interactive Lab
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="pt-2">
              <AITutorBanner unitTitle={unit.title} />
            </section>

            <section className="space-y-4 pt-4 border-t border-[#F1F5F9] dark:border-[#2E3B4A]">
              <SectionHeader
                title="Unit 1 Mastery Assessment"
                subtitle="Validate your conceptual and analytical understanding across all 10 lessons."
                badge={
                  <span className="p-1.5 rounded-lg bg-[#FCE5DC] dark:bg-[#432820] text-[#9E513B] dark:text-[#F8B4A6]">
                    <HelpCircle className="w-4 h-4" />
                  </span>
                }
              />

              <QuizEngine quiz={UNIT_1_QUIZ} unitId="unit-1" />
            </section>
          </div>

          <div className="space-y-8 sticky top-6">
            <section className="p-6 bg-white dark:bg-[#151F2B] rounded-2xl border border-[#E2E8F0] dark:border-[#2E3B4A] shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#F1F5F9] dark:border-[#2E3B4A] pb-3">
                <h3 className="text-sm font-bold text-[#0F172A] dark:text-[#F1F5F9] flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#9E513B] dark:text-[#F4A58A]" />
                  <span>Concept Flashcards</span>
                </h3>
                <span className="text-xs text-[#64748B] dark:text-[#B8C4D1]">10 Cards</span>
              </div>

              <FlashcardDeck cards={UNIT_1_FLASHCARDS} />
            </section>

            <section className="p-6 bg-white dark:bg-[#151F2B] rounded-2xl border border-[#E2E8F0] dark:border-[#2E3B4A] shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#F1F5F9] dark:border-[#2E3B4A] pb-3">
                <h3 className="text-sm font-bold text-[#0F172A] dark:text-[#F1F5F9] flex items-center gap-2">
                  <Sigma className="w-4 h-4 text-[#9E513B] dark:text-[#F4A58A]" />
                  <span>Key Mathematical Formulas</span>
                </h3>
                <span className="text-xs text-[#64748B] dark:text-[#B8C4D1]">6 Formulas</span>
              </div>

              <p className="text-xs text-[#64748B] dark:text-[#B8C4D1] leading-relaxed">
                Quick access to sample mean, Bessel-corrected variance, standard deviation, IQR fences, Z-scores, and Pearson r.
              </p>

              <div className="space-y-3">
                {UNIT_1_FORMULAS.slice(0, 3).map((f) => (
                  <div key={f.id} className="p-3 bg-[#F8FAFC] dark:bg-[#101923] rounded-xl border border-[#E2E8F0] dark:border-[#2E3B4A] text-xs space-y-1">
                    <div className="flex justify-between font-bold text-[#0F172A] dark:text-[#F1F5F9]">
                      <span>{f.title}</span>
                      <span className="text-[#9E513B] dark:text-[#F8B4A6] text-[11px] font-mono">{f.category}</span>
                    </div>
                    <p className="text-[#64748B] dark:text-[#B8C4D1] text-[11px]">{f.description}</p>
                  </div>
                ))}
              </div>

              <Link
                href="#formula-sheet"
                className="inline-flex items-center justify-center w-full py-2 rounded-lg text-xs font-semibold bg-[#F8FAFC] dark:bg-[#101923] hover:bg-[#F1F5F9] dark:hover:bg-[#202D3B] text-[#475569] dark:text-[#CBD5E1] border border-[#E2E8F0] dark:border-[#2E3B4A] transition-colors"
              >
                Scroll to Full Formula Sheet ↓
              </Link>
            </section>
          </div>
        </div>

        <section id="formula-sheet" className="pt-10 border-t border-[#E2E8F0] dark:border-[#2E3B4A] space-y-6">
          <SectionHeader
            title="Unit 1 Comprehensive Formula Sheet"
            subtitle="Formal mathematical notation, variable definitions, derivations, and worked numerical examples."
            badge={
              <span className="p-1.5 rounded-lg bg-[#FCE5DC] dark:bg-[#432820] text-[#9E513B] dark:text-[#F8B4A6]">
                <Sigma className="w-4 h-4" />
              </span>
            }
          />

          <FormulaSheet formulas={UNIT_1_FORMULAS} />
        </section>
      </div>
    );
  }

  // Unit 2 Render
  if (isUnit2) {
    const unit = UNITS_DATA.find((u) => u.id === 'unit-2') || UNITS_DATA[1];

    const unit2Labs = [
      {
        id: 'vectors',
        slug: 'vectors',
        title: 'Vector Operations Lab',
        description: 'Manipulate coordinate vectors, evaluate linear operations (addition, subtraction, scaling), and observe geometric translations.',
        duration: '20 min',
        difficulty: 'Beginner',
      },
      {
        id: 'dot-product',
        slug: 'dot-product',
        title: 'Dot Product & Angle Lab',
        description: 'Adjust vector components to examine algebraic dot products, vector magnitudes, enclosed angles, and cosine similarity.',
        duration: '20 min',
        difficulty: 'Intermediate',
      },
      {
        id: 'projection',
        slug: 'projection',
        title: 'Vector Projection Lab',
        description: 'Decompose a target vector into its parallel projection along a base vector and its orthogonal residual error vector.',
        duration: '20 min',
        difficulty: 'Intermediate',
      },
      {
        id: 'linear-combinations',
        slug: 'linear-combinations',
        title: 'Linear Combinations & Span Lab',
        description: 'Synthesize resultant vectors through weighted sums of basis vectors, evaluate span coverage, and test linear independence.',
        duration: '20 min',
        difficulty: 'Advanced',
      },
    ];

    return (
      <div className="space-y-12 pb-20">
        <UnitHeader
          unitId="unit-2"
          unitNumber={2}
          title={unit.title}
          description={unit.description}
          totalLessons={UNIT_2_LESSONS.length}
          totalLabs={unit2Labs.length}
          totalQuizzes={1}
          estimatedHours={unit.estimatedHours}
          firstLessonSlug={UNIT_2_LESSONS[0].slug}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-10">
            <section className="space-y-4">
              <SectionHeader
                title="Unit 2 Sequential Learning Path"
                subtitle="Master vector mathematics, geometric transformations, and high-dimensional spaces."
                badge={
                  <span className="p-1.5 rounded-lg bg-[#E5EFFB] dark:bg-[#1B2F48] text-[#416B9E] dark:text-[#A8C8EE]">
                    <BookOpen className="w-4 h-4" />
                  </span>
                }
              />

              <LearningPath
                unitId="unit-2"
                unitNumber={2}
                lessons={UNIT_2_LESSONS}
              />
            </section>

            <section className="space-y-4 pt-4 border-t border-[#F1F5F9] dark:border-[#2E3B4A]">
              <SectionHeader
                title="Applied Computational Labs"
                subtitle="Interactive vector workspaces, live projection engines, and linear span simulators."
                badge={
                  <span className="p-1.5 rounded-lg bg-[#E5EFFB] dark:bg-[#1B2F48] text-[#416B9E] dark:text-[#A8C8EE]">
                    <FlaskConical className="w-4 h-4" />
                  </span>
                }
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {unit2Labs.map((lab) => (
                  <div
                    key={lab.id}
                    className="p-5 bg-white dark:bg-[#151F2B] rounded-xl border border-[#E2E8F0] dark:border-[#2E3B4A] shadow-xs hover:border-[#B9D1EE] dark:hover:border-[#3B526B] transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-[#64748B] dark:text-[#B8C4D1]">
                        <span className="px-2 py-0.5 rounded-md bg-[#F8FAFC] dark:bg-[#101923] border border-[#E2E8F0] dark:border-[#2E3B4A] font-medium text-[#475569] dark:text-[#CBD5E1]">
                          {lab.difficulty}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#94A3B8] dark:text-[#7F8B99]" />
                          {lab.duration}
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-[#0F172A] dark:text-[#F1F5F9] tracking-tight">
                        {lab.title}
                      </h4>

                      <p className="text-xs text-[#64748B] dark:text-[#B8C4D1] leading-relaxed">
                        {lab.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#F1F5F9] dark:border-[#2E3B4A]">
                      <Link
                        href={`/labs/${lab.slug}`}
                        className="inline-flex items-center justify-center w-full py-2 px-3 rounded-lg text-xs font-semibold bg-[#F8FAFC] dark:bg-[#101923] hover:bg-[#E5EFFB] dark:hover:bg-[#1B2F48] text-[#0F172A] dark:text-[#F1F5F9] hover:text-[#416B9E] dark:hover:text-[#A8C8EE] border border-[#E2E8F0] dark:border-[#2E3B4A] hover:border-[#B9D1EE] dark:hover:border-[#3B526B] transition-colors"
                      >
                        Open Interactive Lab
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="pt-2">
              <AITutorBanner unitTitle={unit.title} />
            </section>

            <section className="space-y-4 pt-4 border-t border-[#F1F5F9] dark:border-[#2E3B4A]">
              <SectionHeader
                title="Unit 2 Mastery Assessment"
                subtitle="Evaluate your mastery of vector arithmetic, inner products, norms, projections, and span."
                badge={
                  <span className="p-1.5 rounded-lg bg-[#E5EFFB] dark:bg-[#1B2F48] text-[#416B9E] dark:text-[#A8C8EE]">
                    <HelpCircle className="w-4 h-4" />
                  </span>
                }
              />

              <QuizEngine quiz={UNIT_2_QUIZ} unitId="unit-2" />
            </section>
          </div>

          <div className="space-y-8 sticky top-6">
            <section className="p-6 bg-white dark:bg-[#151F2B] rounded-2xl border border-[#E2E8F0] dark:border-[#2E3B4A] shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#F1F5F9] dark:border-[#2E3B4A] pb-3">
                <h3 className="text-sm font-bold text-[#0F172A] dark:text-[#F1F5F9] flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#416B9E] dark:text-[#91B9E8]" />
                  <span>Concept Flashcards</span>
                </h3>
                <span className="text-xs text-[#64748B] dark:text-[#B8C4D1]">10 Cards</span>
              </div>

              <FlashcardDeck cards={UNIT_2_FLASHCARDS} />
            </section>

            <section className="p-6 bg-white dark:bg-[#151F2B] rounded-2xl border border-[#E2E8F0] dark:border-[#2E3B4A] shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#F1F5F9] dark:border-[#2E3B4A] pb-3">
                <h3 className="text-sm font-bold text-[#0F172A] dark:text-[#F1F5F9] flex items-center gap-2">
                  <Sigma className="w-4 h-4 text-[#416B9E] dark:text-[#91B9E8]" />
                  <span>Key Mathematical Formulas</span>
                </h3>
                <span className="text-xs text-[#64748B] dark:text-[#B8C4D1]">9 Formulas</span>
              </div>

              <p className="text-xs text-[#64748B] dark:text-[#B8C4D1] leading-relaxed">
                Quick access to dot product, L1/L2 norms, Euclidean metric, cosine similarity, linear combination, and orthogonal projection.
              </p>

              <div className="space-y-3">
                {UNIT_2_FORMULAS.slice(0, 3).map((f) => (
                  <div key={f.id} className="p-3 bg-[#F8FAFC] dark:bg-[#101923] rounded-xl border border-[#E2E8F0] dark:border-[#2E3B4A] text-xs space-y-1">
                    <div className="flex justify-between font-bold text-[#0F172A] dark:text-[#F1F5F9]">
                      <span>{f.title}</span>
                      <span className="text-[#416B9E] dark:text-[#A8C8EE] text-[11px] font-mono">{f.category}</span>
                    </div>
                    <p className="text-[#64748B] dark:text-[#B8C4D1] text-[11px]">{f.description}</p>
                  </div>
                ))}
              </div>

              <Link
                href="#formula-sheet"
                className="inline-flex items-center justify-center w-full py-2 rounded-lg text-xs font-semibold bg-[#F8FAFC] dark:bg-[#101923] hover:bg-[#F1F5F9] dark:hover:bg-[#202D3B] text-[#475569] dark:text-[#CBD5E1] border border-[#E2E8F0] dark:border-[#2E3B4A] transition-colors"
              >
                Scroll to Full Formula Sheet ↓
              </Link>
            </section>
          </div>
        </div>

        <section id="formula-sheet" className="pt-10 border-t border-[#E2E8F0] dark:border-[#2E3B4A] space-y-6">
          <SectionHeader
            title="Unit 2 Comprehensive Formula Sheet"
            subtitle="Mathematical definitions, formulas, component breakdowns, and step-by-step numerical examples."
            badge={
              <span className="p-1.5 rounded-lg bg-[#E5EFFB] dark:bg-[#1B2F48] text-[#416B9E] dark:text-[#A8C8EE]">
                <Sigma className="w-4 h-4" />
              </span>
            }
          />

          <FormulaSheet formulas={UNIT_2_FORMULAS} />
        </section>
      </div>
    );
  }

  // Unit 3 Render
  if (isUnit3) {
    const unit = UNITS_DATA.find((u) => u.id === 'unit-3') || UNITS_DATA[2];

    const unit3Labs = [
      {
        id: 'matrices',
        slug: 'matrices',
        title: 'Matrix Operations Lab',
        description: 'Perform elementwise matrix addition, subtraction, scalar multiplication, and transposition on 2D matrices.',
        duration: '20 min',
        difficulty: 'Beginner',
      },
      {
        id: 'matrix-multiplication',
        slug: 'matrix-multiplication',
        title: 'Matrix Multiplication Lab',
        description: 'Verify dimension compatibility and trace row-by-column inner product dot product summations across rectangular matrix pairs.',
        duration: '20 min',
        difficulty: 'Intermediate',
      },
      {
        id: 'transformations',
        slug: 'transformations',
        title: 'Matrix Transformation Lab',
        description: 'Manipulate 2×2 transformation operators, track basis vectors î and ĵ, and explore geometric rotations, shears, and area scalings.',
        duration: '20 min',
        difficulty: 'Intermediate',
      },
      {
        id: 'determinants',
        slug: 'determinants',
        title: 'Determinant & Invertibility Lab',
        description: 'Evaluate determinants, verify invertibility conditions, inspect inverse matrices, and visualize signed area transformations.',
        duration: '20 min',
        difficulty: 'Advanced',
      },
    ];

    return (
      <div className="space-y-12 pb-20">
        <UnitHeader
          unitId="unit-3"
          unitNumber={3}
          title={unit.title}
          description={unit.description}
          totalLessons={UNIT_3_LESSONS.length}
          totalLabs={unit3Labs.length}
          totalQuizzes={1}
          estimatedHours={unit.estimatedHours}
          firstLessonSlug={UNIT_3_LESSONS[0].slug}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-10">
            <section className="space-y-4">
              <SectionHeader
                title="Unit 3 Sequential Learning Path"
                subtitle="Master matrix representations, linear transformations, determinants, and eigenspaces."
                badge={
                  <span className="p-1.5 rounded-lg bg-[#E5F3E9] dark:bg-[#1E3B29] text-[#3F7951] dark:text-[#A4E0B8]">
                    <BookOpen className="w-4 h-4" />
                  </span>
                }
              />

              <LearningPath
                unitId="unit-3"
                unitNumber={3}
                lessons={UNIT_3_LESSONS}
              />
            </section>

            <section className="space-y-4 pt-4 border-t border-[#F1F5F9] dark:border-[#2E3B4A]">
              <SectionHeader
                title="Applied Computational Labs"
                subtitle="Interactive matrix arithmetic engines, transformation visualizers, and determinant explorers."
                badge={
                  <span className="p-1.5 rounded-lg bg-[#E5F3E9] dark:bg-[#1E3B29] text-[#3F7951] dark:text-[#A4E0B8]">
                    <FlaskConical className="w-4 h-4" />
                  </span>
                }
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {unit3Labs.map((lab) => (
                  <div
                    key={lab.id}
                    className="p-5 bg-white dark:bg-[#151F2B] rounded-xl border border-[#E2E8F0] dark:border-[#2E3B4A] shadow-xs hover:border-[#B8DCC3] dark:hover:border-[#2E583C] transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-[#64748B] dark:text-[#B8C4D1]">
                        <span className="px-2 py-0.5 rounded-md bg-[#F8FAFC] dark:bg-[#101923] border border-[#E2E8F0] dark:border-[#2E3B4A] font-medium text-[#475569] dark:text-[#CBD5E1]">
                          {lab.difficulty}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#94A3B8] dark:text-[#7F8B99]" />
                          {lab.duration}
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-[#0F172A] dark:text-[#F1F5F9] tracking-tight">
                        {lab.title}
                      </h4>

                      <p className="text-xs text-[#64748B] dark:text-[#B8C4D1] leading-relaxed">
                        {lab.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#F1F5F9] dark:border-[#2E3B4A]">
                      <Link
                        href={`/labs/${lab.slug}`}
                        className="inline-flex items-center justify-center w-full py-2 px-3 rounded-lg text-xs font-semibold bg-[#F8FAFC] dark:bg-[#101923] hover:bg-[#E5F3E9] dark:hover:bg-[#1E3B29] text-[#0F172A] dark:text-[#F1F5F9] hover:text-[#3F7951] dark:hover:text-[#A4E0B8] border border-[#E2E8F0] dark:border-[#2E3B4A] hover:border-[#B8DCC3] dark:hover:border-[#2E583C] transition-colors"
                      >
                        Open Interactive Lab
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="pt-2">
              <AITutorBanner unitTitle={unit.title} />
            </section>

            <section className="space-y-4 pt-4 border-t border-[#F1F5F9] dark:border-[#2E3B4A]">
              <SectionHeader
                title="Unit 3 Mastery Assessment"
                subtitle="Evaluate your understanding of matrix algebra, transformations, invertibility, rank, and eigenvalues."
                badge={
                  <span className="p-1.5 rounded-lg bg-[#E5F3E9] dark:bg-[#1E3B29] text-[#3F7951] dark:text-[#A4E0B8]">
                    <HelpCircle className="w-4 h-4" />
                  </span>
                }
              />

              <QuizEngine quiz={UNIT_3_QUIZ} unitId="unit-3" />
            </section>
          </div>

          <div className="space-y-8 sticky top-6">
            <section className="p-6 bg-white dark:bg-[#151F2B] rounded-2xl border border-[#E2E8F0] dark:border-[#2E3B4A] shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#F1F5F9] dark:border-[#2E3B4A] pb-3">
                <h3 className="text-sm font-bold text-[#0F172A] dark:text-[#F1F5F9] flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#3F7951] dark:text-[#8FC7A3]" />
                  <span>Concept Flashcards</span>
                </h3>
                <span className="text-xs text-[#64748B] dark:text-[#B8C4D1]">10 Cards</span>
              </div>

              <FlashcardDeck cards={UNIT_3_FLASHCARDS} />
            </section>

            <section className="p-6 bg-white dark:bg-[#151F2B] rounded-2xl border border-[#E2E8F0] dark:border-[#2E3B4A] shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#F1F5F9] dark:border-[#2E3B4A] pb-3">
                <h3 className="text-sm font-bold text-[#0F172A] dark:text-[#F1F5F9] flex items-center gap-2">
                  <Sigma className="w-4 h-4 text-[#3F7951] dark:text-[#8FC7A3]" />
                  <span>Key Mathematical Formulas</span>
                </h3>
                <span className="text-xs text-[#64748B] dark:text-[#B8C4D1]">9 Formulas</span>
              </div>

              <p className="text-xs text-[#64748B] dark:text-[#B8C4D1] leading-relaxed">
                Quick access to matrix addition, multiplication, transposition, 2×2 determinant, 2×2 inverse, linear systems, and eigenvalues.
              </p>

              <div className="space-y-3">
                {UNIT_3_FORMULAS.slice(0, 3).map((f) => (
                  <div key={f.id} className="p-3 bg-[#F8FAFC] dark:bg-[#101923] rounded-xl border border-[#E2E8F0] dark:border-[#2E3B4A] text-xs space-y-1">
                    <div className="flex justify-between font-bold text-[#0F172A] dark:text-[#F1F5F9]">
                      <span>{f.title}</span>
                      <span className="text-[#3F7951] dark:text-[#A4E0B8] text-[11px] font-mono">{f.category}</span>
                    </div>
                    <p className="text-[#64748B] dark:text-[#B8C4D1] text-[11px]">{f.description}</p>
                  </div>
                ))}
              </div>

              <Link
                href="#formula-sheet"
                className="inline-flex items-center justify-center w-full py-2 rounded-lg text-xs font-semibold bg-[#F8FAFC] dark:bg-[#101923] hover:bg-[#F1F5F9] dark:hover:bg-[#1B2735] text-[#475569] dark:text-[#CBD5E1] border border-[#E2E8F0] dark:border-[#2E3B4A] transition-colors"
              >
                Scroll to Full Formula Sheet ↓
              </Link>
            </section>
          </div>
        </div>

        <section id="formula-sheet" className="pt-10 border-t border-[#E2E8F0] dark:border-[#2E3B4A] space-y-6">
          <SectionHeader
            title="Unit 3 Comprehensive Formula Sheet"
            subtitle="Mathematical definitions, formulas, component breakdowns, and step-by-step numerical examples."
            badge={
              <span className="p-1.5 rounded-lg bg-[#E5F3E9] dark:bg-[#1E3B29] text-[#3F7951] dark:text-[#A4E0B8]">
                <Sigma className="w-4 h-4" />
              </span>
            }
          />

          <FormulaSheet formulas={UNIT_3_FORMULAS} />
        </section>
      </div>
    );
  }

  // Unit 4 Render
  if (isUnit4) {
    const unit = UNITS_DATA.find((u) => u.id === 'unit-4') || UNITS_DATA[3];

  const unit4Labs = [
    {
      id: 'probability',
      slug: 'probability',
      title: 'Probability Simulation Lab',
      description: 'Simulate coin tosses, multi-sided dice rolls, and card draws to observe empirical frequency convergence under the Law of Large Numbers.',
      duration: '20 min',
      difficulty: 'Beginner',
    },
    {
      id: 'distributions',
      slug: 'distributions',
      title: 'Distribution Modeling Lab',
      description: 'Explore Normal, Binomial, Poisson, and Uniform probability models, fit parameters, and calculate tail and interval probabilities.',
      duration: '20 min',
      difficulty: 'Intermediate',
    },
    {
      id: 'bayes',
      slug: 'bayes',
      title: "Bayes' Theorem Lab",
      description: 'Calculate posterior probabilities, update prior beliefs with evidence, and explore the base rate fallacy in fraud and diagnostic tests.',
      duration: '20 min',
      difficulty: 'Intermediate',
    },
    {
      id: 'statistical-inference',
      slug: 'statistical-inference',
      title: 'Statistical Inference Lab',
      description: 'Conduct one-sample Z-tests, evaluate test statistics and p-values, construct confidence intervals, and make formal statistical decisions.',
      duration: '20 min',
      difficulty: 'Advanced',
    },
  ];

  return (
    <div className="space-y-12 pb-20">
      {/* 1. Enhanced Unit Header */}
      <UnitHeader
        unitId="unit-4"
        unitNumber={4}
        title={unit.title}
        description={unit.description}
        totalLessons={UNIT_4_LESSONS.length}
        totalLabs={unit4Labs.length}
        totalQuizzes={1}
        estimatedHours={unit.estimatedHours}
        firstLessonSlug={UNIT_4_LESSONS[0].slug}
      />

      {/* 2. Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left 2 Columns */}
        <div className="lg:col-span-2 space-y-10">
          {/* Sequential Learning Path */}
          <section className="space-y-4">
            <SectionHeader
              title="Unit 4 Sequential Learning Path"
              subtitle="Master probability axioms, random variables, parametric distributions, Bayesian updating, and hypothesis testing."
              badge={
                <span className="p-1.5 rounded-lg bg-[#EEE9F8] dark:bg-[#32254B] text-[#68539A] dark:text-[#D1C2F0]">
                  <BookOpen className="w-4 h-4" />
                </span>
              }
            />

            <LearningPath
              unitId="unit-4"
              unitNumber={4}
              lessons={UNIT_4_LESSONS}
            />
          </section>

          {/* Applied Computational Labs */}
          <section className="space-y-4 pt-4 border-t border-[#F1F5F9] dark:border-[#2E3B4A]">
            <SectionHeader
              title="Applied Computational Labs"
              subtitle="Interactive probability simulators, distribution explorers, Bayesian evidence engines, and hypothesis testing labs."
              badge={
                <span className="p-1.5 rounded-lg bg-[#EEE9F8] dark:bg-[#32254B] text-[#68539A] dark:text-[#D1C2F0]">
                  <FlaskConical className="w-4 h-4" />
                </span>
              }
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {unit4Labs.map((lab) => (
                <div
                  key={lab.id}
                  className="p-5 bg-white dark:bg-[#151F2B] rounded-xl border border-[#E2E8F0] dark:border-[#2E3B4A] shadow-xs hover:border-[#CFC2EA] dark:hover:border-[#523E75] transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-[#64748B] dark:text-[#B8C4D1]">
                      <span className="px-2 py-0.5 rounded-md bg-[#F8FAFC] dark:bg-[#101923] border border-[#E2E8F0] dark:border-[#2E3B4A] font-medium text-[#475569] dark:text-[#CBD5E1]">
                        {lab.difficulty}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#94A3B8] dark:text-[#7F8B99]" />
                        {lab.duration}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-[#0F172A] dark:text-[#F1F5F9] tracking-tight">
                      {lab.title}
                    </h4>

                    <p className="text-xs text-[#64748B] dark:text-[#B8C4D1] leading-relaxed">
                      {lab.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#F1F5F9] dark:border-[#2E3B4A]">
                    <Link
                      href={`/labs/${lab.slug}`}
                      className="inline-flex items-center justify-center w-full py-2 px-3 rounded-lg text-xs font-semibold bg-[#F8FAFC] dark:bg-[#101923] hover:bg-[#EEE9F8] dark:hover:bg-[#32254B] text-[#0F172A] dark:text-[#F1F5F9] hover:text-[#68539A] dark:hover:text-[#D1C2F0] border border-[#E2E8F0] dark:border-[#2E3B4A] hover:border-[#CFC2EA] dark:hover:border-[#523E75] transition-colors"
                    >
                      Open Interactive Lab
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* AI Tutor Entry Point */}
          <section className="pt-2">
            <AITutorBanner unitTitle={unit.title} />
          </section>

          {/* Unit Mastery Assessment Quiz */}
          <section className="space-y-4 pt-4 border-t border-[#F1F5F9] dark:border-[#2E3B4A]">
            <SectionHeader
              title="Unit 4 Mastery Assessment"
              subtitle="Evaluate your understanding of probability axioms, distributions, Bayes' Theorem, standard error, and hypothesis testing."
              badge={
                <span className="p-1.5 rounded-lg bg-[#EEE9F8] dark:bg-[#32254B] text-[#68539A] dark:text-[#D1C2F0]">
                  <HelpCircle className="w-4 h-4" />
                </span>
              }
            />

            <QuizEngine quiz={UNIT_4_QUIZ} unitId="unit-4" />
          </section>
        </div>

        {/* Right 1 Column */}
        <div className="space-y-8 sticky top-6">
          <section className="p-6 bg-white dark:bg-[#151F2B] rounded-2xl border border-[#E2E8F0] dark:border-[#2E3B4A] shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#F1F5F9] dark:border-[#2E3B4A] pb-3">
              <h3 className="text-sm font-bold text-[#0F172A] dark:text-[#F1F5F9] flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#68539A] dark:text-[#B7A3E3]" />
                <span>Concept Flashcards</span>
              </h3>
              <span className="text-xs text-[#64748B] dark:text-[#B8C4D1]">10 Cards</span>
            </div>

            <FlashcardDeck cards={UNIT_4_FLASHCARDS} />
          </section>

          <section className="p-6 bg-white dark:bg-[#151F2B] rounded-2xl border border-[#E2E8F0] dark:border-[#2E3B4A] shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#F1F5F9] dark:border-[#2E3B4A] pb-3">
              <h3 className="text-sm font-bold text-[#0F172A] dark:text-[#F1F5F9] flex items-center gap-2">
                <Sigma className="w-4 h-4 text-[#68539A] dark:text-[#B7A3E3]" />
                <span>Key Mathematical Formulas</span>
              </h3>
              <span className="text-xs text-[#64748B] dark:text-[#B8C4D1]">12 Formulas</span>
            </div>

            <p className="text-xs text-[#64748B] dark:text-[#B8C4D1] leading-relaxed">
              Quick access to complements, addition rule, conditional probability, Bayes’ theorem, expectation, variance, Z-score, SE, and confidence intervals.
            </p>

            <div className="space-y-3">
              {UNIT_4_FORMULAS.slice(0, 3).map((f) => (
                <div key={f.id} className="p-3 bg-[#F8FAFC] dark:bg-[#101923] rounded-xl border border-[#E2E8F0] dark:border-[#2E3B4A] text-xs space-y-1">
                  <div className="flex justify-between font-bold text-[#0F172A] dark:text-[#F1F5F9]">
                    <span>{f.title}</span>
                    <span className="text-[#68539A] dark:text-[#D1C2F0] text-[11px] font-mono">{f.category}</span>
                  </div>
                  <p className="text-[#64748B] dark:text-[#B8C4D1] text-[11px]">{f.description}</p>
                </div>
              ))}
            </div>

            <Link
              href="#formula-sheet"
              className="inline-flex items-center justify-center w-full py-2 rounded-lg text-xs font-semibold bg-[#F8FAFC] dark:bg-[#101923] hover:bg-[#F1F5F9] dark:hover:bg-[#1B2735] text-[#475569] dark:text-[#CBD5E1] border border-[#E2E8F0] dark:border-[#2E3B4A] transition-colors"
            >
              Scroll to Full Formula Sheet ↓
            </Link>
          </section>
        </div>
      </div>

      {/* 3. Full Formula Reference Section */}
      <section id="formula-sheet" className="pt-10 border-t border-[#E2E8F0] dark:border-[#2E3B4A] space-y-6">
        <SectionHeader
          title="Unit 4 Comprehensive Formula Sheet"
          subtitle="Mathematical definitions, formulas, component breakdowns, and step-by-step numerical examples."
          badge={
            <span className="p-1.5 rounded-lg bg-[#EEE9F8] dark:bg-[#32254B] text-[#68539A] dark:text-[#D1C2F0]">
              <Sigma className="w-4 h-4" />
            </span>
          }
        />

        <FormulaSheet formulas={UNIT_4_FORMULAS} />
      </section>
    </div>
  );
  }

  // Unit 5 Render
  if (isUnit5) {
  const unit5 = UNITS_DATA.find((u) => u.id === 'unit-5') || UNITS_DATA[4];

  const unit5Labs = [
    {
      id: 'regression',
      slug: 'regression',
      title: 'Regression Analysis Lab',
      description: 'Inspect bivariate scatter plots, fit Ordinary Least Squares models, analyze parameter slopes and intercepts, and generate point predictions.',
      duration: '20 min',
      difficulty: 'Intermediate',
    },
    {
      id: 'least-squares',
      slug: 'least-squares',
      title: 'Least Squares Geometry Lab',
      description: 'Manipulate candidate regression lines, visualize geometric squared error areas, and observe how SSE minimizes at the analytical OLS solution.',
      duration: '20 min',
      difficulty: 'Intermediate',
    },
    {
      id: 'polynomial-regression',
      slug: 'polynomial-regression',
      title: 'Polynomial Regression Lab',
      description: 'Tune polynomial degrees from 1 to 5, compare training vs. validation error divergence, and diagnose underfitting and overfitting.',
      duration: '20 min',
      difficulty: 'Intermediate',
    },
    {
      id: 'regularization',
      slug: 'regularization',
      title: 'Regularization (Ridge & Lasso) Lab',
      description: 'Tune penalty strength λ across standardized multi-feature datasets and compare L2 coefficient shrinkage against L1 exact sparsity.',
      duration: '25 min',
      difficulty: 'Advanced',
    },
  ];

  return (
    <div className="space-y-12 pb-20">
      {/* 1. Enhanced Unit Header */}
      <UnitHeader
        unitId="unit-5"
        unitNumber={5}
        title={unit5.title}
        description={unit5.description}
        totalLessons={UNIT_5_LESSONS.length}
        totalLabs={unit5Labs.length}
        totalQuizzes={1}
        estimatedHours={unit5.estimatedHours}
        firstLessonSlug={UNIT_5_LESSONS[0].slug}
      />

      {/* 2. Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left 2 Columns */}
        <div className="lg:col-span-2 space-y-10">
          {/* Sequential Learning Path */}
          <section className="space-y-4">
            <SectionHeader
              title="Unit 5 Sequential Learning Path"
              subtitle="Master Simple Linear Regression, Least Squares, Residuals, R², Multiple Regression, Polynomials, and Regularization."
              badge={
                <span className="p-1.5 rounded-lg bg-[#FAF2D8] dark:bg-[#3D331A] text-[#806A28] dark:text-[#F3DF9B]">
                  <BookOpen className="w-4 h-4" />
                </span>
              }
            />

            <LearningPath
              unitId="unit-5"
              unitNumber={5}
              lessons={UNIT_5_LESSONS}
            />
          </section>

          {/* Applied Computational Labs */}
          <section className="space-y-4 pt-4 border-t border-[#F1F5F9] dark:border-[#2E3B4A]">
            <SectionHeader
              title="Applied Computational Labs"
              subtitle="Interactive regression lines, least-squares error square visualizers, polynomial complexity tuners, and regularization penalty labs."
              badge={
                <span className="p-1.5 rounded-lg bg-[#FAF2D8] dark:bg-[#3D331A] text-[#806A28] dark:text-[#F3DF9B]">
                  <FlaskConical className="w-4 h-4" />
                </span>
              }
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {unit5Labs.map((lab) => (
                <div
                  key={lab.id}
                  className="p-5 bg-white dark:bg-[#151F2B] rounded-xl border border-[#E2E8F0] dark:border-[#2E3B4A] shadow-xs hover:border-[#EBD99A] dark:hover:border-[#6B5720] transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-[#64748B] dark:text-[#B8C4D1]">
                      <span className="px-2 py-0.5 rounded-md bg-[#F8FAFC] dark:bg-[#101923] border border-[#E2E8F0] dark:border-[#2E3B4A] font-medium text-[#475569] dark:text-[#CBD5E1]">
                        {lab.difficulty}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#94A3B8] dark:text-[#7F8B99]" />
                        {lab.duration}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-[#0F172A] dark:text-[#F1F5F9] tracking-tight">
                      {lab.title}
                    </h4>

                    <p className="text-xs text-[#64748B] dark:text-[#B8C4D1] leading-relaxed">
                      {lab.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#F1F5F9] dark:border-[#2E3B4A]">
                    <Link
                      href={`/labs/${lab.slug}`}
                      className="inline-flex items-center justify-center w-full py-2 px-3 rounded-lg text-xs font-semibold bg-[#F8FAFC] dark:bg-[#101923] hover:bg-[#FAF2D8] dark:hover:bg-[#3D331A] text-[#0F172A] dark:text-[#F1F5F9] hover:text-[#806A28] dark:hover:text-[#F3DF9B] border border-[#E2E8F0] dark:border-[#2E3B4A] hover:border-[#EBD99A] dark:hover:border-[#6B5720] transition-colors"
                    >
                      Open Interactive Lab
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* AI Tutor Entry Point */}
          <section className="pt-2">
            <AITutorBanner unitTitle={unit5.title} />
          </section>

          {/* Unit Mastery Assessment Quiz */}
          <section className="space-y-4 pt-4 border-t border-[#F1F5F9] dark:border-[#2E3B4A]">
            <SectionHeader
              title="Unit 5 Mastery Assessment"
              subtitle="Evaluate your understanding of regression equations, OLS normal equations, RMSE, R², matrix regression, Ridge, and Lasso."
              badge={
                <span className="p-1.5 rounded-lg bg-[#FAF2D8] dark:bg-[#3D331A] text-[#806A28] dark:text-[#F3DF9B]">
                  <HelpCircle className="w-4 h-4" />
                </span>
              }
            />

            <QuizEngine quiz={UNIT_5_QUIZ} unitId="unit-5" />
          </section>
        </div>

        {/* Right 1 Column */}
        <div className="space-y-8 sticky top-6">
          <section className="p-6 bg-white dark:bg-[#151F2B] rounded-2xl border border-[#E2E8F0] dark:border-[#2E3B4A] shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#F1F5F9] dark:border-[#2E3B4A] pb-3">
              <h3 className="text-sm font-bold text-[#0F172A] dark:text-[#F1F5F9] flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#806A28] dark:text-[#E8C878]" />
                <span>Concept Flashcards</span>
              </h3>
              <span className="text-xs text-[#64748B] dark:text-[#B8C4D1]">10 Cards</span>
            </div>

            <FlashcardDeck cards={UNIT_5_FLASHCARDS} />
          </section>

          <section className="p-6 bg-white dark:bg-[#151F2B] rounded-2xl border border-[#E2E8F0] dark:border-[#2E3B4A] shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#F1F5F9] dark:border-[#2E3B4A] pb-3">
              <h3 className="text-sm font-bold text-[#0F172A] dark:text-[#F1F5F9] flex items-center gap-2">
                <Sigma className="w-4 h-4 text-[#806A28] dark:text-[#E8C878]" />
                <span>Key Mathematical Formulas</span>
              </h3>
              <span className="text-xs text-[#64748B] dark:text-[#B8C4D1]">14 Formulas</span>
            </div>

            <p className="text-xs text-[#64748B] dark:text-[#B8C4D1] leading-relaxed">
              Quick access to simple linear regression, residuals, SSE, MSE, RMSE, SST, R², Adjusted R², matrix OLS, Ridge, and Lasso formulas.
            </p>

            <div className="space-y-3">
              {UNIT_5_FORMULAS.slice(0, 3).map((f) => (
                <div key={f.id} className="p-3 bg-[#F8FAFC] dark:bg-[#101923] rounded-xl border border-[#E2E8F0] dark:border-[#2E3B4A] text-xs space-y-1">
                  <div className="flex justify-between font-bold text-[#0F172A] dark:text-[#F1F5F9]">
                    <span>{f.title}</span>
                    <span className="text-[#806A28] dark:text-[#F3DF9B] text-[11px] font-mono">{f.category}</span>
                  </div>
                  <p className="text-[#64748B] dark:text-[#B8C4D1] text-[11px]">{f.description}</p>
                </div>
              ))}
            </div>

            <Link
              href="#formula-sheet"
              className="inline-flex items-center justify-center w-full py-2 rounded-lg text-xs font-semibold bg-[#F8FAFC] dark:bg-[#101923] hover:bg-[#F1F5F9] dark:hover:bg-[#1B2735] text-[#475569] dark:text-[#CBD5E1] border border-[#E2E8F0] dark:border-[#2E3B4A] transition-colors"
            >
              Scroll to Full Formula Sheet ↓
            </Link>
          </section>
        </div>
      </div>

      {/* 3. Full Formula Reference Section */}
      <section id="formula-sheet" className="pt-10 border-t border-[#E2E8F0] dark:border-[#2E3B4A] space-y-6">
        <SectionHeader
          title="Unit 5 Comprehensive Formula Sheet"
          subtitle="Mathematical definitions, formulas, component breakdowns, and step-by-step numerical examples."
          badge={
            <span className="p-1.5 rounded-lg bg-[#FAF2D8] dark:bg-[#3D331A] text-[#806A28] dark:text-[#F3DF9B]">
              <Sigma className="w-4 h-4" />
            </span>
          }
        />

        <FormulaSheet formulas={UNIT_5_FORMULAS} />
      </section>
    </div>
  );
}

  // Unit 6 Render
  if (isUnit6) {
    const unit = UNITS_DATA.find((u) => u.id === 'unit-6') || UNITS_DATA[5];

    const labs = [
      {
        id: 'classification',
        slug: 'classification',
        title: 'Supervised Classification Lab',
        description: 'Select datasets, train parametric (Logistic) vs. non-parametric (k-NN) classifiers, generate predictions, and evaluate confusion matrices.',
        duration: '20 min',
        difficulty: 'Intermediate',
      },
      {
        id: 'logistic-regression',
        slug: 'logistic-regression',
        title: 'Logistic Regression Lab',
        description: 'Fit logistic regression models via gradient descent, inspect Binary Cross-Entropy log loss, and calibrate operational decision thresholds.',
        duration: '20 min',
        difficulty: 'Intermediate',
      },
      {
        id: 'knn',
        slug: 'knn',
        title: 'k-Nearest Neighbors (k-NN) Lab',
        description: 'Test distance-based nearest neighbor classification, compare scaled vs. unscaled features, and inspect class voting mechanics.',
        duration: '20 min',
        difficulty: 'Intermediate',
      },
      {
        id: 'model-evaluation',
        slug: 'model-evaluation',
        title: 'Classification Model Evaluation Lab',
        description: 'Calibrate decision thresholds across imbalanced datasets and optimize asymmetric operational cost matrices.',
        duration: '25 min',
        difficulty: 'Advanced',
      },
    ];

    return (
      <div className="space-y-12 pb-20">
        {/* 1. Enhanced Unit Header */}
        <UnitHeader
          unitId="unit-6"
          unitNumber={6}
          title={unit.title}
          description={unit.description}
          totalLessons={UNIT_6_LESSONS.length}
          totalLabs={labs.length}
          totalQuizzes={1}
          estimatedHours={unit.estimatedHours}
          firstLessonSlug={UNIT_6_LESSONS[0].slug}
        />

        {/* 2. Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left 2 Columns */}
          <div className="lg:col-span-2 space-y-10">
            {/* Sequential Learning Path */}
            <section className="space-y-4">
              <SectionHeader
                title="Unit 6 Sequential Learning Path"
                subtitle="Master Classification, Logistic Regression, Decision Boundaries, k-NN, Decision Trees, Ensembles, Evaluation, and Tuning."
                badge={
                  <span className="p-1.5 rounded-lg bg-[#F6E5EB] dark:bg-[#40222D] text-[#8A4E63] dark:text-[#F3B7CB]">
                    <BookOpen className="w-4 h-4" />
                  </span>
                }
              />

              <LearningPath
                unitId="unit-6"
                unitNumber={6}
                lessons={UNIT_6_LESSONS}
              />
            </section>

            {/* Applied Computational Labs */}
            <section className="space-y-4 pt-4 border-t border-[#F1F5F9] dark:border-[#2E3B4A]">
              <SectionHeader
                title="Applied Computational Labs"
                subtitle="Interactive classifiers, logistic probability calibration, distance neighbor visualizers, and confusion matrix evaluators."
                badge={
                  <span className="p-1.5 rounded-lg bg-[#F6E5EB] dark:bg-[#40222D] text-[#8A4E63] dark:text-[#F3B7CB]">
                    <FlaskConical className="w-4 h-4" />
                  </span>
                }
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {labs.map((lab) => (
                  <div
                    key={lab.id}
                    className="p-5 bg-white dark:bg-[#151F2B] rounded-xl border border-[#E2E8F0] dark:border-[#2E3B4A] shadow-xs hover:border-[#E5BBC9] dark:hover:border-[#6B3245] transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-[#64748B] dark:text-[#B8C4D1]">
                        <span className="px-2 py-0.5 rounded-md bg-[#F8FAFC] dark:bg-[#101923] border border-[#E2E8F0] dark:border-[#2E3B4A] font-medium text-[#475569] dark:text-[#CBD5E1]">
                          {lab.difficulty}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#94A3B8] dark:text-[#7F8B99]" />
                          {lab.duration}
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-[#0F172A] dark:text-[#F1F5F9] tracking-tight">
                        {lab.title}
                      </h4>

                      <p className="text-xs text-[#64748B] dark:text-[#B8C4D1] leading-relaxed">
                        {lab.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#F1F5F9] dark:border-[#2E3B4A]">
                      <Link
                        href={`/labs/${lab.slug}`}
                        className="inline-flex items-center justify-center w-full py-2 px-3 rounded-lg text-xs font-semibold bg-[#F8FAFC] dark:bg-[#101923] hover:bg-[#F6E5EB] dark:hover:bg-[#40222D] text-[#0F172A] dark:text-[#F1F5F9] hover:text-[#8A4E63] dark:hover:text-[#F3B7CB] border border-[#E2E8F0] dark:border-[#2E3B4A] hover:border-[#E5BBC9] dark:hover:border-[#6B3245] transition-colors"
                      >
                        Open Interactive Lab
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* AI Tutor Entry Point */}
            <section className="pt-2">
              <AITutorBanner unitTitle={unit.title} />
            </section>

            {/* Unit Mastery Assessment Quiz */}
            <section className="space-y-4 pt-4 border-t border-[#F1F5F9] dark:border-[#2E3B4A]">
              <SectionHeader
                title="Unit 6 Mastery Assessment"
                subtitle="Evaluate your understanding of logistic regression, sigmoid, log loss, k-NN, decision trees, confusion matrix metrics, and cross-validation."
                badge={
                  <span className="p-1.5 rounded-lg bg-[#F6E5EB] dark:bg-[#40222D] text-[#8A4E63] dark:text-[#F3B7CB]">
                    <HelpCircle className="w-4 h-4" />
                  </span>
                }
              />

              <QuizEngine quiz={UNIT_6_QUIZ} unitId="unit-6" />
            </section>
          </div>

          {/* Right 1 Column */}
          <div className="space-y-8 sticky top-6">
            <section className="p-6 bg-white dark:bg-[#151F2B] rounded-2xl border border-[#E2E8F0] dark:border-[#2E3B4A] shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#F1F5F9] dark:border-[#2E3B4A] pb-3">
                <h3 className="text-sm font-bold text-[#0F172A] dark:text-[#F1F5F9] flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#8A4E63] dark:text-[#D99AAF]" />
                  <span>Concept Flashcards</span>
                </h3>
                <span className="text-xs text-[#64748B] dark:text-[#B8C4D1]">10 Cards</span>
              </div>

              <FlashcardDeck cards={UNIT_6_FLASHCARDS} />
            </section>

            <section className="p-6 bg-white dark:bg-[#151F2B] rounded-2xl border border-[#E2E8F0] dark:border-[#2E3B4A] shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#F1F5F9] dark:border-[#2E3B4A] pb-3">
                <h3 className="text-sm font-bold text-[#0F172A] dark:text-[#F1F5F9] flex items-center gap-2">
                  <Sigma className="w-4 h-4 text-[#8A4E63] dark:text-[#D99AAF]" />
                  <span>Key Mathematical Formulas</span>
                </h3>
                <span className="text-xs text-[#64748B] dark:text-[#B8C4D1]">16 Formulas</span>
              </div>

              <p className="text-xs text-[#64748B] dark:text-[#B8C4D1] leading-relaxed">
                Quick access to Sigmoid, Logit, Log Loss, Euclidean distance, Gini impurity, Entropy, Accuracy, Precision, Recall, Specificity, and F1-Score formulas.
              </p>

              <div className="space-y-3">
                {UNIT_6_FORMULAS.slice(0, 3).map((f) => (
                  <div key={f.id} className="p-3 bg-[#F8FAFC] dark:bg-[#101923] rounded-xl border border-[#E2E8F0] dark:border-[#2E3B4A] text-xs space-y-1">
                    <div className="flex justify-between font-bold text-[#0F172A] dark:text-[#F1F5F9]">
                      <span>{f.title}</span>
                      <span className="text-[#8A4E63] dark:text-[#F3B7CB] text-[11px] font-mono">{f.category}</span>
                    </div>
                    <p className="text-[#64748B] dark:text-[#B8C4D1] text-[11px]">{f.description}</p>
                  </div>
                ))}
              </div>

              <Link
                href="#formula-sheet"
                className="inline-flex items-center justify-center w-full py-2 rounded-lg text-xs font-semibold bg-[#F8FAFC] dark:bg-[#101923] hover:bg-[#F1F5F9] dark:hover:bg-[#1B2735] text-[#475569] dark:text-[#CBD5E1] border border-[#E2E8F0] dark:border-[#2E3B4A] transition-colors"
              >
                Scroll to Full Formula Sheet ↓
              </Link>
            </section>
          </div>
        </div>

        {/* 3. Full Formula Reference Section */}
        <section id="formula-sheet" className="pt-10 border-t border-[#E2E8F0] dark:border-[#2E3B4A] space-y-6">
          <SectionHeader
            title="Unit 6 Comprehensive Formula Sheet"
            subtitle="Mathematical definitions, formulas, component breakdowns, and step-by-step numerical examples."
            badge={
              <span className="p-1.5 rounded-lg bg-[#F6E5EB] dark:bg-[#40222D] text-[#8A4E63] dark:text-[#F3B7CB]">
                <Sigma className="w-4 h-4" />
              </span>
            }
          />

          <FormulaSheet formulas={UNIT_6_FORMULAS} />
        </section>
      </div>
    );
  }

  notFound();
}
