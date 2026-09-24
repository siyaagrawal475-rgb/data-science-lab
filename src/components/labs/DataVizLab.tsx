'use client';

import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar, Scatter } from 'react-chartjs-2';
import { TELEMETRY_DATASET, NumericTelemetryPoint } from '@/data/unit1/labs';
import { CheckCircle2, RotateCcw, BarChart2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useUnitProgress } from '@/lib/progress';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

export const DataVizLab: React.FC = () => {
  const { isLabCompleted, completeLab } = useUnitProgress('unit-1');
  const isDone = isLabCompleted('visualization');

  const [chartType, setChartType] = useState<'bar' | 'line' | 'scatter' | 'histogram'>('bar');
  const [xAxisVar, setXAxisVar] = useState<keyof NumericTelemetryPoint>('timestamp');
  const [yAxisVar, setYAxisVar] = useState<keyof Omit<NumericTelemetryPoint, 'timestamp'>>('temperature');

  const varLabels: Record<string, string> = {
    timestamp: 'Time of Day',
    temperature: 'Temperature (°C)',
    humidity: 'Relative Humidity (%)',
    pressure: 'Atmospheric Pressure (kPa)',
    cpuLoad: 'Node CPU Load (%)',
    powerWatts: 'Power Consumption (Watts)',
  };

  // Build chart dataset
  const labels = TELEMETRY_DATASET.map((d) => String(d[xAxisVar]));

  let chartComponent = null;

  if (chartType === 'scatter') {
    const scatterData = {
      datasets: [
        {
          label: `${varLabels[xAxisVar]} vs ${varLabels[yAxisVar]}`,
          data: TELEMETRY_DATASET.map((d) => ({
            x: Number(d[xAxisVar === 'timestamp' ? 'temperature' : xAxisVar]),
            y: Number(d[yAxisVar]),
          })),
          backgroundColor: '#F4A58A',
          borderColor: '#9E513B',
          pointRadius: 6,
          pointHoverRadius: 8,
        },
      ],
    };

    const scatterOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          title: { display: true, text: xAxisVar === 'timestamp' ? 'Temperature (°C)' : varLabels[xAxisVar], color: '#64748B' },
          grid: { color: '#F1F5F9' },
        },
        y: {
          title: { display: true, text: varLabels[yAxisVar], color: '#64748B' },
          grid: { color: '#F1F5F9' },
        },
      },
    };

    chartComponent = <Scatter data={scatterData} options={scatterOptions} />;
  } else if (chartType === 'histogram') {
    // Bin yAxisVar values
    const vals = TELEMETRY_DATASET.map((d) => Number(d[yAxisVar]));
    const min = Math.min(...vals);
    const max = Math.max(...vals);
    const bins = 6;
    const binSize = (max - min) / bins;
    const histCounts = new Array(bins).fill(0);
    const histLabels: string[] = [];

    for (let b = 0; b < bins; b++) {
      const bMin = min + b * binSize;
      const bMax = bMin + binSize;
      histLabels.push(`${bMin.toFixed(1)}-${bMax.toFixed(1)}`);
    }

    vals.forEach((v) => {
      let b = Math.floor((v - min) / binSize);
      if (b >= bins) b = bins - 1;
      histCounts[b]++;
    });

    const histData = {
      labels: histLabels,
      datasets: [
        {
          label: `Frequency of ${varLabels[yAxisVar]}`,
          data: histCounts,
          backgroundColor: '#FCE5DC',
          borderColor: '#F4A58A',
          borderWidth: 1.5,
          borderRadius: 4,
        },
      ],
    };

    const histOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { title: { display: true, text: `Bins (${varLabels[yAxisVar]})`, color: '#64748B' }, grid: { display: false } },
        y: { title: { display: true, text: 'Frequency Count', color: '#64748B' }, grid: { color: '#F1F5F9' }, beginAtZero: true },
      },
    };

    chartComponent = <Bar data={histData} options={histOptions} />;
  } else if (chartType === 'line') {
    const lineData = {
      labels,
      datasets: [
        {
          label: varLabels[yAxisVar],
          data: TELEMETRY_DATASET.map((d) => d[yAxisVar]),
          borderColor: '#F4A58A',
          backgroundColor: 'rgba(244, 165, 138, 0.2)',
          fill: true,
          tension: 0.3,
          pointRadius: 4,
          pointBackgroundColor: '#9E513B',
        },
      ],
    };

    const lineOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { grid: { display: false }, ticks: { color: '#64748B' } },
        y: { grid: { color: '#F1F5F9' }, ticks: { color: '#64748B' } },
      },
    };

    chartComponent = <Line data={lineData} options={lineOptions} />;
  } else {
    // Bar
    const barData = {
      labels,
      datasets: [
        {
          label: varLabels[yAxisVar],
          data: TELEMETRY_DATASET.map((d) => d[yAxisVar]),
          backgroundColor: '#FCE5DC',
          borderColor: '#F4A58A',
          borderWidth: 1.5,
          borderRadius: 4,
        },
      ],
    };

    const barOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { grid: { display: false }, ticks: { color: '#64748B' } },
        y: { grid: { color: '#F1F5F9' }, ticks: { color: '#64748B' } },
      },
    };

    chartComponent = <Bar data={barData} options={barOptions} />;
  }

  return (
    <div className="space-y-6">
      {/* Control Strip */}
      <div className="p-5 bg-white rounded-xl border border-[#E2E8F0] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F1F5F9] pb-3">
          <div>
            <h3 className="text-base font-bold text-[#172033] flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-[#9E513B]" />
              <span>Data Visualization Encoding Controls</span>
            </h3>
            <p className="text-xs text-[#64748B]">Switch visual representations and map variables to coordinate axes.</p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setChartType('bar');
              setXAxisVar('timestamp');
              setYAxisVar('temperature');
            }}
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
          >
            Reset
          </Button>
        </div>

        {/* Chart type selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          {(['bar', 'line', 'scatter', 'histogram'] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setChartType(type)}
              className={`py-2 px-3 rounded-lg border font-semibold capitalize cursor-pointer transition-all ${
                chartType === type
                  ? 'bg-[#FCE5DC] text-[#9E513B] border-[#EFC0B0]'
                  : 'bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0] hover:bg-[#F1F5F9]'
              }`}
            >
              {type} Plot
            </button>
          ))}
        </div>

        {/* Axis mapping */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
          <div>
            <label className="font-semibold text-[#172033] block mb-1.5">
              {chartType === 'scatter' ? 'X-Axis Variable (Numeric)' : 'X-Axis Domain'}
            </label>
            <select
              value={xAxisVar}
              onChange={(e) => setXAxisVar(e.target.value as keyof NumericTelemetryPoint)}
              className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg font-medium text-[#172033]"
            >
              <option value="timestamp">Timestamp (Time of Day)</option>
              <option value="temperature">Temperature (°C)</option>
              <option value="humidity">Relative Humidity (%)</option>
              <option value="pressure">Pressure (kPa)</option>
              <option value="cpuLoad">CPU Load (%)</option>
              <option value="powerWatts">Power Consumption (W)</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-[#172033] block mb-1.5">Y-Axis Target Variable</label>
            <select
              value={yAxisVar}
              onChange={(e) =>
                setYAxisVar(e.target.value as keyof Omit<NumericTelemetryPoint, 'timestamp'>)
              }
              className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg font-medium text-[#172033]"
            >
              <option value="temperature">Temperature (°C)</option>
              <option value="humidity">Relative Humidity (%)</option>
              <option value="pressure">Atmospheric Pressure (kPa)</option>
              <option value="cpuLoad">Node CPU Load (%)</option>
              <option value="powerWatts">Power Consumption (W)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Rendered Chart Canvas */}
      <div className="p-5 sm:p-6 bg-white rounded-xl border border-[#E2E8F0] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-[#172033]">
            {chartType.toUpperCase()} Representation: {varLabels[yAxisVar]}
          </h4>
          <span className="text-xs text-[#64748B]">Interactive Chart.js Canvas</span>
        </div>

        <div className="h-72 sm:h-80 w-full">{chartComponent}</div>
      </div>

      {/* Completion Action */}
      <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-[#E2E8F0]">
        <div className="flex items-center gap-2">
          {isDone ? (
            <CheckCircle2 className="w-5 h-5 text-[#3F7951]" />
          ) : (
            <div className="w-5 h-5 rounded-full border-2 border-[#CBD5E1]" />
          )}
          <span className="text-xs font-semibold text-[#172033]">
            {isDone ? 'Visualization Lab Completed' : 'Explore all four visualization encodings to complete this lab'}
          </span>
        </div>

        <Button
          variant={isDone ? 'outline' : 'unit'}
          unitId="unit-1"
          size="sm"
          onClick={() => completeLab('visualization')}
        >
          {isDone ? 'Mark as Incomplete' : 'Complete Visualization Lab'}
        </Button>
      </div>
    </div>
  );
};
