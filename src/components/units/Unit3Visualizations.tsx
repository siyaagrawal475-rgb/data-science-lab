'use client';

import React, { useState } from 'react';
import { Unit3MatrixTransformSim } from '@/components/simulations/Unit3MatrixTransformSim';
import { CSVUploader } from '@/components/csv/CSVUploader';
import { ParsedDataset } from '@/lib/csv/parser';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Grid } from 'lucide-react';

export const Unit3Visualizations: React.FC = () => {
  const [, setDataset] = useState<ParsedDataset | null>(null);

  return (
    <div className="space-y-8">
      {/* CSV Matrix Dataset Uploader */}
      <CSVUploader
        unitNumber={3}
        defaultSampleId="transformation_matrix"
        acceptedTypesLabel="CSV with matrix coefficients (e.g., m00, m01, m10, m11)"
        onDatasetLoaded={(ds) => {
          setDataset(ds);
        }}
      />

      <div className="space-y-4">
        <SectionHeader
          title="2D Matrix Transformation & Determinant Playground"
          subtitle="Explore spatial shearing, rotation, scaling, and determinant area distortions."
          badge={
            <span className="p-1 rounded bg-[#E5F3E9] dark:bg-[#1E293B] text-[#3F7951] dark:text-[#8FC7A3]">
              <Grid className="w-4 h-4" />
            </span>
          }
        />
        <Unit3MatrixTransformSim />
      </div>
    </div>
  );
};
