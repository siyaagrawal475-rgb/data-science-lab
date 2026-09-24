'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  BookOpen,
  FlaskConical,
  Sigma,
  Layers,
  X,
  CornerDownLeft,
} from 'lucide-react';
import { UNITS_DATA } from '@/lib/constants';
import { UNIT_1_LESSONS } from '@/data/unit1/lessons';
import { UNIT_2_LESSONS } from '@/data/unit2/lessons';
import { UNIT_3_LESSONS } from '@/data/unit3/lessons';
import { UNIT_4_LESSONS } from '@/data/unit4/lessons';
import { UNIT_5_LESSONS } from '@/data/unit5/lessons';
import { UNIT_6_LESSONS } from '@/data/unit6/lessons';
import { UNIT_1_FORMULAS } from '@/data/unit1/formulas';
import { UNIT_2_FORMULAS } from '@/data/unit2/formulas';
import { UNIT_3_FORMULAS } from '@/data/unit3/formulas';
import { UNIT_4_FORMULAS } from '@/data/unit4/formulas';
import { UNIT_5_FORMULAS } from '@/data/unit5/formulas';
import { UNIT_6_FORMULAS } from '@/data/unit6/formulas';

interface SearchItem {
  id: string;
  type: 'unit' | 'lesson' | 'lab' | 'formula';
  title: string;
  subtitle: string;
  url: string;
  unitNumber?: number;
  badge?: string;
  accentColor?: string;
}

