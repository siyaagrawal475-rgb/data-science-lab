export interface ComparisonRow {
  [columnKey: string]: string;
}

export interface ComparisonTableData {
  id: string;
  title: string;
  subtitle: string;
  unitId: string;
  unitNumber: number;
  headers: { key: string; label: string; primary?: boolean }[];
  rows: ComparisonRow[];
  summaryNote?: string;
  keyTakeaway?: string;
}

export interface MiniProjectTask {
  id: string;
  stepNumber: number;
  title: string;
  instruction: string;
  codeSnippet?: string;
  expectedResult: string;
  explanation: string;
}

export interface MiniProjectData {
  id: string;
  title: string;
  unitId: string;
  unitNumber: number;
  scenario: string;
  industryContext: string;
  problemStatement: string;
  dataset: {
    name: string;
    description: string;
    columns: string[];
    sampleRows: Record<string, string | number>[];
  };
  objectives: string[];
  tasks: MiniProjectTask[];
  finalInterpretation: string;
  challengeQuestion: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface SimulationParam {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  unit?: string;
  description?: string;
}

export interface SimulationExperiment {
  id: string;
  title: string;
  unitId: string;
  unitNumber: number;
  description: string;
  whatItShows: string;
  tryChanging: string;
  realWorldUse: string;
  parameters: SimulationParam[];
}

export interface RealLifeExample {
  id: string;
  unitId: string;
  unitNumber: number;
  title: string;
  industry: string;
  scenario: string;
  dataVariables: string;
  whatWeWantToKnow: string;
  mathematicalMethod: string;
  resultInterpretation: string;
  whyItMatters: string;
}
