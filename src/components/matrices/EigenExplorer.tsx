'use client';

import React, { useState } from 'react';
import { eigen2x2, Matrix2D } from '@/lib/matrixMath';

export const EigenExplorer: React.FC = () => {
  const [matrix, setMatrix] = useState<Matrix2D>([
    [2, 1],
    [1, 2],
  ]);

  const a = matrix[0][0];
  const b = matrix[0][1];
  const c = matrix[1][0];
  const d = matrix[1][1];

  const eigenResult = eigen2x2(matrix);

  // SVG parameters
  const size = 340;
  const center = size / 2;
  const scale = 28;

  const toSvg = (x: number, y: number) => ({
    x: center + x * scale,
    y: center - y * scale,
  });

  const origin = toSvg(0, 0);

  return (
    <div className="bg-white border border-[#B8DCC3] rounded-xl p-5 shadow-sm space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E5F3E9] pb-3">
        <div>
          <h4 className="text-base font-semibold text-slate-800">Eigenvalue & Eigenvector Explorer</h4>
          <p className="text-xs text-slate-500">
            Discover the invariant directional axes <span className="font-mono font-bold text-[#3F7951]">Av = λv</span> where the matrix acts purely as scalar scaling.
          </p>
        </div>

        {/* Presets */}
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setMatrix([[2, 1], [1, 2]])}
            className="px-2 py-1 text-xs rounded bg-[#E5F3E9] text-[#3F7951] hover:bg-[#8FC7A3]/30 font-medium"
          >
            Symmetric (λ=3, 1)
          </button>
          <button
            onClick={() => setMatrix([[3, 0], [0, 1.5]])}
            className="px-2 py-1 text-xs rounded bg-slate-100 text-slate-700 hover:bg-slate-200 font-medium"
          >
            Diagonal (Axis Stretch)
          </button>
          <button
            onClick={() => setMatrix([[1, 2], [0, 1]])}
            className="px-2 py-1 text-xs rounded bg-slate-100 text-slate-700 hover:bg-slate-200 font-medium"
          >
            Shear (λ₁=λ₂=1)
          </button>
          <button
            onClick={() => setMatrix([[0, -1], [1, 0]])}
            className="px-2 py-1 text-xs rounded bg-amber-50 text-amber-800 hover:bg-amber-100 font-medium"
          >
            Rotation (Complex)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* SVG Visualization */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center">
          <div className="relative border border-slate-200 rounded-lg bg-slate-50/50 p-2 overflow-hidden shadow-inner">
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible select-none">
              <defs>
                <marker id="eig-arrow-1" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 8 5 L 0 9 z" fill="#0284C7" />
                </marker>
                <marker id="eig-arrow-2" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 8 5 L 0 9 z" fill="#059669" />
                </marker>
              </defs>

              {/* Grid */}
              {[-5, -3, -1, 1, 3, 5].map((tick) => {
                const p1 = toSvg(tick, -6);
                const p2 = toSvg(tick, 6);
                const p3 = toSvg(-6, tick);
                const p4 = toSvg(6, tick);
                return (
                  <g key={tick} opacity={0.25}>
                    <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2,2" />
                    <line x1={p3.x} y1={p3.y} x2={p4.x} y2={p4.y} stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2,2" />
                  </g>
                );
              })}

              {/* Axes */}
              <line x1={0} y1={center} x2={size} y2={center} stroke="#94a3b8" strokeWidth="1.5" />
              <line x1={center} y1={0} x2={center} y2={size} stroke="#94a3b8" strokeWidth="1.5" />

              {/* Real Eigenvectors Rays & Arrows */}
              {eigenResult.hasRealEigenvalues && eigenResult.eigenvectors && eigenResult.eigenvalues && (
                <>
                  {/* Axis 1 Line */}
                  {(() => {
                    const [v1x, v1y] = eigenResult.eigenvectors[0];
                    const l1 = eigenResult.eigenvalues[0];
                    const pStart = toSvg(v1x * -6, v1y * -6);
                    const pEnd = toSvg(v1x * 6, v1y * 6);
                    const pTrans = toSvg(v1x * 2.5 * l1, v1y * 2.5 * l1);

                    return (
                      <g key="eig1">
                        <line x1={pStart.x} y1={pStart.y} x2={pEnd.x} y2={pEnd.y} stroke="#0284C7" strokeWidth="1" strokeDasharray="3,3" opacity={0.4} />
                        <line x1={origin.x} y1={origin.y} x2={pTrans.x} y2={pTrans.y} stroke="#0284C7" strokeWidth="3" markerEnd="url(#eig-arrow-1)" />
                        <text x={pTrans.x + 6} y={pTrans.y - 4} fill="#0284C7" fontSize="11" fontWeight="bold">
                          v₁ (λ₁={l1.toFixed(2)})
                        </text>
                      </g>
                    );
                  })()}

                  {/* Axis 2 Line */}
                  {(() => {
                    const [v2x, v2y] = eigenResult.eigenvectors[1];
                    const l2 = eigenResult.eigenvalues[1];
                    const pStart = toSvg(v2x * -6, v2y * -6);
                    const pEnd = toSvg(v2x * 6, v2y * 6);
                    const pTrans = toSvg(v2x * 2.5 * l2, v2y * 2.5 * l2);

                    return (
                      <g key="eig2">
                        <line x1={pStart.x} y1={pStart.y} x2={pEnd.x} y2={pEnd.y} stroke="#059669" strokeWidth="1" strokeDasharray="3,3" opacity={0.4} />
                        <line x1={origin.x} y1={origin.y} x2={pTrans.x} y2={pTrans.y} stroke="#059669" strokeWidth="3" markerEnd="url(#eig-arrow-2)" />
                        <text x={pTrans.x + 6} y={pTrans.y + 12} fill="#059669" fontSize="11" fontWeight="bold">
                          v₂ (λ₂={l2.toFixed(2)})
                        </text>
                      </g>
                    );
                  })()}
                </>
              )}

              {/* Complex eigenvalues overlay message */}
              {!eigenResult.hasRealEigenvalues && (
                <g>
                  <rect x={center - 110} y={center - 30} width="220" height="60" rx="8" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1" />
                  <text x={center} y={center - 8} fill="#92400E" fontSize="12" fontWeight="bold" textAnchor="middle">
                    No Real Eigenvectors
                  </text>
                  <text x={center} y={center + 12} fill="#B45309" fontSize="10" textAnchor="middle">
                    (Transformation introduces rotation)
                  </text>
                </g>
              )}
            </svg>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-3 text-xs">
            <span className="inline-flex items-center gap-1.5 font-medium text-sky-700">
              <span className="w-3 h-1 bg-sky-600 rounded-full" /> Eigenvector 1 (Primary Axis)
            </span>
            <span className="inline-flex items-center gap-1.5 font-medium text-emerald-700">
              <span className="w-3 h-1 bg-emerald-600 rounded-full" /> Eigenvector 2 (Secondary Axis)
            </span>
          </div>
        </div>

        {/* Right Column: Controls & Spectral Metrics */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#E5F3E9]/40 border border-[#B8DCC3] rounded-xl p-4 space-y-3">
            <span className="text-xs font-bold text-[#3F7951] uppercase tracking-wider block">
              2×2 Matrix Entries
            </span>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-600 block mb-0.5">Entry a: <strong className="font-mono text-sky-800">{a}</strong></span>
                <input
                  type="range"
                  min="-3"
                  max="3"
                  step="0.25"
                  value={a}
                  onChange={(e) => setMatrix([[parseFloat(e.target.value), b], [c, d]])}
                  className="w-full accent-sky-600"
                />
              </div>
              <div>
                <span className="text-slate-600 block mb-0.5">Entry b: <strong className="font-mono text-slate-800">{b}</strong></span>
                <input
                  type="range"
                  min="-3"
                  max="3"
                  step="0.25"
                  value={b}
                  onChange={(e) => setMatrix([[a, parseFloat(e.target.value)], [c, d]])}
                  className="w-full accent-emerald-600"
                />
              </div>
              <div>
                <span className="text-slate-600 block mb-0.5">Entry c: <strong className="font-mono text-slate-800">{c}</strong></span>
                <input
                  type="range"
                  min="-3"
                  max="3"
                  step="0.25"
                  value={c}
                  onChange={(e) => setMatrix([[a, b], [parseFloat(e.target.value), d]])}
                  className="w-full accent-sky-600"
                />
              </div>
              <div>
                <span className="text-slate-600 block mb-0.5">Entry d: <strong className="font-mono text-emerald-800">{d}</strong></span>
                <input
                  type="range"
                  min="-3"
                  max="3"
                  step="0.25"
                  value={d}
                  onChange={(e) => setMatrix([[a, b], [c, parseFloat(e.target.value)]])}
                  className="w-full accent-emerald-600"
                />
              </div>
            </div>
          </div>

          {/* Eigendecomposition results */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2.5 text-xs font-mono">
            <h5 className="font-bold text-slate-800 font-sans uppercase tracking-wider text-xs border-b border-slate-200 pb-1">
              Eigendecomposition Spectral State:
            </h5>

            <div className="space-y-1.5 text-slate-700">
              <p>• Trace = a + d = <span className="font-bold text-slate-900">{eigenResult.trace.toFixed(2)}</span></p>
              <p>• Determinant = ad - bc = <span className="font-bold text-slate-900">{eigenResult.determinant.toFixed(2)}</span></p>
              <p>• Discriminant Δ = trace² - 4·det = <span className={`font-bold ${eigenResult.discriminant >= 0 ? 'text-emerald-700' : 'text-amber-700'}`}>{eigenResult.discriminant.toFixed(2)}</span></p>

              {eigenResult.hasRealEigenvalues && eigenResult.eigenvalues ? (
                <div className="pt-1.5 border-t border-slate-200 space-y-1">
                  <p className="text-sky-800 font-bold font-sans">
                    λ₁ = {eigenResult.eigenvalues[0].toFixed(3)}
                  </p>
                  <p className="text-emerald-800 font-bold font-sans">
                    λ₂ = {eigenResult.eigenvalues[1].toFixed(3)}
                  </p>
                </div>
              ) : (
                <p className="pt-1.5 border-t border-slate-200 text-amber-800 font-sans">
                  Roots of characteristic equation are complex conjugates (rotation in space).
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
