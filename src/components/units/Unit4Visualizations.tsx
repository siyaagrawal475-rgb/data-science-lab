'use client';

import React from 'react';
import { Unit4ProbabilityCLTSim } from '@/components/simulations/Unit4ProbabilityCLTSim';

export const Unit4Visualizations: React.FC = () => {
  return (
    <div className="space-y-8">
      <Unit4ProbabilityCLTSim />
    </div>
  );
};
