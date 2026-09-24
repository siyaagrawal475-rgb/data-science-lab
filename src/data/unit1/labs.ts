export interface MessyDataRow {
  id: number;
  name: string;
  category: string;
  age: number | null;
  income: number | null;
  satisfaction: number | null;
  city: string;
}

export const INITIAL_MESSY_DATASET: MessyDataRow[] = [
  { id: 101, name: 'Alice Smith', category: 'Customer', age: 29, income: 62000, satisfaction: 4, city: 'New York' },
  { id: 102, name: 'Bob Jones', category: 'customer', age: null, income: 48000, satisfaction: 3, city: 'Chicago' },
  { id: 103, name: 'Charlie Brown', category: 'CUSTOMER', age: 42, income: 85000, satisfaction: 5, city: 'San Francisco' },
  { id: 104, name: 'Dana Scully', category: 'Enterprise', age: 37, income: 120000, satisfaction: 4, city: 'Seattle' },
  { id: 105, name: 'Alice Smith', category: 'Customer', age: 29, income: 62000, satisfaction: 4, city: 'New York' }, // Duplicate of #101
  { id: 106, name: 'Fox Mulder', category: 'enterprise', age: 39, income: 115000, satisfaction: null, city: 'Seattle' },
  { id: 107, name: 'Grace Hopper', category: 'Partner', age: 65, income: 180000, satisfaction: 5, city: 'Boston' },
  { id: 108, name: 'Hank Hill', category: 'customer', age: 45, income: 52000, satisfaction: 2, city: 'Austin' },
  { id: 109, name: 'Ian Malcolm', category: 'Partner', age: 50, income: 2500000, satisfaction: 1, city: 'Austin' }, // Extreme outlier income ($2.5M)
  { id: 110, name: 'Jane Doe', category: 'Customer', age: null, income: 55000, satisfaction: 3, city: 'Denver' },
  { id: 111, name: 'Bob Jones', category: 'customer', age: null, income: 48000, satisfaction: 3, city: 'Chicago' }, // Duplicate of #102
  { id: 112, name: 'Kevin Bacon', category: 'Customer', age: 34, income: null, satisfaction: 4, city: 'Philadelphia' },
];

export interface NumericTelemetryPoint {
  timestamp: string;
  temperature: number; // °C
  humidity: number;    // %
  pressure: number;    // kPa
  cpuLoad: number;     // %
  powerWatts: number;  // W
}

export const TELEMETRY_DATASET: NumericTelemetryPoint[] = [
  { timestamp: '08:00', temperature: 19.4, humidity: 68, pressure: 101.3, cpuLoad: 24, powerWatts: 42 },
  { timestamp: '09:00', temperature: 21.2, humidity: 64, pressure: 101.2, cpuLoad: 38, powerWatts: 55 },
  { timestamp: '10:00', temperature: 23.5, humidity: 59, pressure: 101.1, cpuLoad: 52, powerWatts: 72 },
  { timestamp: '11:00', temperature: 25.8, humidity: 52, pressure: 100.9, cpuLoad: 68, powerWatts: 88 },
  { timestamp: '12:00', temperature: 28.1, humidity: 45, pressure: 100.8, cpuLoad: 84, powerWatts: 104 },
  { timestamp: '13:00', temperature: 29.4, humidity: 41, pressure: 100.7, cpuLoad: 92, powerWatts: 115 },
  { timestamp: '14:00', temperature: 28.9, humidity: 43, pressure: 100.7, cpuLoad: 89, powerWatts: 110 },
  { timestamp: '15:00', temperature: 27.2, humidity: 48, pressure: 100.8, cpuLoad: 76, powerWatts: 96 },
  { timestamp: '16:00', temperature: 25.0, humidity: 54, pressure: 101.0, cpuLoad: 60, powerWatts: 80 },
  { timestamp: '17:00', temperature: 22.8, humidity: 61, pressure: 101.2, cpuLoad: 45, powerWatts: 62 },
  { timestamp: '18:00', temperature: 20.6, humidity: 67, pressure: 101.4, cpuLoad: 31, powerWatts: 48 },
  { timestamp: '19:00', temperature: 18.9, humidity: 72, pressure: 101.5, cpuLoad: 20, powerWatts: 38 },
];

export interface UnitLabMeta {
  id: string;
  slug: string;
  unitId: string;
  title: string;
  shortDescription: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  durationMinutes: number;
  tags: string[];
}

export const UNIT_1_LABS: UnitLabMeta[] = [
  {
    id: 'eda',
    slug: 'eda',
    unitId: 'unit-1',
    title: 'Exploratory Data Analysis Lab',
    shortDescription: 'Inspect real-world timeseries telemetry, compute summary metrics, and examine statistical patterns.',
    difficulty: 'Beginner',
    durationMinutes: 25,
    tags: ['EDA', 'Summary Statistics', 'Telemetry'],
  },
  {
    id: 'cleaning',
    slug: 'cleaning',
    unitId: 'unit-1',
    title: 'Interactive Data Cleaning Lab',
    shortDescription: 'Diagnose and repair duplicates, missing values, inconsistent casing, and extreme outliers on an authentic business table.',
    difficulty: 'Intermediate',
    durationMinutes: 30,
    tags: ['Data Cleaning', 'Imputation', 'Deduplication'],
  },
  {
    id: 'visualization',
    slug: 'visualization',
    unitId: 'unit-1',
    title: 'Data Visualization Playground',
    shortDescription: 'Explore visual encodings with Bar, Line, Scatter, and Histogram representations on multidimensional variables.',
    difficulty: 'Beginner',
    durationMinutes: 20,
    tags: ['Visualization', 'Chart.js', 'Distributions'],
  },
  {
    id: 'correlation',
    slug: 'correlation',
    unitId: 'unit-1',
    title: 'Bivariate Correlation & Scatter Lab',
    shortDescription: 'Select any two continuous variables to compute Pearson’s r, evaluate scatter alignments, and generate statistical interpretations.',
    difficulty: 'Intermediate',
    durationMinutes: 25,
    tags: ['Correlation', 'Pearson r', 'Scatter Plots'],
  },
];
