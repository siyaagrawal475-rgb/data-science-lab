'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Clock,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  AlertTriangle,
  Info,
  Sigma,
  Code,
  Sparkles,
  Check,
  X,
  Copy,
  LayoutGrid,
} from 'lucide-react';
import { FullLessonData } from '@/data/unit1/lessons';

import { UnitBadge } from '@/components/ui/UnitBadge';
import { CompletionButton } from '@/components/lessons/CompletionButton';
import { LessonNavigation } from '@/components/lessons/LessonNavigation';
import { DistributionExplorer as Unit1DistributionExplorer } from '@/components/lessons/DistributionExplorer';
import { VectorPlayground } from '@/components/vectors/VectorPlayground';
import { DotProductExplorer } from '@/components/vectors/DotProductExplorer';
import { NormDistanceExplorer } from '@/components/vectors/NormDistanceExplorer';
import { ProjectionExplorer } from '@/components/vectors/ProjectionExplorer';
import { LinearCombinationPlayground } from '@/components/vectors/LinearCombinationPlayground';

import { MatrixPlayground } from '@/components/matrices/MatrixPlayground';
import { MatrixMultiplicationExplorer } from '@/components/matrices/MatrixMultiplicationExplorer';
import { TransformationExplorer } from '@/components/matrices/TransformationExplorer';
import { DeterminantExplorer } from '@/components/matrices/DeterminantExplorer';
import { EigenExplorer } from '@/components/matrices/EigenExplorer';

import { ProbabilitySimulator } from '@/components/probability/ProbabilitySimulator';
import { DistributionExplorer } from '@/components/probability/DistributionExplorer';
import { ConditionalProbabilityExplorer } from '@/components/probability/ConditionalProbabilityExplorer';
import { BayesExplorer } from '@/components/probability/BayesExplorer';
import { SamplingDistributionExplorer } from '@/components/probability/SamplingDistributionExplorer';

import { RegressionLineExplorer } from '@/components/regression/RegressionLineExplorer';
import { LeastSquaresExplorer } from '@/components/regression/LeastSquaresExplorer';
import { ResidualExplorer } from '@/components/regression/ResidualExplorer';
import { PolynomialRegressionExplorer } from '@/components/regression/PolynomialRegressionExplorer';
import { RegularizationExplorer } from '@/components/regression/RegularizationExplorer';

import { ClassificationBoundaryExplorer } from '@/components/classification/ClassificationBoundaryExplorer';
import { LogisticRegressionExplorer } from '@/components/classification/LogisticRegressionExplorer';
import { KNNExplorer } from '@/components/classification/KNNExplorer';
import { DecisionTreeExplorer } from '@/components/classification/DecisionTreeExplorer';
import { ConfusionMatrixExplorer } from '@/components/classification/ConfusionMatrixExplorer';

import { FormulaCard } from '@/components/cards/FormulaCard';
import { UNIT_1_FORMULAS } from '@/data/unit1/formulas';
import { UNIT_2_FORMULAS } from '@/data/unit2/formulas';
import { UNIT_3_FORMULAS } from '@/data/unit3/formulas';
import { UNIT_4_FORMULAS } from '@/data/unit4/formulas';
import { UNIT_5_FORMULAS } from '@/data/unit5/formulas';
import { UNIT_6_FORMULAS } from '@/data/unit6/formulas';

interface LessonLayoutProps {
  lesson: FullLessonData;
  prevLesson?: { slug: string; title: string; lessonNumber: number } | null;
  nextLesson?: { slug: string; title: string; lessonNumber: number } | null;
}

