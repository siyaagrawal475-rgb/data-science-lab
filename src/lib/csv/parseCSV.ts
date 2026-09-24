import { PrimitiveValue } from './datasetTypes';

/**
 * Pure client-side CSV parser following RFC 4180 principles.
 * Handles quoted fields, delimiters within quotes, escaped quotes (""), and varied line endings.
 */

export function parseCSV(csvText: string): { headers: string[]; rows: Record<string, PrimitiveValue>[] } {
  if (!csvText || !csvText.trim()) {
    throw new Error('The uploaded CSV file is empty.');
  }

  const lines: string[][] = [];
  let currentRow: string[] = [];
  let currentField = '';
  let inQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (inQuotes) {
      if (char === '"') {
        if (nextChar === '"') {
          // Escaped quote
          currentField += '"';
          i++; // Skip the next quote
        } else {
          // Closing quote
          inQuotes = false;
        }
      } else {
        currentField += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        currentRow.push(currentField.trim());
        currentField = '';
      } else if (char === '\r') {
        // Handle Windows \r\n line ending
        if (nextChar === '\n') {
          i++;
        }
        currentRow.push(currentField.trim());
        if (currentRow.some((f) => f.length > 0)) {
          lines.push(currentRow);
        }
        currentRow = [];
        currentField = '';
      } else if (char === '\n') {
        currentRow.push(currentField.trim());
        if (currentRow.some((f) => f.length > 0)) {
          lines.push(currentRow);
        }
        currentRow = [];
        currentField = '';
      } else {
        currentField += char;
      }
    }
  }

  // Push final field/row if exists
  if (currentField.length > 0 || currentRow.length > 0) {
    currentRow.push(currentField.trim());
    if (currentRow.some((f) => f.length > 0)) {
      lines.push(currentRow);
    }
  }

  if (lines.length === 0) {
    throw new Error('No valid tabular rows found in CSV.');
  }

  // Extract and clean headers
  const rawHeaders = lines[0];
  const headers = rawHeaders.map((h, idx) => (h && h.trim().length > 0 ? h.trim() : `Column_${idx + 1}`));

  const rows: Record<string, PrimitiveValue>[] = [];
  for (let r = 1; r < lines.length; r++) {
    const rowValues = lines[r];
    const rowObj: Record<string, PrimitiveValue> = {};

    headers.forEach((header, colIdx) => {
      const rawVal = rowValues[colIdx] !== undefined ? rowValues[colIdx] : '';
      if (rawVal === '' || rawVal === 'NA' || rawVal === 'null' || rawVal === 'NaN') {
        rowObj[header] = null;
      } else if (!isNaN(Number(rawVal)) && rawVal.trim() !== '') {
        rowObj[header] = Number(rawVal);
      } else if (rawVal.toLowerCase() === 'true') {
        rowObj[header] = true;
      } else if (rawVal.toLowerCase() === 'false') {
        rowObj[header] = false;
      } else {
        rowObj[header] = rawVal;
      }
    });

    rows.push(rowObj);
  }

  return { headers, rows };
}
