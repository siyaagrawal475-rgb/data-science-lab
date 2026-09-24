'use client';

import React from 'react';
import { Unit3MatrixTransformSim } from '@/components/simulations/Unit3MatrixTransformSim';

export const Unit3Visualizations: React.FC = () => {
  return (
    <div className="space-y-8">
      <Unit3MatrixTransformSim />
    </div>
  );
};
