'use client';

import React, { useState, useMemo } from 'react';
import {
  buildDecisionTree,
  DecisionTreeNode
} from '@/lib/classificationMath';
import { GitBranch, Info } from 'lucide-react';

interface DatasetPreset {
  name: string;
  X: [number, number][];
  y: number[];
  featureNames: [string, string];
  description: string;
}

const DATASETS: DatasetPreset[] = [
  {
    name: 'Customer Loan Approval (Income vs. Credit)',
    X: [
      [25, 580], [30, 600], [35, 550], [40, 620], [45, 590], [28, 640],
      [65, 680], [70, 720], [80, 750], [85, 710], [90, 800], [95, 780]
    ],
    y: [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    featureNames: ['Annual Income ($k)', 'Credit Score'],
    description: 'Clean bivariate partitioning with clear income and credit thresholds.'
  },
  {
    name: 'Mixed Multi-Quadrant Dataset',
    X: [
      [2, 8], [3, 7], [2, 3], [8, 3], [7, 2], [9, 4],
      [7, 8], [8, 7], [8, 9], [3, 2], [4, 3], [3, 4]
    ],
    y: [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    featureNames: ['Feature X₁', 'Feature X₂'],
    description: 'Quadrant structure requiring depth-2 to depth-3 axis splits.'
  }
];

export const DecisionTreeExplorer: React.FC = () => {
  const [datasetIdx, setDatasetIdx] = useState<number>(0);
  const [maxDepth, setMaxDepth] = useState<number>(2);
  const [criterion, setCriterion] = useState<'gini' | 'entropy'>('gini');

  const activeData = DATASETS[datasetIdx];

  // Build real decision tree
  const treeRoot = useMemo(() => {
    return buildDecisionTree(
      activeData.X,
      activeData.y,
      maxDepth,
      2,
      criterion,
      0,
      'root',
      activeData.featureNames
    );
  }, [activeData, maxDepth, criterion]);

  // Render recursive tree node component
  const renderTreeNode = (node: DecisionTreeNode | undefined, label: string = 'Root') => {
    if (!node) return null;

    const n0 = node.classCounts[0] || 0;
    const n1 = node.classCounts[1] || 0;
    const total = node.samples;

    return (
      <div className="flex flex-col items-center">
        {/* Node Box */}
        <div
          className={`px-3 py-2 rounded-xl border text-xs text-center shadow-xs transition-all w-48 ${
            node.isLeaf
              ? node.predictedClass === 1
                ? 'bg-rose-50/80 border-rose-200 text-rose-900'
                : 'bg-blue-50/80 border-blue-200 text-blue-900'
              : 'bg-slate-50 border-slate-200 text-slate-800'
          }`}
        >
          <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide">
            {label}
          </div>

          {!node.isLeaf ? (
            <div className="font-bold text-[#8A4E63] my-0.5 text-xs">
              {node.featureName} ≤ {node.threshold?.toFixed(1)}
            </div>
          ) : (
            <div className="font-bold text-xs my-0.5">
              Predict: Class {node.predictedClass}
            </div>
          )}

          <div className="text-[10px] text-slate-500 space-y-0.5 mt-1 border-t border-slate-200/50 pt-1">
            <div className="flex justify-between">
              <span>{criterion === 'gini' ? 'Gini' : 'Entropy'}:</span>
              <span className="font-mono font-semibold">{node.impurity.toFixed(3)}</span>
            </div>
            <div className="flex justify-between">
              <span>Samples:</span>
              <span className="font-mono font-semibold">{total}</span>
            </div>
            <div className="flex justify-between">
              <span>Counts [C0, C1]:</span>
              <span className="font-mono font-semibold">[{n0}, {n1}]</span>
            </div>
          </div>
        </div>

        {/* Children Branches */}
        {!node.isLeaf && (node.left || node.right) && (
          <div className="w-full flex flex-col items-center mt-2">
            {/* Split lines */}
            <div className="w-24 h-4 border-t-2 border-slate-300 relative">
              <span className="absolute -top-3 left-0 text-[9px] font-bold text-emerald-600 bg-white px-0.5">
                True
              </span>
              <span className="absolute -top-3 right-0 text-[9px] font-bold text-rose-600 bg-white px-0.5">
                False
              </span>
            </div>

            <div className="flex gap-4 items-start">
              {node.left && renderTreeNode(node.left, 'Left (≤)')}
              {node.right && renderTreeNode(node.right, 'Right (>)')}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full bg-white rounded-xl border border-[#E5BBC9]/50 shadow-sm p-5 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E5BBC9]/30 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-[#F6E5EB] text-[#8A4E63]">
              <GitBranch className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 text-lg">Decision Tree Explorer</h3>
              <p className="text-xs text-slate-500">
                Explore recursive binary splitting, Gini impurity, entropy, and tree depth control.
              </p>
            </div>
          </div>
        </div>

        {/* Dataset Selector */}
        <div className="flex items-center gap-2">
          <label htmlFor="dt-dataset-select" className="text-xs font-medium text-slate-600">
            Scenario:
          </label>
          <select
            id="dt-dataset-select"
            value={datasetIdx}
            onChange={(e) => setDatasetIdx(Number(e.target.value))}
            className="text-xs font-medium bg-slate-50 border border-[#E5BBC9] rounded-lg px-3 py-1.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#D99AAF]"
          >
            {DATASETS.map((ds, idx) => (
              <option key={idx} value={idx}>
                {ds.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Control Bar */}
      <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/80 flex flex-wrap items-center justify-between gap-4">
        {/* Depth Slider */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-700">Max Depth:</span>
          <div className="flex items-center gap-1">
            {[1, 2, 3].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setMaxDepth(d)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  maxDepth === d
                    ? 'bg-[#D99AAF] text-slate-900 shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                Depth {d}
              </button>
            ))}
          </div>
        </div>

        {/* Impurity Criterion Selector */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-700">Split Criterion:</span>
          <div className="flex rounded-lg bg-slate-200/60 p-0.5 text-xs font-medium">
            <button
              type="button"
              onClick={() => setCriterion('gini')}
              className={`px-3 py-1 rounded-md transition-all ${
                criterion === 'gini'
                  ? 'bg-white text-[#8A4E63] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Gini Impurity
            </button>
            <button
              type="button"
              onClick={() => setCriterion('entropy')}
              className={`px-3 py-1 rounded-md transition-all ${
                criterion === 'entropy'
                  ? 'bg-white text-[#8A4E63] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Shannon Entropy
            </button>
          </div>
        </div>
      </div>

      {/* Tree Visualization Canvas */}
      <div className="w-full bg-slate-50/50 rounded-xl p-6 border border-slate-200 overflow-x-auto flex justify-center min-h-[300px]">
        {renderTreeNode(treeRoot, 'Root')}
      </div>

      {/* Explanatory Footer */}
      <div className="bg-[#F6E5EB]/30 rounded-xl p-3 border border-[#E5BBC9]/40 flex items-start gap-2.5 text-xs text-slate-600">
        <Info className="w-4 h-4 text-[#8A4E63] mt-0.5 shrink-0" />
        <div>
          <strong>Tree Building Mechanics:</strong> At every internal node, the decision tree algorithm evaluates every possible feature threshold across all dimensions, greedily selecting the split that maximizes <em>Information Gain</em> (the greatest drop in node impurity). Pure leaves contain samples of exactly one class ($G = 0$).
        </div>
      </div>
    </div>
  );
};
