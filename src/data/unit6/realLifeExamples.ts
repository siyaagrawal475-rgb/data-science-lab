import { RealLifeExample } from '@/types/experiences';

export const UNIT_6_EXAMPLES: RealLifeExample[] = [
  {
    id: 'u6-ex-telecom-churn',
    unitId: 'unit-6',
    unitNumber: 6,
    title: 'Telecom Subscription Customer Churn Prediction & Retention Intervention',
    industry: 'Telecommunications & SaaS Subscription',
    scenario:
      'A cellular telecom provider with 10M subscribers wants to predict which customers are at high risk of cancelling their service (churning) in the next 30 days to offer targeted retention discounts.',
    dataVariables: 'tenure_months, monthly_charges, total_support_calls, data_usage_gb, contract_type, churn (0/1)',
    whatWeWantToKnow:
      'Which customers are >70% likely to churn, and which factors (e.g. support calls vs contract duration) drive the decision boundary most strongly?',
    mathematicalMethod:
      'Train a Logistic Regression and Random Forest classifier. Extract feature importance coefficients (odds ratios) and compute Precision, Recall, and ROC-AUC curve.',
    resultInterpretation:
      'Customers with month-to-month contracts and ≥3 customer support calls in the past 60 days have a 78.4% churn probability (Odds Ratio = 4.2). Intervening with bill credits for the top decile predicted churners saves $3.4M annually.',
    whyItMatters:
      'Acquiring a new customer costs 5× more than retaining an existing one. Statistical classification identifies high-risk customers before they defect.',
  },
  {
    id: 'u6-ex-credit-risk',
    unitId: 'unit-6',
    unitNumber: 6,
    title: 'Retail Banking Consumer Credit Default Risk Underwriting',
    industry: 'Banking, Lending & Credit Risk',
    scenario:
      'A consumer credit bank evaluates loan applicants to predict probability of loan default (90+ days past due). Regulatory compliance mandates strict model interpretability.',
    dataVariables: 'credit_score, debt_to_income_ratio, annual_income, revolving_utilization_pct, default (0/1)',
    whatWeWantToKnow:
      'What is the borrower default probability, and can the model output exact adverse action reason codes for rejected applicants?',
    mathematicalMethod:
      'Fit a transparent Logistic Regression scorecard with Weight of Evidence (WoE) and Information Value (IV) binning. Calculate borrower log-odds: log(p / (1-p)) = β₀ + Σ β_j x_j.',
    resultInterpretation:
      'Debt-to-Income (DTI) ratio > 43% multiplies default odds by 3.1×. The bank establishes a risk cutoff threshold corresponding to an expected default rate < 2.5%.',
    whyItMatters:
      'Transparent linear classification ensures equitable, explainable lending decisions that satisfy strict regulatory audits while protecting institutional capital.',
  },
];
