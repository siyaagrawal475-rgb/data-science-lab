import { ColumnSummary, ColumnType, ParsedDataset, PrimitiveValue } from './datasetTypes';
import { parseCSV } from './parseCSV';

export function inferColumnType(values: PrimitiveValue[]): ColumnType {
  const nonNullValues = values.filter((v) => v !== null && v !== undefined && v !== '');
  if (nonNullValues.length === 0) return 'unknown';

  let numericCount = 0;
  let booleanCount = 0;
  let dateCount = 0;

  for (const v of nonNullValues) {
    if (typeof v === 'number' || (!isNaN(Number(v)) && typeof v !== 'boolean')) {
      numericCount++;
    } else if (typeof v === 'boolean' || v === 'true' || v === 'false') {
      booleanCount++;
    } else if (!isNaN(Date.parse(String(v))) && isNaN(Number(v))) {
      dateCount++;
    }
  }

  const threshold = 0.8;
  const total = nonNullValues.length;

  if (numericCount / total >= threshold) return 'numeric';
  if (booleanCount / total >= threshold) return 'boolean';
  if (dateCount / total >= threshold) return 'datetime';
  return 'categorical';
}

export function inspectDataset(fileName: string, csvText: string): ParsedDataset {
  const { headers, rows } = parseCSV(csvText);

  const columns: ColumnSummary[] = headers.map((header) => {
    const rawValues = rows.map((r) => r[header]);
    const missingCount = rawValues.filter((v) => v === null || v === undefined || v === '').length;
    const nonNullValues = rawValues.filter((v) => v !== null && v !== undefined && v !== '') as PrimitiveValue[];
    const uniqueValues = Array.from(new Set(nonNullValues));
    const type = inferColumnType(rawValues);

    const summary: ColumnSummary = {
      name: header,
      type,
      missingCount,
      uniqueCount: uniqueValues.length,
      sampleValues: uniqueValues.slice(0, 5),
    };

    if (type === 'numeric') {
      const numVals = nonNullValues.map(Number).filter((n) => !isNaN(n));
      if (numVals.length > 0) {
        const sorted = [...numVals].sort((a, b) => a - b);
        summary.min = sorted[0];
        summary.max = sorted[sorted.length - 1];
        summary.mean = numVals.reduce((a, b) => a + b, 0) / numVals.length;

        const mid = Math.floor(sorted.length / 2);
        summary.median = sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;

        const variance =
          numVals.reduce((acc, val) => acc + Math.pow(val - summary.mean!, 2), 0) / numVals.length;
        summary.stdDev = Math.sqrt(variance);
      }
    }

    return summary;
  });

  const numericColumns = columns.filter((c) => c.type === 'numeric').map((c) => c.name);
  const categoricalColumns = columns.filter((c) => c.type === 'categorical').map((c) => c.name);

  return {
    fileName,
    rowCount: rows.length,
    columnCount: headers.length,
    headers,
    columns,
    rows,
    previewRows: rows.slice(0, 10),
    numericColumns,
    categoricalColumns,
  };
}