const ALL_LABS: SearchItem[] = [
  // Unit 1
  { id: 'lab-eda', type: 'lab', title: 'Exploratory Data Analysis Lab', subtitle: 'Profiling distributions & 5-number summaries', url: '/labs/eda', unitNumber: 1 },
  { id: 'lab-cleaning', type: 'lab', title: 'Interactive Data Cleaning Lab', subtitle: 'Outlier detection & missing value imputation', url: '/labs/cleaning', unitNumber: 1 },
  { id: 'lab-viz', type: 'lab', title: 'Data Visualization Encoding Lab', subtitle: 'Scatter, histogram, bar, and box plot encodings', url: '/labs/visualization', unitNumber: 1 },
  { id: 'lab-corr', type: 'lab', title: 'Bivariate Correlation Lab', subtitle: 'Pearson r, heatmaps & linear dependencies', url: '/labs/correlation', unitNumber: 1 },
  // Unit 2
  { id: 'lab-vec-ops', type: 'lab', title: 'Vector Operations Lab', subtitle: 'Vector arithmetic, scalar scaling & norm metrics', url: '/labs/vector-operations', unitNumber: 2 },
  { id: 'lab-dot-prod', type: 'lab', title: 'Dot Product & Cosine Similarity Lab', subtitle: 'Angles, directional projections & embeddings', url: '/labs/dot-product', unitNumber: 2 },
  { id: 'lab-proj', type: 'lab', title: 'Vector Projection & Gram-Schmidt Lab', subtitle: 'Orthogonal components & decomposition', url: '/labs/vector-projection', unitNumber: 2 },
  { id: 'lab-lin-comb', type: 'lab', title: 'Linear Combinations & Span Lab', subtitle: 'Linear independence & geometric vector spans', url: '/labs/linear-combinations', unitNumber: 2 },
  // Unit 3
  { id: 'lab-mat-ops', type: 'lab', title: 'Matrix Operations Lab', subtitle: 'Matrix arithmetic, transpose & elementwise algebra', url: '/labs/matrix-operations', unitNumber: 3 },
  { id: 'lab-mat-mult', type: 'lab', title: 'Matrix Multiplication Lab', subtitle: 'Inner products, dimension matching & composition', url: '/labs/matrix-multiplication', unitNumber: 3 },
  { id: 'lab-mat-trans', type: 'lab', title: 'Matrix Transformation Lab', subtitle: 'Linear geometry, rotations, shears & scaling', url: '/labs/matrix-transformations', unitNumber: 3 },
  { id: 'lab-det', type: 'lab', title: 'Determinants & Inverses Lab', subtitle: 'Area scaling, singularity & Gauss-Jordan inversion', url: '/labs/matrix-determinants', unitNumber: 3 },
  // Unit 4
  { id: 'lab-prob-sim', type: 'lab', title: 'Probability Simulation Lab', subtitle: 'Monte Carlo trials & empirical convergence', url: '/labs/probability-simulations', unitNumber: 4 },
  { id: 'lab-dist', type: 'lab', title: 'Distribution Explorer Lab', subtitle: 'Normal, Binomial, Uniform, and Poisson curves', url: '/labs/distributions', unitNumber: 4 },
  { id: 'lab-bayes', type: 'lab', title: 'Bayes Theorem Lab', subtitle: 'Prior, likelihood, posterior updates & medical testing', url: '/labs/bayes-theorem', unitNumber: 4 },
  { id: 'lab-inf', type: 'lab', title: 'Statistical Inference Lab', subtitle: 'Hypothesis testing, z-scores, p-values & CI', url: '/labs/statistical-inference', unitNumber: 4 },
  // Unit 5
  { id: 'lab-reg-an', type: 'lab', title: 'Regression Analysis Lab', subtitle: 'Bivariate linear fitting, slope and intercept calculation', url: '/labs/regression-analysis', unitNumber: 5 },
  { id: 'lab-least-sq', type: 'lab', title: 'Least Squares Optimization Lab', subtitle: 'Minimizing residual sum of squares (RSS)', url: '/labs/least-squares', unitNumber: 5 },
  { id: 'lab-poly-reg', type: 'lab', title: 'Polynomial Regression Lab', subtitle: 'Curvilinear data modeling & degree trade-offs', url: '/labs/polynomial-regression', unitNumber: 5 },
  { id: 'lab-regul', type: 'lab', title: 'Regularization Lab (Ridge & Lasso)', subtitle: 'L1 sparsity and L2 shrinkage constraints', url: '/labs/regularization', unitNumber: 5 },
  // Unit 6
  { id: 'lab-classif', type: 'lab', title: 'Classification Boundary Lab', subtitle: 'Decision thresholds & separability boundaries', url: '/labs/classification-boundaries', unitNumber: 6 },
  { id: 'lab-log-reg', type: 'lab', title: 'Logistic Regression Lab', subtitle: 'Sigmoid activation, log-odds & binary frontiers', url: '/labs/logistic-regression', unitNumber: 6 },
  { id: 'lab-knn', type: 'lab', title: 'K-Nearest Neighbors Lab', subtitle: 'Distance metrics, k-tuning & Voronoi tessellations', url: '/labs/knn', unitNumber: 6 },
  { id: 'lab-eval', type: 'lab', title: 'Model Evaluation Lab', subtitle: 'Confusion matrices, precision, recall, F1 & ROC', url: '/labs/model-evaluation', unitNumber: 6 },
];

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Compile all searchable platform items
  const allSearchItems = useMemo<SearchItem[]>(() => {
    const items: SearchItem[] = [];

    // Units
    UNITS_DATA.forEach((u) => {
      items.push({
        id: `unit-${u.unitNumber}`,
        type: 'unit',
        title: `Unit ${u.unitNumber}: ${u.title}`,
        subtitle: u.description,
        url: `/units/${u.unitNumber}`,
        unitNumber: u.unitNumber,
        accentColor: u.accentColor,
        badge: 'Course Unit',
      });
    });

    // Lessons (All 60 Lessons)
    const lessonsList = [
      ...UNIT_1_LESSONS,
      ...UNIT_2_LESSONS,
      ...UNIT_3_LESSONS,
      ...UNIT_4_LESSONS,
      ...UNIT_5_LESSONS,
      ...UNIT_6_LESSONS,
    ];

    lessonsList.forEach((l) => {
      items.push({
        id: `lesson-${l.id}`,
        type: 'lesson',
        title: l.title,
        subtitle: l.shortDescription || l.mainExplanation.slice(0, 100) + '...',
        url: `/units/${l.unitNumber}/${l.slug}`,
        unitNumber: l.unitNumber,
        badge: `Unit ${l.unitNumber} • Lesson ${l.order}`,
      });
    });

    // Labs
    items.push(...ALL_LABS);

    // Formulas
    const allFormulas = [
      ...UNIT_1_FORMULAS,
      ...UNIT_2_FORMULAS,
      ...UNIT_3_FORMULAS,
      ...UNIT_4_FORMULAS,
      ...UNIT_5_FORMULAS,
      ...UNIT_6_FORMULAS,
    ];

    allFormulas.forEach((f) => {
      items.push({
        id: `formula-${f.id}`,
        type: 'formula',
        title: f.title,
        subtitle: f.description,
        url: `/units/${f.unitId.replace('unit-', '')}`,
        badge: `Formula (${f.category})`,
      });
    });

    return items;
  }, []);

  // Filter items by search query
  const filteredItems = useMemo(() => {
    if (!query.trim()) {
      // Show default top items (6 units + sample labs)
      return allSearchItems.slice(0, 10);
    }
    const q = query.toLowerCase();
    return allSearchItems
      .filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.subtitle.toLowerCase().includes(q) ||
          (item.badge && item.badge.toLowerCase().includes(q))
      )
      .slice(0, 15);
  }, [query, allSearchItems]);

  const handleQueryChange = (val: string) => {
    setQuery(val);
    setSelectedIndex(0);
  };

  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => inputRef.current?.focus(), 50);
    document.body.style.overflow = 'hidden';

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => {
    setQuery('');
    setSelectedIndex(0);
    onClose();
  };

  const handleSelect = (item: SearchItem) => {
    handleClose();
    router.push(item.url);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        handleSelect(filteredItems[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Global Search"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-2xl bg-white dark:bg-[#151F2B] rounded-2xl shadow-2xl border border-[#CBD5E1] dark:border-[#2E3B4A] overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#E2E8F0] dark:border-[#2E3B4A] bg-[#F8FAFC] dark:bg-[#101923]">
          <Search className="w-5 h-5 text-[#64748B] dark:text-[#91B9E8] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder="Search lessons, labs, math formulas, units..."
            className="flex-1 bg-transparent text-sm sm:text-base text-[#0F172A] dark:text-[#F1F5F9] placeholder-[#94A3B8] dark:placeholder-[#7F8B99] outline-none font-medium"
          />
          {query && (
            <button
              onClick={() => handleQueryChange('')}
              className="p-1 rounded-md text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white transition-colors"
              aria-label="Clear query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="hidden sm:inline-flex text-[10px] font-semibold text-[#64748B] dark:text-[#CBD5E1] bg-white dark:bg-[#202D3B] px-1.5 py-0.5 rounded border border-[#CBD5E1] dark:border-[#2E3B4A]">
            ESC to close
          </span>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-2 divide-y divide-[#F1F5F9] dark:divide-[#202D3B]">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-[#64748B] dark:text-[#B8C4D1] space-y-2">
              <Search className="w-8 h-8 mx-auto text-[#94A3B8] dark:text-[#7F8B99]" />
              <p className="text-sm font-semibold">No results found for &ldquo;{query}&rdquo;</p>
              <p className="text-xs">Try searching for &ldquo;regression&rdquo;, &ldquo;matrix&rdquo;, &ldquo;EDA&rdquo;, or &ldquo;Unit 1&rdquo;.</p>
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full text-left flex items-start gap-3 p-3 rounded-xl transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#F1F5F9] dark:bg-[#202D3B] text-[#0F172A] dark:text-[#F1F5F9]'
                      : 'hover:bg-[#F8FAFC] dark:hover:bg-[#1B2735] text-[#334155] dark:text-[#CBD5E1]'
                  }`}
                >
                  <div
                    className="p-2 rounded-lg shrink-0 mt-0.5"
                    style={{
                      backgroundColor: item.accentColor
                        ? `${item.accentColor}20`
                        : undefined,
                    }}
                  >
                    {item.type === 'unit' && <Layers className="w-4 h-4 text-[#416B9E] dark:text-[#91B9E8]" />}
                    {item.type === 'lesson' && <BookOpen className="w-4 h-4 text-[#3F7951] dark:text-[#8FC7A3]" />}
                    {item.type === 'lab' && <FlaskConical className="w-4 h-4 text-[#68539A] dark:text-[#B7A3E3]" />}
                    {item.type === 'formula' && <Sigma className="w-4 h-4 text-[#9E513B] dark:text-[#F4A58A]" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold truncate text-[#172033] dark:text-[#F1F5F9]">
                        {item.title}
                      </span>
                      {item.badge && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#E2E8F0] dark:bg-[#1B2735] text-[#475569] dark:text-[#B8C4D1] shrink-0">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#64748B] dark:text-[#B8C4D1] line-clamp-1 mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>

                  {isSelected && (
                    <CornerDownLeft className="w-4 h-4 text-[#94A3B8] dark:text-[#7F8B99] shrink-0 self-center" />
                  )}
                </button>
              );
            })
          )}
        </div>

        {/* Footer Shortcut Guide */}
        <div className="px-4 py-2.5 bg-[#F8FAFC] dark:bg-[#101923] border-t border-[#E2E8F0] dark:border-[#2E3B4A] flex items-center justify-between text-[11px] text-[#64748B] dark:text-[#B8C4D1]">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="px-1.5 py-0.5 bg-white dark:bg-[#202D3B] border border-[#CBD5E1] dark:border-[#2E3B4A] rounded text-[10px] font-mono">↑</kbd>{' '}
              <kbd className="px-1.5 py-0.5 bg-white dark:bg-[#202D3B] border border-[#CBD5E1] dark:border-[#2E3B4A] rounded text-[10px] font-mono">↓</kbd> Navigate
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 bg-white dark:bg-[#202D3B] border border-[#CBD5E1] dark:border-[#2E3B4A] rounded text-[10px] font-mono">↵</kbd> Select
            </span>
          </div>
          <span>{filteredItems.length} items available</span>
        </div>
      </div>
    </div>
  );
};
