'use client';

import React, { useState } from 'react';
import { DensityPlot } from '@/components/visualizations/DensityPlot';
import { ECDFPlot } from '@/components/visualizations/ECDFPlot';
import { BarChart } from '@/components/visualizations/BarChart';
import { PieChart } from '@/components/visualizations/PieChart';
import { OutlierPlot } from '@/components/visualizations/OutlierPlot';
import { MissingValueMatrix } from '@/components/visualizations/MissingValueMatrix';
import { BoxPlot } from '@/components/visualizations/BoxPlot';
import { ScatterPlot } from '@/components/visualizations/ScatterPlot';
import { CorrelationHeatmap } from '@/components/visualizations/CorrelationHeatmap';

export const Unit1Visualizations: React.FC = () => {
  const [selectedDataset, setSelectedDataset] = useState<'sensor' | 'housing' | 'ecommerce'>('sensor');

  const sensorData = [18.2, 19.5, 20.1, 20.4, 21.0, 21.2, 21.8, 22.0, 22.5, 23.1, 23.8, 24.2, 25.0, 26.5, 28.1, 35.0, 42.0];
  const housingData = [120, 145, 160, 180, 210, 225, 240, 260, 280, 310, 340, 390, 450, 520, 680, 850, 1200];
  const ecomData = [15, 22, 25, 28, 30, 32, 35, 38, 40, 42, 45, 48, 52, 58, 65, 80, 95, 140];

  const activeData = selectedDataset === 'sensor' ? sensorData : selectedDataset === 'housing' ? housingData : ecomData;

  const sampleScatter = [
    { x: 10, y: 25 }, { x: 15, y: 35 }, { x: 20, y: 48 }, { x: 25, y: 55 },
    { x: 30, y: 68 }, { x: 35, y: 75 }, { x: 40, y: 88 }, { x: 45, y: 92 },
    { x: 50, y: 105 }, { x: 55, y: 118 },
  ];

  const sampleCorr = [
    [1.0, 0.85, -0.42, 0.72],
    [0.85, 1.0, -0.38, 0.68],
    [-0.42, -0.38, 1.0, -0.55],
    [0.72, 0.68, -0.55, 1.0],
  ];
  const corrLabels = ['Revenue', 'Units', 'Discount', 'AdSpend'];

  return (
    <div className="space-y-8">
      {/* Dataset Picker */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-white dark:bg-[#111827] rounded-2xl border border-[#E2E8F0] dark:border-[#334155] shadow-xs text-xs">
        <span className="font-bold text-[#0F172A] dark:text-[#F8FAFC]">Active Playground Dataset:</span>
        <div className="flex gap-2">
          {(['sensor', 'housing', 'ecommerce'] as const).map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDataset(d)}
              className={`px-3 py-1.5 rounded-xl font-bold capitalize transition-all cursor-pointer ${
                selectedDataset === d
                  ? 'bg-[#172033] dark:bg-[#1E293B] text-white shadow-xs'
                  : 'bg-[#F8FAFC] dark:bg-[#172033] text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A]'
              }`}
            >
              {d === 'sensor' ? 'IoT Sensor Temp' : d === 'housing' ? 'House Prices ($k)' : 'E-commerce Orders ($)'}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Statistical Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DensityPlot data={activeData} label={`KDE Density: ${selectedDataset.toUpperCase()}`} accentColor="#F4A58A" />
        <ECDFPlot data={activeData} label={`ECDF Cumulative Distribution: ${selectedDataset.toUpperCase()}`} accentColor="#9E513B" />
        <OutlierPlot data={activeData} label={`Tukey 1.5×IQR Outlier Analysis: ${selectedDataset.toUpperCase()}`} />
        <BoxPlot data={activeData} label={`5-Number Summary Box Plot: ${selectedDataset.toUpperCase()}`} accentColor="#F4A58A" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ScatterPlot points={sampleScatter} xLabel="Feature X (Ad Spend)" yLabel="Target Y (Sales)" pointColor="#F4A58A" />
        <CorrelationHeatmap matrix={sampleCorr} variables={corrLabels} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BarChart title="Regional Order Volume Distribution" accentColor="#F4A58A" />
        <PieChart title="Product Category Revenue Share" />
      </div>

      <div>
        <MissingValueMatrix />
      </div>
    </div>
  );
};
