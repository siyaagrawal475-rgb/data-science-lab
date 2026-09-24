export type ColumnType = 'numeric' | 'categorical' | 'boolean' | 'datetime' | 'unknown';

export type PrimitiveValue = string | number | boolean | null;

export interface ColumnSummary {
  name: string;
  type: ColumnType;
  missingCount: number;
  uniqueCount: number;
  sampleValues: PrimitiveValue[];
  // Numeric specific summary stats
  min?: number;
  max?: number;
  mean?: number;
  median?: number;
  stdDev?: number;
}

export interface ParsedDataset {
  fileName: string;
  rowCount: number;
  columnCount: number;
  headers: string[];
  columns: ColumnSummary[];
  rows: Record<string, PrimitiveValue>[];
  previewRows: Record<string, PrimitiveValue>[];
  numericColumns: string[];
  categoricalColumns: string[];
}

export type SupportedChartType =
  | 'scatter'
  | 'histogram'
  | 'boxplot'
  | 'bar'
  | 'line'
  | 'heatmap';
