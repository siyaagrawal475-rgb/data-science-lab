'use client';

import React, { useState, useMemo } from 'react';
import { useUnitProgress } from '@/lib/progress';
import { Button } from '@/components/ui/Button';
import { MapPin, Check, Play, Sliders } from 'lucide-react';
import {
  knnNeighbors,
  knnPredict,
  standardizeFeatures,
  calculateConfusionMatrix
} from '@/lib/classificationMath';

interface LabDataset {
  id: string;
  name: string;
  x1Label: string;
  x2Label: string;
  X: [number, number][];
  y: number[];
}

const DATASETS: LabDataset[] = [
  {
    id: 'customer_value',
    name: 'Customer Segmentation (Income $k vs. App Sessions)',
    x1Label: 'Income ($k)',
    x2Label: 'App Sessions / Mo',
    X: [
      [30, 8], [35, 12], [28, 6], [42, 10], [50, 14], [45, 16],
      [80, 55], [95, 60], [85, 70], [105, 65], [110, 80], [90, 75]
    ],
    y: [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1]
  },
  {
    id: 'biomedical',
    name: 'Biomedical Cell Morphology (Radius vs. Texture)',
    x1Label: 'Cell Mean Radius (μm)',
    x2Label: 'Texture Score',
    X: [
      [11.2, 14.5], [12.0, 15.2], [10.8, 16.0], [13.1, 14.8], [11.9, 13.9],
      [18.5, 24.2], [19.2, 22.8], [17.8, 25.0], [20.1, 23.5], [18.9, 26.1]
    ],
    y: [0, 0, 0, 0, 0, 1, 1, 1, 1, 1]
  }
];

