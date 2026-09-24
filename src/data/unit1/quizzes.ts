import { UnitId } from '@/types';

export interface ComprehensiveQuizQuestion {
  id: string;
  question: string;
  topic?: string;
  category?: string;
  type?: 'multiple-choice' | 'conceptual' | 'calculation' | 'interpretation' | string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface UnitQuiz {
  id: string;
  unitId: UnitId;
  unitNumber: number;
  title: string;
  description: string;
  passingScore?: number;
  passingScorePercent?: number;
  questions: ComprehensiveQuizQuestion[];
}

export type QuizQuestion = ComprehensiveQuizQuestion;
export type QuizData = UnitQuiz;


export const UNIT_1_QUIZ: UnitQuiz = {
  id: 'unit-1-mastery-quiz',
  unitId: 'unit-1',
  unitNumber: 1,
  title: 'Unit 1 Mastery Assessment: Foundations & EDA',
  description: 'Evaluate your conceptual, mathematical, and practical understanding across all 10 topics of Unit 1.',
  passingScorePercent: 70,
  questions: [
    {
      id: 'u1-q1',
      topic: 'Data Science Foundations',
      type: 'conceptual',
      question: 'Which sequence correctly represents the foundational workflow in the Data Science lifecycle?',
      options: [
        'Model Training → Problem Formulation → Deployment → Data Cleaning',
        'Problem Formulation → Data Collection & Cleaning → Exploratory Analysis → Modeling → Synthesis',
        'Data Visualization → Neural Networks → Hardware Purchase → Data Collection',
        'Hypothesis Testing → Final Report → Data Ingestion → Exploratory Analysis',
      ],
      correctIndex: 1,
      explanation: 'A disciplined data science workflow begins with problem formulation, followed by data ingestion/cleaning, exploratory analysis, modeling, and final synthesis.',
    },
    {
      id: 'u1-q2',
      topic: 'Scales of Measurement',
      type: 'multiple-choice',
      question: 'A survey asks customers to rate their satisfaction as: 1 (Very Dissatisfied), 2 (Dissatisfied), 3 (Neutral), 4 (Satisfied), 5 (Very Satisfied). What scale of measurement is this?',
      options: [
        'Nominal Scale',
        'Ordinal Scale',
        'Ratio Scale',
        'Binary Scale',
      ],
      correctIndex: 1,
      explanation: 'Likert ratings possess a distinct qualitative order (1 < 2 < 3 < 4 < 5), but the psychological difference between satisfaction levels is not mathematically uniform, making it Ordinal.',
    },
    {
      id: 'u1-q3',
      topic: 'Data Collection & Bias',
      type: 'interpretation',
      question: 'An online tech magazine asks its website visitors to vote on "Whether remote work is productive." 92% vote Yes. Why is this result untrustworthy for drawing conclusions about the general workforce?',
      options: [
        'The sample size was too small to calculate percentages',
        'Voluntary response and selection bias: tech magazine visitors are disproportionately tech workers already accustomed to remote work',
        'Online polls cannot be processed by computers',
        'The magazine did not use a neural network to calculate the votes',
      ],
      correctIndex: 1,
      explanation: 'Voluntary response sampling creates severe selection bias because self-selected respondents have specific demographic characteristics and strong preconceived opinions.',
    },
    {
      id: 'u1-q4',
      topic: 'Data Cleaning',
      type: 'conceptual',
      question: 'In a real-world financial dataset, 15% of annual income values are missing because high-net-worth individuals systematically refused to disclose their income. What type of missingness is this?',
      options: [
        'Missing Completely at Random (MCAR)',
        'Missing at Random (MAR)',
        'Missing Not at Random (MNAR)',
        'Synthetic Missingness',
      ],
      correctIndex: 2,
      explanation: 'When the probability of a value being missing depends directly on the unobserved value itself (high earners hiding high earnings), the mechanism is Missing Not at Random (MNAR).',
    },
    {
      id: 'u1-q5',
      topic: 'Exploratory Data Analysis',
      type: 'conceptual',
      question: 'What crucial principle is illustrated by Anscombe’s Quartet?',
      options: [
        'Summary statistics (mean, variance, correlation) can be identical for four datasets that look completely different when plotted',
        'All datasets must contain exactly 11 observations',
        'Linear regression works flawlessly on non-linear distributions',
        'Visual plots are unnecessary if the p-value is below 0.05',
      ],
      correctIndex: 0,
      explanation: 'Anscombe’s Quartet proves that relying solely on summary metrics without graphical visualization leads to severe misinterpretations of data structure.',
    },
    {
      id: 'u1-q6',
      topic: 'Descriptive Statistics — Calculation',
      type: 'calculation',
      question: 'Consider the sample observations: [4, 8, 6, 5, 30, 7]. What is the median value of this dataset?',
      options: [
        '10.0',
        '6.0',
        '6.5',
        '8.0',
      ],
      correctIndex: 2,
      explanation: 'Sorted data: [4, 5, 6, 7, 8, 30]. The sample size is n = 6 (even). The median is the average of the two middle values (6 + 7) / 2 = 6.5.',
    },
    {
      id: 'u1-q7',
      topic: 'Variance & Standard Deviation',
      type: 'conceptual',
      question: 'Why do we compute the Standard Deviation (σ) by taking the square root of the Variance (σ²)?',
      options: [
        'To ensure the variance is always positive',
        'To return the measure of spread back to the original physical units of the measurement (e.g., dollars instead of dollars squared)',
        'Because square roots are required by calculus',
        'To convert continuous numbers into categorical labels',
      ],
      correctIndex: 1,
      explanation: 'Variance is expressed in squared units (e.g., dollars² or kg²). Taking the square root restores the metric of spread to the original interpretable units.',
    },
    {
      id: 'u1-q8',
      topic: 'Data Distributions',
      type: 'interpretation',
      question: 'A real estate dataset of house prices shows a pronounced right-skew (positive skew). Which inequality holds true for this distribution?',
      options: [
        'Mean < Median < Mode',
        'Mean = Median = Mode',
        'Mean > Median > Mode',
        'Standard Deviation = 0',
      ],
      correctIndex: 2,
      explanation: 'In a right-skewed distribution, the long right tail pulls the sensitive arithmetic mean upwards, resulting in Mean > Median > Mode.',
    },
    {
      id: 'u1-q9',
      topic: 'Data Visualization',
      type: 'multiple-choice',
      question: 'In a standard Tukey Box Plot with Q1 = 20 and Q3 = 50, what are the upper and lower outlier threshold fences (1.5 × IQR)?',
      options: [
        'Lower: 0, Upper: 70',
        'Lower: -25, Upper: 95',
        'Lower: 5, Upper: 65',
        'Lower: 20, Upper: 50',
      ],
      correctIndex: 1,
      explanation: 'IQR = Q3 - Q1 = 50 - 20 = 30. Lower fence = Q1 - 1.5 × IQR = 20 - 45 = -25. Upper fence = Q3 + 1.5 × IQR = 50 + 45 = 95.',
    },
    {
      id: 'u1-q10',
      topic: 'Correlation & Causation',
      type: 'interpretation',
      question: 'A study discovers a strong positive correlation (r = +0.89) between monthly ice cream sales and municipal swimming pool drownings. What is the most scientifically sound conclusion?',
      options: [
        'Eating ice cream directly causes muscle cramps that lead to drowning',
        'Closing ice cream stores will eliminate pool drownings',
        'The relationship is driven by a confounding variable (hot summer weather) that increases both outdoor swimming and ice cream consumption',
        'Pearson’s r was calculated incorrectly because correlation cannot exceed 0.5',
      ],
      correctIndex: 2,
      explanation: 'Correlation does not imply causation. Both variables are positively correlated with a third unobserved confounding variable: ambient summer temperature.',
    },
  ],
};
