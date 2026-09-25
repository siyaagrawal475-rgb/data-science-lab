'use client';

import React, { useState } from 'react';
import { ROCCurvePlot } from '@/components/visualizations/ROCCurvePlot';
import { Unit6ClassificationBoundarySim } from '@/components/simulations/Unit6ClassificationBoundarySim';
import { CSVUploader } from '@/components/csv/CSVUploader';
import { CSVColumnSelector } from '@/components/csv/CSVColumnSelector';
import { ParsedDataset } from '@/lib/csv/parser';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ShieldCheck, Sliders } from 'lucide-react';

export const Unit6Visualizations: React.FC = () => {
  const [dataset, setDataset] = useState<ParsedDataset | null>(null);
  const [selectedTarget, setSelectedTarget] = useState<string>('churned');

  return (
    <div className="space-y-8">
      {/* CSV Classification Dataset Uploader */}
      <CSVUploader
        unitNumber={6}
        defaultSampleId="customer_churn"
        acceptedTypesLabel="CSV with feature columns and binary target classification labels (0/1)"
        onDatasetLoaded={(ds) => {
          setDataset(ds);
          if (ds.headers.length > 0) {
            setSelectedTarget(ds.headers[ds.headers.length - 1]);
          }
        }}
      />

      {dataset && (
        <CSVColumnSelector
          dataset={dataset}
          selectedTarget={selectedTarget}
          onSelectTarget={setSelectedTarget}
          label="Select Target Classification Column"
        />
      )}

      {/* Receiver Operating Characteristic (ROC) Curve */}
      <div className="space-y-4">
        <SectionHeader
          title="Receiver Operating Characteristic (ROC) & Decision Threshold Explorer"
          subtitle="Tune classification cutoff thresholds and inspect live TPR, FPR, and Area Under Curve (AUC)."
          badge={
            <span className="p-1 rounded bg-[#F6E5EB] dark:bg-[#1E293B] text-[#8A4E63] dark:text-[#D99AAF]">
              <Sliders className="w-4 h-4" />
            </span>
          }
        />
        <ROCCurvePlot />
      </div>

      {/* 2D Decision Boundary & Confusion Matrix Simulation */}
      <div className="space-y-4">
        <SectionHeader
          title="Classification Decision Boundary & Confusion Matrix Playground"
          subtitle="Explore True Positives, False Positives, Precision, Recall, and F1 score dynamics."
          badge={
            <span className="p-1 rounded bg-[#F6E5EB] dark:bg-[#1E293B] text-[#8A4E63] dark:text-[#D99AAF]">
              <ShieldCheck className="w-4 h-4" />
            </span>
          }
        />
        <Unit6ClassificationBoundarySim />
      </div>
    </div>
  );
};
