'use client';

import React, { useState } from 'react';
import { PolynomialFitPlot } from '@/components/visualizations/PolynomialFitPlot';
import { Unit5GradientDescentSim } from '@/components/simulations/Unit5GradientDescentSim';
import { ScatterPlot } from '@/components/visualizations/ScatterPlot';
import { CSVUploader } from '@/components/csv/CSVUploader';
import { CSVColumnSelector } from '@/components/csv/CSVColumnSelector';
import { ParsedDataset, extractBivariatePoints } from '@/lib/csv/parser';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { TrendingUp, Cpu, Sliders } from 'lucide-react';

export const Unit5Visualizations: React.FC = () => {
  const [dataset, setDataset] = useState<ParsedDataset | null>(null);
  const [selectedX, setSelectedX] = useState<string>('square_feet');
  const [selectedY, setSelectedY] = useState<string>('sale_price_k');

  const activePoints = dataset && selectedX && selectedY
    ? extractBivariatePoints(dataset, selectedX, selectedY)
    : [
        { x: 1100, y: 225 }, { x: 1450, y: 290 }, { x: 1800, y: 360 }, { x: 2150, y: 435 },
        { x: 2500, y: 510 }, { x: 950, y: 190 }, { x: 1650, y: 325 }, { x: 2300, y: 465 },
        { x: 2850, y: 580 }, { x: 1300, y: 260 }, { x: 1950, y: 395 }, { x: 2700, y: 545 },
      ];

  return (
    <div className="space-y-8">
      {/* CSV Dataset Uploader */}
      <CSVUploader
        unitNumber={5}
        defaultSampleId="housing_pricing"
        acceptedTypesLabel="CSV with continuous feature columns and target outcome"
        onDatasetLoaded={(ds) => {
          setDataset(ds);
          if (ds.numericColumns.length >= 2) {
            setSelectedX(ds.numericColumns[0]);
            setSelectedY(ds.numericColumns[ds.numericColumns.length - 1]);
          }
        }}
      />

      {dataset && (
        <CSVColumnSelector
          dataset={dataset}
          selectedXColumn={selectedX}
          onSelectXColumn={setSelectedX}
          selectedYColumn={selectedY}
          onSelectYColumn={setSelectedY}
          label="Select Feature ($x$) and Target ($y$) for Regression Fit"
        />
      )}

      {/* Polynomial Overfitting/Underfitting Explorer */}
      <div className="space-y-4">
        <SectionHeader
          title="Polynomial Degree & Overfitting Explorer"
          subtitle="Tune polynomial degrees ($d=1 \dots 9$) and evaluate train vs validation error."
          badge={
            <span className="p-1 rounded bg-[#FAF2D8] dark:bg-[#1E293B] text-[#806A28] dark:text-[#E8C878]">
              <TrendingUp className="w-4 h-4" />
            </span>
          }
        />
        <PolynomialFitPlot />
      </div>

      {/* Bivariate Regression Scatter Fit */}
      <div className="space-y-4">
        <SectionHeader
          title="Bivariate OLS Feature Regression Fit"
          subtitle="Explore the relationship between the chosen feature and target variable."
          badge={
            <span className="p-1 rounded bg-[#FAF2D8] dark:bg-[#1E293B] text-[#806A28] dark:text-[#E8C878]">
              <Sliders className="w-4 h-4" />
            </span>
          }
        />
        <ScatterPlot
          points={activePoints}
          xLabel={`Feature X (${selectedX})`}
          yLabel={`Target Y (${selectedY})`}
          pointColor="#E8C878"
        />
      </div>

      {/* Gradient Descent Loss Surface */}
      <div className="space-y-4">
        <SectionHeader
          title="Convex Loss Surface & Gradient Descent Trajectory"
          subtitle="Trace parameter optimization steps, learning rate oscillations, and convergence paths."
          badge={
            <span className="p-1 rounded bg-[#FAF2D8] dark:bg-[#1E293B] text-[#806A28] dark:text-[#E8C878]">
              <Cpu className="w-4 h-4" />
            </span>
          }
        />
        <Unit5GradientDescentSim />
      </div>
    </div>
  );
};