export const KNNLab: React.FC = () => {
  const { isLabCompleted, completeLab } = useUnitProgress('unit-6');
  const isDone = isLabCompleted('knn');

  const [datasetId, setDatasetId] = useState<string>('customer_value');
  const [kVal, setKVal] = useState<number>(3);
  const [useScaling, setUseScaling] = useState<boolean>(true);
  const [queryX1, setQueryX1] = useState<number>(60);
  const [queryX2, setQueryX2] = useState<number>(35);

  const dataset = useMemo(() => {
    return DATASETS.find((d) => d.id === datasetId) || DATASETS[0];
  }, [datasetId]);

  const handleDatasetChange = (newId: string) => {
    setDatasetId(newId);
    if (newId === 'customer_value') {
      setQueryX1(60);
      setQueryX2(35);
    } else {
      setQueryX1(15.0);
      setQueryX2(19.0);
    }
  };

  // Standardize or use raw
  const { processedX, queryPointProcessed } = useMemo(() => {
    if (!useScaling) {
      return {
        processedX: dataset.X,
        queryPointProcessed: [queryX1, queryX2] as [number, number]
      };
    }
    const { standardized, means: m, stds: s } = standardizeFeatures(dataset.X);
    const qStd: [number, number] = [
      (queryX1 - m[0]) / (s[0] || 1),
      (queryX2 - m[1]) / (s[1] || 1)
    ];
    return {
      processedX: standardized as [number, number][],
      queryPointProcessed: qStd
    };
  }, [dataset, useScaling, queryX1, queryX2]);

  // Compute query prediction & nearest neighbors
  const knnRes = useMemo(() => {
    return knnPredict(processedX, dataset.y, queryPointProcessed, kVal);
  }, [processedX, dataset.y, queryPointProcessed, kVal]);

  const neighbors = useMemo(() => {
    return knnNeighbors(processedX, dataset.y, queryPointProcessed, kVal);
  }, [processedX, dataset.y, queryPointProcessed, kVal]);

  // Evaluate training set predictions
  const trainPredictions = useMemo(() => {
    return processedX.map((pt) => knnPredict(processedX, dataset.y, pt, kVal).predictedClass);
  }, [processedX, dataset.y, kVal]);

  const cm = useMemo(() => {
    return calculateConfusionMatrix(dataset.y, trainPredictions);
  }, [dataset.y, trainPredictions]);

  const handleComplete = () => {
    completeLab('knn');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-[#E5BBC9]/50 shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#8A4E63] font-semibold text-xs uppercase tracking-wide">
              <MapPin className="w-4 h-4" />
              Unit 6 Lab 3
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mt-1">
              k-Nearest Neighbors (k-NN) Lab
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Test distance-based nearest neighbor classification, compare scaled vs. unscaled features, and inspect class voting mechanics.
            </p>
          </div>

          <Button
            onClick={handleComplete}
            disabled={isDone}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${
              isDone
                ? 'bg-emerald-100 text-emerald-800 cursor-default'
                : 'bg-[#D99AAF] text-slate-900 hover:bg-[#d08a9f] shadow-xs'
            }`}
          >
            {isDone ? (
              <>
                <Check className="w-4 h-4" /> Lab Completed
              </>
            ) : (
              <>
                <Play className="w-4 h-4" /> Mark as Complete
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Control Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <label htmlFor="knn-lab-ds" className="text-xs font-semibold text-slate-700 block mb-2">
            1. Select Dataset
          </label>
          <select
            id="knn-lab-ds"
            value={datasetId}
            onChange={(e) => handleDatasetChange(e.target.value)}
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#D99AAF]"
          >
            {DATASETS.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-semibold text-slate-700">
              2. Neighbors (k)
            </label>
            <span className="font-mono font-bold text-xs text-[#8A4E63]">
              k = {kVal}
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="9"
            step="2"
            value={kVal}
            onChange={(e) => setKVal(parseInt(e.target.value))}
            className="w-full accent-[#D99AAF]"
            aria-label="k value"
          />
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col justify-between">
          <label className="text-xs font-semibold text-slate-700 block">
            3. Feature Scaling Mode
          </label>
          <button
            type="button"
            onClick={() => setUseScaling(!useScaling)}
            className={`w-full py-2 rounded-lg text-xs font-semibold transition-colors mt-2 ${
              useScaling
                ? 'bg-[#F6E5EB] text-[#8A4E63] border border-[#E5BBC9]'
                : 'bg-slate-100 text-slate-600 border border-slate-200'
            }`}
          >
            {useScaling ? 'Standardized (Z-Score)' : 'Raw Coordinates (Unscaled)'}
          </button>
        </div>
      </div>

      {/* Main Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interactive Query Simulator (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <h3 className="font-semibold text-slate-900 text-sm flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#8A4E63]" />
            Query Point Coordinates
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-medium text-slate-600 block mb-1">
                {dataset.x1Label}
              </label>
              <input
                type="number"
                value={queryX1}
                onChange={(e) => setQueryX1(parseFloat(e.target.value) || 0)}
                className="w-full text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="text-[11px] font-medium text-slate-600 block mb-1">
                {dataset.x2Label}
              </label>
              <input
                type="number"
                value={queryX2}
                onChange={(e) => setQueryX2(parseFloat(e.target.value) || 0)}
                className="w-full text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg p-2"
              />
            </div>
          </div>

          {/* Voting Result Card */}
          <div className="bg-[#F6E5EB]/50 rounded-xl p-4 border border-[#E5BBC9]/60 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-[#8A4E63]">k-NN Voting Result</span>
              <span
                className={`font-bold px-2 py-0.5 rounded text-xs ${
                  knnRes.predictedClass === 1
                    ? 'bg-rose-100 text-rose-800'
                    : 'bg-blue-100 text-blue-800'
                }`}
              >
                Class {knnRes.predictedClass}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-1">
              <div className="bg-white rounded-lg p-2 border border-[#E5BBC9]/40 text-center">
                <div className="text-[10px] text-slate-400">Class 0 Votes</div>
                <div className="font-mono font-bold text-blue-700">
                  {knnRes.votes[0] || 0} / {kVal} ({(((knnRes.votes[0] || 0) / kVal) * 100).toFixed(0)}%)
                </div>
              </div>
              <div className="bg-white rounded-lg p-2 border border-[#E5BBC9]/40 text-center">
                <div className="text-[10px] text-slate-400">Class 1 Votes</div>
                <div className="font-mono font-bold text-rose-700">
                  {knnRes.votes[1] || 0} / {kVal} ({(((knnRes.votes[1] || 0) / kVal) * 100).toFixed(0)}%)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Closest Neighbors Ranking Table (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
          <h3 className="font-semibold text-slate-900 text-sm">
            Top {kVal} Nearest Neighbors in Feature Space
          </h3>

          <div className="max-h-56 overflow-y-auto space-y-1.5 text-xs">
            {neighbors.map((nb, rank) => {
              const rawPt = dataset.X[nb.index];
              return (
                <div
                  key={nb.index}
                  className="flex items-center justify-between bg-slate-50 px-3 py-2 rounded-lg border border-slate-200"
                >
                  <span className="font-semibold text-slate-700">
                    Rank #{rank + 1}: Point ({rawPt[0]}, {rawPt[1]})
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-slate-500 text-[11px]">
                      Distance: {nb.distance.toFixed(3)}
                    </span>
                    <span
                      className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                        nb.label === 1
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      Class {nb.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100 flex justify-between text-xs text-slate-500 font-mono">
            <span>Training Accuracy: {(cm.accuracy * 100).toFixed(1)}%</span>
            <span>Total Points: {dataset.X.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
