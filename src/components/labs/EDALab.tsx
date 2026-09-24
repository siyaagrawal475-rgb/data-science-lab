'use client';

import React, { useState, useMemo } from 'react';
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
import { Line, Bar } from 'react-chartjs-2';
import { TELEMETRY_DATASET, NumericTelemetryPoint } from '@/data/unit1/labs';
import { CheckCircle2, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useUnitProgress } from '@/lib/progress';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

export const EDALab: React.FC = () => {
  const { isLabCompleted, completeLab } = useUnitProgress('unit-1');
  const isDone = isLabCompleted('eda');

  const [selectedVar, setSelectedVar] = useState<keyof Omit<NumericTelemetryPoint, 'timestamp'>>('temperature');
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');
  const [timeFilter, setTimeFilter] = useState<'all' | 'morning' | 'afternoon'>('all');

  const filteredData = useMemo(() => {
    if (timeFilter === 'morning') {
      return TELEMETRY_DATASET.slice(0, 5); // 08:00 - 12:00
    }
    if (timeFilter === 'afternoon') {
      return TELEMETRY_DATASET.slice(5); // 13:00 - 19:00
    }
    return TELEMETRY_DATASET;
  }, [timeFilter]);

  const stats = useMemo(() => {
    const values = filteredData.map((d) => d[selectedVar]);
    const n = values.length;
    if (n === 0) return { mean: 0, median: 0, min: 0, max: 0, std: 0, count: 0 };

    const sorted = [...values].sort((a, b) => a - b);
    const sum = values.reduce((a, b) => a + b, 0);
    const mean = sum / n;
    const median = n % 2 === 0 ? (sorted[n / 2 - 1] + sorted[n / 2]) / 2 : sorted[Math.floor(n / 2)];
    const min = sorted[0];
    const max = sorted[n - 1];
    const variance = values.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / (n > 1 ? n - 1 : 1);
    const std = Math.sqrt(variance);

    return {
      mean: mean.toFixed(2),
      median: median.toFixed(2),
      min: min.toFixed(2),
      max: max.toFixed(2),
      std: std.toFixed(2),
      count: n,
    };
  }, [filteredData, selectedVar]);

  const varMeta = {
    temperature: { label: 'Temperature (°C)', color: '#F4A58A', unit: '°C' },
    humidity: { label: 'Relative Humidity (%)', color: '#91B9E8', unit: '%' },
    pressure: { label: 'Atmospheric Pressure (kPa)', color: '#8FC7A3', unit: 'kPa' },
    cpuLoad: { label: 'Node CPU Load (%)', color: '#B7A3E3', unit: '%' },
    powerWatts: { label: 'Power Consumption (W)', color: '#E8C878', unit: 'W' },
  };

  const currentMeta = varMeta[selectedVar];

  const chartData = {
    labels: filteredData.map((d) => d.timestamp),
    datasets: [
      {
        label: currentMeta.label,
        data: filteredData.map((d) => d[selectedVar]),
        borderColor: '#F4A58A',
        backgroundColor: chartType === 'bar' ? '#FCE5DC' : 'rgba(244, 165, 138, 0.2)',
        tension: 0.3,
        fill: chartType === 'line',
        pointBackgroundColor: '#9E513B',
        pointRadius: 4,
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#172033',
        padding: 8,
      },
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: '#64748B', font: { size: 11 } } },
      y: { grid: { color: '#F1F5F9' }, ticks: { color: '#64748B', font: { size: 11 } } },
    },
  };

  const handleComplete = () => {
    completeLab('eda');
  };

  return (
    <div className="space-y-6">
      {/* Controls Card */}
      <div className="p-5 bg-white rounded-xl border border-[#E2E8F0] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F1F5F9] pb-3">
          <div>
            <h3 className="text-base font-bold text-[#172033]">Exploratory Data Analysis Controls</h3>
            <p className="text-xs text-[#64748B]">Select target telemetry variable, visualization encoding, and time window filters.</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedVar('temperature');
              setChartType('line');
              setTimeFilter('all');
            }}
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
          >
            Reset
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="font-semibold text-[#172033] block mb-1.5">Variable to Profile</label>
            <select
              value={selectedVar}
              onChange={(e) =>
                setSelectedVar(e.target.value as keyof Omit<NumericTelemetryPoint, 'timestamp'>)
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

          <div>
            <label className="font-semibold text-[#172033] block mb-1.5">Visualization Type</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setChartType('line')}
                className={`flex-1 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer transition-colors ${
                  chartType === 'line'
                    ? 'bg-[#FCE5DC] text-[#9E513B] border-[#EFC0B0]'
                    : 'bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0]'
                }`}
              >
                Line Trend
              </button>
              <button
                type="button"
                onClick={() => setChartType('bar')}
                className={`flex-1 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer transition-colors ${
                  chartType === 'bar'
                    ? 'bg-[#FCE5DC] text-[#9E513B] border-[#EFC0B0]'
                    : 'bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0]'
                }`}
              >
                Bar Chart
              </button>
            </div>
          </div>

          <div>
            <label className="font-semibold text-[#172033] block mb-1.5">Time Interval Filter</label>
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value as 'all' | 'morning' | 'afternoon')}
              className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg font-medium text-[#172033]"
            >
              <option value="all">All Day (08:00 - 19:00)</option>
              <option value="morning">Morning Only (08:00 - 12:00)</option>
              <option value="afternoon">Afternoon Only (13:00 - 19:00)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="p-5 sm:p-6 bg-white rounded-xl border border-[#E2E8F0] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-[#172033]">{currentMeta.label} over Observation Time</h4>
          <span className="text-xs text-[#64748B]">{stats.count} observations sampled</span>
        </div>

        <div className="h-72 w-full">
          {chartType === 'line' ? (
            <Line data={chartData} options={chartOptions} />
          ) : (
            <Bar data={chartData} options={chartOptions} />
          )}
        </div>
      </div>

      {/* 5-Number & Summary Stats Matrix */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-3.5 bg-white rounded-xl border border-[#E2E8F0] shadow-2xs text-center">
          <span className="text-[11px] font-semibold text-[#64748B] block uppercase tracking-wider">Mean (x̄)</span>
          <span className="text-lg font-bold text-[#172033]">{stats.mean}</span>
        </div>
        <div className="p-3.5 bg-white rounded-xl border border-[#E2E8F0] shadow-2xs text-center">
          <span className="text-[11px] font-semibold text-[#64748B] block uppercase tracking-wider">Median</span>
          <span className="text-lg font-bold text-[#172033]">{stats.median}</span>
        </div>
        <div className="p-3.5 bg-white rounded-xl border border-[#E2E8F0] shadow-2xs text-center">
          <span className="text-[11px] font-semibold text-[#64748B] block uppercase tracking-wider">Std Dev (s)</span>
          <span className="text-lg font-bold text-[#172033]">{stats.std}</span>
        </div>
        <div className="p-3.5 bg-white rounded-xl border border-[#E2E8F0] shadow-2xs text-center">
          <span className="text-[11px] font-semibold text-[#64748B] block uppercase tracking-wider">Minimum</span>
          <span className="text-lg font-bold text-[#172033]">{stats.min}</span>
        </div>
        <div className="p-3.5 bg-white rounded-xl border border-[#E2E8F0] shadow-2xs text-center">
          <span className="text-[11px] font-semibold text-[#64748B] block uppercase tracking-wider">Maximum</span>
          <span className="text-lg font-bold text-[#172033]">{stats.max}</span>
        </div>
        <div className="p-3.5 bg-white rounded-xl border border-[#E2E8F0] shadow-2xs text-center">
          <span className="text-[11px] font-semibold text-[#64748B] block uppercase tracking-wider">Sample Size (N)</span>
          <span className="text-lg font-bold text-[#172033]">{stats.count}</span>
        </div>
      </div>

      {/* Analytical Interpretation */}
      <div className="p-5 bg-[#FCE5DC]/40 border border-[#EFC0B0] rounded-xl space-y-2 text-xs sm:text-sm text-[#475569]">
        <h4 className="font-bold text-[#9E513B] flex items-center gap-1.5">
          <span>Statistical Interpretation of Selected Data:</span>
        </h4>
        <p className="leading-relaxed">
          The selected variable <strong>{currentMeta.label}</strong> displays a sample mean of <strong>{stats.mean} {currentMeta.unit}</strong> and a median of <strong>{stats.median} {currentMeta.unit}</strong>. Because the mean and median are closely aligned within ~{Math.abs(Number(stats.mean) - Number(stats.median)).toFixed(2)} units, the distribution is relatively symmetric throughout the sampled {timeFilter} interval. The total variability is quantified by a standard deviation of <strong>{stats.std} {currentMeta.unit}</strong>.
        </p>
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
            {isDone ? 'Lab Completed & Progress Saved' : 'Complete this exploration to update your progress'}
          </span>
        </div>

        <Button
          variant={isDone ? 'outline' : 'unit'}
          unitId="unit-1"
          size="sm"
          onClick={handleComplete}
        >
          {isDone ? 'Mark as Incomplete' : 'Complete EDA Lab'}
        </Button>
      </div>
    </div>
  );
};