export const LessonLayout: React.FC<LessonLayoutProps> = ({
  lesson,
  prevLesson,
  nextLesson,
}) => {
  // Interactive Practice State
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: string]: number }>({});
  const [submittedAnswers, setSubmittedAnswers] = useState<{ [qId: string]: boolean }>({});
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);

  const handleSelectOption = (qId: string, optIdx: number) => {
    if (submittedAnswers[qId]) return; // already submitted
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const handleCheckAnswer = (qId: string) => {
    setSubmittedAnswers((prev) => ({ ...prev, [qId]: true }));
  };

  const copyCode = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIndex(idx);
    setTimeout(() => setCopiedCodeIndex(null), 2000);
  };

  // Find relevant formula if applicable
  const getRelevantFormula = () => {
    if (lesson.unitNumber === 1) {
      if (lesson.slug === 'descriptive-statistics') {
        return UNIT_1_FORMULAS.filter((f) => ['u1-f1', 'u1-f2', 'u1-f3'].includes(f.id));
      }
      if (lesson.slug === 'correlation') {
        return UNIT_1_FORMULAS.filter((f) => f.id === 'u1-f6');
      }
      if (lesson.slug === 'data-distributions') {
        return UNIT_1_FORMULAS.filter((f) => f.id === 'u1-f5');
      }
    } else if (lesson.unitNumber === 2) {
      if (lesson.slug === 'vectors' || lesson.slug === 'vector-operations') {
        return UNIT_2_FORMULAS.filter((f) => ['u2-f1', 'u2-f2'].includes(f.id));
      }
      if (lesson.slug === 'dot-product') {
        return UNIT_2_FORMULAS.filter((f) => ['u2-f3', 'u2-f7'].includes(f.id));
      }
      if (lesson.slug === 'vector-norms') {
        return UNIT_2_FORMULAS.filter((f) => ['u2-f4', 'u2-f5', 'u2-f6'].includes(f.id));
      }
      if (lesson.slug === 'linear-combinations' || lesson.slug === 'basis-and-dimension') {
        return UNIT_2_FORMULAS.filter((f) => f.id === 'u2-f8');
      }
      if (lesson.slug === 'projections') {
        return UNIT_2_FORMULAS.filter((f) => f.id === 'u2-f9');
      }
    } else if (lesson.unitNumber === 3) {
      if (lesson.slug === 'matrices' || lesson.slug === 'matrix-operations') {
        return UNIT_3_FORMULAS.filter((f) => ['u3-f1', 'u3-f2', 'u3-f4'].includes(f.id));
      }
      if (lesson.slug === 'matrix-multiplication') {
        return UNIT_3_FORMULAS.filter((f) => ['u3-f3', 'u3-f7'].includes(f.id));
      }
      if (lesson.slug === 'linear-transformations' || lesson.slug === 'systems-of-equations') {
        return UNIT_3_FORMULAS.filter((f) => f.id === 'u3-f8');
      }
      if (lesson.slug === 'determinants' || lesson.slug === 'inverse-matrices') {
        return UNIT_3_FORMULAS.filter((f) => ['u3-f5', 'u3-f6'].includes(f.id));
      }
      if (lesson.slug === 'eigenvalues-eigenvectors') {
        return UNIT_3_FORMULAS.filter((f) => f.id === 'u3-f9');
      }
    } else if (lesson.unitNumber === 4) {
      if (lesson.slug === 'probability-basics') {
        return UNIT_4_FORMULAS.filter((f) => ['u4-f1', 'u4-f2'].includes(f.id));
      }
      if (lesson.slug === 'random-variables' || lesson.slug === 'probability-distributions') {
        return UNIT_4_FORMULAS.filter((f) => ['u4-f9', 'u4-f12'].includes(f.id));
      }
      if (lesson.slug === 'conditional-probability') {
        return UNIT_4_FORMULAS.filter((f) => ['u4-f3', 'u4-f4'].includes(f.id));
      }
      if (lesson.slug === 'bayes-theorem') {
        return UNIT_4_FORMULAS.filter((f) => f.id === 'u4-f5');
      }
      if (lesson.slug === 'expectation-variance') {
        return UNIT_4_FORMULAS.filter((f) => ['u4-f6', 'u4-f7', 'u4-f8'].includes(f.id));
      }
      if (lesson.slug === 'statistical-inference') {
        return UNIT_4_FORMULAS.filter((f) => f.id === 'u4-f10');
      }
      if (lesson.slug === 'confidence-intervals' || lesson.slug === 'hypothesis-testing') {
        return UNIT_4_FORMULAS.filter((f) => ['u4-f10', 'u4-f11'].includes(f.id));
      }
    } else if (lesson.unitNumber === 5) {
      if (lesson.slug === 'simple-linear-regression' || lesson.slug === 'regression-line') {
        return UNIT_5_FORMULAS.filter((f) => ['u5-f1', 'u5-f4', 'u5-f5'].includes(f.id));
      }
      if (lesson.slug === 'least-squares') {
        return UNIT_5_FORMULAS.filter((f) => ['u5-f3', 'u5-f4', 'u5-f5'].includes(f.id));
      }
      if (lesson.slug === 'residuals' || lesson.slug === 'regression-diagnostics') {
        return UNIT_5_FORMULAS.filter((f) => ['u5-f2', 'u5-f6', 'u5-f7'].includes(f.id));
      }
      if (lesson.slug === 'r-squared-model-fit') {
        return UNIT_5_FORMULAS.filter((f) => ['u5-f8', 'u5-f9', 'u5-f10'].includes(f.id));
      }
      if (lesson.slug === 'multiple-linear-regression') {
        return UNIT_5_FORMULAS.filter((f) => ['u5-f11', 'u5-f12'].includes(f.id));
      }
      if (lesson.slug === 'polynomial-regression') {
        return UNIT_5_FORMULAS.filter((f) => ['u5-f1', 'u5-f11'].includes(f.id));
      }
      if (lesson.slug === 'regularization') {
        return UNIT_5_FORMULAS.filter((f) => ['u5-f13', 'u5-f14'].includes(f.id));
      }
      if (lesson.slug === 'regression-in-data-science') {
        return UNIT_5_FORMULAS.filter((f) => ['u5-f7', 'u5-f9', 'u5-f10'].includes(f.id));
      }
    } else if (lesson.unitNumber === 6) {
      if (lesson.slug === 'classification-fundamentals' || lesson.slug === 'decision-boundaries') {
        return UNIT_6_FORMULAS.filter((f) => ['u6-f1', 'u6-f3'].includes(f.id));
      }
      if (lesson.slug === 'logistic-regression') {
        return UNIT_6_FORMULAS.filter((f) => ['u6-f1', 'u6-f2', 'u6-f3', 'u6-f4', 'u6-f5'].includes(f.id));
      }
      if (lesson.slug === 'knn') {
        return UNIT_6_FORMULAS.filter((f) => ['u6-f6', 'u6-f7', 'u6-f16'].includes(f.id));
      }
      if (lesson.slug === 'decision-trees') {
        return UNIT_6_FORMULAS.filter((f) => ['u6-f8', 'u6-f9', 'u6-f10'].includes(f.id));
      }
      if (lesson.slug === 'ensemble-methods') {
        return UNIT_6_FORMULAS.filter((f) => ['u6-f8', 'u6-f10'].includes(f.id));
      }
      if (lesson.slug === 'model-evaluation') {
        return UNIT_6_FORMULAS.filter((f) => ['u6-f11', 'u6-f12', 'u6-f13', 'u6-f14', 'u6-f15'].includes(f.id));
      }
      if (lesson.slug === 'cross-validation') {
        return UNIT_6_FORMULAS.filter((f) => ['u6-f11', 'u6-f15'].includes(f.id));
      }
      if (lesson.slug === 'feature-engineering') {
        return UNIT_6_FORMULAS.filter((f) => ['u6-f6', 'u6-f16'].includes(f.id));
      }
      if (lesson.slug === 'classification-in-data-science') {
        return UNIT_6_FORMULAS.filter((f) => ['u6-f11', 'u6-f12', 'u6-f13', 'u6-f15'].includes(f.id));
      }
    }
    return [];
  };

  const relevantFormulas = getRelevantFormula();
  const isUnit2 = lesson.unitNumber === 2;
  const isUnit3 = lesson.unitNumber === 3;
  const isUnit4 = lesson.unitNumber === 4;
  const isUnit5 = lesson.unitNumber === 5;
  const isUnit6 = lesson.unitNumber === 6;

  const accentTextClass = isUnit6
    ? 'text-[#8A4E63]'
    : isUnit5
    ? 'text-[#806A28]'
    : isUnit4
    ? 'text-[#68539A]'
    : isUnit3
    ? 'text-[#3F7951]'
    : isUnit2
    ? 'text-[#416B9E]'
    : 'text-[#9E513B]';

  const accentSoftBgClass = isUnit6
    ? 'bg-[#F6E5EB]'
    : isUnit5
    ? 'bg-[#FAF2D8]'
    : isUnit4
    ? 'bg-[#EEE9F8]'
    : isUnit3
    ? 'bg-[#E5F3E9]'
    : isUnit2
    ? 'bg-[#E5EFFB]'
    : 'bg-[#FCE5DC]';

  const accentBorderClass = isUnit6
    ? 'border-[#E5BBC9]'
    : isUnit5
    ? 'border-[#EBD99A]'
    : isUnit4
    ? 'border-[#CFC2EA]'
    : isUnit3
    ? 'border-[#B8DCC3]'
    : isUnit2
    ? 'border-[#B9D1EE]'
    : 'border-[#EFC0B0]';

  const unitPrimaryVar = isUnit6
    ? 'var(--unit-6-primary, #D99AAF)'
    : isUnit5
    ? 'var(--unit-5-primary, #E8C878)'
    : isUnit4
    ? 'var(--unit-4-primary, #B7A3E3)'
    : isUnit3
    ? 'var(--unit-3-primary, #8FC7A3)'
    : isUnit2
    ? 'var(--unit-2-primary, #91B9E8)'
    : 'var(--unit-1-primary, #F4A58A)';

  const unitName = isUnit6
    ? 'Classification & Machine Learning'
    : isUnit5
    ? 'Regression Analysis'
    : isUnit4
    ? 'Probability & Statistics'
    : isUnit3
    ? 'Matrices & Determinants'
    : isUnit2
    ? 'Linear Algebra & Vectors'
    : 'Foundations & EDA';

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-16">
      {/* 1. Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs text-[#64748B] dark:text-[#B8C4D1]">
        <Link href="/" className="hover:text-[#0F172A] dark:hover:text-white transition-colors">
          Curriculum
        </Link>
        <span>/</span>
        <Link href={`/units/${lesson.unitNumber}`} className="hover:text-[#0F172A] dark:hover:text-white transition-colors">
          Unit {lesson.unitNumber.toString().padStart(2, '0')}: {unitName}
        </Link>
        <span>/</span>
        <span className="font-semibold text-[#0F172A] dark:text-[#F1F5F9] truncate max-w-[200px] sm:max-w-none">
          Lesson {lesson.order}: {lesson.title}
        </span>
      </nav>

      {/* 2. Lesson Header Card */}
      <header className="p-6 sm:p-8 bg-white dark:bg-[#151F2B] rounded-2xl border border-[#E2E8F0] dark:border-[#2E3B4A] shadow-xs space-y-5 relative overflow-hidden">
        <div
          className="absolute -right-16 -top-16 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-20 dark:opacity-10"
          style={{ backgroundColor: unitPrimaryVar }}
        />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3">
            <UnitBadge unitId={lesson.unitId} unitNumber={lesson.unitNumber} size="sm" />
            <span className="text-xs font-semibold text-[#64748B] dark:text-[#B8C4D1] uppercase tracking-wider">
              Lesson {lesson.order} of 10
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-[#64748B] dark:text-[#B8C4D1]">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#94A3B8] dark:text-[#7F8B99]" />
              {lesson.estimatedDuration} min read
            </span>
            <span>•</span>
            <span className="capitalize px-2 py-0.5 rounded-md bg-[#F8FAFC] dark:bg-[#101923] border border-[#E2E8F0] dark:border-[#2E3B4A] font-medium text-[#475569] dark:text-[#CBD5E1]">
              {lesson.contentType}
            </span>
          </div>
        </div>

        <div className="space-y-3 relative z-10">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] dark:text-[#F1F5F9] tracking-tight">
            {lesson.title}
          </h1>
          <p className="text-sm sm:text-base text-[#475569] dark:text-[#CBD5E1] leading-relaxed">
            {lesson.shortDescription}
          </p>
        </div>

        {/* Learning Objectives Box */}
        <div className="p-4 bg-[#F8FAFC] dark:bg-[#101923] rounded-xl border border-[#E2E8F0] dark:border-[#2E3B4A] space-y-2 relative z-10">
          <span className="text-xs font-bold text-[#0F172A] dark:text-[#F1F5F9] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className={`w-3.5 h-3.5 ${accentTextClass}`} />
            Learning Objectives
          </span>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-[#475569] dark:text-[#CBD5E1]">
            {lesson.learningObjectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 className={`w-4 h-4 ${accentTextClass} shrink-0 mt-0.5`} />
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>
      </header>

      {/* 3. Main Explanation */}
      <section className="bg-white dark:bg-[#151F2B] p-6 sm:p-8 rounded-2xl border border-[#E2E8F0] dark:border-[#2E3B4A] shadow-xs space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] dark:text-[#F1F5F9] flex items-center gap-2">
          <BookOpen className={`w-5 h-5 ${accentTextClass}`} />
          Overview & Context
        </h2>
        <div className="prose prose-slate dark:prose-invert max-w-none text-sm sm:text-base text-[#334155] dark:text-[#CBD5E1] leading-relaxed">
          <p>{lesson.mainExplanation}</p>
        </div>
      </section>

      {/* 4. Interactive Explorers */}
      {/* Unit 1 Lesson 7: Distribution Explorer */}
      {lesson.unitNumber === 1 && lesson.slug === 'data-distributions' && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2">
              <LayoutGrid className={`w-5 h-5 ${accentTextClass}`} />
              Interactive Distribution Lab
            </h2>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${accentSoftBgClass} ${accentTextClass} border ${accentBorderClass}`}>
              Live Simulation
            </span>
          </div>
          <Unit1DistributionExplorer />
        </section>
      )}

      {/* Unit 2 Vector Explorers */}
      {lesson.unitNumber === 2 && (lesson.slug === 'vector-operations' || lesson.slug === 'vectors' || lesson.slug === 'geometric-interpretation') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2">
              <LayoutGrid className={`w-5 h-5 ${accentTextClass}`} />
              Interactive Vector Playground
            </h2>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${accentSoftBgClass} ${accentTextClass} border ${accentBorderClass}`}>
              Live Vector Canvas
            </span>
          </div>
          <VectorPlayground />
        </section>
      )}

      {lesson.unitNumber === 2 && lesson.slug === 'dot-product' && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2">
              <LayoutGrid className={`w-5 h-5 ${accentTextClass}`} />
              Interactive Dot Product & Cosine Similarity Explorer
            </h2>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${accentSoftBgClass} ${accentTextClass} border ${accentBorderClass}`}>
              Geometry & Orthogonality
            </span>
          </div>
          <DotProductExplorer />
        </section>
      )}

      {lesson.unitNumber === 2 && lesson.slug === 'vector-norms' && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2">
              <LayoutGrid className={`w-5 h-5 ${accentTextClass}`} />
              Interactive Vector Norm & Distance Explorer
            </h2>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${accentSoftBgClass} ${accentTextClass} border ${accentBorderClass}`}>
              L1 Manhattan vs L2 Euclidean
            </span>
          </div>
          <NormDistanceExplorer />
        </section>
      )}

      {lesson.unitNumber === 2 && lesson.slug === 'projections' && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2">
              <LayoutGrid className={`w-5 h-5 ${accentTextClass}`} />
              Interactive Vector Projection Explorer
            </h2>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${accentSoftBgClass} ${accentTextClass} border ${accentBorderClass}`}>
              Orthogonal Decomposition
            </span>
          </div>
          <ProjectionExplorer />
        </section>
      )}

      {lesson.unitNumber === 2 && (lesson.slug === 'linear-combinations' || lesson.slug === 'basis-and-dimension') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2">
              <LayoutGrid className={`w-5 h-5 ${accentTextClass}`} />
              Interactive Linear Combination & Span Playground
            </h2>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${accentSoftBgClass} ${accentTextClass} border ${accentBorderClass}`}>
              Basis & Synthesis
            </span>
          </div>
          <LinearCombinationPlayground />
        </section>
      )}

      {/* Unit 3 Matrix Explorers */}
      {lesson.unitNumber === 3 && (lesson.slug === 'matrices' || lesson.slug === 'matrix-operations') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2">
              <LayoutGrid className={`w-5 h-5 ${accentTextClass}`} />
              Interactive Matrix Playground
            </h2>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${accentSoftBgClass} ${accentTextClass} border ${accentBorderClass}`}>
              Dynamic Dimensions & Operations
            </span>
          </div>
          <MatrixPlayground />
        </section>
      )}

      {lesson.unitNumber === 3 && lesson.slug === 'matrix-multiplication' && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2">
              <LayoutGrid className={`w-5 h-5 ${accentTextClass}`} />
              Interactive Matrix Multiplication Explorer
            </h2>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${accentSoftBgClass} ${accentTextClass} border ${accentBorderClass}`}>
              Row × Column Dot Product
            </span>
          </div>
          <MatrixMultiplicationExplorer />
        </section>
      )}

      {lesson.unitNumber === 3 && (lesson.slug === 'linear-transformations' || lesson.slug === 'systems-of-equations') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2">
              <LayoutGrid className={`w-5 h-5 ${accentTextClass}`} />
              Interactive Linear Transformation Explorer
            </h2>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${accentSoftBgClass} ${accentTextClass} border ${accentBorderClass}`}>
              2D Grid Transformation
            </span>
          </div>
          <TransformationExplorer />
        </section>
      )}

      {lesson.unitNumber === 3 && (lesson.slug === 'determinants' || lesson.slug === 'inverse-matrices') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2">
              <LayoutGrid className={`w-5 h-5 ${accentTextClass}`} />
              Interactive Determinant & Area Explorer
            </h2>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${accentSoftBgClass} ${accentTextClass} border ${accentBorderClass}`}>
              Signed Area & Invertibility
            </span>
          </div>
          <DeterminantExplorer />
        </section>
      )}

      {lesson.unitNumber === 3 && (lesson.slug === 'eigenvalues-eigenvectors' || lesson.slug === 'matrices-in-data-science') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2">
              <LayoutGrid className={`w-5 h-5 ${accentTextClass}`} />
              Interactive Eigenvalue & Eigenvector Explorer
            </h2>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${accentSoftBgClass} ${accentTextClass} border ${accentBorderClass}`}>
              Spectral Axis Invariants
            </span>
          </div>
          <EigenExplorer />
        </section>
      )}

      {/* Unit 4 Probability Explorers */}
      {lesson.unitNumber === 4 && lesson.slug === 'probability-basics' && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2">
              <LayoutGrid className={`w-5 h-5 ${accentTextClass}`} />
              Interactive Probability Simulator
            </h2>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${accentSoftBgClass} ${accentTextClass} border ${accentBorderClass}`}>
              Law of Large Numbers
            </span>
          </div>
          <ProbabilitySimulator />
        </section>
      )}

      {lesson.unitNumber === 4 && (lesson.slug === 'random-variables' || lesson.slug === 'probability-distributions') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2">
              <LayoutGrid className={`w-5 h-5 ${accentTextClass}`} />
              Interactive Distribution Explorer
            </h2>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${accentSoftBgClass} ${accentTextClass} border ${accentBorderClass}`}>
              PMFs & PDFs
            </span>
          </div>
          <DistributionExplorer />
        </section>
      )}

      {lesson.unitNumber === 4 && lesson.slug === 'conditional-probability' && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2">
              <LayoutGrid className={`w-5 h-5 ${accentTextClass}`} />
              Interactive Conditional Probability Explorer
            </h2>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${accentSoftBgClass} ${accentTextClass} border ${accentBorderClass}`}>
              Venn Sample Space & Independence
            </span>
          </div>
          <ConditionalProbabilityExplorer />
        </section>
      )}

      {lesson.unitNumber === 4 && lesson.slug === 'bayes-theorem' && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2">
              <LayoutGrid className={`w-5 h-5 ${accentTextClass}`} />
              Interactive Bayes’ Theorem Explorer
            </h2>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${accentSoftBgClass} ${accentTextClass} border ${accentBorderClass}`}>
              Prior, Likelihood & Posterior
            </span>
          </div>
          <BayesExplorer />
        </section>
      )}

      {lesson.unitNumber === 4 && (lesson.slug === 'expectation-variance' || lesson.slug === 'statistical-inference' || lesson.slug === 'confidence-intervals' || lesson.slug === 'hypothesis-testing' || lesson.slug === 'probability-statistics-data-science') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2">
              <LayoutGrid className={`w-5 h-5 ${accentTextClass}`} />
              Interactive Central Limit Theorem Explorer
            </h2>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${accentSoftBgClass} ${accentTextClass} border ${accentBorderClass}`}>
              Sampling Distributions & Standard Error
            </span>
          </div>
          <SamplingDistributionExplorer />
        </section>
      )}

      {/* Unit 5 Regression Explorers */}
      {lesson.unitNumber === 5 && (lesson.slug === 'simple-linear-regression' || lesson.slug === 'regression-line' || lesson.slug === 'regression-in-data-science') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2">
              <LayoutGrid className={`w-5 h-5 ${accentTextClass}`} />
              Interactive Regression Line Explorer
            </h2>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${accentSoftBgClass} ${accentTextClass} border ${accentBorderClass}`}>
              Slope, Intercept & Predictions
            </span>
          </div>
          <RegressionLineExplorer />
        </section>
      )}

      {lesson.unitNumber === 5 && lesson.slug === 'least-squares' && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2">
              <LayoutGrid className={`w-5 h-5 ${accentTextClass}`} />
              Interactive Least-Squares Explorer
            </h2>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${accentSoftBgClass} ${accentTextClass} border ${accentBorderClass}`}>
              Squared Error Area Minimization
            </span>
          </div>
          <LeastSquaresExplorer />
        </section>
      )}

      {lesson.unitNumber === 5 && (lesson.slug === 'residuals' || lesson.slug === 'r-squared-model-fit' || lesson.slug === 'regression-diagnostics') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2">
              <LayoutGrid className={`w-5 h-5 ${accentTextClass}`} />
              Interactive Residual & Diagnostics Explorer
            </h2>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${accentSoftBgClass} ${accentTextClass} border ${accentBorderClass}`}>
              Residual Distributions & Pattern Violation
            </span>
          </div>
          <ResidualExplorer />
        </section>
      )}

      {lesson.unitNumber === 5 && lesson.slug === 'polynomial-regression' && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2">
              <LayoutGrid className={`w-5 h-5 ${accentTextClass}`} />
              Interactive Polynomial Regression Explorer
            </h2>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${accentSoftBgClass} ${accentTextClass} border ${accentBorderClass}`}>
              Capacity, Underfitting & Overfitting
            </span>
          </div>
          <PolynomialRegressionExplorer />
        </section>
      )}

      {lesson.unitNumber === 5 && (lesson.slug === 'multiple-linear-regression' || lesson.slug === 'regularization') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2">
              <LayoutGrid className={`w-5 h-5 ${accentTextClass}`} />
              Interactive Regularization Explorer
            </h2>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${accentSoftBgClass} ${accentTextClass} border ${accentBorderClass}`}>
              Ridge (L2) vs. Lasso (L1) Shrinkage
            </span>
          </div>
          <RegularizationExplorer />
        </section>
      )}

      {/* Unit 6 Classification Explorers */}
      {lesson.unitNumber === 6 && (lesson.slug === 'classification-fundamentals' || lesson.slug === 'decision-boundaries' || lesson.slug === 'ensemble-methods') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2">
              <LayoutGrid className={`w-5 h-5 ${accentTextClass}`} />
              Interactive Classification Boundary Explorer
            </h2>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${accentSoftBgClass} ${accentTextClass} border ${accentBorderClass}`}>
              Linear vs. Non-Parametric Partitions
            </span>
          </div>
          <ClassificationBoundaryExplorer />
        </section>
      )}

      {lesson.unitNumber === 6 && lesson.slug === 'logistic-regression' && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2">
              <LayoutGrid className={`w-5 h-5 ${accentTextClass}`} />
              Interactive Logistic Regression Explorer
            </h2>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${accentSoftBgClass} ${accentTextClass} border ${accentBorderClass}`}>
              Sigmoid Curve & Log Loss
            </span>
          </div>
          <LogisticRegressionExplorer />
        </section>
      )}

      {lesson.unitNumber === 6 && (lesson.slug === 'knn' || lesson.slug === 'feature-engineering') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2">
              <LayoutGrid className={`w-5 h-5 ${accentTextClass}`} />
              Interactive k-Nearest Neighbors Explorer
            </h2>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${accentSoftBgClass} ${accentTextClass} border ${accentBorderClass}`}>
              Euclidean Distances & Voting Radius
            </span>
          </div>
          <KNNExplorer />
        </section>
      )}

      {lesson.unitNumber === 6 && lesson.slug === 'decision-trees' && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2">
              <LayoutGrid className={`w-5 h-5 ${accentTextClass}`} />
              Interactive Decision Tree Explorer
            </h2>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${accentSoftBgClass} ${accentTextClass} border ${accentBorderClass}`}>
              Recursive Partitioning & Gini Impurity
            </span>
          </div>
          <DecisionTreeExplorer />
        </section>
      )}

      {lesson.unitNumber === 6 && (lesson.slug === 'model-evaluation' || lesson.slug === 'cross-validation' || lesson.slug === 'classification-in-data-science') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2">
              <LayoutGrid className={`w-5 h-5 ${accentTextClass}`} />
              Interactive Confusion Matrix & Model Evaluation Explorer
            </h2>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${accentSoftBgClass} ${accentTextClass} border ${accentBorderClass}`}>
              2×2 Outcomes & Threshold Calibration
            </span>
          </div>
          <ConfusionMatrixExplorer />
        </section>
      )}

      {/* 5. Concept Sections */}
      <section className="space-y-6">
        {lesson.conceptSections.map((section, idx) => (
          <article
            key={section.id}
            className="p-6 sm:p-8 bg-white dark:bg-[#151F2B] rounded-2xl border border-[#E2E8F0] dark:border-[#2E3B4A] shadow-xs space-y-5"
          >
            <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] dark:text-[#F1F5F9] border-b border-[#F1F5F9] dark:border-[#2E3B4A] pb-3">
              {idx + 1}. {section.title}
            </h3>

            {/* Paragraphs */}
            <div className="space-y-3 text-sm sm:text-base text-[#334155] dark:text-[#CBD5E1] leading-relaxed">
              {section.content.map((p, pIdx) => (
                <p key={pIdx}>{p}</p>
              ))}
            </div>

            {/* Table if present */}
            {section.table && (
              <div className="space-y-2 pt-2">
                {section.table.caption && (
                  <span className="text-xs font-semibold text-[#64748B] dark:text-[#B8C4D1] block">
                    {section.table.caption}
                  </span>
                )}
                <div className="overflow-x-auto border border-[#E2E8F0] dark:border-[#2E3B4A] rounded-xl">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <thead className="bg-[#F8FAFC] dark:bg-[#101923] border-b border-[#E2E8F0] dark:border-[#2E3B4A] text-[#0F172A] dark:text-[#F1F5F9] font-semibold">
                      <tr>
                        {section.table.headers.map((h, i) => (
                          <th key={i} className="py-2.5 px-3 sm:px-4">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F1F5F9] dark:divide-[#2E3B4A] text-[#475569] dark:text-[#CBD5E1]">
                      {section.table.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-[#F8FAFC]/50 dark:hover:bg-[#1A2634]/50 transition-colors">
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="py-2.5 px-3 sm:px-4">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Callout Box */}
            {section.callout && (
              <div
                className={`p-4 rounded-xl border flex items-start gap-3.5 ${
                  section.callout.type === 'tip'
                    ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                    : section.callout.type === 'warning'
                    ? 'bg-amber-50/80 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200'
                    : section.callout.type === 'math'
                    ? `${accentSoftBgClass}/60 dark:bg-[#1C2A3A] ${accentBorderClass} dark:border-[#3B526B] ${accentTextClass} dark:text-[#F1F5F9]`
                    : 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-200'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {section.callout.type === 'tip' && <Lightbulb className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
                  {section.callout.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />}
                  {section.callout.type === 'math' && <Sigma className={`w-4 h-4 ${accentTextClass}`} />}
                  {section.callout.type === 'info' && <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
                </div>
                <div className="space-y-1 text-xs sm:text-sm">
                  <h4 className="font-bold">{section.callout.title}</h4>
                  <p className="leading-relaxed opacity-95">{section.callout.text}</p>
                </div>
              </div>
            )}

            {/* Code Snippet */}
            {section.codeSnippet && (
              <div className="rounded-xl overflow-hidden border border-[#1E293B] dark:border-[#2E3B4A] bg-[#0F172A] text-white">
                <div className="px-4 py-2 bg-[#1E293B] dark:bg-[#151F2B] flex items-center justify-between text-xs text-[#94A3B8] dark:text-[#B8C4D1]">
                  <div className="flex items-center gap-2">
                    <Code className="w-3.5 h-3.5" />
                    <span className="font-mono uppercase">{section.codeSnippet.language}</span>
                    {section.codeSnippet.caption && (
                      <span className="text-[#64748B] dark:text-[#7F8B99]">({section.codeSnippet.caption})</span>
                    )}
                  </div>
                  <button
                    onClick={() => copyCode(section.codeSnippet!.code, idx)}
                    className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
                  >
                    {copiedCodeIndex === idx ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 text-xs sm:text-sm font-mono overflow-x-auto text-[#E2E8F0] leading-relaxed">
                  <code>{section.codeSnippet.code}</code>
                </pre>
              </div>
            )}
          </article>
        ))}
      </section>

      {/* 6. Formula Cards (if relevant to this lesson) */}
      {relevantFormulas.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] dark:text-[#F1F5F9] flex items-center gap-2">
            <Sigma className={`w-5 h-5 ${accentTextClass}`} />
            Mathematical Derivations & Formulas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relevantFormulas.map((f) => (
              <FormulaCard key={f.id} formula={f} />
            ))}
          </div>
        </section>
      )}

      {/* 7. Key Takeaways */}
      <section className={`p-6 sm:p-8 bg-gradient-to-br from-[#FAF5F0] to-${isUnit4 ? '[#EEE9F8]/40' : isUnit3 ? '[#E5F3E9]/40' : isUnit2 ? '[#E5EFFB]/40' : '[#FCE5DC]/40'} dark:from-[#1A2634] dark:to-[#151F2B] rounded-2xl border ${accentBorderClass} dark:border-[#2E3B4A] shadow-xs space-y-4`}>
        <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] dark:text-[#F1F5F9] flex items-center gap-2">
          <Lightbulb className={`w-5 h-5 ${accentTextClass}`} />
          Key Takeaways
        </h2>
        <ul className="space-y-2.5 text-xs sm:text-sm text-[#334155] dark:text-[#CBD5E1]">
          {lesson.keyTakeaways.map((takeaway, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className={`w-5 h-5 rounded-full ${accentSoftBgClass} dark:bg-[#202D3B] ${accentTextClass} dark:text-[#F1F5F9] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5`}>
                {i + 1}
              </span>
              <span className="leading-relaxed font-medium">{takeaway}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 8. Practice Section */}
      {lesson.practiceQuestions && lesson.practiceQuestions.length > 0 && (
        <section className="p-6 sm:p-8 bg-white dark:bg-[#151F2B] rounded-2xl border border-[#E2E8F0] dark:border-[#2E3B4A] shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-[#F1F5F9] dark:border-[#2E3B4A] pb-4">
            <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] dark:text-[#F1F5F9] flex items-center gap-2">
              <HelpCircle className={`w-5 h-5 ${accentTextClass}`} />
              Check Your Understanding
            </h2>
            <span className="text-xs text-[#64748B] dark:text-[#B8C4D1]">
              {lesson.practiceQuestions.length} Concept Question{lesson.practiceQuestions.length > 1 ? 's' : ''}
            </span>
          </div>

          <div className="space-y-8">
            {lesson.practiceQuestions.map((q, qIndex) => {
              const selected = selectedAnswers[q.id];
              const submitted = submittedAnswers[q.id];
              const isCorrect = submitted && selected === q.correctIndex;

              return (
                <div key={q.id} className="space-y-4">
                  <h3 className="text-sm sm:text-base font-semibold text-[#0F172A] dark:text-[#F1F5F9]">
                    {qIndex + 1}. {q.question}
                  </h3>

                  {/* Options */}
                  <div className="space-y-2">
                    {q.options.map((opt, optIdx) => {
                      const isOptionSelected = selected === optIdx;
                      let optionClasses = 'bg-white dark:bg-[#1A2634] border-[#E2E8F0] dark:border-[#2E3B4A] hover:border-[#CBD5E1] dark:hover:border-[#3D4F63] text-[#334155] dark:text-[#CBD5E1]';

                      if (submitted) {
                        if (optIdx === q.correctIndex) {
                          optionClasses = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-600 text-emerald-950 dark:text-emerald-200 font-medium';
                        } else if (isOptionSelected && !isCorrect) {
                          optionClasses = 'bg-red-50 dark:bg-red-950/40 border-red-300 dark:border-red-700 text-red-950 dark:text-red-200';
                        } else {
                          optionClasses = 'bg-[#F8FAFC] dark:bg-[#101923] border-[#E2E8F0] dark:border-[#2E3B4A] text-[#94A3B8] dark:text-[#64748B] opacity-60';
                        }
                      } else if (isOptionSelected) {
                        optionClasses = isUnit4
                          ? 'bg-[#EEE9F8] dark:bg-[#34244F] border-[#B7A3E3] text-[#68539A] dark:text-[#D1C5EE] font-semibold ring-1 ring-[#B7A3E3]'
                          : isUnit3
                          ? 'bg-[#E5F3E9] dark:bg-[#1B3826] border-[#8FC7A3] text-[#3F7951] dark:text-[#A7D8B7] font-semibold ring-1 ring-[#8FC7A3]'
                          : isUnit2
                          ? 'bg-[#E5EFFB] dark:bg-[#1B2F48] border-[#91B9E8] text-[#416B9E] dark:text-[#A8C8EE] font-semibold ring-1 ring-[#91B9E8]'
                          : 'bg-[#FCE5DC] dark:bg-[#432820] border-[#F4A58A] text-[#9E513B] dark:text-[#F8B4A6] font-semibold ring-1 ring-[#F4A58A]';
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectOption(q.id, optIdx)}
                          disabled={submitted}
                          className={`w-full p-3 sm:p-3.5 rounded-xl border text-left text-xs sm:text-sm flex items-center justify-between gap-3 transition-all cursor-pointer disabled:cursor-default ${optionClasses}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-md bg-[#F1F5F9] dark:bg-[#253548] border border-[#E2E8F0] dark:border-[#2E3B4A] text-xs font-bold text-[#64748B] dark:text-[#CBD5E1] flex items-center justify-center shrink-0">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span>{opt}</span>
                          </div>

                          {submitted && optIdx === q.correctIndex && (
                            <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          )}
                          {submitted && isOptionSelected && !isCorrect && (
                            <X className="w-4 h-4 text-red-500 dark:text-red-400 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Action & Explanation */}
                  {!submitted ? (
                    <div className="pt-2">
                      <button
                        onClick={() => handleCheckAnswer(q.id)}
                        disabled={selected === undefined}
                        className="px-4 py-2 bg-[#0F172A] dark:bg-[#F1F5F9] hover:bg-[#1E293B] dark:hover:bg-white disabled:bg-[#E2E8F0] dark:disabled:bg-[#202D3B] disabled:text-[#94A3B8] dark:disabled:text-[#64748B] text-white dark:text-[#0F172A] rounded-lg text-xs font-semibold transition-colors cursor-pointer disabled:cursor-not-allowed shadow-xs"
                      >
                        Check Answer
                      </button>
                    </div>
                  ) : (
                    <div
                      className={`p-4 rounded-xl border text-xs sm:text-sm space-y-1.5 ${
                        isCorrect
                          ? 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200'
                          : 'bg-red-50/80 dark:bg-red-950/30 border-red-200 dark:border-red-800 text-red-950 dark:text-red-200'
                      }`}
                    >
                      <div className="font-bold flex items-center gap-1.5">
                        {isCorrect ? (
                          <>
                            <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                            <span>Correct! Excellent intuition.</span>
                          </>
                        ) : (
                          <>
                            <X className="w-4 h-4 text-red-500 dark:text-red-400" />
                            <span>Not quite. Let&apos;s review why:</span>
                          </>
                        )}
                      </div>
                      <p className="leading-relaxed opacity-90">{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 9. Completion CTA Bar */}
      <div className="p-6 bg-white dark:bg-[#151F2B] rounded-2xl border border-[#E2E8F0] dark:border-[#2E3B4A] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-base font-bold text-[#0F172A] dark:text-[#F1F5F9]">Finished reading this module?</h3>
          <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#B8C4D1]">
            Save your progress to unlock the next milestone in your learning path.
          </p>
        </div>
        <CompletionButton unitId={lesson.unitId} lessonId={lesson.id} />
      </div>

      {/* 10. Navigation to Prev / Next Lesson */}
      <LessonNavigation
        unitId={lesson.unitId}
        unitNumber={lesson.unitNumber}
        prevLesson={prevLesson}
        nextLesson={nextLesson}
      />
    </div>
  );
};
