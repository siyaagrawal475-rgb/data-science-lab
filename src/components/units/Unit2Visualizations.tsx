'use client';

import React from 'react';
import { CosineSimilarityExplorer } from '@/components/visualizations/CosineSimilarityExplorer';
import { Unit2VectorSpaceSim } from '@/components/simulations/Unit2VectorSpaceSim';

export const Unit2Visualizations: React.FC = () => {
  return (
    <div className="space-y-8">
      <CosineSimilarityExplorer />
      <Unit2VectorSpaceSim />
    </div>
  );
};
