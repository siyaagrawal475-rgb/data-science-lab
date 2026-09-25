'use client';

import React, { useState } from 'react';
import { CosineSimilarityExplorer } from '@/components/visualizations/CosineSimilarityExplorer';
import { Unit2VectorSpaceSim } from '@/components/simulations/Unit2VectorSpaceSim';
import { CSVUploader } from '@/components/csv/CSVUploader';
import { CSVColumnSelector } from '@/components/csv/CSVColumnSelector';
import { ParsedDataset } from '@/lib/csv/parser';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Compass, Move } from 'lucide-react';

export const Unit2Visualizations: React.FC = () => {
  const [dataset, setDataset] = useState<ParsedDataset | null>(null);
  const [selectedX, setSelectedX] = useState<string>('x_coordinate');
  const [selectedY, setSelectedY] = useState<string>('y_coordinate');

  return (
    <div className="space-y-8">
      {/* CSV Vector Dataset Uploader */}
      <CSVUploader
        unitNumber={2}
        defaultSampleId="feature_vectors"
        acceptedTypesLabel="CSV with numerical vector dimensions (e.g., x_coord, y_coord, embedding_1)"
        onDatasetLoaded={(ds) => {
          setDataset(ds);
          if (ds.numericColumns.length >= 2) {
            setSelectedX(ds.numericColumns[0]);
            setSelectedY(ds.numericColumns[1]);
          }
        }}
      />

      {dataset && (
        <CSVColumnSelector
          dataset={dataset}
          selectedXColumn={selectedX}
          onSelectXColumn={setSelectedX}
          selectedYColumn={selectedY}
          onSelectYColumn={setSelectedY}
          label="Map 2D Vector Coordinates (u_x, u_y)"
        />
      )}

      {/* Vector Space Explorer */}
      <div className="space-y-4">
        <SectionHeader
          title="2D Vector Space & Linear Algebra Visualizer"
          subtitle="Interact with vectors, scalar scaling, dot products, and orthogonal projections."
          badge={
            <span className="p-1 rounded bg-[#E5EFFB] dark:bg-[#1E293B] text-[#416B9E] dark:text-[#91B9E8]">
              <Compass className="w-4 h-4" />
            </span>
          }
        />
        <Unit2VectorSpaceSim />
      </div>

      {/* Cosine Similarity Explorer */}
      <div className="space-y-4">
        <SectionHeader
          title="Cosine Similarity & Angle Explorer"
          subtitle="Explore the angular orientation and cosine distance between vector embeddings."
          badge={
            <span className="p-1 rounded bg-[#E5EFFB] dark:bg-[#1E293B] text-[#416B9E] dark:text-[#91B9E8]">
              <Move className="w-4 h-4" />
            </span>
          }
        />
        <CosineSimilarityExplorer />
      </div>
    </div>
  );
};
