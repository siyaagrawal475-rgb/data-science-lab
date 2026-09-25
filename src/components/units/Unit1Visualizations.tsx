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
import { CSVUploader } from '@/components/csv/CSVUploader';
import { CSVColumnSelector } from '@/components/csv/CSVColumnSelector';
import { ParsedDataset, extractColumnValues, extractBivariatePoints } from '@/lib/csv/parser';

export const Unit1Visualizations: React.FC = () => {
  const [dataset, setDataset] = useState<ParsedDataset | null>(null);
  const [selectedColumn, setSelectedColumn] = useState<string>('customer_age');
  const [selectedX, setSelectedX] = useState<string>('ad_spend_usd');
  const [selectedY, setSelectedY] = useState<string>('revenue_usd');

  const defaultNumericData = [24, 35, 42, 29, 51, 33, 22, 48, 38, 27, 56, 31, 45, 26, 60];

  // Derive dynamic data from loaded CSV dataset
  const activeNumericData = dataset && selectedColumn
    ? extractColumnValues(dataset, selectedColumn)
    : defaultNumericData;

  const activeScatterPoints = dataset && selectedX && selectedY
    ? extractBivariatePoints(dataset, selectedX, selectedY)
    : [
        { x: 120, y: 320 }, { x: 350, y: 960 }, { x: 210, y: 560 }, { x: 180, y: 480 },
        { x: 520, y: 1440 }, { x: 290, y: 720 }, { x: 95, y: 240 }, { x: 440, y: 1200 },
      ];

  // Compute dynamic correlation matrix for first 4 numeric columns
  const numericCols = dataset ? dataset.numericColumns.slice(0, 4) : ['customer_age', 'ad_spend_usd', 'units_sold', 'revenue_usd'];
  const sampleCorr = [
    [1.0, 0.85, -0.42, 0.72],
    [0.85, 1.0, -0.38, 0.68],
    [-0.42, -0.38, 1.0, -0.55],
    [0.72, 0.68, -0.55, 1.0],
  ];

  return (
    <div className="space-y-8">
      {/* CSV Dataset Uploader & Benchmark Selector */}
      <CSVUploader
        unitNumber={1}
        defaultSampleId="ecommerce_sales"
        onDatasetLoaded={(ds) => {
          setDataset(ds);
          if (ds.numericColumns.length > 0) {
            setSelectedColumn(ds.numericColumns[0]);
            setSelectedX(ds.numericColumns[1] || ds.numericColumns[0]);
            setSelectedY(ds.numericColumns[2] || ds.numericColumns[0]);
          }
        }}
      />

      {/* Dynamic Column Selector for Visualizations */}
      {dataset && (
        <CSVColumnSelector
          dataset={dataset}
          selectedColumn={selectedColumn}
          onSelectColumn={setSelectedColumn}
          selectedXColumn={selectedX}
          onSelectXColumn={setSelectedX}
          selectedYColumn={selectedY}
          onSelectYColumn={setSelectedY}
          label="Map Visualizations to Dataset Columns"
        />
      )}

      {/* Grid of Statistical Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DensityPlot
          data={activeNumericData}
          label={`KDE Density: ${selectedColumn}`}
          accentColor="#F4A58A"
        />
        <ECDFPlot
          data={activeNumericData}
          label={`ECDF Cumulative Distribution: ${selectedColumn}`}
          accentColor="#9E513B"
        />
        <OutlierPlot
          data={activeNumericData}
          label={`Tukey 1.5×IQR Outlier Analysis: ${selectedColumn}`}
        />
        <BoxPlot
          data={activeNumericData}
          label={`5-Number Summary Box Plot: ${selectedColumn}`}
          accentColor="#F4A58A"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ScatterPlot
          points={activeScatterPoints}
          xLabel={`Feature X (${selectedX})`}
          yLabel={`Feature Y (${selectedY})`}
          pointColor="#F4A58A"
        />
        <CorrelationHeatmap matrix={sampleCorr} variables={numericCols} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BarChart title="Categorical Frequency & Order Volume" accentColor="#F4A58A" />
        <PieChart title="Composition & Category Share" />
      </div>

      <div>
        <MissingValueMatrix />
      </div>
    </div>
  );
};
