'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  ArrowRight,
  Sparkles,
  FileSpreadsheet,
} from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { UnitBadge } from '@/components/ui/UnitBadge';
import { UNITS_DATA } from '@/lib/constants';
import { UnitId } from '@/types';

interface VisualizationCardInfo {
  id: string;
  title: string;
  unitNumber: number;
  unitId: UnitId;
  unitName: string;
  category: string;
  description: string;
  csvSupported: boolean;
  interactive: boolean;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  route: string;
}

export const VISUALIZATION_CATALOG: VisualizationCardInfo[] = [
  // UNIT 1
  {
    id: 'kde_density',
    title: 'Kernel Density Estimation (KDE) Density Plot',
    unitNumber: 1,
    unitId: 'unit-1',
    unitName: 'Foundations & EDA',
    category: 'EDA & Distributions',
    description: 'Continuous probability density estimation using Gaussian kernel smoothing across custom bandwidths.',
    csvSupported: true,
    interactive: true,
    difficulty: 'Beginner',
    route: '/units/1',
  },
  {
    id: 'ecdf_curve',
    title: 'Empirical Cumulative Distribution Function (ECDF)',
    unitNumber: 1,
    unitId: 'unit-1',
    unitName: 'Foundations & EDA',
    category: 'EDA & Distributions',
    description: 'Step-function cumulative distribution mapping exact empirical percentiles and median quantiles.',
    csvSupported: true,
    interactive: true,
    difficulty: 'Beginner',
    route: '/units/1',
  },
  {
    id: 'tukey_outlier',
    title: 'Tukey 1.5×IQR Outlier Diagnostic Strip',
    unitNumber: 1,
    unitId: 'unit-1',
    unitName: 'Foundations & EDA',
    category: 'Data Quality & Cleaning',
    description: 'Identify mild and extreme anomalous observations beyond the upper and lower interquartile fences.',
    csvSupported: true,
    interactive: true,
    difficulty: 'Intermediate',
    route: '/units/1',
  },
  {
    id: 'box_whisker',
    title: '5-Number Summary Box & Whisker Plot',
    unitNumber: 1,
    unitId: 'unit-1',
    unitName: 'Foundations & EDA',
    category: 'Descriptive Statistics',
    description: 'Visual summary of minimum, Q1, median, Q3, and maximum with outlier whisker boundaries.',
    csvSupported: true,
    interactive: true,
    difficulty: 'Beginner',
    route: '/units/1',
  },
  {
    id: 'bivariate_scatter',
    title: 'Bivariate Feature Correlation Scatter Plot',
    unitNumber: 1,
    unitId: 'unit-1',
    unitName: 'Foundations & EDA',
    category: 'Bivariate Analysis',
    description: 'Interactive scatter plot with Pearson r correlation evaluation and dynamic variable mapping.',
    csvSupported: true,
    interactive: true,
    difficulty: 'Beginner',
    route: '/units/1',
  },
  {
    id: 'correlation_heatmap',
    title: 'Multivariate Correlation Matrix Heatmap',
    unitNumber: 1,
    unitId: 'unit-1',
    unitName: 'Foundations & EDA',
    category: 'Multivariate Statistics',
    description: 'Color-encoded matrix of pairwise Pearson correlation coefficients across feature dimensions.',
    csvSupported: true,
    interactive: true,
    difficulty: 'Intermediate',
    route: '/units/1',
  },
  {
    id: 'missing_matrix',
    title: 'Multivariate Missing-Value Spark Matrix',
    unitNumber: 1,
    unitId: 'unit-1',
    unitName: 'Foundations & EDA',
    category: 'Data Quality & Cleaning',
    description: 'Nullness pattern detector highlighting complete-case subsets and missing column proportions.',
    csvSupported: true,
    interactive: true,
    difficulty: 'Intermediate',
    route: '/units/1',
  },

  // UNIT 2
  {
    id: 'vector_coordinate_plane',
    title: '2D Vector Space Coordinate Plane',
    unitNumber: 2,
    unitId: 'unit-2',
    unitName: 'Linear Algebra & Vectors',
    category: 'Vector Geometry',
    description: 'Interactive vector addition, subtraction, scalar scaling, and parallelogram law visualization.',
    csvSupported: true,
    interactive: true,
    difficulty: 'Beginner',
    route: '/units/2',
  },
  {
    id: 'cosine_similarity_explorer',
    title: 'Cosine Similarity & Angular Separation Explorer',
    unitNumber: 2,
    unitId: 'unit-2',
    unitName: 'Linear Algebra & Vectors',
    category: 'Metric Distances & Angles',
    description: 'Evaluate orientation metric cos(θ) independent of Euclidean vector magnitude.',
    csvSupported: true,
    interactive: true,
    difficulty: 'Intermediate',
    route: '/units/2',
  },
  {
    id: 'vector_projections',
    title: 'Orthogonal Vector Projection & Gram-Schmidt',
    unitNumber: 2,
    unitId: 'unit-2',
    unitName: 'Linear Algebra & Vectors',
    category: 'Orthogonality & Subspaces',
    description: 'Decompose vectors into parallel projection components and orthogonal error residuals.',
    csvSupported: true,
    interactive: true,
    difficulty: 'Intermediate',
    route: '/units/2',
  },

  // UNIT 3
  {
    id: 'matrix_transform_grid',
    title: '2D Affine Matrix Transformation Grid',
    unitNumber: 3,
    unitId: 'unit-3',
    unitName: 'Matrices & Transformations',
    category: 'Matrix Geometry',
    description: 'Observe spatial basis vector warping, rotations, shears, and determinant area scaling.',
    csvSupported: true,
    interactive: true,
    difficulty: 'Intermediate',
    route: '/units/3',
  },
  {
    id: 'determinant_area_scaling',
    title: 'Determinant & Oriented Area Scaling',
    unitNumber: 3,
    unitId: 'unit-3',
    unitName: 'Matrices & Transformations',
    category: 'Determinants',
    description: 'Geometric interpretation of det(A) as signed area distortion factor and rank singular detector.',
    csvSupported: true,
    interactive: true,
    difficulty: 'Intermediate',
    route: '/units/3',
  },

  // UNIT 4
  {
    id: 'clt_sampling_sim',
    title: 'Central Limit Theorem (CLT) Sampling Distribution',
    unitNumber: 4,
    unitId: 'unit-4',
    unitName: 'Probability & Statistics',
    category: 'Sampling & Inference',
    description: 'Monte Carlo trial generator proving normality of sample means regardless of underlying skew.',
    csvSupported: true,
    interactive: true,
    difficulty: 'Intermediate',
    route: '/units/4',
  },
  {
    id: 'ab_test_hypothesis',
    title: 'Two-Sample A/B Test & P-Value Explorer',
    unitNumber: 4,
    unitId: 'unit-4',
    unitName: 'Probability & Statistics',
    category: 'Hypothesis Testing',
    description: 'Analyze observed conversion lifts and null hypothesis test statistics on sample telemetry.',
    csvSupported: true,
    interactive: true,
    difficulty: 'Advanced',
    route: '/units/4',
  },

  // UNIT 5
  {
    id: 'polynomial_overfitting',
    title: 'Polynomial Degree & Overfitting Curve',
    unitNumber: 5,
    unitId: 'unit-5',
    unitName: 'Regression Analysis',
    category: 'Model Complexity',
    description: 'Tune polynomial degrees d=1..9 and diagnose training bias vs validation variance explosion.',
    csvSupported: true,
    interactive: true,
    difficulty: 'Intermediate',
    route: '/units/5',
  },
  {
    id: 'gradient_descent_loss',
    title: 'Convex Loss Surface & Gradient Descent Trajectory',
    unitNumber: 5,
    unitId: 'unit-5',
    unitName: 'Regression Analysis',
    category: 'Optimization & Calculus',
    description: 'Trace step-by-step parameter updates and observe learning rate convergence vs divergence.',
    csvSupported: true,
    interactive: true,
    difficulty: 'Advanced',
    route: '/units/5',
  },

  // UNIT 6
  {
    id: 'roc_auc_curve',
    title: 'Receiver Operating Characteristic (ROC) & AUC Curve',
    unitNumber: 6,
    unitId: 'unit-6',
    unitName: 'Classification & ML',
    category: 'Model Evaluation',
    description: 'Tune cutoff threshold t and inspect trade-offs between True Positive Rate and False Positive Rate.',
    csvSupported: true,
    interactive: true,
    difficulty: 'Intermediate',
    route: '/units/6',
  },
  {
    id: 'decision_boundary_confusion',
    title: '2D Decision Boundary & Confusion Matrix Explorer',
    unitNumber: 6,
    unitId: 'unit-6',
    unitName: 'Classification & ML',
    category: 'Classification Models',
    description: 'Interactive TP/FP/TN/FN recalculation with precision, recall, and F1 score tracking.',
    csvSupported: true,
    interactive: true,
    difficulty: 'Advanced',
    route: '/units/6',
  },
];

