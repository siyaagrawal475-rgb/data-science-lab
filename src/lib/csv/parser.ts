/**
 * Robust Client-Side CSV Parser and Statistical Schema Analyzer
 * Data Science Lab — Phase 13
 */

export type ColumnType = 'numeric' | 'categorical' | 'date' | 'boolean';

export interface ColumnSchema {
  name: string;
  type: ColumnType;
  missingCount: number;
  uniqueCount: number;
  min?: number;
  max?: number;
  mean?: number;
  sampleValues: (string | number)[];
}

export interface ParsedDataset {
  name: string;
  headers: string[];
  rows: Record<string, string | number | null>[];
  totalRows: number;
  totalColumns: number;
  schemas: Record<string, ColumnSchema>;
  numericColumns: string[];
  categoricalColumns: string[];
  hasMissingValues: boolean;
  warnings?: string[];
}

/**
 * Parses raw CSV string handling quoted fields, commas, and line breaks
 */
export function parseCSV(text: string, datasetName = 'Uploaded Dataset'): { dataset?: ParsedDataset; error?: string } {
  if (!text || text.trim().length === 0) {
    return { error: 'The provided CSV file is empty.' };
  }

  const lines = text.trim().split(/\r\n|\n|\r/);
  if (lines.length < 2) {
    return { error: 'CSV file must contain a header row and at least one row of data.' };
  }

  // Parse header
  const rawHeaders = parseCSVLine(lines[0]);
  if (!rawHeaders || rawHeaders.length === 0) {
    return { error: 'Could not extract column headers from the first row.' };
  }

  // Sanitize and deduplicate headers
  const seenHeaders = new Set<string>();
  const headers = rawHeaders.map((h, idx) => {
    const clean = h.trim().replace(/^["']|["']$/g, '') || `col_${idx + 1}`;
    let unique = clean;
    let count = 1;
    while (seenHeaders.has(unique)) {
      unique = `${clean}_${count++}`;
    }
    seenHeaders.add(unique);
    return unique;
  });

  const rows: Record<string, string | number | null>[] = [];
  const warnings: string[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = parseCSVLine(line);
    if (values.length !== headers.length) {
      if (warnings.length < 3) {
        warnings.push(`Row ${i + 1} has ${values.length} columns (expected ${headers.length}). Padded or truncated.`);
      }
    }

    const rowObj: Record<string, string | number | null> = {};
    headers.forEach((header, colIdx) => {
      const rawVal = values[colIdx] !== undefined ? values[colIdx].trim().replace(/^["']|["']$/g, '') : '';
      if (rawVal === '' || rawVal.toLowerCase() === 'na' || rawVal.toLowerCase() === 'null' || rawVal.toLowerCase() === 'nan') {
        rowObj[header] = null;
      } else {
        const num = Number(rawVal);
        if (!isNaN(num) && rawVal !== '') {
          rowObj[header] = num;
        } else {
          rowObj[header] = rawVal;
        }
      }
    });

    rows.push(rowObj);
  }

  if (rows.length === 0) {
    return { error: 'No valid data rows found in the CSV.' };
  }

  // Schema inference
  const schemas: Record<string, ColumnSchema> = {};
  const numericColumns: string[] = [];
  const categoricalColumns: string[] = [];
  let hasMissingValues = false;

  headers.forEach((header) => {
    let numericCount = 0;
    let missingCount = 0;
    const valuesSet = new Set<string | number>();
    const numValues: number[] = [];
    const sampleValues: (string | number)[] = [];

    rows.forEach((row) => {
      const val = row[header];
      if (val === null || val === undefined) {
        missingCount++;
      } else {
        valuesSet.add(val);
        if (typeof val === 'number') {
          numericCount++;
          numValues.push(val);
        }
        if (sampleValues.length < 5) {
          sampleValues.push(val);
        }
      }
    });

    if (missingCount > 0) hasMissingValues = true;

    const nonNullCount = rows.length - missingCount;
    const isNumeric = nonNullCount > 0 && numericCount / nonNullCount >= 0.8;

    if (isNumeric) {
      numericColumns.push(header);
      const min = numValues.length > 0 ? Math.min(...numValues) : 0;
      const max = numValues.length > 0 ? Math.max(...numValues) : 0;
      const sum = numValues.reduce((a, b) => a + b, 0);
      const mean = numValues.length > 0 ? sum / numValues.length : 0;

      schemas[header] = {
        name: header,
        type: 'numeric',
        missingCount,
        uniqueCount: valuesSet.size,
        min,
        max,
        mean,
        sampleValues,
      };
    } else {
      categoricalColumns.push(header);
      schemas[header] = {
        name: header,
        type: 'categorical',
        missingCount,
        uniqueCount: valuesSet.size,
        sampleValues,
      };
    }
  });

  return {
    dataset: {
      name: datasetName,
      headers,
      rows,
      totalRows: rows.length,
      totalColumns: headers.length,
      schemas,
      numericColumns,
      categoricalColumns,
      hasMissingValues,
      warnings: warnings.length > 0 ? warnings : undefined,
    },
  };
}

/**
 * Parses a single CSV line with support for quoted commas
 */
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

/**
 * Extracts a numeric array for a given column from a dataset
 */
export function extractColumnValues(dataset: ParsedDataset, columnName: string, filterNulls = true): number[] {
  const values: number[] = [];
  dataset.rows.forEach((row) => {
    const val = row[columnName];
    if (typeof val === 'number') {
      values.push(val);
    } else if (!filterNulls && (val === null || val === undefined)) {
      values.push(0);
    }
  });
  return values;
}

/**
 * Extracts bivariate points {x, y} for two columns
 */
export function extractBivariatePoints(dataset: ParsedDataset, xCol: string, yCol: string): { x: number; y: number }[] {
  const points: { x: number; y: number }[] = [];
  dataset.rows.forEach((row) => {
    const x = Number(row[xCol]);
    const y = Number(row[yCol]);
    if (!isNaN(x) && !isNaN(y) && row[xCol] !== null && row[yCol] !== null) {
      points.push({ x, y });
    }
  });
  return points;
}

/**
 * Parses a raw matrix CSV (e.g. rows of comma-separated numbers)
 */
export function parseMatrixCSV(text: string): { matrix?: number[][]; shape?: [number, number]; error?: string } {
  if (!text || text.trim().length === 0) {
    return { error: 'Matrix CSV is empty.' };
  }
  const lines = text.trim().split(/\r\n|\n|\r/).filter((l) => l.trim().length > 0);
  const matrix: number[][] = [];
  let colCount = -1;

  for (let r = 0; r < lines.length; r++) {
    const cells = lines[r].split(',').map((c) => c.trim().replace(/^["']|["']$/g, ''));
    if (r === 0 && cells.some((c) => isNaN(Number(c)))) {
      // Header row detected, skip
      continue;
    }
    const numRow: number[] = [];
    for (let c = 0; c < cells.length; c++) {
      const num = Number(cells[c]);
      if (isNaN(num)) {
        return { error: `Non-numeric value "${cells[c]}" found at row ${r + 1}, column ${c + 1}.` };
      }
      numRow.push(num);
    }
    if (colCount === -1) {
      colCount = numRow.length;
    } else if (numRow.length !== colCount) {
      return { error: `Row ${r + 1} has ${numRow.length} columns, but previous rows have ${colCount}.` };
    }
    matrix.push(numRow);
  }

  if (matrix.length === 0 || colCount <= 0) {
    return { error: 'No numeric matrix rows found.' };
  }

  return {
    matrix,
    shape: [matrix.length, colCount],
  };
}
