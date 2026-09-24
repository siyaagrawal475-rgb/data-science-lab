'use client';

import React from 'react';
import { ROCCurvePlot } from '@/components/visualizations/ROCCurvePlot';
import { Unit6ClassificationBoundarySim } from '@/components/simulations/Unit6ClassificationBoundarySim';

export const Unit6Visualizations: React.FC = () => {
  return (
    <div className="space-y-8">
      <ROCCurvePlot />
      <Unit6ClassificationBoundarySim />
    </div>
  );
};
