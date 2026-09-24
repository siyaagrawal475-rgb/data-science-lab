import { UnitId } from '@/types';

export interface DetailedFormulaItem {
  id: string;
  unitId: UnitId;
  title: string;
  category: string;
  latex: string;
  description: string;
  meaning: string;
  variables: { symbol: string; meaning: string }[];

  workedExample: {
    dataset: string;
    calculation: string;
    result: string;
    interpretation: string;
  };
}

export const UNIT_1_FORMULAS: DetailedFormulaItem[] = [
  {
    id: 'f1-mean',
    unitId: 'unit-1',
    title: 'Sample Arithmetic Mean',
    category: 'Central Tendency',
    latex: '\\bar{x} = \\frac{1}{n} \\sum_{i=1}^n x_i = \\frac{x_1 + x_2 + \\dots + x_n}{n}',
    description: 'The arithmetic average of all sample observations.',
    meaning: 'Identifies the central gravitational balance point of numeric observations. Sensitive to extreme high or low values.',
    variables: [
      { symbol: '\\bar{x}', meaning: 'Sample mean estimate' },
      { symbol: 'n', meaning: 'Total number of sample observations' },
      { symbol: 'x_i', meaning: 'Value of the i-th individual observation' },
      { symbol: '\\sum', meaning: 'Summation across all observations from i=1 to n' },
    ],
    workedExample: {
      dataset: 'Sensor readings (in °C): [20, 22, 24, 26, 28]',
      calculation: '\\bar{x} = \\frac{20 + 22 + 24 + 26 + 28}{5} = \\frac{120}{5}',
      result: '24.0°C',
      interpretation: 'The average temperature across the 5 recorded timestamps is exactly 24.0°C.',
    },
  },
  {
    id: 'f1-variance',
    unitId: 'unit-1',
    title: 'Sample Variance (Bessel’s Correction)',
    category: 'Dispersion',
    latex: 's^2 = \\frac{1}{n - 1} \\sum_{i=1}^n (x_i - \\bar{x})^2',
    description: 'The average squared deviation of each data point from the sample mean.',
    meaning: 'Measures overall statistical volatility and spread. We divide by (n - 1) instead of n to remove sample variance bias.',
    variables: [
      { symbol: 's^2', meaning: 'Sample variance (units squared)' },
      { symbol: 'x_i - \\bar{x}', meaning: 'Deviation of observation i from the sample mean' },
      { symbol: 'n - 1', meaning: 'Degrees of freedom (Bessel’s correction)' },
    ],
    workedExample: {
      dataset: 'Values: [2, 4, 6] (Mean \\bar{x} = 4.0, n = 3)',
      calculation: 's^2 = \\frac{(2-4)^2 + (4-4)^2 + (6-4)^2}{3 - 1} = \\frac{(-2)^2 + (0)^2 + (2)^2}{2} = \\frac{4 + 0 + 4}{2} = \\frac{8}{2}',
      result: '4.0',
      interpretation: 'The average squared spread around the mean is 4.0 units².',
    },
  },
  {
    id: 'f1-std-dev',
    unitId: 'unit-1',
    title: 'Sample Standard Deviation',
    category: 'Dispersion',
    latex: 's = \\sqrt{s^2} = \\sqrt{\\frac{1}{n - 1} \\sum_{i=1}^n (x_i - \\bar{x})^2}',
    description: 'The positive square root of the sample variance.',
    meaning: 'Quantifies how far typical observations deviate from the mean in the original measurement units.',
    variables: [
      { symbol: 's', meaning: 'Sample standard deviation (original units)' },
      { symbol: 's^2', meaning: 'Sample variance' },
    ],
    workedExample: {
      dataset: 'From previous variance s² = 4.0',
      calculation: 's = \\sqrt{4.0}',
      result: '2.0 units',
      interpretation: 'Observations typically deviate by ±2.0 units from the central average.',
    },
  },
  {
    id: 'f1-range',
    unitId: 'unit-1',
    title: 'Statistical Range & Interquartile Range (IQR)',
    category: 'Spread',
    latex: '\\text{Range} = x_{\\max} - x_{\\min}, \\quad \\text{IQR} = Q_3 - Q_1',
    description: 'Total absolute interval span vs middle 50% spread.',
    meaning: 'Range captures total extreme boundary distance; IQR captures the robust middle half of observations resistant to outliers.',
    variables: [
      { symbol: 'x_{\\max}, x_{\\min}', meaning: 'Maximum and minimum values in dataset' },
      { symbol: 'Q_3, Q_1', meaning: '75th percentile and 25th percentile values' },
    ],
    workedExample: {
      dataset: 'Sorted array: [10, 20, 30, 40, 50, 60, 70] (Q1 = 20, Q3 = 60)',
      calculation: '\\text{Range} = 70 - 10 = 60, \\quad \\text{IQR} = 60 - 20 = 40',
      result: 'Range = 60, IQR = 40',
      interpretation: 'Total spread is 60; the middle 50% of the dataset spans an interval of 40.',
    },
  },
  {
    id: 'f1-zscore',
    unitId: 'unit-1',
    title: 'Standardized Z-Score',
    category: 'Standardization',
    latex: 'z = \\frac{x - \\mu}{\\sigma} \\quad \\text{or} \\quad z_i = \\frac{x_i - \\bar{x}}{s}',
    description: 'The number of standard deviations a given value lies above or below the mean.',
    meaning: 'Transforms any numeric feature into a dimensionless standard scale (Mean = 0, Std Dev = 1). Values with |z| > 3 are common outlier indicators.',
    variables: [
      { symbol: 'z', meaning: 'Standardized score (dimensionless)' },
      { symbol: 'x', meaning: 'Raw observation value' },
      { symbol: '\\mu, \\bar{x}', meaning: 'Population mean or sample mean' },
      { symbol: '\\sigma, s', meaning: 'Population standard deviation or sample standard deviation' },
    ],
    workedExample: {
      dataset: 'Exam score x = 85 in a class with Mean = 70 and Std Dev = 10',
      calculation: 'z = \\frac{85 - 70}{10} = \\frac{15}{10}',
      result: '+1.50',
      interpretation: 'The score is 1.5 standard deviations above the average student performance.',
    },
  },
  {
    id: 'f1-pearson',
    unitId: 'unit-1',
    title: 'Pearson Product-Moment Correlation Coefficient',
    category: 'Association',
    latex: 'r = \\frac{\\sum_{i=1}^n (x_i - \\bar{x})(y_i - \\bar{y})}{\\sqrt{\\sum_{i=1}^n (x_i - \\bar{x})^2} \\sqrt{\\sum_{i=1}^n (y_i - \\bar{y})^2}} = \\frac{\\text{Cov}(X, Y)}{s_x s_y}',
    description: 'Measures the linear association and direction between two continuous variables.',
    meaning: 'Strictly bounded between -1.0 (perfect inverse line) and +1.0 (perfect positive line). A value of r = 0 indicates absence of linear correlation.',
    variables: [
      { symbol: 'r', meaning: 'Sample Pearson correlation coefficient (-1.0 ≤ r ≤ +1.0)' },
      { symbol: '\\text{Cov}(X, Y)', meaning: 'Sample covariance between X and Y' },
      { symbol: 's_x, s_y', meaning: 'Sample standard deviations of X and Y' },
    ],
    workedExample: {
      dataset: 'Study Hours X vs Test Score Y across 3 students: (1, 50), (2, 70), (3, 90)',
      calculation: '\\text{Both variables increase in perfect lockstep: } r = \\frac{40}{\\sqrt{2} \\cdot \\sqrt{800}} = \\frac{40}{40}',
      result: '+1.00',
      interpretation: 'Perfect positive linear correlation: every extra hour studied yields a proportional increase in test score.',
    },
  },
];
