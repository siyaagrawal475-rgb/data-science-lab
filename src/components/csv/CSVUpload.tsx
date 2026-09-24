'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, AlertCircle, CheckCircle2 } from 'lucide-react';
import { inspectDataset } from '@/lib/csv/inspectDataset';
import { ParsedDataset } from '@/lib/csv/datasetTypes';
import { Button } from '@/components/ui/Button';

interface CSVUploadProps {
  onDatasetLoaded: (dataset: ParsedDataset) => void;
  maxSizeBytes?: number; // default 5MB
}

export const CSVUpload: React.FC<CSVUploadProps> = ({
  onDatasetLoaded,
  maxSizeBytes = 5 * 1024 * 1024,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadedFileName, setLoadedFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    setError(null);

    if (!file.name.endsWith('.csv') && file.type !== 'text/csv') {
      setError('Please upload a valid .csv file.');
      return;
    }

    if (file.size > maxSizeBytes) {
      setError(`File size exceeds maximum limit of ${(maxSizeBytes / (1024 * 1024)).toFixed(0)}MB.`);
      return;
    }

    setIsLoading(true);
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const dataset = inspectDataset(file.name, text);
        setLoadedFileName(file.name);
        onDatasetLoaded(dataset);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Failed to parse CSV file.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    reader.onerror = () => {
      setError('An error occurred while reading the file.');
      setIsLoading(false);
    };

    reader.readAsText(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full space-y-3">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-3 ${
          isDragging
            ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/20'
            : 'border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/40 hover:bg-slate-50 dark:hover:bg-slate-900/80 hover:border-slate-400'
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept=".csv"
          className="hidden"
        />

        <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
          <UploadCloud className="w-6 h-6" />
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            {loadedFileName ? (
              <span className="flex items-center gap-1.5 justify-center text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-4 h-4" /> {loadedFileName} loaded
              </span>
            ) : (
              'Click to upload or drag and drop your CSV dataset'
            )}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Local browser processing only — your dataset stays completely private.
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={isLoading}
          onClick={(e) => {
            e.stopPropagation();
            fileInputRef.current?.click();
          }}
        >
          {isLoading ? 'Processing...' : 'Browse Files'}
        </Button>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 text-xs text-rose-700 dark:text-rose-300">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
