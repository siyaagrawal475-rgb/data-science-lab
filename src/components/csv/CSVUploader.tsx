'use client';

import React, { useState, useRef } from 'react';
import {
  Upload,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  Table as TableIcon,
} from 'lucide-react';
import { parseCSV, ParsedDataset } from '@/lib/csv/parser';
import { SAMPLE_DATASETS } from '@/lib/csv/sampleDatasets';

interface CSVUploaderProps {
  onDatasetLoaded: (dataset: ParsedDataset) => void;
  defaultSampleId?: string;
  unitNumber?: number;
  acceptedTypesLabel?: string;
  className?: string;
}

export const CSVUploader: React.FC<CSVUploaderProps> = ({
  onDatasetLoaded,
  defaultSampleId = 'ecommerce_sales',
  unitNumber,
  acceptedTypesLabel = 'CSV with numeric and categorical columns',
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState<'sample' | 'upload'>('sample');
  const [selectedSampleId, setSelectedSampleId] = useState(defaultSampleId);
  const [currentDataset, setCurrentDataset] = useState<ParsedDataset | null>(() => {
    const sample = SAMPLE_DATASETS.find((s) => s.id === defaultSampleId) || SAMPLE_DATASETS[0];
    const { dataset } = parseCSV(sample.csvContent, sample.name);
    return dataset || null;
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filter sample datasets relevant to current unit or all
  const availableSamples = unitNumber
    ? SAMPLE_DATASETS.filter((s) => s.unitNumber === unitNumber || s.id === defaultSampleId)
    : SAMPLE_DATASETS;

  // Load sample dataset
  const loadSample = (sampleId: string) => {
    const sample = SAMPLE_DATASETS.find((s) => s.id === sampleId) || SAMPLE_DATASETS[0];
    const { dataset, error } = parseCSV(sample.csvContent, sample.name);
    if (dataset) {
      setCurrentDataset(dataset);
      setErrorMessage(null);
      onDatasetLoaded(dataset);
    } else if (error) {
      setErrorMessage(error);
    }
  };

  const handleFile = (file: File) => {
    if (!file.name.endsWith('.csv') && file.type !== 'text/csv' && file.type !== 'application/vnd.ms-excel') {
      setErrorMessage('Please upload a valid .csv format file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const { dataset, error } = parseCSV(text, file.name);
      if (dataset) {
        setCurrentDataset(dataset);
        setErrorMessage(null);
        onDatasetLoaded(dataset);
      } else if (error) {
        setErrorMessage(error);
      }
    };
    reader.onerror = () => {
      setErrorMessage('Failed to read the uploaded CSV file.');
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className={`p-5 bg-white dark:bg-[#111827] rounded-2xl border border-[#E2E8F0] dark:border-[#334155] shadow-xs space-y-4 ${className}`}>
      {/* Source Switcher Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F1F5F9] dark:border-[#334155] pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <FileSpreadsheet className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#0F172A] dark:text-[#F8FAFC]">Dataset Workspace & Ingestion</h4>
            <p className="text-[11px] text-[#475569] dark:text-[#CBD5E1]">Upload custom tabular CSV or select curated benchmark datasets</p>
          </div>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center bg-[#F1F5F9] dark:bg-[#1E293B] p-1 rounded-xl border border-[#E2E8F0] dark:border-[#334155]">
          <button
            type="button"
            onClick={() => {
              setActiveTab('sample');
              loadSample(selectedSampleId);
            }}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'sample'
                ? 'bg-white dark:bg-[#111827] text-[#0F172A] dark:text-[#F8FAFC] shadow-xs'
                : 'text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white'
            }`}
          >
            Example Dataset
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'upload'
                ? 'bg-white dark:bg-[#111827] text-[#0F172A] dark:text-[#F8FAFC] shadow-xs'
                : 'text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white'
            }`}
          >
            <Upload className="w-3 h-3" />
            <span>Upload CSV</span>
          </button>
        </div>
      </div>

      {/* Mode A: Curated Sample Dataset Picker */}
      {activeTab === 'sample' && (
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <label className="text-xs font-semibold text-[#334155] dark:text-[#CBD5E1] whitespace-nowrap">
              Select Preset:
            </label>
            <select
              value={selectedSampleId}
              onChange={(e) => {
                setSelectedSampleId(e.target.value);
                loadSample(e.target.value);
              }}
              className="w-full text-xs font-medium bg-[#F8FAFC] dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] rounded-xl px-3 py-2 text-[#0F172A] dark:text-[#F8FAFC] focus:outline-none focus:border-blue-500"
            >
              {availableSamples.map((s) => (
                <option key={s.id} value={s.id}>
                  Unit {s.unitNumber}: {s.name} ({s.unitCategory})
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Mode B: Custom CSV Dropzone */}
      {activeTab === 'upload' && (
        <div className="space-y-3">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer ${
              isDragging
                ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/20'
                : 'border-[#CBD5E1] dark:border-[#334155] bg-[#F8FAFC] dark:bg-[#172033] hover:border-blue-400'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,text/csv,application/vnd.ms-excel"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFile(e.target.files[0]);
                }
              }}
            />
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Upload className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                Click or drag & drop CSV file to upload
              </p>
              <p className="text-[11px] text-[#475569] dark:text-[#CBD5E1]">{acceptedTypesLabel}</p>
            </div>
          </div>
        </div>
      )}

      {/* Error Alert */}
      {errorMessage && (
        <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-xl flex items-start gap-2.5 text-xs text-rose-800 dark:text-rose-300">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600 dark:text-rose-400" />
          <div>
            <p className="font-bold">CSV Ingestion Notice</p>
            <p>{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Active Dataset Loaded Badge & Metadata Bar */}
      {currentDataset && !errorMessage && (
        <div className="p-3 bg-[#F8FAFC] dark:bg-[#1E293B] rounded-xl border border-[#E2E8F0] dark:border-[#334155] space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span className="text-xs font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                {currentDataset.name}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold">
                Active
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <TableIcon className="w-3 h-3" />
                <span>{showPreview ? 'Hide Preview' : 'Preview 5 Rows'}</span>
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#475569] dark:text-[#CBD5E1]">
            <span>
              Rows: <strong className="text-[#0F172A] dark:text-[#F8FAFC] font-mono">{currentDataset.totalRows}</strong>
            </span>
            <span>•</span>
            <span>
              Features: <strong className="text-[#0F172A] dark:text-[#F8FAFC] font-mono">{currentDataset.totalColumns}</strong>
            </span>
            <span>•</span>
            <span>
              Numeric: <strong className="text-blue-600 dark:text-blue-400 font-mono">{currentDataset.numericColumns.length}</strong>
            </span>
            <span>•</span>
            <span>
              Categorical: <strong className="text-purple-600 dark:text-purple-400 font-mono">{currentDataset.categoricalColumns.length}</strong>
            </span>
            {currentDataset.hasMissingValues && (
              <>
                <span>•</span>
                <span className="text-amber-600 dark:text-amber-400 font-medium">Missing values detected</span>
              </>
            )}
          </div>

          {/* Collapsible 5-Row Data Preview Table */}
          {showPreview && (
            <div className="pt-2 overflow-x-auto">
              <table className="w-full text-[11px] border-collapse text-left">
                <thead>
                  <tr className="bg-[#F1F5F9] dark:bg-[#172033] border-b border-[#E2E8F0] dark:border-[#334155]">
                    {currentDataset.headers.map((h) => (
                      <th key={h} className="p-2 font-bold text-[#0F172A] dark:text-[#F8FAFC] whitespace-nowrap">
                        {h}
                        <span className="ml-1 text-[9px] font-normal text-[#64748B] dark:text-[#94A3B8]">
                          ({currentDataset.schemas[h]?.type || 'any'})
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentDataset.rows.slice(0, 5).map((r, rowIdx) => (
                    <tr key={rowIdx} className="border-b border-[#F1F5F9] dark:border-[#334155]">
                      {currentDataset.headers.map((h) => (
                        <td key={h} className="p-2 text-[#334155] dark:text-[#CBD5E1] whitespace-nowrap font-mono">
                          {r[h] === null ? <span className="text-rose-500 italic">null</span> : String(r[h])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
