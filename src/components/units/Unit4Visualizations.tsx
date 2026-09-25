'use client';

import React, { useState } from 'react';
import { Unit4ProbabilityCLTSim } from '@/components/simulations/Unit4ProbabilityCLTSim';
import { DensityPlot } from '@/components/visualizations/DensityPlot';
import { ECDFPlot } from '@/components/visualizations/ECDFPlot';
import { CSVUploader } from '@/components/csv/CSVUploader';
import { CSVColumnSelector } from '@/components/csv/CSVColumnSelector';
import { ParsedDataset, extractColumnValues } from '@/lib/csv/parser';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Sigma, Activity } from 'lucide-react';

export const Unit4Visualizations: React.FC = () => {
  const [dataset, setDataset] = useState<ParsedDataset | null>(null);
  const [selectedCol, setSelectedCol] = useState<string>('duration_sec');

  const activeNumericData = dataset && selectedCol
    ? extractColumnValues(dataset, selectedCol)
    : [142, 95, 210, 88, 165, 102, 180, 78, 135, 92, 195, 84, 155, 110];

  return (
    <div className="space-y-8">
      {/* CSV Sample Uploader */}
      <CSVUploader
        unitNumber={4}
        defaultSampleId="ab_test_experiment"
        acceptedTypesLabel="CSV with observed experimental trials or numeric measurements"
        onDatasetLoaded={(ds) => {
          setDataset(ds);
          if (ds.numericColumns.length > 0) {
            setSelectedCol(ds.numericColumns[0]);
          }
        }}
      />

      {dataset && (
        <CSVColumnSelector
          dataset={dataset}
          selectedColumn={selectedCol}
          onSelectColumn={setSelectedCol}
          label="Select Observed Sample Column for Distribution Analysis"
        />
      )}

      {/* CLT & Monte Carlo Simulation */}
      <div className="space-y-4">
        <SectionHeader
          title="Central Limit Theorem (CLT) & Sampling Simulator"
          subtitle="Generate empirical sample means from Uniform, Exponential, and Discrete Dice distributions."
          badge={
            <span className="p-1 rounded bg-[#EEE9F8] dark:bg-[#1E293B] text-[#68539A] dark:text-[#B7A3E3]">
              <Sigma className="w-4 h-4" />
            </span>
          }
        />
        <Unit4ProbabilityCLTSim />
      </div>

      {/* Observed Sample Distribution Plots */}
      <div className="space-y-4">
        <SectionHeader
          title="Observed Sample Distribution & Cumulative Density"
          subtitle="Kernel density estimation and empirical CDF for experimental sample data."
          badge={
            <span className="p-1 rounded bg-[#EEE9F8] dark:bg-[#1E293B] text-[#68539A] dark:text-[#B7A3E3]">
              <Activity className="w-4 h-4" />
            </span>
          }
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DensityPlot
            data={activeNumericData}
            label={`Sample KDE: ${selectedCol}`}
            accentColor="#B7A3E3"
          />
          <ECDFPlot
            data={activeNumericData}
            label={`Sample ECDF: ${selectedCol}`}
            accentColor="#68539A"
          />
        </div>
      </div>
    </div>
  );
};