export default function VisualizationsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUnit, setSelectedUnit] = useState<number | 'all'>('all');

  const filteredVisualizations = VISUALIZATION_CATALOG.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.unitName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesUnit = selectedUnit === 'all' || item.unitNumber === selectedUnit;
    return matchesSearch && matchesUnit;
  });

  return (
    <div className="space-y-10 pb-16">
      {/* Page Header */}
      <PageHeader
        title="Visualization Lab Library"
        description="Comprehensive collection of interactive statistical graphics, mathematical coordinate planes, probability density plots, and machine learning models with CSV-first data ingestion."
        breadcrumbs={[{ label: 'Visualization Library' }]}
        actions={
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#111827] text-xs text-[#64748B] dark:text-[#CBD5E1] shadow-2xs">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>
              <strong>{VISUALIZATION_CATALOG.length}</strong> Interactive Labs • Full CSV Support
            </span>
          </div>
        }
      />

      {/* Filter & Search Bar */}
      <div className="p-5 bg-white dark:bg-[#111827] rounded-2xl border border-[#E2E8F0] dark:border-[#334155] shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
            <input
              type="text"
              placeholder="Search visualizations (e.g., KDE, ROC, Gradient Descent)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs bg-[#F8FAFC] dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] rounded-xl text-[#0F172A] dark:text-[#F8FAFC] focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Unit Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            <button
              onClick={() => setSelectedUnit('all')}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                selectedUnit === 'all'
                  ? 'bg-[#172033] dark:bg-[#1E293B] text-white shadow-xs'
                  : 'bg-[#F8FAFC] dark:bg-[#1E293B] text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A]'
              }`}
            >
              All Units ({VISUALIZATION_CATALOG.length})
            </button>
            {[1, 2, 3, 4, 5, 6].map((uNum) => {
              const u = UNITS_DATA.find((unit) => unit.unitNumber === uNum);
              const isSelected = selectedUnit === uNum;
              return (
                <button
                  key={uNum}
                  onClick={() => setSelectedUnit(uNum)}
                  style={
                    isSelected && u
                      ? {
                          backgroundColor: u.colorTokens.soft,
                          color: u.colorTokens.text,
                          borderColor: u.colorTokens.border,
                        }
                      : undefined
                  }
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap border ${
                    isSelected
                      ? 'shadow-xs'
                      : 'border-transparent bg-[#F8FAFC] dark:bg-[#1E293B] text-[#64748B] dark:text-[#94A3B8] hover:text-[#172033]'
                  }`}
                >
                  Unit {uNum}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grid of Visualization Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVisualizations.map((item) => {
          const u = UNITS_DATA.find((unit) => unit.unitNumber === item.unitNumber);
          return (
            <div
              key={item.id}
              className="p-6 bg-white dark:bg-[#111827] rounded-2xl border border-[#E2E8F0] dark:border-[#334155] shadow-xs hover-lift flex flex-col justify-between space-y-4 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <UnitBadge unitId={item.unitId} unitNumber={item.unitNumber} size="sm" />
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {item.difficulty}
                  </span>
                </div>

                <div>
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider block mb-1"
                    style={{ color: u?.colorTokens.primary || '#91B9E8' }}
                  >
                    {item.category}
                  </span>
                  <h3 className="text-base font-bold text-[#172033] dark:text-[#F8FAFC]">
                    {item.title}
                  </h3>
                </div>

                <p className="text-xs text-[#475569] dark:text-[#CBD5E1] leading-relaxed">
                  {item.description}
                </p>

                <div className="flex items-center gap-3 pt-2 text-[11px] text-[#64748B] dark:text-[#94A3B8]">
                  {item.interactive && (
                    <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                      <span>●</span> Interactive
                    </span>
                  )}
                  {item.csvSupported && (
                    <span className="flex items-center gap-1 font-semibold" style={{ color: u?.colorTokens.text || '#416B9E' }}>
                      <FileSpreadsheet className="w-3.5 h-3.5" /> CSV Supported
                    </span>
                  )}
                </div>
              </div>

              <Link href={item.route} className="block pt-2">
                <button className="w-full py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-[#172033] dark:text-[#F8FAFC] font-bold text-xs border border-[#E2E8F0] dark:border-[#334155] flex items-center justify-center gap-1.5 transition-colors cursor-pointer">
                  <span>Launch in Unit {item.unitNumber}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
