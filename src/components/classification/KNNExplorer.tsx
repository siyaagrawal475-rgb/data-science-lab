'use client';

import React, { useState, useMemo } from 'react';
import {
  knnNeighbors,
  knnPredict,
  standardizeFeatures
} from '@/lib/classificationMath';
import { MapPin, Sliders } from 'lucide-react';

interface DatasetOption {
  name: string;
  description: string;
  X: [number, number][];
  y: number[];
  featureNames: [string, string];
}

const DATASETS: DatasetOption[] = [
  {
    name: 'Customer Retention & Spend ($k vs. Logins)',
    description: 'Bivariate dataset showing loyal retained users (Class 1) vs. churned users (Class 0).',
    X: [
      [1.2, 10], [1.8, 15], [2.2, 12], [2.5, 25], [3.0, 18], [3.2, 8], [3.8, 22],
      [5.5, 65], [6.0, 75], [6.5, 58], [7.2, 80], [7.8, 62], [8.5, 90], [8.0, 70]
    ],
    y: [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    featureNames: ['Monthly Spend ($k)', 'Platform Logins / Mo']
  },
  {
    name: 'Concentric Ring Clusters',
    description: 'Non-linearly separable inner circle (Class 0) vs. outer ring (Class 1).',
    X: [
      [4.5, 5.0], [5.0, 4.5], [5.5, 5.2], [4.8, 5.5], [5.2, 4.8], [4.2, 4.8],
      [2.0, 5.0], [3.0, 8.0], [5.0, 8.5], [7.5, 7.0], [8.0, 5.0], [7.0, 2.5], [5.0, 1.5], [2.5, 3.0]
    ],
    y: [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
    featureNames: ['Feature X₁', 'Feature X₂']
  }
];

export const KNNExplorer: React.FC = () => {
  const [datasetIdx, setDatasetIdx] = useState<number>(0);
  const [kVal, setKVal] = useState<number>(3);
  const [applyScaling, setApplyScaling] = useState<boolean>(true);
  const [queryPoint, setQueryPoint] = useState<[number, number]>([4.5, 40]);

  const activeData = DATASETS[datasetIdx];

  const handleDatasetChange = (idx: number) => {
    setDatasetIdx(idx);
    if (idx === 0) setQueryPoint([4.5, 40]);
    else setQueryPoint([4.0, 6.0]);
  };

  // Standardize dataset if scaling enabled
  const { processedX, processedQuery } = useMemo(() => {
    if (!applyScaling) {
      return {
        processedX: activeData.X,
        processedQuery: queryPoint
      };
    }
    const { standardized, means: m, stds: s } = standardizeFeatures(activeData.X);
    const stdQuery: [number, number] = [
      (queryPoint[0] - m[0]) / (s[0] || 1),
      (queryPoint[1] - m[1]) / (s[1] || 1)
    ];
    return {
      processedX: standardized as [number, number][],
      processedQuery: stdQuery
    };
  }, [activeData, queryPoint, applyScaling]);

  // Compute KNN
  const knnResult = useMemo(() => {
    return knnPredict(processedX, activeData.y, processedQuery, kVal);
  }, [processedX, activeData.y, processedQuery, kVal]);

  const neighbors = useMemo(() => {
    return knnNeighbors(processedX, activeData.y, processedQuery, kVal);
  }, [processedX, activeData.y, processedQuery, kVal]);

  // SVG dimensions & scaling
  const minX = Math.min(...activeData.X.map((p) => p[0])) * 0.8;
  const maxX = Math.max(...activeData.X.map((p) => p[0])) * 1.15;
  const minY = Math.min(...activeData.X.map((p) => p[1])) * 0.8;
  const maxY = Math.max(...activeData.X.map((p) => p[1])) * 1.15;

  const svgWidth = 460;
  const svgHeight = 320;
  const pad = 40;

  const scaleX = (val: number) => pad + ((val - minX) / (maxX - minX)) * (svgWidth - 2 * pad);
  const scaleY = (val: number) => svgHeight - pad - ((val - minY) / (maxY - minY)) * (svgHeight - 2 * pad);

  // Maximum neighbor distance in raw coordinates for visual circle
  const maxNeighborDistPixels = useMemo(() => {
    if (neighbors.length === 0) return 0;
    const lastNeighborIdx = neighbors[neighbors.length - 1].index;
    const lastRaw = activeData.X[lastNeighborIdx];
    const sx = (val: number) => pad + ((val - minX) / (maxX - minX)) * (svgWidth - 2 * pad);
    const sy = (val: number) => svgHeight - pad - ((val - minY) / (maxY - minY)) * (svgHeight - 2 * pad);
    const dx = sx(lastRaw[0]) - sx(queryPoint[0]);
    const dy = sy(lastRaw[1]) - sy(queryPoint[1]);
    return Math.sqrt(dx * dx + dy * dy);
  }, [neighbors, activeData.X, queryPoint, minX, maxX, minY, maxY]);

  return (
    <div className="w-full bg-white rounded-xl border border-[#E5BBC9]/50 shadow-sm p-5 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E5BBC9]/30 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-[#F6E5EB] text-[#8A4E63]">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 text-lg">k-Nearest Neighbors Explorer</h3>
              <p className="text-xs text-slate-500">
                Visualize Euclidean distances, rank closest neighbors, and inspect class voting mechanics.
              </p>
            </div>
          </div>
        </div>

        {/* Dataset Selector */}
        <div className="flex items-center gap-2">
          <label htmlFor="knn-dataset-select" className="text-xs font-medium text-slate-600">
            Scenario:
          </label>
          <select
            id="knn-dataset-select"
            value={datasetIdx}
            onChange={(e) => handleDatasetChange(Number(e.target.value))}
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

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* SVG Canvas (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-center bg-slate-50/70 rounded-xl p-3 border border-slate-100">
          <div className="w-full flex items-center justify-between px-2 mb-1">
            <span className="text-xs font-semibold text-slate-600">
              {activeData.featureNames[1]} vs. {activeData.featureNames[0]}
            </span>
            <div className="flex items-center gap-3 text-[11px]">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6] inline-block"></span>
                Class 0
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444] inline-block"></span>
                Class 1
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 bg-[#D99AAF] transform rotate-45 inline-block"></span>
                Query Q
              </span>
            </div>
          </div>

          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full max-w-[460px] h-auto bg-white rounded-lg border border-slate-200 shadow-inner cursor-crosshair"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const clickY = e.clientY - rect.top;
              const rawX = minX + ((clickX - pad) / (svgWidth - 2 * pad)) * (maxX - minX);
              const rawY = minY + ((svgHeight - pad - clickY) / (svgHeight - 2 * pad)) * (maxY - minY);
              setQueryPoint([
                Math.max(minX, Math.min(maxX, Number(rawX.toFixed(1)))),
                Math.max(minY, Math.min(maxY, Number(rawY.toFixed(1))))
              ]);
            }}
          >
            {/* Axis grid */}
            <line
              x1={pad}
              y1={svgHeight - pad}
              x2={svgWidth - pad}
              y2={svgHeight - pad}
              stroke="#CBD5E1"
              strokeWidth="1.5"
            />
            <line
              x1={pad}
              y1={pad}
              x2={pad}
              y2={svgHeight - pad}
              stroke="#CBD5E1"
              strokeWidth="1.5"
            />

            {/* k-NN Neighborhood Radius Circle */}
            <circle
              cx={scaleX(queryPoint[0])}
              cy={scaleY(queryPoint[1])}
              r={maxNeighborDistPixels}
              fill="#F6E5EB"
              fillOpacity="0.4"
              stroke="#D99AAF"
              strokeWidth="1.5"
              strokeDasharray="4 3"
            />

            {/* Connecting lines from Query to k Nearest Neighbors */}
            {neighbors.map((nb) => {
              const rawPt = activeData.X[nb.index];
              return (
                <line
                  key={nb.index}
                  x1={scaleX(queryPoint[0])}
                  y1={scaleY(queryPoint[1])}
                  x2={scaleX(rawPt[0])}
                  y2={scaleY(rawPt[1])}
                  stroke="#8A4E63"
                  strokeWidth="1.2"
                  strokeDasharray="2 2"
                />
              );
            })}

            {/* Observations */}
            {activeData.X.map((pt, i) => {
              const cx = scaleX(pt[0]);
              const cy = scaleY(pt[1]);
              const isClass1 = activeData.y[i] === 1;
              const isNeighbor = neighbors.some((n) => n.index === i);

              return (
                <g key={i}>
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isNeighbor ? 7 : 5}
                    fill={isClass1 ? '#EF4444' : '#3B82F6'}
                    stroke={isNeighbor ? '#8A4E63' : '#FFFFFF'}
                    strokeWidth={isNeighbor ? 2.5 : 1.5}
                  />
                  {isNeighbor && (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={10}
                      fill="none"
                      stroke="#8A4E63"
                      strokeWidth="1"
                      strokeDasharray="2 2"
                    />
                  )}
                </g>
              );
            })}

            {/* Query Point Q */}
            <g transform={`translate(${scaleX(queryPoint[0])}, ${scaleY(queryPoint[1])})`}>
              <rect
                x="-6"
                y="-6"
                width="12"
                height="12"
                fill="#D99AAF"
                stroke="#1E293B"
                strokeWidth="2"
                transform="rotate(45)"
              />
            </g>

            {/* Axis labels */}
            <text
              x={svgWidth / 2}
              y={svgHeight - pad + 24}
              textAnchor="middle"
              fontSize="10"
              fontWeight="500"
              fill="#64748B"
            >
              {activeData.featureNames[0]}
            </text>
          </svg>

          <p className="text-[11px] text-slate-500 mt-2 text-center">
            Click anywhere on the plot to reposition the <strong>Query Point Q</strong>.
          </p>
        </div>

        {/* Controls & Nearest Neighbors Table (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Hyperparameter Controls */}
          <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-[#8A4E63]" />
                Hyperparameters & Scaling
              </span>
            </div>

            {/* k Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-600 font-medium">Number of Neighbors (k):</span>
                <span className="font-mono font-bold text-[#8A4E63]">{kVal}</span>
              </div>
              <input
                type="range"
                min="1"
                max="9"
                step="2"
                value={kVal}
                onChange={(e) => setKVal(parseInt(e.target.value))}
                className="w-full accent-[#D99AAF] cursor-pointer"
                aria-label="KNN k value"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>k = 1</span>
                <span>k = 5</span>
                <span>k = 9</span>
              </div>
            </div>

            {/* Standardization Toggle */}
            <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 text-xs">
              <div>
                <span className="font-medium text-slate-700 block">Z-Score Standardization:</span>
                <span className="text-[10px] text-slate-400">Centers & normalizes feature scales</span>
              </div>
              <button
                type="button"
                onClick={() => setApplyScaling(!applyScaling)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-medium text-xs transition-colors ${
                  applyScaling
                    ? 'bg-[#F6E5EB] text-[#8A4E63] border border-[#E5BBC9]'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {applyScaling ? 'Standardized' : 'Raw Coordinates'}
              </button>
            </div>
          </div>

          {/* Voting Result Card */}
          <div className="bg-[#F6E5EB]/40 rounded-xl p-3.5 border border-[#E5BBC9]/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#8A4E63]">Classification Verdict</span>
              <span
                className={`font-mono font-bold text-xs px-2 py-0.5 rounded ${
                  knnResult.predictedClass === 1
                    ? 'bg-rose-100 text-rose-700'
                    : 'bg-blue-100 text-blue-700'
                }`}
              >
                Class {knnResult.predictedClass} ({knnResult.predictedClass === 1 ? 'Positive' : 'Negative'})
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-1">
              <div className="bg-white rounded-lg p-2 border border-[#E5BBC9]/40 text-center">
                <div className="text-slate-400 text-[10px]">Class 0 Votes</div>
                <div className="font-mono font-bold text-blue-600">
                  {knnResult.votes[0] || 0} / {kVal} ({(((knnResult.votes[0] || 0) / kVal) * 100).toFixed(0)}%)
                </div>
              </div>
              <div className="bg-white rounded-lg p-2 border border-[#E5BBC9]/40 text-center">
                <div className="text-slate-400 text-[10px]">Class 1 Votes</div>
                <div className="font-mono font-bold text-rose-600">
                  {knnResult.votes[1] || 0} / {kVal} ({(((knnResult.votes[1] || 0) / kVal) * 100).toFixed(0)}%)
                </div>
              </div>
            </div>
          </div>

          {/* Nearest Neighbors List Table */}
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 space-y-1.5">
            <span className="text-[11px] font-semibold text-slate-700 block">
              Closest {kVal} Neighbors (Ranked by Distance)
            </span>
            <div className="max-h-36 overflow-y-auto space-y-1 text-[11px]">
              {neighbors.map((nb, rank) => {
                const rawPt = activeData.X[nb.index];
                return (
                  <div
                    key={nb.index}
                    className="flex items-center justify-between bg-white px-2.5 py-1.5 rounded border border-slate-200"
                  >
                    <span className="font-medium text-slate-700">
                      #{rank + 1} ({rawPt[0]}, {rawPt[1]})
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 font-mono text-[10px]">
                        d = {nb.distance.toFixed(2)}
                      </span>
                      <span
                        className={`font-bold px-1.5 py-0.2 rounded text-[10px] ${
                          nb.label === 1 ? 'bg-rose-100 text-rose-700' : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        C{nb.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
