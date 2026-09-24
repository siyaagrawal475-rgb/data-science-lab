'use client';

import React, { useState, useMemo } from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';

import { TELEMETRY_DATASET, NumericTelemetryPoint } from '@/data/unit1/labs';
import { CheckCircle2, RotateCcw, GitCommit } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useUnitProgress } from '@/lib/progress';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

type MetricKey = keyof Omit<NumericTelemetryPoint, 'timestamp'>;

export const CorrelationLab: React.FC = () => {
  const { isLabCompleted, completeLab } = useUnitProgress('unit-1');
  const isDone = isLabCompleted('correlation');

  const [varX, setVarX] = useState<MetricKey>('temperature');
  const [varY, setVarY] = useState<MetricKey>('humidity');

  const varLabels: Record<MetricKey, string> = {
    temperature: 'Temperature (°C)',
    humidity: 'Relative Humidity (%)',
    pressure: 'Pressure (kPa)',
    cpuLoad: 'Node CPU Load (%)',
    powerWatts: 'Power Consumption (W)',
  };

  // Compute exact Pearson correlation coefficient r and linear regression fit line
  const { rValue, rSquared, interpretation, linePoints } = useMemo(() => {
    const xVals = TELEMETRY_DATASET.map((d) => d[varX]);

    const yVals = TELEMETRY_DATASET.map((d) => d[varY]);
    const n = xVals.length;

    const sumX = xVals.reduce((a, b) => a + b, 0);
    const sumY = yVals.reduce((a, b) => a + b, 0);
    const meanX = sumX / n;
    const meanY = sumY / n;

    let numerator = 0;
    let denomX = 0;
    let denomY = 0;

    for (let i = 0; i < n; i++) {
      const dx = xVals[i] - meanX;
      const dy = yVals[i] - meanY;
      numerator += dx * dy;
      denomX += dx * dx;
      denomY += dy * dy;
    }

    const denom = Math.sqrt(denomX * denomY);
    const r = denom === 0 ? 0 : numerator / denom;
    const r2 = r * r;

    // Linear regression slope & intercept: y = slope * x + intercept
    const slope = denomX === 0 ? 0 : numerator / denomX;
    const intercept = meanY - slope * meanX;

    const minX = Math.min(...xVals);
    const maxX = Math.max(...xVals);

    const fitLine = [
      { x: minX, y: slope * minX + intercept },
      { x: maxX, y: slope * maxX + intercept },
    ];

    let interp = 'Near-zero or negligible linear relationship';
    if (r >= 0.8) interp = 'Strong positive linear relationship';
    else if (r >= 0.5) interp = 'Moderate positive linear relationship';
    else if (r >= 0.2) interp = 'Weak positive linear relationship';
    else if (r <= -0.8) interp = 'Strong negative (inverse) linear relationship';
    else if (r <= -0.5) interp = 'Moderate negative (inverse) linear relationship';
    else if (r <= -0.2) interp = 'Weak negative (inverse) linear relationship';

    return {
      rValue: r.toFixed(3),
      rSquared: (r2 * 100).toFixed(1),
      interpretation: interp,
      linePoints: fitLine,
    };
  }, [varX, varY]);

  const scatterData: ChartData<'scatter'> = {
    datasets: [
      {
        label: `${varLabels[varX]} vs ${varLabels[varY]}`,
        data: TELEMETRY_DATASET.map((d) => ({ x: d[varX], y: d[varY] })),
        backgroundColor: '#F4A58A',
        borderColor: '#9E513B',
        pointRadius: 6,
        pointHoverRadius: 8,
      },
      {
        label: 'OLS Linear Fit',
        data: linePoints,
        borderColor: '#9E513B',
        borderWidth: 2,
        pointRadius: 0,
        showLine: true,
        borderDash: [5, 5],
      },
    ],
  };

  const scatterOptions: ChartOptions<'scatter'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: { boxWidth: 12, font: { size: 11 }, color: '#172033' },
      },
      tooltip: {
        backgroundColor: '#172033',
        padding: 8,
      },
    },
    scales: {
      x: {
        type: 'linear' as const,
        title: { display: true, text: varLabels[varX], color: '#64748B', font: { size: 12 } },
        grid: { color: '#F1F5F9' },
      },
      y: {
        title: { display: true, text: varLabels[varY], color: '#64748B', font: { size: 12 } },
        grid: { color: '#F1F5F9' },
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Control Strip */}
      <div className="p-5 bg-white rounded-xl border border-[#E2E8F0] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F1F5F9] pb-3">
          <div>
            <h3 className="text-base font-bold text-[#172033] flex items-center gap-2">
              <GitCommit className="w-4 h-4 text-[#9E513B]" />
              <span>Bivariate Correlation & Scatter Analysis</span>
            </h3>
            <p className="text-xs text-[#64748B]">Select two continuous features to evaluate their mathematical linear association.</p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setVarX('temperature');
              setVarY('humidity');
            }}
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
          >
            Reset
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="font-semibold text-[#172033] block mb-1.5">Independent Feature (X)</label>
            <select
              value={varX}
              onChange={(e) => setVarX(e.target.value as MetricKey)}
              className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg font-medium text-[#172033]"
            >
              <option value="temperature">Temperature (°C)</option>
              <option value="humidity">Relative Humidity (%)</option>
              <option value="pressure">Atmospheric Pressure (kPa)</option>
              <option value="cpuLoad">Node CPU Load (%)</option>
              <option value="powerWatts">Power Consumption (Watts)</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-[#172033] block mb-1.5">Dependent Target (Y)</label>
            <select
              value={varY}
              onChange={(e) => setVarY(e.target.value as MetricKey)}
              className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg font-medium text-[#172033]"
            >
              <option value="humidity">Relative Humidity (%)</option>
              <option value="temperature">Temperature (°C)</option>
              <option value="pressure">Atmospheric Pressure (kPa)</option>
              <option value="cpuLoad">Node CPU Load (%)</option>
              <option value="powerWatts">Power Consumption (Watts)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 bg-white rounded-xl border border-[#E2E8F0] shadow-2xs text-center space-y-1">
          <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">Pearson Correlation (r)</span>
          <div className="text-2xl font-bold font-mono text-[#9E513B]">{rValue}</div>
          <span className="text-[11px] text-[#64748B]">-1.000 ≤ r ≤ +1.000</span>
        </div>

        <div className="p-4 bg-white rounded-xl border border-[#E2E8F0] shadow-2xs text-center space-y-1">
          <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">Coefficient of Det. (R²)</span>
          <div className="text-2xl font-bold font-mono text-[#172033]">{rSquared}%</div>
          <span className="text-[11px] text-[#64748B]">Variance explained</span>
        </div>

        <div className="p-4 bg-white rounded-xl border border-[#E2E8F0] shadow-2xs text-center space-y-1">
          <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">Strength Classification</span>
          <div className="text-sm font-bold text-[#172033] pt-2">{interpretation}</div>
        </div>
      </div>

      {/* Scatter Canvas */}
      <div className="p-5 sm:p-6 bg-white rounded-xl border border-[#E2E8F0] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-[#172033]">
            Scatter Dispersion & Linear Fit: {varLabels[varX]} vs {varLabels[varY]}
          </h4>
          <span className="text-xs text-[#64748B]">r = {rValue}</span>
        </div>

        <div className="h-72 sm:h-80 w-full">
          <Scatter data={scatterData} options={scatterOptions} />
        </div>
      </div>

      {/* Statistical Interpretation Callout */}
      <div className="p-5 bg-[#FCE5DC]/40 border border-[#EFC0B0] rounded-xl space-y-2 text-xs sm:text-sm text-[#475569]">
        <h4 className="font-bold text-[#9E513B]">Analytical Takeaway:</h4>
        <p className="leading-relaxed">
          The calculated Pearson correlation coefficient between <strong>{varLabels[varX]}</strong> and <strong>{varLabels[varY]}</strong> is <strong>r = {rValue}</strong>, indicating a <strong>{interpretation.toLowerCase()}</strong>. Approximately <strong>{rSquared}%</strong> of the variation in {varLabels[varY]} can be linearly predicted from {varLabels[varX]}.
        </p>
        <p className="text-[11px] text-[#9E513B] font-semibold pt-1">
          ⚠️ Scientific Reminder: Correlation proves linear association, not direct physical causation. Unobserved environmental variables may influence both metrics simultaneously.
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
            {isDone ? 'Correlation Lab Completed' : 'Explore feature correlations to complete this lab module'}
          </span>
        </div>

        <Button
          variant={isDone ? 'outline' : 'unit'}
          unitId="unit-1"
          size="sm"
          onClick={() => completeLab('correlation')}
        >
          {isDone ? 'Mark as Incomplete' : 'Complete Correlation Lab'}
        </Button>
      </div>
    </div>
  );
};
