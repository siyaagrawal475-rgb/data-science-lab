'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  Database,
  Terminal,
  ArrowRight,
  RotateCcw,
  Award,
} from 'lucide-react';
import { MiniProjectData } from '@/types/experiences';
import { Button } from '@/components/ui/Button';

interface MiniProjectRunnerProps {
  project: MiniProjectData;
  className?: string;
}

export const MiniProjectRunner: React.FC<MiniProjectRunnerProps> = ({ project, className = '' }) => {
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'dataset' | 'tasks' | 'evaluation'>('overview');

  const toggleTask = (taskId: string) => {
    setCompletedTasks((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  const allTasksDone = project.tasks.every((t) => completedTasks[t.id]);
  const isChallengeCorrect = selectedAnswer === project.challengeQuestion.correctIndex;

  return (
    <div className={`bg-white dark:bg-[#111827] rounded-2xl border border-[#E2E8F0] dark:border-[#334155] shadow-xs overflow-hidden ${className}`}>
      {/* Top Project Banner */}
      <div className="p-6 border-b border-[#E2E8F0] dark:border-[#334155] bg-linear-to-r from-[#F8FAFC] to-white dark:from-[#172033] dark:to-[#111827] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              Unit {project.unitNumber} Mini Project
            </span>
            <span className="text-xs text-[#64748B] dark:text-[#94A3B8] font-medium">
              {project.industryContext}
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-[#0F172A] dark:text-[#F8FAFC]">
            {project.title}
          </h2>
        </div>

        {allTasksDone && quizSubmitted && isChallengeCorrect && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 text-xs font-bold shrink-0 animate-in fade-in">
            <Award className="w-4 h-4 text-emerald-600" />
            <span>Mini Project Mastered!</span>
          </div>
        )}
      </div>

      {/* Internal Navigation Tabs */}
      <div className="flex border-b border-[#E2E8F0] dark:border-[#334155] bg-[#F8FAFC] dark:bg-[#172033] px-4 overflow-x-auto text-xs">
        <button
          onClick={() => setActiveTab('overview')}
          className={`py-3 px-4 font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'overview'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
              : 'border-transparent text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A]'
          }`}
        >
          1. Scenario & Objectives
        </button>
        <button
          onClick={() => setActiveTab('dataset')}
          className={`py-3 px-4 font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'dataset'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
              : 'border-transparent text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A]'
          }`}
        >
          2. Dataset Schema ({project.dataset.sampleRows.length} Rows)
        </button>
        <button
          onClick={() => setActiveTab('tasks')}
          className={`py-3 px-4 font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'tasks'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
              : 'border-transparent text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A]'
          }`}
        >
          3. Guided Analysis Tasks ({project.tasks.filter((t) => completedTasks[t.id]).length}/{project.tasks.length})
        </button>
        <button
          onClick={() => setActiveTab('evaluation')}
          className={`py-3 px-4 font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'evaluation'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
              : 'border-transparent text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A]'
          }`}
        >
          4. Interpretation & Challenge
        </button>
      </div>

      {/* Tab 1: Scenario & Objectives */}
      {activeTab === 'overview' && (
        <div className="p-6 space-y-6">
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8]">
              Industrial Problem Statement
            </h3>
            <p className="text-sm text-[#0F172A] dark:text-[#F8FAFC] leading-relaxed">
              {project.problemStatement}
            </p>
          </div>

          <div className="p-4 bg-[#F8FAFC] dark:bg-[#172033] rounded-xl border border-[#E2E8F0] dark:border-[#334155] space-y-2">
            <h4 className="text-xs font-bold text-[#0F172A] dark:text-[#F8FAFC]">
              Background Scenario
            </h4>
            <p className="text-xs text-[#475569] dark:text-[#CBD5E1] leading-relaxed">
              {project.scenario}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8]">
              Key Analytical Objectives
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.objectives.map((obj, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-white dark:bg-[#1E293B] rounded-xl border border-[#E2E8F0] dark:border-[#334155] flex items-start gap-2.5 text-xs text-[#0F172A] dark:text-[#F8FAFC]"
                >
                  <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-bold flex items-center justify-center shrink-0 text-[10px]">
                    {idx + 1}
                  </span>
                  <span>{obj}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <Button
              variant="primary"
              size="sm"
              onClick={() => setActiveTab('dataset')}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Explore Dataset Schema
            </Button>
          </div>
        </div>
      )}

      {/* Tab 2: Dataset Schema & Sample Rows */}
      {activeTab === 'dataset' && (
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                {project.dataset.name}
              </h3>
              <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">
                {project.dataset.description}
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400">
              <Database className="w-4 h-4" />
              <span>Structured Telemetry</span>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#E2E8F0] dark:border-[#334155]">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#F8FAFC] dark:bg-[#1E293B] border-b border-[#E2E8F0] dark:border-[#334155]">
                  {project.dataset.columns.map((col) => (
                    <th
                      key={col}
                      className="p-3 font-bold text-[#475569] dark:text-[#CBD5E1] uppercase tracking-wider text-[11px]"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0] dark:divide-[#334155]">
                {project.dataset.sampleRows.map((row, rIdx) => (
                  <tr
                    key={rIdx}
                    className="hover:bg-[#F8FAFC] dark:hover:bg-[#172033] font-mono text-[11px]"
                  >
                    {project.dataset.columns.map((col) => (
                      <td key={col} className="p-3 text-[#0F172A] dark:text-[#F8FAFC]">
                        {row[col] !== undefined ? String(row[col]) : '—'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-2 flex justify-between">
            <Button variant="outline" size="sm" onClick={() => setActiveTab('overview')}>
              Back to Overview
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setActiveTab('tasks')}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Begin Guided Tasks
            </Button>
          </div>
        </div>
      )}

      {/* Tab 3: Guided Analysis Tasks */}
      {activeTab === 'tasks' && (
        <div className="p-6 space-y-6">
          <div className="space-y-4">
            {project.tasks.map((task) => {
              const isDone = !!completedTasks[task.id];
              return (
                <div
                  key={task.id}
                  className={`p-5 rounded-2xl border transition-all space-y-3 ${
                    isDone
                      ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800'
                      : 'bg-white dark:bg-[#1E293B] border-[#E2E8F0] dark:border-[#334155]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-bold flex items-center justify-center shrink-0 text-xs">
                        {task.stepNumber}
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                          {task.title}
                        </h4>
                        <p className="text-xs text-[#475569] dark:text-[#CBD5E1] mt-1 leading-relaxed">
                          {task.instruction}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleTask(task.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                        isDone
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-[#F1F5F9] dark:bg-[#172033] text-[#475569] dark:text-[#CBD5E1] hover:bg-emerald-50 hover:text-emerald-700'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{isDone ? 'Completed' : 'Mark Done'}</span>
                    </button>
                  </div>

                  {task.codeSnippet && (
                    <div className="p-3 bg-[#0F172A] text-[#F8FAFC] rounded-xl text-xs font-mono overflow-x-auto space-y-1">
                      <div className="text-[10px] text-[#94A3B8] uppercase flex items-center gap-1">
                        <Terminal className="w-3 h-3 text-emerald-400" />
                        <span>Computational Python Execution</span>
                      </div>
                      <pre className="text-[11px] leading-relaxed">{task.codeSnippet}</pre>
                    </div>
                  )}

                  <div className="p-3 bg-[#F8FAFC] dark:bg-[#172033] rounded-xl border border-[#E2E8F0] dark:border-[#334155] text-xs space-y-1">
                    <div className="font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Mathematical Output & Interpretation:</span>
                    </div>
                    <p className="text-[#334155] dark:text-[#CBD5E1] font-mono text-[11px]">
                      {task.expectedResult}
                    </p>
                    <p className="text-[#64748B] dark:text-[#94A3B8] text-[11px] pt-1">
                      {task.explanation}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 flex justify-between items-center">
            <span className="text-xs text-[#64748B] dark:text-[#94A3B8]">
              {project.tasks.filter((t) => completedTasks[t.id]).length} of {project.tasks.length} tasks marked complete
            </span>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setActiveTab('evaluation')}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Verify Interpretation & Final Challenge
            </Button>
          </div>
        </div>
      )}

      {/* Tab 4: Final Interpretation & Challenge */}
      {activeTab === 'evaluation' && (
        <div className="p-6 space-y-6">
          <div className="p-5 bg-blue-50/60 dark:bg-[#1E293B] rounded-2xl border border-blue-200 dark:border-blue-900/50 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Final Industrial Synthesis</span>
            </h4>
            <p className="text-xs text-[#0F172A] dark:text-[#F8FAFC] leading-relaxed">
              {project.finalInterpretation}
            </p>
          </div>

          {/* Verification Challenge */}
          <div className="p-5 bg-[#F8FAFC] dark:bg-[#172033] rounded-2xl border border-[#E2E8F0] dark:border-[#334155] space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                Capstone Challenge Question
              </span>
              <h4 className="text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                {project.challengeQuestion.question}
              </h4>
            </div>

            <div className="space-y-2">
              {project.challengeQuestion.options.map((opt, optIdx) => {
                const isSelected = selectedAnswer === optIdx;
                const isCorrect = optIdx === project.challengeQuestion.correctIndex;
                let optStyle = 'bg-white dark:bg-[#111827] border-[#E2E8F0] dark:border-[#334155] text-[#0F172A] dark:text-[#CBD5E1]';
                if (quizSubmitted) {
                  if (isCorrect) {
                    optStyle = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 text-emerald-800 dark:text-emerald-200 font-bold';
                  } else if (isSelected && !isCorrect) {
                    optStyle = 'bg-rose-50 dark:bg-rose-950/40 border-rose-400 text-rose-800 dark:text-rose-200';
                  }
                } else if (isSelected) {
                  optStyle = 'bg-blue-50 dark:bg-blue-950/40 border-blue-500 text-blue-700 dark:text-blue-300 font-bold';
                }

                return (
                  <button
                    key={optIdx}
                    disabled={quizSubmitted}
                    onClick={() => setSelectedAnswer(optIdx)}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between cursor-pointer ${optStyle}`}
                  >
                    <span>{opt}</span>
                    {quizSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-2">
              {!quizSubmitted ? (
                <Button
                  variant="primary"
                  size="sm"
                  disabled={selectedAnswer === null}
                  onClick={() => setQuizSubmitted(true)}
                >
                  Submit Challenge Answer
                </Button>
              ) : (
                <div className="space-y-2 w-full">
                  <p className="text-xs text-[#475569] dark:text-[#CBD5E1] leading-relaxed bg-white dark:bg-[#111827] p-3 rounded-xl border border-[#E2E8F0] dark:border-[#334155]">
                    <strong>Explanation:</strong> {project.challengeQuestion.explanation}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setQuizSubmitted(false);
                      setSelectedAnswer(null);
                    }}
                    leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
                  >
                    Retry Challenge
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
