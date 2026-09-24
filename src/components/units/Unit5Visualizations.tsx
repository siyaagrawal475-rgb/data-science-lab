'use client';

import React from 'react';
import { PolynomialFitPlot } from '@/components/visualizations/PolynomialFitPlot';
import { Unit5GradientDescentSim } from '@/components/simulations/Unit5GradientDescentSim';

export const Unit5Visualizations: React.FC = () => {
  return (
    <div className="space-y-8">
      <PolynomialFitPlot />
      <Unit5GradientDescentSim />
    </div>
  );
};
