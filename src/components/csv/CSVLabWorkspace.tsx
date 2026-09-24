'use client';

import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Table,
  BarChart2,
  Calculator,
  RefreshCw,
  Info,
} from 'lucide-react';
import { ParsedDataset, SupportedChartType } from '@/lib/csv/datasetTypes';
import { CSVUpload } from './CSVUpload';
import { HistogramChart } from '@/components/visualizations/HistogramChart';
import { ScatterPlot } from '@/components/visualizations/ScatterPlot';
import { BoxPlot } from '@/components/visualizations/BoxPlot';
import { CorrelationHeatmap } from '@/components/visualizations/CorrelationHeatmap';
import { Button } from '@/components/ui/Button';

interface CSVLabWorkspaceProps {
  initialDataset?: ParsedDataset | null;
  defaultChartType?: SupportedChartType;
  accentColor?: string;
  onReset?: () => void;
}

export const CSVLabWorkspace: React.FC<CSVLabWorkspaceProps> = ({
  initialDataset = null,
  defaultChartType = 'scatter',
  accentColor = '#91B9E8',
  onReset,
}) => {
  const [dataset, setDataset] = useState<ParsedDataset | null>(initialDataset);
  const [activeTab, setActiveTab] = useState<'preview' | 'visualize' | 'summary'>('visualize');

  // Chart configuration state
  const [chartType, setChartType] = useState<SupportedChartType>(defaultChartType);
  const [selectedX, setSelectedX] = useState<string>('');
  const [selectedY, setSelectedY] = useState<string>('');

  const handleDatasetLoaded = (newDataset: ParsedDataset) => {
    setDataset(newDataset);
    if (newDataset.numericColumns.length >= 2) {
      setSelectedX(newDataset.numericColumns[0]);
      setSelectedY(newDataset.numericColumns[1]);
    } else if (newDataset.numericColumns.length === 1) {
      setSelectedX(newDataset.numericColumns[0]);
      setChartType('histogram');
    }
  };

  const handleClear = () => {
    setDataset(null);
    setSelectedX('');
    setSelectedY('');
    if (onReset) onReset();
  };

  if (!dataset) {
    return (
      <div className="bg-white dark:bg-[#151F2B] border border-slate-200 dark:border-[#2E3B4A] rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Interactive CSV Lab Workspace
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Upload any CSV file to inspect variables, compute descriptive statistics, and plot real-time charts.
            </p>
          </div>
        </div>
        <CSVUpload onDatasetLoaded={handleDatasetLoaded} />
      </div>
    );
  }

  // Extract selected column values
  const xValues = selectedX
    ? (dataset.rows
        .map((r) => r[selectedX])
        .filter((v) => typeof v === 'number' && !isNaN(v)) as number[])
    : [];

  // Prepare scatter points & simple linear regression fit if 2 numeric variables are chosen
  const scatterPoints =
    selectedX && selectedY
      ? (dataset.rows
          .filter(
            (r) =>
              typeof r[selectedX] === 'number' &&
              typeof r[selectedY] === 'number' &&
              !isNaN(r[selectedX] as number) &&
              !isNaN(r[selectedY] as number)
          )
          .map((r) => ({ x: r[selectedX] as number, y: r[selectedY] as number })))
      : [];

  let trendline: { slope: number; intercept: number } | undefined = undefined;
  if (scatterPoints.length >= 2) {
    const n = scatterPoints.length;
    const sumX = scatterPoints.reduce((s, p) => s + p.x, 0);
    const sumY = scatterPoints.reduce((s, p) => s + p.y, 0);
    const sumXY = scatterPoints.reduce((s, p) => s + p.x * p.y, 0);
    const sumXX = scatterPoints.reduce((s, p) => s + p.x * p.x, 0);
    const denom = n * sumXX - sumX * sumX;
    if (denom !== 0) {
      const slope = (n * sumXY - sumX * sumY) / denom;
      const intercept = (sumY - slope * sumX) / n;
      trendline = { slope, intercept };
    }
  }

  // Compute pairwise correlation matrix for numeric columns
  const numericCols = dataset.numericColumns.slice(0, 5); // limit to 5 cols for clean rendering
  const correlationMatrix: number[][] = [];
  if (numericCols.length > 0) {
    for (let i = 0; i < numericCols.length; i++) {
      const row: number[] = [];
      const colA = numericCols[i];
      for (let j = 0; j < numericCols.length; j++) {
        const colB = numericCols[j];
        if (i === j) {
          row.push(1.0);
        } else {
          // Pearson correlation calculation
          const validPairs = dataset.rows.filter(
            (r) =>
              typeof r[colA] === 'number' &&
              typeof r[colB] === 'number' &&
              !isNaN(r[colA] as number) &&
              !isNaN(r[colB] as number)
          );
          if (validPairs.length < 2) {
            row.push(0);
          } else {
            const meanA = validPairs.reduce((s, r) => s + (r[colA] as number), 0) / validPairs.length;
            const meanB = validPairs.reduce((s, r) => s + (r[colB] as number), 0) / validPairs.length;
            let num = 0;
            let denA = 0;
            let denB = 0;
            validPairs.forEach((r) => {
              const diffA = (r[colA] as number) - meanA;
              const diffB = (r[colB] as number) - meanB;
              num += diffA * diffB;
              denA += diffA * diffA;
              denB += diffB * diffB;
            });
            const r = denA * denB > 0 ? num / Math.sqrt(denA * denB) : 0;
            row.push(r);
          }
        }
      }
      correlationMatrix.push(row);
    }
  }

  return (
    <div className="bg-white dark:bg-[#151F2B] border border-slate-200 dark:border-[#2E3B4A] rounded-2xl shadow-xs overflow-hidden">
      {/* Dataset Header Bar */}
      <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-[#2E3B4A] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50 dark:bg-[#101923]">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 shrink-0">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 truncate max-w-xs sm:max-w-md">
                {dataset.fileName}
              </h3>
              <span className="text-[10px] uppercase font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-full">
                Active Dataset
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              <span>{dataset.rowCount} rows</span>
              <span>•</span>
              <span>{dataset.columnCount} columns</span>
              <span>•</span>
              <span>{dataset.numericColumns.length} numeric features</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleClear} leftIcon={<RefreshCw className="w-3.5 h-3.5" />}>
            Upload Another Dataset
          </Button>
        </div>
      </div>

      {/* Workspace Navigation Tabs */}
      <div className="flex border-b border-slate-200 dark:border-[#2E3B4A] px-4 bg-white dark:bg-[#151F2B]">
        <button
          onClick={() => setActiveTab('visualize')}
          className={`flex items-center gap-2 py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 transition-colors ${
            activeTab === 'visualize'
              ? 'border-blue-500 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <BarChart2 className="w-4 h-4" />
          Visualizations & Analysis
        </button>
        <button
          onClick={() => setActiveTab('preview')}
          className={`flex items-center gap-2 py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 transition-colors ${
            activeTab === 'preview'
              ? 'border-blue-500 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Table className="w-4 h-4" />
          Data Preview ({dataset.rowCount} rows)
        </button>
        <button
          onClick={() => setActiveTab('summary')}
          className={`flex items-center gap-2 py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 transition-colors ${
            activeTab === 'summary'
              ? 'border-blue-500 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Calculator className="w-4 h-4" />
          Feature Statistics
        </button>
      </div>

      {/* Tab 1: Visualizations & Analysis */}
      {activeTab === 'visualize' && (
        <div className="p-5 space-y-6">
          {/* Controls: Chart Selector & Column Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-[#101923] border border-slate-200 dark:border-[#2E3B4A]">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Chart Type
              </label>
              <select
                value={chartType}
                onChange={(e) => setChartType(e.target.value as SupportedChartType)}
                className="w-full text-xs font-medium p-2 rounded-lg bg-white dark:bg-[#151F2B] border border-slate-200 dark:border-[#2E3B4A] text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              >
                <option value="scatter">Scatter Plot + OLS Fit</option>
                <option value="histogram">Histogram / Frequency</option>
                <option value="boxplot">Box & Whisker Plot</option>
                <option value="heatmap">Correlation Matrix</option>
              </select>
            </div>

            {chartType !== 'heatmap' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  X Variable (Feature)
                </label>
                <select
                  value={selectedX}
                  onChange={(e) => setSelectedX(e.target.value)}
                  className="w-full text-xs font-medium p-2 rounded-lg bg-white dark:bg-[#151F2B] border border-slate-200 dark:border-[#2E3B4A] text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">-- Select Column --</option>
                  {dataset.numericColumns.map((col) => (
                    <option key={col} value={col}>
                      {col} (numeric)
                    </option>
                  ))}
                </select>
              </div>
            )}

            {chartType === 'scatter' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Y Variable (Target)
                </label>
                <select
                  value={selectedY}
                  onChange={(e) => setSelectedY(e.target.value)}
                  className="w-full text-xs font-medium p-2 rounded-lg bg-white dark:bg-[#151F2B] border border-slate-200 dark:border-[#2E3B4A] text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">-- Select Column --</option>
                  {dataset.numericColumns.map((col) => (
                    <option key={col} value={col}>
                      {col} (numeric)
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Render Active Chart */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-[#2E3B4A] bg-slate-50/40 dark:bg-[#101923]">
            {chartType === 'scatter' && (
              <div>
                {selectedX && selectedY ? (
                  <div className="space-y-4">
                    <ScatterPlot
                      points={scatterPoints}
                      trendline={trendline}
                      xLabel={selectedX}
                      yLabel={selectedY}
                      pointColor={accentColor}
                    />
                    {trendline && (
                      <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 text-xs flex items-center justify-between text-blue-900 dark:text-blue-200">
                        <div>
                          <span className="font-bold">Fitted Equation: </span>
                          <span className="font-mono">
                            {selectedY} = {trendline.slope.toFixed(3)} · {selectedX} + {trendline.intercept.toFixed(3)}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12 text-xs text-slate-400">
                    Please select both an X and Y numeric variable to generate the scatter plot.
                  </div>
                )}
              </div>
            )}

            {chartType === 'histogram' && (
              <div>
                {selectedX ? (
                  <HistogramChart
                    data={xValues}
                    label={`Distribution of ${selectedX}`}
                    xAxisLabel={selectedX}
                    accentColor={accentColor}
                  />
                ) : (
                  <div className="text-center py-12 text-xs text-slate-400">
                    Please select a numeric variable to generate the histogram.
                  </div>
                )}
              </div>
            )}

            {chartType === 'boxplot' && (
              <div>
                {selectedX ? (
                  <BoxPlot data={xValues} label={selectedX} accentColor={accentColor} />
                ) : (
                  <div className="text-center py-12 text-xs text-slate-400">
                    Please select a numeric variable to generate the box plot.
                  </div>
                )}
              </div>
            )}

            {chartType === 'heatmap' && (
              <div>
                <CorrelationHeatmap variables={numericCols} matrix={correlationMatrix} />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Data Preview Table */}
      {activeTab === 'preview' && (
        <div className="p-5 space-y-3">
          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-blue-500" />
            Showing first {dataset.previewRows.length} rows. Data table scrolls horizontally without page overflow.
          </div>
          <div className="w-full overflow-x-auto border border-slate-200 dark:border-[#2E3B4A] rounded-xl">
            <table className="w-full border-collapse text-left text-xs">
              <thead className="bg-slate-100 dark:bg-[#101923] border-b border-slate-200 dark:border-[#2E3B4A]">
                <tr>
                  <th className="p-2.5 font-bold text-slate-500 dark:text-slate-400 text-center w-12">#</th>
                  {dataset.headers.map((h) => {
                    const col = dataset.columns.find((c) => c.name === h);
                    return (
                      <th key={h} className="p-2.5 font-bold text-slate-800 dark:text-slate-200 truncate">
                        <div>{h}</div>
                        <div className="text-[10px] font-normal text-slate-400 uppercase">{col?.type}</div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {dataset.previewRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-[#1B2735] transition-colors">
                    <td className="p-2.5 font-mono text-slate-400 text-center">{idx + 1}</td>
                    {dataset.headers.map((h) => (
                      <td key={h} className="p-2.5 font-mono text-slate-700 dark:text-slate-300 truncate max-w-[200px]">
                        {row[h] !== null && row[h] !== undefined ? String(row[h]) : <span className="text-slate-300 italic">null</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Summary Feature Statistics */}
      {activeTab === 'summary' && (
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {dataset.columns.map((col) => (
              <div
                key={col.name}
                className="p-4 rounded-xl border border-slate-200 dark:border-[#2E3B4A] bg-slate-50/50 dark:bg-[#101923] space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900 dark:text-slate-100 truncate">{col.name}</span>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                    {col.type}
                  </span>
                </div>

                <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300 pt-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Missing values:</span>
                    <span className="font-mono font-semibold">{col.missingCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Unique values:</span>
                    <span className="font-mono font-semibold">{col.uniqueCount}</span>
                  </div>
                  {col.type === 'numeric' && col.mean !== undefined && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Mean:</span>
                        <span className="font-mono font-semibold">{col.mean.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Median:</span>
                        <span className="font-mono font-semibold">{col.median?.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Min / Max:</span>
                        <span className="font-mono font-semibold">
                          {col.min?.toFixed(1)} / {col.max?.toFixed(1)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Std Deviation:</span>
                        <span className="font-mono font-semibold">{col.stdDev?.toFixed(2)}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
