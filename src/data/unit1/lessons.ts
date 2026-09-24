export interface ConceptSection {
  id: string;
  title: string;
  content: string[];
  callout?: {
    type: 'info' | 'tip' | 'warning' | 'math';
    title: string;
    text: string;
  };
  codeSnippet?: {
    language: string;
    code: string;
    caption?: string;
  };
  table?: {
    headers: string[];
    rows: string[][];
    caption?: string;
  };
}

export interface PracticeQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

import { UnitId } from '@/types';

export interface FullLessonData {
  id: string;
  slug: string;
  order: number;
  lessonNumber?: number; // optional alias for order
  unitId: UnitId;
  unitNumber: number;

  title: string;
  shortDescription: string;
  estimatedDuration: number; // minutes
  contentType: 'concept' | 'interactive' | 'derivation' | 'code' | 'case-study';
  learningObjectives: string[];
  mainExplanation: string;
  conceptSections: ConceptSection[];
  keyTakeaways: string[];
  practiceQuestions?: PracticeQuestion[];
  formulaBreakdowns?: {
    id?: string;
    formula: string;
    title: string;
    explanation: string;
    variables?: {
      symbol: string;
      name?: string;
      description: string;
    }[];
  }[];
  workedExamples?: {
    id?: string;
    title: string;
    description?: string;
    steps: {
      stepNumber: number;
      description: string;
      formula?: string;
      calculation?: string;
      result?: string;
    }[];
    conclusion?: string;
  }[];
  interactiveSection?: {
    componentName: string;
    title?: string;
    description?: string;
    instructions?: string[];
  };
  nextLessonSlug?: string;
  prevLessonSlug?: string;
}
export type LessonData = FullLessonData;

