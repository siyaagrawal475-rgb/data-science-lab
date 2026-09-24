import { MiniProjectData } from '@/types/experiences';

export const UNIT_1_MINI_PROJECT: MiniProjectData = {
  id: 'u1-project-sales-eda',
  title: 'Retail E-Commerce Sales EDA & Outlier Diagnostic',
  unitId: 'unit-1',
  unitNumber: 1,
  industryContext: 'E-Commerce & Supply Chain Logistics',
  scenario:
    'You are a Lead Data Analyst at NovaMart, a multi-regional e-commerce retailer. The VP of Operations noticed significant variance in regional fulfillment costs and suspects inaccurate delivery time logging, missing discount entries, and revenue-skewing wholesale orders.',
  problemStatement:
    'Perform end-to-end exploratory data analysis on the quarterly sales telemetry. Calculate robust 5-number summaries, impute missing discount rates using median strategies, identify multivariate revenue outliers using Tukey 1.5×IQR fences, and quantify Pearson correlation between delivery duration and return rates.',
  dataset: {
    name: 'novamart_quarterly_sales_telemetry.csv',
    description: '10 representative transaction rows from the production database schema',
    columns: ['order_id', 'region', 'units_sold', 'unit_price', 'discount_pct', 'delivery_days', 'revenue', 'returned'],
    sampleRows: [
      { order_id: 'ORD-101', region: 'North', units_sold: 4, unit_price: 25.0, discount_pct: 0.10, delivery_days: 2.4, revenue: 90.0, returned: 'No' },
      { order_id: 'ORD-102', region: 'West', units_sold: 12, unit_price: 15.0, discount_pct: 0.05, delivery_days: 4.1, revenue: 171.0, returned: 'No' },
      { order_id: 'ORD-103', region: 'East', units_sold: 1, unit_price: 120.0, discount_pct: 0.00, delivery_days: 5.8, revenue: 120.0, returned: 'Yes' },
      { order_id: 'ORD-104', region: 'South', units_sold: 8, unit_price: 30.0, discount_pct: 0.15, delivery_days: 3.2, revenue: 204.0, returned: 'No' },
      { order_id: 'ORD-105', region: 'North', units_sold: 45, unit_price: 18.0, discount_pct: 0.20, delivery_days: 1.8, revenue: 648.0, returned: 'No' },
      { order_id: 'ORD-106', region: 'West', units_sold: 2, unit_price: 80.0, discount_pct: 0.00, delivery_days: 6.5, revenue: 160.0, returned: 'Yes' },
      { order_id: 'ORD-107', region: 'East', units_sold: 15, unit_price: 10.0, discount_pct: 0.05, delivery_days: 2.9, revenue: 142.5, returned: 'No' },
      { order_id: 'ORD-108', region: 'North', units_sold: 3, unit_price: 210.0, discount_pct: 0.10, delivery_days: 7.2, revenue: 567.0, returned: 'Yes' },
      { order_id: 'ORD-109', region: 'South', units_sold: 6, unit_price: 45.0, discount_pct: 0.00, delivery_days: 3.6, revenue: 270.0, returned: 'No' },
      { order_id: 'ORD-110', region: 'West', units_sold: 80, unit_price: 22.0, discount_pct: 0.25, delivery_days: 2.1, revenue: 1320.0, returned: 'No' },
    ],
  },
  objectives: [
    'Compute mean, median, standard deviation, and IQR across Revenue and Delivery Days',
    'Execute Tukey 1.5×IQR fence outlier detection on order revenues to isolate bulk B2B purchases',
    'Standardize regional categorical encodings and impute missing discount rates with group medians',
    'Evaluate the Pearson correlation r between delivery latency and customer returns',
  ],
  tasks: [
    {
      id: 'task-1',
      stepNumber: 1,
      title: 'Descriptive Revenue Profiling & Skewness Check',
      instruction: 'Calculate the sample mean, median, and standard deviation for the `revenue` variable to determine if the distribution is symmetric or right-skewed.',
      codeSnippet: `import pandas as pd\ndf = pd.DataFrame(data)\nmean_rev = df['revenue'].mean()\nmedian_rev = df['revenue'].median()\nstd_rev = df['revenue'].std()\nprint(f"Mean: {mean_rev:.2f}, Median: {median_rev:.2f}, Std: {std_rev:.2f}")`,
      expectedResult: 'Mean: $369.25, Median: $187.50, Std: $379.84 (Right-skewed, Mean > Median)',
      explanation: 'The mean ($369.25) is nearly double the median ($187.50) due to heavy right-tail bulk purchases (ORD-105 and ORD-110).',
    },
    {
      id: 'task-2',
      stepNumber: 2,
      title: 'Tukey Fence Outlier Identification',
      instruction: 'Compute Q1 (25th percentile), Q3 (75th percentile), IQR = Q3 - Q1, and calculate the Upper Fence = Q3 + 1.5×IQR.',
      codeSnippet: `q1 = df['revenue'].quantile(0.25) # $146.88\nq3 = df['revenue'].quantile(0.75) # $545.25\niqr = q3 - q1 # $398.37\nupper_fence = q3 + 1.5 * iqr # $1,142.81\noutliers = df[df['revenue'] > upper_fence]`,
      expectedResult: 'Upper Fence = $1,142.81. Order ORD-110 ($1,320.00) is flagged as an outlier.',
      explanation: 'Tukey fences robustly flag ORD-110 as a bulk institutional purchase without distorting standard deviation boundaries.',
    },
    {
      id: 'task-3',
      stepNumber: 3,
      title: 'Correlation Analysis: Delivery Latency vs Return Probability',
      instruction: 'Map `returned` to binary (No=0, Yes=1) and compute the Pearson correlation coefficient with `delivery_days`.',
      codeSnippet: `df['ret_bin'] = df['returned'].map({'No': 0, 'Yes': 1})\ncorr = df['delivery_days'].corr(df['ret_bin'])\nprint(f"Pearson r: {corr:.3f}")`,
      expectedResult: 'Pearson r = +0.864 (Strong positive correlation)',
      explanation: 'Deliveries exceeding 5.0 days exhibit an 86.4% statistical correlation with product return events, signaling critical logistics bottlenecks.',
    },
  ],
  finalInterpretation:
    'The exploratory analysis reveals that NovaMart order revenues are heavily right-skewed with a median of $187.50 and one major B2B outlier at $1,320.00. Crucially, delivery latency shows a severe positive correlation (r = +0.864) with customer returns when transit exceeds 5 days. Logistics improvements in the East and West regional hubs can directly mitigate return costs.',
  challengeQuestion: {
    question: 'If the CEO asks for a single central metric to represent typical consumer order value for pricing strategy, which statistic should you present and why?',
    options: [
      'The Mean ($369.25), because it incorporates total revenue from all orders',
      'The Median ($187.50), because it is robust against high-value B2B bulk outliers',
      'The Standard Deviation ($379.84), because it shows the range of consumer values',
      'The Upper Tukey Fence ($1,142.81), because it defines the highest expected purchase',
    ],
    correctIndex: 1,
    explanation:
      'The Median ($187.50) is the correct choice because revenue is right-skewed. The mean is inflated by isolated B2B wholesale orders and does not represent typical consumer cart value.',
  },
};
