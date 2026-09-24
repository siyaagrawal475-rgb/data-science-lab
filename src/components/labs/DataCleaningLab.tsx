'use client';

import React, { useState, useMemo } from 'react';
import { INITIAL_MESSY_DATASET, MessyDataRow } from '@/data/unit1/labs';
import { CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useUnitProgress } from '@/lib/progress';


export const DataCleaningLab: React.FC = () => {
  const { isLabCompleted, completeLab } = useUnitProgress('unit-1');
  const isDone = isLabCompleted('cleaning');

  const [data, setData] = useState<MessyDataRow[]>(INITIAL_MESSY_DATASET);
  const [operationsLog, setOperationsLog] = useState<string[]>([]);

  // Track operations
  const [hasDeduplicated, setHasDeduplicated] = useState(false);
  const [hasStandardizedCategories, setHasStandardizedCategories] = useState(false);
  const [missingStrategy, setMissingStrategy] = useState<'none' | 'impute-median' | 'drop'>('none');
  const [hasRemovedOutliers, setHasRemovedOutliers] = useState(false);

  // Diagnostic calculations on current dataset
  const diagnostics = useMemo(() => {
    const totalRows = data.length;
    let nullAgeCount = 0;
    let nullIncomeCount = 0;
    let nullSatisfactionCount = 0;

    data.forEach((r) => {
      if (r.age === null) nullAgeCount++;
      if (r.income === null) nullIncomeCount++;
      if (r.satisfaction === null) nullSatisfactionCount++;
    });

    const uniqueCategories = Array.from(new Set(data.map((r) => r.category)));
    const maxIncome = Math.max(...data.map((r) => r.income || 0));

    return {
      totalRows,
      nullCount: nullAgeCount + nullIncomeCount + nullSatisfactionCount,
      uniqueCategories,
      maxIncome,
    };
  }, [data]);

  // Operations
  const handleRemoveDuplicates = () => {
    const beforeCount = data.length;
    const seen = new Set<string>();
    const unique = data.filter((row) => {
      const key = `${row.id}-${row.name}-${row.city}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    const removed = beforeCount - unique.length;
    setData(unique);
    setHasDeduplicated(true);
    setOperationsLog((prev) => [
      `Deduplication executed: Removed ${removed} redundant duplicate record(s). Rows: ${beforeCount} → ${unique.length}.`,
      ...prev,
    ]);
  };

  const handleStandardizeCategories = () => {
    const updated = data.map((r) => ({
      ...r,
      category: r.category.trim().charAt(0).toUpperCase() + r.category.trim().slice(1).toLowerCase(),
    }));

    const beforeCats = Array.from(new Set(data.map((r) => r.category))).length;
    const afterCats = Array.from(new Set(updated.map((r) => r.category))).length;

    setData(updated);
    setHasStandardizedCategories(true);
    setOperationsLog((prev) => [
      `Categorical standardization applied: Reduced ${beforeCats} messy category strings to ${afterCats} canonical labels.`,
      ...prev,
    ]);
  };

  const handleHandleMissing = (strategy: 'impute-median' | 'drop') => {
    const beforeCount = data.length;

    if (strategy === 'drop') {
      const filtered = data.filter((r) => r.age !== null && r.income !== null && r.satisfaction !== null);
      const dropped = beforeCount - filtered.length;
      setData(filtered);
      setMissingStrategy('drop');
      setOperationsLog((prev) => [
        `Listwise deletion: Dropped ${dropped} row(s) with null fields. Remaining rows: ${filtered.length}.`,
        ...prev,
      ]);
    } else {
      // Median imputation
      const validAges = data.map((r) => r.age).filter((v): v is number => v !== null).sort((a, b) => a - b);
      const validIncomes = data.map((r) => r.income).filter((v): v is number => v !== null).sort((a, b) => a - b);
      const validSat = data.map((r) => r.satisfaction).filter((v): v is number => v !== null).sort((a, b) => a - b);

      const medianAge = validAges[Math.floor(validAges.length / 2)] || 35;
      const medianIncome = validIncomes[Math.floor(validIncomes.length / 2)] || 60000;
      const medianSat = validSat[Math.floor(validSat.length / 2)] || 4;

      const imputed = data.map((r) => ({
        ...r,
        age: r.age ?? medianAge,
        income: r.income ?? medianIncome,
        satisfaction: r.satisfaction ?? medianSat,
      }));

      setData(imputed);
      setMissingStrategy('impute-median');
      setOperationsLog((prev) => [
        `Median imputation executed: Imputed Age (${medianAge}), Income ($${medianIncome.toLocaleString()}), and Satisfaction (${medianSat}).`,
        ...prev,
      ]);
    }
  };

  const handleRemoveOutlier = () => {
    const beforeCount = data.length;
    // Remove extreme $2,500,000 anomaly (e.g. data entry typo or billionaire anomaly)
    const filtered = data.filter((r) => (r.income || 0) < 500000);
    const removed = beforeCount - filtered.length;
    setData(filtered);
    setHasRemovedOutliers(true);
    setOperationsLog((prev) => [
      `Outlier filter (Tukey fence): Filtered out ${removed} extreme income anomaly ($2,500,000).`,
      ...prev,
    ]);
  };

  const handleReset = () => {
    setData(INITIAL_MESSY_DATASET);
    setHasDeduplicated(false);
    setHasStandardizedCategories(false);
    setMissingStrategy('none');
    setHasRemovedOutliers(false);
    setOperationsLog(['Pipeline reset to initial raw dataset.']);
  };

  return (
    <div className="space-y-6">
      {/* Transformation Control Toolbar */}
      <div className="p-5 bg-white rounded-xl border border-[#E2E8F0] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F1F5F9] pb-3">
          <div>
            <h3 className="text-base font-bold text-[#172033] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#9E513B]" />
              <span>Interactive Data Cleaning Pipeline</span>
            </h3>
            <p className="text-xs text-[#64748B]">
              Execute step-by-step cleaning operations and inspect the before/after results in real time.
            </p>
          </div>

          <Button variant="outline" size="sm" onClick={handleReset} leftIcon={<RotateCcw className="w-3.5 h-3.5" />}>
            Reset Raw Data
          </Button>
        </div>

        {/* Cleaning Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <Button
            variant={hasDeduplicated ? 'outline' : 'secondary'}
            size="sm"
            onClick={handleRemoveDuplicates}
            disabled={hasDeduplicated}
          >
            {hasDeduplicated ? '✓ Duplicates Removed' : '1. Remove Duplicate Rows'}
          </Button>

          <Button
            variant={hasStandardizedCategories ? 'outline' : 'secondary'}
            size="sm"
            onClick={handleStandardizeCategories}
            disabled={hasStandardizedCategories}
          >
            {hasStandardizedCategories ? '✓ Casing Standardized' : '2. Standardize Categories'}
          </Button>

          <Button
            variant={missingStrategy !== 'none' ? 'outline' : 'secondary'}
            size="sm"
            onClick={() => handleHandleMissing('impute-median')}
            disabled={missingStrategy !== 'none'}
          >
            {missingStrategy !== 'none' ? '✓ Nulls Handled' : '3. Impute Nulls (Median)'}
          </Button>

          <Button
            variant={hasRemovedOutliers ? 'outline' : 'secondary'}
            size="sm"
            onClick={handleRemoveOutlier}
            disabled={hasRemovedOutliers}
          >
            {hasRemovedOutliers ? '✓ Outliers Filtered' : '4. Filter Extreme Outlier'}
          </Button>
        </div>
      </div>

      {/* Real-time Diagnostics Matrix */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 bg-white rounded-xl border border-[#E2E8F0] shadow-2xs text-center">
          <span className="text-[11px] font-semibold text-[#64748B] block uppercase tracking-wider">Total Rows</span>
          <span className="text-lg font-bold text-[#172033]">{diagnostics.totalRows}</span>
        </div>
        <div className="p-3.5 bg-white rounded-xl border border-[#E2E8F0] shadow-2xs text-center">
          <span className="text-[11px] font-semibold text-[#64748B] block uppercase tracking-wider">Missing Values</span>
          <span className={`text-lg font-bold ${diagnostics.nullCount > 0 ? 'text-[#8A4E63]' : 'text-[#3F7951]'}`}>
            {diagnostics.nullCount}
          </span>
        </div>
        <div className="p-3.5 bg-white rounded-xl border border-[#E2E8F0] shadow-2xs text-center">
          <span className="text-[11px] font-semibold text-[#64748B] block uppercase tracking-wider">Category Variety</span>
          <span className="text-lg font-bold text-[#172033]">{diagnostics.uniqueCategories.length} variants</span>
        </div>
        <div className="p-3.5 bg-white rounded-xl border border-[#E2E8F0] shadow-2xs text-center">
          <span className="text-[11px] font-semibold text-[#64748B] block uppercase tracking-wider">Max Income</span>
          <span className={`text-lg font-bold ${diagnostics.maxIncome > 500000 ? 'text-[#8A4E63]' : 'text-[#172033]'}`}>
            ${diagnostics.maxIncome.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Live Data Table View */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs overflow-hidden">
        <div className="px-5 py-3.5 border-b border-[#E2E8F0] flex items-center justify-between">
          <h4 className="text-xs font-bold text-[#172033] uppercase tracking-wider">
            Current Dataset State ({data.length} Records)
          </h4>
          <span className="text-xs text-[#64748B]">Showing all records</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] text-[#64748B] border-b border-[#E2E8F0]">
              <tr>
                <th className="py-2.5 px-4 font-semibold">ID</th>
                <th className="py-2.5 px-4 font-semibold">Name</th>
                <th className="py-2.5 px-4 font-semibold">Category</th>
                <th className="py-2.5 px-4 font-semibold">Age</th>
                <th className="py-2.5 px-4 font-semibold">Income ($)</th>
                <th className="py-2.5 px-4 font-semibold">Satisfaction</th>
                <th className="py-2.5 px-4 font-semibold">City</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9] text-[#334155]">
              {data.map((row, idx) => (
                <tr key={`${row.id}-${idx}`} className="hover:bg-[#F8FAFC]">
                  <td className="py-2.5 px-4 font-mono text-[#64748B]">{row.id}</td>
                  <td className="py-2.5 px-4 font-medium text-[#172033]">{row.name}</td>
                  <td className="py-2.5 px-4">
                    <span className="px-2 py-0.5 rounded bg-[#F1F5F9] text-[#475569] font-mono">
                      {row.category}
                    </span>
                  </td>
                  <td className="py-2.5 px-4">
                    {row.age === null ? (
                      <span className="text-[#8A4E63] font-bold bg-[#F6E5EB] px-1.5 py-0.5 rounded text-[11px]">NULL</span>
                    ) : (
                      row.age
                    )}
                  </td>
                  <td className="py-2.5 px-4 font-mono">
                    {row.income === null ? (
                      <span className="text-[#8A4E63] font-bold bg-[#F6E5EB] px-1.5 py-0.5 rounded text-[11px]">NULL</span>
                    ) : row.income > 500000 ? (
                      <span className="text-[#8A4E63] font-bold bg-[#F6E5EB] px-1.5 py-0.5 rounded">
                        ${row.income.toLocaleString()} (Outlier)
                      </span>
                    ) : (
                      `$${row.income.toLocaleString()}`
                    )}
                  </td>
                  <td className="py-2.5 px-4">
                    {row.satisfaction === null ? (
                      <span className="text-[#8A4E63] font-bold bg-[#F6E5EB] px-1.5 py-0.5 rounded text-[11px]">NULL</span>
                    ) : (
                      `${row.satisfaction} / 5`
                    )}
                  </td>
                  <td className="py-2.5 px-4">{row.city}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transformation Audit Log */}
      {operationsLog.length > 0 && (
        <div className="p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] space-y-1.5 text-xs text-[#475569]">
          <span className="font-bold text-[#172033] block uppercase tracking-wider text-[11px]">
            Transformation Audit Log:
          </span>
          <ul className="list-disc pl-4 space-y-1">
            {operationsLog.map((log, i) => (
              <li key={i}>{log}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Completion Action */}
      <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-[#E2E8F0]">
        <div className="flex items-center gap-2">
          {isDone ? (
            <CheckCircle2 className="w-5 h-5 text-[#3F7951]" />
          ) : (
            <div className="w-5 h-5 rounded-full border-2 border-[#CBD5E1]" />
          )}
          <span className="text-xs font-semibold text-[#172033]">
            {isDone ? 'Data Cleaning Lab Completed' : 'Finish cleaning the sample dataset to earn lab credit'}
          </span>
        </div>

        <Button
          variant={isDone ? 'outline' : 'unit'}
          unitId="unit-1"
          size="sm"
          onClick={() => completeLab('cleaning')}
        >
          {isDone ? 'Mark as Incomplete' : 'Complete Data Cleaning Lab'}
        </Button>
      </div>
    </div>
  );
};