export const UNIT_1_LESSONS: FullLessonData[] = [
  {
    id: 'u1-l1',
    slug: 'intro-to-data-science',
    order: 1,
    unitId: 'unit-1',
    unitNumber: 1,
    title: 'Introduction to Data Science',
    shortDescription: 'Understand the data science lifecycle, foundational workflows, and the intersection of statistics, computation, and domain context.',
    estimatedDuration: 15,
    contentType: 'concept',
    learningObjectives: [
      'Define Data Science and contrast it with traditional software engineering and pure statistics.',
      'Understand the 5 core stages of the modern Data Science lifecycle.',
      'Identify how empirical decision-making differs from heuristic-based guessing.',
    ],
    mainExplanation: 'Data Science is the systematic, iterative discipline of extracting actionable knowledge and empirical insights from raw, noisy, structured, and unstructured data. It combines mathematical modeling, computational systems, and domain context to answer questions, detect patterns, and predict future phenomena.',
    conceptSections: [
      {
        id: 'lifecycle',
        title: 'The Modern Data Science Lifecycle',
        content: [
          'A robust data science workflow is cyclical rather than linear. It spans problem formulation, data acquisition, data cleaning, exploratory analysis, modeling, and communication.',
          'Crucially, more than 70% of a real-world data scientist’s time is invested in Exploratory Data Analysis (EDA) and data preparation, because downstream machine learning algorithms cannot correct flawed or biased inputs.',
        ],
        table: {
          headers: ['Lifecycle Stage', 'Primary Objective', 'Key Artifact'],
          rows: [
            ['1. Problem Formulation', 'Define measurable business or scientific objectives', 'Hypothesis & KPI definition'],
            ['2. Ingestion & Cleaning', 'Standardize schemas, handle missing values and anomalies', 'Curated, clean dataset'],
            ['3. Exploratory Analysis', 'Uncover distributions, outliers, and correlations', 'Visualizations & summary statistics'],
            ['4. Modeling & Inference', 'Build predictive or explanatory mathematical models', 'Trained algorithm & metrics'],
            ['5. Synthesis & Action', 'Deploy solutions and inform strategic decisions', 'Dashboard or automated service'],
          ],
          caption: 'Table 1.1: Core stages of the applied Data Science lifecycle.',
        },
      },
      {
        id: 'scientific-mindset',
        title: 'The Empirical Mindset: Question Everything',
        content: [
          'In data science, we operate under scientific rigor. Every intuition must be validated by empirical evidence. When data contradicts our expectations, we investigate the data collection mechanism, examine sample bias, and verify assumptions.',
        ],
        callout: {
          type: 'tip',
          title: 'Core Principle: Garbage In, Garbage Out',
          text: 'No machine learning algorithm, no matter how sophisticated, can produce reliable results from poorly understood, improperly cleaned, or unrepresentative data.',
        },
      },
    ],
    keyTakeaways: [
      'Data Science unites domain knowledge, mathematical statistics, and computational programming.',
      'EDA and data cleaning form the foundational bedrock for all reliable data modeling.',
      'Always start with a clear, measurable problem formulation before touching code.',
    ],
    practiceQuestions: [
      {
        id: 'pq-1',
        question: 'Which stage typically occupies the majority of time in an applied Data Science project?',
        options: [
          'Deploying deep neural networks in production',
          'Data cleaning, validation, and exploratory data analysis',
          'Purchasing GPU server hardware',
          'Writing unit tests for frontend UI components',
        ],
        correctIndex: 1,
        explanation: 'Empirical studies consistently show that over 70% of effort is spent understanding, cleaning, and exploring data.',
      },
      {
        id: 'pq-2',
        question: 'Why is Exploratory Data Analysis (EDA) critical before training predictive models?',
        options: [
          'It guarantees 100% model accuracy on test sets',
          'It reveals anomalies, data distributions, missing values, and relationship structures that dictate valid modeling choices',
          'It is required by the Python interpreter',
          'It replaces the need for data collection entirely',
        ],
        correctIndex: 1,
        explanation: 'EDA ensures data quality, reveals distributions, and prevents catastrophic modeling errors caused by bad assumptions.',
      },
    ],
    nextLessonSlug: 'types-of-data',
  },
  {
    id: 'u1-l2',
    slug: 'types-of-data',
    order: 2,
    unitId: 'unit-1',
    unitNumber: 1,
    title: 'Types of Data',
    shortDescription: 'Distinguish between qualitative and quantitative data, discrete versus continuous variables, and nominal, ordinal, interval, and ratio scales of measurement.',
    estimatedDuration: 20,
    contentType: 'concept',
    learningObjectives: [
      'Categorize variables into Structured vs Unstructured data.',
      'Differentiate Quantitative (Continuous/Discrete) from Qualitative (Nominal/Ordinal) data.',
      'Apply Stevens’ Four Scales of Measurement: Nominal, Ordinal, Interval, and Ratio.',
    ],
    mainExplanation: 'Before performing any mathematical calculation or choosing a chart, you must identify the statistical type and scale of measurement of your data. Applying an arithmetic mean to categorical labels produces meaningless numbers.',
    conceptSections: [
      {
        id: 'data-taxonomy',
        title: 'Taxonomy of Data Types',
        content: [
          'At the highest level, data is divided into Numerical (Quantitative) and Categorical (Qualitative) variables.',
          'Numerical data represents counts or measurements where mathematical operations (like subtraction and averaging) are meaningful.',
          'Categorical data represents groupings or labels where values belong to discrete classes.',
        ],
        table: {
          headers: ['Scale', 'Definition', 'Permissible Operations', 'Example'],
          rows: [
            ['Nominal', 'Unordered distinct categories', '= , ≠ (Frequency counts, Mode)', 'Eye color, Device type, Country'],
            ['Ordinal', 'Categories with a natural order/ranking', '> , < (Median, Percentiles)', 'Education level (BSc, MSc, PhD), Customer satisfaction (1-5)'],
            ['Interval', 'Ordered with equal intervals, but no true zero', '+ , - (Mean, Std Dev)', 'Temperature in Celsius / Fahrenheit, Calendar year'],
            ['Ratio', 'Ordered, equal intervals, with an absolute true zero', '× , ÷ (Ratios, Geometric Mean)', 'Weight, Distance, Income, Age, Server response time'],
          ],
          caption: 'Table 1.2: Stevens’ Four Levels of Measurement.',
        },
      },
      {
        id: 'discrete-vs-continuous',
        title: 'Discrete vs. Continuous Numerical Variables',
        content: [
          'Discrete variables represent countable items (e.g., number of website visits: 0, 1, 2, 3...). You cannot have 2.37 website visits.',
          'Continuous variables can take any real value within a continuous interval (e.g., battery voltage: 3.7142 V). They are measured, not counted.',
        ],
        callout: {
          type: 'warning',
          title: 'Common Trap: Coded Numeric Identifiers',
          text: 'Customer ID #10425 or Zip Code 90210 are stored as numbers, but they are strictly Nominal categorical data! Calculating the average Zip code is statistically meaningless.',
        },
      },
    ],
    keyTakeaways: [
      'Data types govern which statistical summaries and charts are valid.',
      'Ratio scales have an absolute zero; interval scales have arbitrary zero points.',
      'Always verify whether numbers represent true measurements or categorical codes.',
    ],
    practiceQuestions: [
      {
        id: 'pq-2-1',
        question: 'Which of the following represents an Ordinal scale of measurement?',
        options: [
          'Temperature in Celsius',
          'T-shirt size (Small, Medium, Large, XL)',
          'Bank account balance in USD',
          'IP Address',
        ],
        correctIndex: 1,
        explanation: 'T-shirt sizes possess a clear qualitative ranking (Small < Medium < Large), but the difference between sizes is not mathematically uniform.',
      },
      {
        id: 'pq-2-2',
        question: 'Why is Temperature in Kelvin considered a Ratio scale, while Celsius is Interval?',
        options: [
          'Kelvin is named after a Scottish physicist',
          'Kelvin has an absolute zero (0 K represents zero thermal energy), allowing meaningful ratio statements like "twice as hot"',
          'Celsius cannot be plotted on a graph',
          'Celsius is stored as a string',
        ],
        correctIndex: 1,
        explanation: 'Because 0 K is the absolute physical zero of thermal energy, 200 K is truly double the kinetic thermal energy of 100 K.',
      },
    ],
    prevLessonSlug: 'intro-to-data-science',
    nextLessonSlug: 'data-collection',
  },
  {
    id: 'u1-l3',
    slug: 'data-collection',
    order: 3,
    unitId: 'unit-1',
    unitNumber: 1,
    title: 'Data Collection',
    shortDescription: 'Explore data sources, APIs, web scraping, survey design, sensor telemetry, and sampling methodologies including random and stratified sampling.',
    estimatedDuration: 20,
    contentType: 'concept',
    learningObjectives: [
      'Identify primary vs secondary data collection methods.',
      'Understand sampling techniques: Simple Random, Stratified, and Cluster sampling.',
      'Recognize and mitigate Selection Bias, Survivorship Bias, and Response Bias.',
    ],
    mainExplanation: 'Data does not exist in a vacuum; it is collected through sensors, APIs, logs, surveys, or administrative databases. The mechanism of collection dictates the inherent biases, noise, and validity of any subsequent analysis.',
    conceptSections: [
      {
        id: 'sampling-methods',
        title: 'Representative Sampling Techniques',
        content: [
          'When analyzing a massive population, measuring every individual is often infeasible. We use representative subsets called samples.',
          'Simple Random Sampling (SRS) gives every member an equal probability of selection.',
          'Stratified Sampling divides the population into non-overlapping subgroups (strata) and samples proportionally from each, ensuring minority groups are accurately represented.',
        ],
      },
      {
        id: 'cognitive-biases',
        title: 'Critical Collection Biases',
        content: [
          'Selection Bias occurs when certain demographics are systematically more or less likely to be sampled.',
          'Survivorship Bias occurs when looking only at subjects that passed a selection filter while ignoring those that failed (e.g., analyzing only successful startups).',
        ],
        callout: {
          type: 'warning',
          title: 'Historical Case: Survivorship Bias in Aircraft Armor',
          text: 'In WWII, the military inspected returning aircraft and wanted to add armor to areas with the most bullet holes. Mathematician Abraham Wald correctly pointed out they should armor the areas with NO bullet holes, because planes hit there did not survive to be examined!',
        },
      },
    ],
    keyTakeaways: [
      'A large biased sample is worse than a small representative sample.',
      'Stratified sampling ensures balanced representation across categorical subgroups.',
      'Always document data provenance and known collection limitations.',
    ],
    practiceQuestions: [
      {
        id: 'pq-3-1',
        question: 'What is Stratified Random Sampling?',
        options: [
          'Selecting only the easiest-to-reach participants',
          'Dividing a population into subgroups (strata) and sampling randomly within each subgroup',
          'Sampling exclusively from online survey links',
          'Selecting every 10th row from an unindexed database',
        ],
        correctIndex: 1,
        explanation: 'Stratified sampling ensures all distinct strata (such as age brackets or geographic regions) are proportionally represented in the sample.',
      },
    ],
    prevLessonSlug: 'types-of-data',
    nextLessonSlug: 'data-cleaning',
  },
  {
    id: 'u1-l4',
    slug: 'data-cleaning',
    order: 4,
    unitId: 'unit-1',
    unitNumber: 1,
    title: 'Data Cleaning',
    shortDescription: 'Master data wrangling: handling missing values (MCAR, MAR, MNAR), deduplication, string standardization, and type casting.',
    estimatedDuration: 25,
    contentType: 'code',
    learningObjectives: [
      'Diagnose missing data mechanisms: MCAR, MAR, and MNAR.',
      'Apply imputation strategies: Mean, Median, Mode, and Model-based imputation.',
      'Detect and clean duplicate records, whitespace irregularities, and formatting inconsistencies.',
    ],
    mainExplanation: 'Real-world data is notoriously messy. Sensors disconnect, users input typos, and legacy databases contain corrupted encodings. Data cleaning transforms raw unstructured entropy into tidy, consistent datasets.',
    conceptSections: [
      {
        id: 'missing-data',
        title: 'Missing Data Mechanisms',
        content: [
          'Missing Completely at Random (MCAR): Missingness has no relationship with any observed or unobserved variable.',
          'Missing at Random (MAR): Missingness is related to other observed variables (e.g., younger users less frequently reporting home phone numbers).',
          'Missing Not at Random (MNAR): Missingness directly depends on the unobserved value itself (e.g., very high earners refusing to disclose their income).',
        ],
        table: {
          headers: ['Strategy', 'When to Use', 'Pros', 'Cons'],
          rows: [
            ['Listwise Deletion', 'MCAR, <5% missing rows', 'Simple, preserves distributions', 'Loss of statistical power, severe bias if MNAR'],
            ['Mean Imputation', 'Normally distributed continuous', 'Preserves sample mean', 'Artificially deflates variance & standard error'],
            ['Median Imputation', 'Skewed numeric distributions', 'Robust against outliers', 'Distorts correlations between features'],
            ['KNN / Model Imputation', 'Complex multi-feature dependencies', 'Maintains multivariate structure', 'Computationally heavier'],
          ],
          caption: 'Table 1.4: Comparison of missing value handling techniques.',
        },
      },
      {
        id: 'string-standardization',
        title: 'Categorical Standardization & Deduplication',
        content: [
          'Inconsistent text entries like "USA", "U.S.A.", "united states", and " United States " create artificial categories that mislead group-by aggregations and predictive models.',
          'Always lowercase, strip leading/trailing whitespace, and map synonymous strings to canonical values.',
        ],
        codeSnippet: {
          language: 'python',
          code: `# Clean categorical values in Pandas\ndf['country'] = df['country'].astype(str).str.strip().str.lower()\ndf['country'] = df['country'].replace({'u.s.a.': 'usa', 'united states': 'usa'})\n\n# Remove duplicate rows\ndf = df.drop_duplicates(subset=['customer_id', 'transaction_date'])`,
          caption: 'Listing 1.1: Standardizing categories and dropping duplicate records in Python.',
        },
      },
    ],
    keyTakeaways: [
      'Diagnose why data is missing before deciding between deletion and imputation.',
      'Imputing with median is superior to mean when data contains severe outliers.',
      'Standardize strings and timestamps into uniform ISO formats.',
    ],
    practiceQuestions: [
      {
        id: 'pq-4-1',
        question: 'Why is mean imputation problematic for skewed data with severe outliers?',
        options: [
          'The mean is pulled by extreme outliers, inserting unrepresentative replacement values and falsely deflating variance',
          'It deletes the entire dataframe',
          'It is only supported in R, not Python',
          'It converts numbers into strings',
        ],
        correctIndex: 0,
        explanation: 'The mean is sensitive to outliers. Replacing missing entries with an inflated mean distorts the true central tendency of the data.',
      },
    ],
    prevLessonSlug: 'data-collection',
    nextLessonSlug: 'exploratory-data-analysis',
  },
  {
    id: 'u1-l5',
    slug: 'exploratory-data-analysis',
    order: 5,
    unitId: 'unit-1',
    unitNumber: 1,
    title: 'Exploratory Data Analysis',
    shortDescription: 'The core philosophy of John Tukey’s EDA: univariate analysis, bivariate comparisons, multivariate interactions, and anomaly discovery.',
    estimatedDuration: 25,
    contentType: 'concept',
    learningObjectives: [
      'Formulate analytical questions to guide exploratory data analysis.',
      'Conduct Univariate, Bivariate, and Multivariate analysis systematically.',
      'Detect patterns, anomalies, and feature interactions that inform modeling.',
    ],
    mainExplanation: 'Pioneered by statistician John Tukey, Exploratory Data Analysis (EDA) is an attitude of open-ended investigation. Rather than rushing into hypothesis testing or machine learning, the data scientist explores the data visually and numerically to understand its underlying structure, identify errors, and uncover surprising relationships.',
    conceptSections: [
      {
        id: 'eda-stages',
        title: 'The Three Levels of EDA',
        content: [
          '1. Univariate Analysis: Inspecting each variable individually to understand its shape, center, spread, missingness, and outliers.',
          '2. Bivariate Analysis: Comparing pairs of variables to uncover correlations, differences between groups, and contingency patterns.',
          '3. Multivariate Analysis: Analyzing interactions between 3 or more variables (e.g., using heatmaps, faceted plots, and pair plots).',
        ],
      },
      {
        id: 'anscombes-quartet',
        title: 'Anscombe’s Quartet: Why Summary Stats Are Not Enough',
        content: [
          'In 1973, statistician Francis Anscombe constructed four distinct datasets that have identical means, variances, correlation coefficients, and linear regression lines.',
          'Yet when plotted visually, one dataset is linear, one is parabolic, one is linear with an outlier, and one has all identical x-values with one outlier.',
        ],
        callout: {
          type: 'warning',
          title: 'Tukey’s Maxim',
          text: '“Numerical summaries without graphical visualization are incomplete and frequently misleading. Always plot your data!”',
        },
      },
    ],
    keyTakeaways: [
      'Never rely solely on numerical summaries; always visualize your data.',
      'Proceed systematically: Univariate → Bivariate → Multivariate.',
      'Use EDA to formulate and refine testable statistical hypotheses.',
    ],
    practiceQuestions: [
      {
        id: 'pq-5-1',
        question: 'What fundamental lesson does Anscombe’s Quartet teach data scientists?',
        options: [
          'Summary statistics alone can hide vastly different data distributions and geometric relationships',
          'Linear regression works on all datasets',
          'Histograms should never be plotted',
          'Only datasets with 4 rows can be analyzed',
        ],
        correctIndex: 0,
        explanation: 'Anscombe’s Quartet proves that datasets with identical mean, variance, and correlation can look completely different when plotted.',
      },
    ],
    prevLessonSlug: 'data-cleaning',
    nextLessonSlug: 'descriptive-statistics',
  },
  {
    id: 'u1-l6',
    slug: 'descriptive-statistics',
    order: 6,
    unitId: 'unit-1',
    unitNumber: 1,
    title: 'Descriptive Statistics',
    shortDescription: 'Master quantitative metrics of central tendency (Mean, Median, Mode) and dispersion (Range, IQR, Variance, Standard Deviation).',
    estimatedDuration: 30,
    contentType: 'derivation',
    learningObjectives: [
      'Calculate and contrast Mean, Median, and Mode.',
      'Measure dispersion using Range, Interquartile Range (IQR), Variance, and Standard Deviation.',
      'Determine when to use parametric (Mean/Std Dev) vs non-parametric (Median/IQR) summaries.',
    ],
    mainExplanation: 'Descriptive statistics summarize and describe the salient features of a collection of information in concise quantitative metrics. They provide a mathematical summary of where the data centers and how widely it spreads.',
    conceptSections: [
      {
        id: 'central-tendency',
        title: 'Measures of Central Tendency',
        content: [
          'The Arithmetic Mean (\\bar{x}) is the sum of all observations divided by the sample size n. It is sensitive to extreme values.',
          'The Median is the middle value when the data is sorted. It is resistant (robust) to outliers.',
          'The Mode is the most frequently occurring value in the dataset, applicable to both numerical and categorical variables.',
        ],
      },
      {
        id: 'dispersion',
        title: 'Measures of Dispersion (Spread)',
        content: [
          'Variance (\\sigma^2) measures the average squared deviation of each data point from the mean.',
          'Standard Deviation (\\sigma) is the square root of the variance, returning the dispersion back to the original physical units of the measurement.',
          'Interquartile Range (IQR = Q3 - Q1) captures the middle 50% of sorted observations, making it an outlier-resistant measure of spread.',
        ],
        table: {
          headers: ['Metric', 'Formula (Sample)', 'Sensitivity to Outliers', 'Best Applied To'],
          rows: [
            ['Mean', '\\bar{x} = \\frac{1}{n} \\sum x_i', 'High (Extreme sensitivity)', 'Symmetric, bell-shaped distributions'],
            ['Median', 'Middle sorted value', 'Low (Robust/Resistant)', 'Skewed data (e.g., salaries, house prices)'],
            ['Variance', 's^2 = \\frac{1}{n-1} \\sum (x_i - \\bar{x})^2', 'High (Squared deviations)', 'Theoretical modeling & ANOVA'],
            ['Std Dev', 's = \\sqrt{s^2}', 'High', 'Standard deviation in original units'],
            ['IQR', 'IQR = Q_3 - Q_1', 'Low (Robust/Resistant)', 'Outlier filtering (Tukey boxplots)'],
          ],
          caption: 'Table 1.6: Summary of central tendency and dispersion metrics.',
        },
      },
    ],
    keyTakeaways: [
      'Use Median and IQR when distributions are skewed or contain heavy outliers.',
      'Use Mean and Standard Deviation when distributions are roughly symmetric and bell-shaped.',
      'Sample variance uses n - 1 (Bessel’s correction) in the denominator to avoid systematic underestimation.',
    ],
    practiceQuestions: [
      {
        id: 'pq-6-1',
        question: 'If a tech company has 9 employees earning $50,000 and 1 CEO earning $5,000,000, which metric best represents the typical employee compensation?',
        options: [
          'The Mean ($545,000)',
          'The Median ($50,000)',
          'The Standard Deviation',
          'The Variance',
        ],
        correctIndex: 1,
        explanation: 'The median ($50,000) accurately reflects the typical worker’s salary, whereas the mean ($545,000) is drastically inflated by the single CEO outlier.',
      },
    ],
    prevLessonSlug: 'exploratory-data-analysis',
    nextLessonSlug: 'data-distributions',
  },
  {
    id: 'u1-l7',
    slug: 'data-distributions',
    order: 7,
    unitId: 'unit-1',
    unitNumber: 1,
    title: 'Data Distributions',
    shortDescription: 'Explore the shape of data: Normal distributions, skewness, kurtosis, uniform, exponential, and bimodal distributions.',
    estimatedDuration: 25,
    contentType: 'interactive',
    learningObjectives: [
      'Understand the properties of the Gaussian (Normal) Distribution and the 68-95-99.7 Empirical Rule.',
      'Identify Right (Positive) Skew vs Left (Negative) Skew.',
      'Interpret Kurtosis (Leptokurtic, Mesokurtic, Platykurtic) and tail risk.',
    ],
    mainExplanation: 'A probability distribution describes how the values of a variable are apportioned. Recognizing distribution shape allows you to choose appropriate statistical tests, detect genuine anomalies, and apply necessary transformations (e.g., log transforms).',
    conceptSections: [
      {
        id: 'normal-dist',
        title: 'The Gaussian (Normal) Distribution',
        content: [
          'The Normal distribution is symmetric and bell-shaped, completely parameterized by its mean \\mu and standard deviation \\sigma.',
          'According to the Empirical Rule (68-95-99.7 Rule):',
          '• ~68.2% of data falls within \\mu \\pm 1\\sigma',
          '• ~95.4% of data falls within \\mu \\pm 2\\sigma',
          '• ~99.7% of data falls within \\mu \\pm 3\\sigma',
        ],
      },
      {
        id: 'skewness-kurtosis',
        title: 'Skewness and Tail Behavior',
        content: [
          'Right (Positive) Skew: The tail extends towards higher positive values. Mean > Median > Mode.',
          'Left (Negative) Skew: The tail extends towards lower negative values. Mean < Median < Mode.',
          'Kurtosis measures the "tailedness" and likelihood of extreme outliers compared to a standard normal curve.',
        ],
        callout: {
          type: 'info',
          title: 'Interactive Explorer Below',
          text: 'Use the interactive distribution widget below to adjust the mean, standard deviation, and sample count to observe how histograms and density curves behave in real time.',
        },
      },
    ],
    keyTakeaways: [
      'Symmetric normal distributions have Mean ≈ Median ≈ Mode.',
      'Right-skewed distributions pull the Mean to the right of the Median.',
      'Log transformations are commonly used to normalize heavily right-skewed data.',
    ],
    practiceQuestions: [
      {
        id: 'pq-7-1',
        question: 'In a right-skewed (positively skewed) distribution, what is the typical relationship between Mean and Median?',
        options: [
          'Mean < Median',
          'Mean = Median',
          'Mean > Median',
          'Mean is always zero',
        ],
        correctIndex: 2,
        explanation: 'Extreme high values in the right tail pull the sensitive arithmetic mean upwards, making Mean > Median.',
      },
    ],
    prevLessonSlug: 'descriptive-statistics',
    nextLessonSlug: 'data-visualization',
  },
  {
    id: 'u1-l8',
    slug: 'data-visualization',
    order: 8,
    unitId: 'unit-1',
    unitNumber: 1,
    title: 'Data Visualization',
    shortDescription: 'Master visual encoding principles: choosing between histograms, bar charts, box plots, scatter plots, and heatmaps.',
    estimatedDuration: 25,
    contentType: 'concept',
    learningObjectives: [
      'Select the correct visualization type based on variable data types.',
      'Deconstruct Box Plots (Tukey IQR fences, whiskers, and outlier points).',
      'Follow Edward Tufte’s principles of graphical excellence and data-ink ratio.',
    ],
    mainExplanation: 'Data visualization is the graphical representation of information and data. By translating data into visual encodings (position, length, color, angle), it leverages human visual perception to reveal patterns, trends, and anomalies instantly.',
    conceptSections: [
      {
        id: 'chart-selection',
        title: 'Chart Selection Decision Matrix',
        content: [
          'Choosing the wrong chart obscures insights and misinforms stakeholders. Use this structured decision guide:',
        ],
        table: {
          headers: ['Chart Type', 'Variables Encoded', 'Primary Analytical Purpose'],
          rows: [
            ['Histogram', '1 Continuous', 'View distribution shape, peaks (modes), and spread'],
            ['Bar Chart', '1 Categorical (+ 1 Numeric agg)', 'Compare counts or aggregated metrics across discrete groups'],
            ['Box Plot', '1 Continuous (+ 1 Categorical)', 'Compare 5-number summary (Min, Q1, Median, Q3, Max) & outliers'],
            ['Scatter Plot', '2 Continuous', 'Observe bivariate relationships, clusters, and correlation'],
            ['Line Chart', '1 Continuous vs 1 Ordered/Time', 'Track trends and changes over continuous time intervals'],
            ['Heatmap', '2 Categorical + 1 Continuous', 'Evaluate matrix interactions and multi-feature correlation'],
          ],
          caption: 'Table 1.8: Data visualization chart selection matrix.',
        },
      },
      {
        id: 'boxplot-mechanics',
        title: 'Anatomy of a Tukey Box Plot',
        content: [
          'A box plot provides a standardized summary using the 5-Number Summary: Minimum, 25th Percentile (Q1), Median (Q2), 75th Percentile (Q3), and Maximum.',
          'The central box spans from Q1 to Q3, representing the Interquartile Range (IQR).',
          'Whiskers extend to the most extreme data points within 1.5 × IQR from the box edges. Any points beyond 1.5 × IQR are plotted as individual outlier points.',
        ],
      },
    ],
    keyTakeaways: [
      'Match chart type strictly to variable scales (Categorical vs Continuous).',
      'Box plots are exceptional for comparing distributions and identifying outliers across categories.',
      'Maximize the data-ink ratio by removing gratuitous 3D effects, bright clutter, and redundant legends.',
    ],
    practiceQuestions: [
      {
        id: 'pq-8-1',
        question: 'Which chart is most appropriate for visualizing the relationship between House Square Footage (continuous) and Sale Price (continuous)?',
        options: [
          'Pie Chart',
          'Scatter Plot',
          'Bar Chart',
          'Stacked Area Chart',
        ],
        correctIndex: 1,
        explanation: 'Scatter plots are the gold standard for examining bivariate relationships between two continuous numeric variables.',
      },
    ],
    prevLessonSlug: 'data-distributions',
    nextLessonSlug: 'correlation',
  },
  {
    id: 'u1-l9',
    slug: 'correlation',
    order: 9,
    unitId: 'unit-1',
    unitNumber: 1,
    title: 'Correlation',
    shortDescription: 'Understand Pearson’s r, Spearman’s rank correlation, covariance, scatter plot interpretation, and why correlation does not imply causation.',
    estimatedDuration: 25,
    contentType: 'derivation',
    learningObjectives: [
      'Calculate and interpret the Pearson correlation coefficient r (-1.0 to +1.0).',
      'Contrast Pearson (linear) with Spearman rank (monotonic) correlation.',
      'Avoid causal fallacy: Confounders, reverse causality, and spurious correlations.',
    ],
    mainExplanation: 'Correlation quantifies the strength and direction of a relationship between two variables. Understanding correlation allows data scientists to discover predictive features while remaining vigilant against spurious relationships and unobserved confounding variables.',
    conceptSections: [
      {
        id: 'pearson-r',
        title: 'Pearson’s Correlation Coefficient (r)',
        content: [
          'Pearson’s r measures the strength and direction of a linear relationship between two continuous variables.',
          'The value of r strictly ranges from -1.0 to +1.0:',
          '• r = +1.0: Perfect positive linear correlation',
          '• r = +0.7 to +0.9: Strong positive relationship',
          '• r = 0.0: No linear relationship',
          '• r = -0.7 to -0.9: Strong negative (inverse) relationship',
          '• r = -1.0: Perfect negative linear correlation',
        ],
      },
      {
        id: 'causation-fallacy',
        title: 'Correlation ≠ Causation',
        content: [
          'Just because two variables X and Y move together does not mean X causes Y.',
          'Potential explanations for high correlation include:',
          '1. Direct Causation: X causes Y.',
          '2. Reverse Causation: Y causes X.',
          '3. Confounding Variable (Z): An unobserved third variable causes both X and Y (e.g., Ice cream sales and drowning rates both increase due to summer heat).',
          '4. Pure Coincidence: Spurious correlations occurring by random chance in large feature sets.',
        ],
        callout: {
          type: 'warning',
          title: 'Critical Rule for Data Scientists',
          text: 'Never claim causal impact without controlled randomized experiments (A/B testing) or rigorous econometric causal inference methodologies.',
        },
      },
    ],
    keyTakeaways: [
      'Pearson r measures only LINEAR associations; non-linear relationships can have r ≈ 0.',
      'Spearman rank correlation is robust to outliers and assesses monotonic relationships.',
      'Always investigate confounding variables before making business claims.',
    ],
    practiceQuestions: [
      {
        id: 'pq-9-1',
        question: 'If two variables have a Pearson correlation of r = 0.0, what does this prove?',
        options: [
          'There is absolutely no relationship of any kind between the variables',
          'There is no linear relationship, but there could still be a strong non-linear relationship (e.g., U-shaped or circular)',
          'The data was entered incorrectly',
          'One variable is the square of the other',
        ],
        correctIndex: 1,
        explanation: 'Pearson’s r only tests for linear relationships. A parabolic relationship like y = x^2 across symmetric x has r = 0 despite being perfectly predictable.',
      },
    ],
    prevLessonSlug: 'data-visualization',
    nextLessonSlug: 'eda-case-study',
  },
  {
    id: 'u1-l10',
    slug: 'eda-case-study',
    order: 10,
    unitId: 'unit-1',
    unitNumber: 1,
    title: 'EDA Case Study',
    shortDescription: 'Synthesize all Unit 1 concepts in an end-to-end exploratory analysis of a real-world telemetry dataset from raw ingest to actionable conclusions.',
    estimatedDuration: 30,
    contentType: 'case-study',
    learningObjectives: [
      'Execute a full, structured 6-step EDA workflow on an unfamiliar dataset.',
      'Clean corrupted sensor timestamps, interpolate missing readings, and remove outliers.',
      'Communicate data insights and business implications clearly through summary cards and charts.',
    ],
    mainExplanation: 'In this capstone case study for Unit 1, we apply every tool learned—from measurement scales and data cleaning to descriptive metrics, distribution modeling, visualization, and correlation—to analyze an authentic IoT environmental sensor dataset.',
    conceptSections: [
      {
        id: 'case-workflow',
        title: 'The 6-Step End-to-End EDA Blueprint',
        content: [
          'Step 1: Ingestion & Schema Inspection — Check row counts, column data types, memory footprint, and sample rows.',
          'Step 2: Data Cleaning — Detect null values, remove duplicates, and validate measurement ranges (e.g., negative temperatures).',
          'Step 3: Univariate Profiling — Plot histograms and compute Mean, Median, IQR, and Std Dev for all numeric variables.',
          'Step 4: Bivariate Exploration — Plot scatter matrices and correlation heatmaps to uncover relationships between variables.',
          'Step 5: Anomaly Investigation — Identify outliers using Tukey IQR fences and investigate their root causes.',
          'Step 6: Executive Synthesis — Summarize key findings into actionable recommendations with high data-ink visualizations.',
        ],
        table: {
          headers: ['Analysis Step', 'Technique Used', 'Key Finding in Sensor Case'],
          rows: [
            ['Schema Audit', 'df.info(), df.describe()', 'Temperature column stored as string due to "ERR" values'],
            ['Missing Value Imputation', 'Forward fill on timeseries', '5% missing telemetry during 03:00 AM maintenance window'],
            ['Outlier Detection', 'IQR 1.5x fence filtering', 'Pressure sensor spiked to 999.0 kPa during power surge'],
            ['Correlation Analysis', 'Pearson correlation matrix', 'Humidity and Temperature exhibit strong negative correlation (r = -0.84)'],
          ],
          caption: 'Table 1.10: Execution log from the Environmental Sensor Case Study.',
        },
      },
      {
        id: 'final-takeaway',
        title: 'Transitioning to Linear Algebra (Unit 2)',
        content: [
          'Congratulations on mastering Exploratory Data Analysis! In modern data science, datasets are represented as high-dimensional geometric matrices where each row is a vector in n-dimensional space.',
          'In Unit 2: Linear Algebra & Vectors, you will learn the geometric foundations that power multidimensional transformations, projections, and machine learning models.',
        ],
      },
    ],
    keyTakeaways: [
      'Always follow a repeatable, structured EDA blueprint when tackling new datasets.',
      'Document every cleaning decision and transformation step for reproducibility.',
      'You are now equipped to tackle the Unit 1 Computational Labs and Mastery Quiz!',
    ],
    practiceQuestions: [
      {
        id: 'pq-10-1',
        question: 'What is the primary objective of the final Executive Synthesis stage in an EDA case study?',
        options: [
          'To write 50 pages of raw unformatted Python output',
          'To translate statistical insights into clear, actionable findings and visual evidence for decision-makers',
          'To delete the original dataset to save hard drive space',
          'To rename all variables into binary codes',
        ],
        correctIndex: 1,
        explanation: 'Data science is only valuable when empirical discoveries are effectively synthesized into actionable decisions.',
      },
    ],
    prevLessonSlug: 'correlation',
  },
];
