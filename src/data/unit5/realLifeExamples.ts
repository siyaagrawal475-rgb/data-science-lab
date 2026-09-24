import { RealLifeExample } from '@/types/experiences';

export const UNIT_5_EXAMPLES: RealLifeExample[] = [
  {
    id: 'u5-ex-uber',
    unitId: 'unit-5',
    unitNumber: 5,
    title: 'Ride-Hailing Dynamic Surge Pricing & ETA Demand Regression',
    industry: 'Transportation & Mobility Platforms (Uber / Lyft)',
    scenario:
      'A ride-hailing algorithmic dispatch engine predicts ride arrival duration (ETA) based on distance, live traffic density, rain intensity, and active driver fleet supply.',
    dataVariables: 'trip_distance_km, traffic_congestion_index (1-10), precipitation_mm, driver_density, actual_duration_mins',
    whatWeWantToKnow:
      'What is the expected trip duration under heavy rain and peak congestion, and how much does each 1mm of rain add to rider wait times?',
    mathematicalMethod:
      'Fit Multiple Linear Regression with Ridge L2 regularization to resolve collinearity between rain and traffic congestion: Duration = β₀ + β₁·Dist + β₂·Traffic + β₃·Rain + β₄·Drivers.',
    resultInterpretation:
      'The calibrated coefficients reveal β_rain = +1.42 mins per mm of precipitation and β_traffic = +2.85 mins per congestion unit. Regularization keeps parameters stable during extreme storm surges.',
    whyItMatters:
      'Accurate ETA predictions prevent passenger cancellations and feed directly into dynamic supply-demand equilibrium algorithms.',
  },
  {
    id: 'u5-ex-marketing',
    unitId: 'unit-5',
    unitNumber: 5,
    title: 'Marketing Mix Modeling (MMM) & Ad Spend Diminishing Returns',
    industry: 'Digital Marketing & Consumer Goods',
    scenario:
      'A retail brand allocates $20M across TV, YouTube, Meta, and Search Ads and wants to measure return on ad spend (ROAS) while capturing diminishing marginal returns.',
    dataVariables: 'tv_spend, meta_spend, search_spend, organic_baseline, weekly_sales_usd',
    whatWeWantToKnow:
      'Which channel has saturated its return curve, and where should the next $1M ad budget be deployed for maximal marginal revenue?',
    mathematicalMethod:
      'Fit Polynomial and Log-Transformed Regression (Hill Adstock Transformation): Sales = β₀ + β₁ log(TV) + β₂ log(Meta) + β₃ log(Search) with Lasso L1 penalty to drop uninformative ad channels.',
    resultInterpretation:
      'Search ads demonstrate linear returns (high marginal ROAS: $3.80 per $1 spent), whereas TV exhibits heavy saturation (derivative dSales/dTV < $0.60 per $1 spent past $5M).',
    whyItMatters:
      'Non-linear regression prevents corporations from burning marketing budgets on saturated media channels by quantifying exact marginal returns.',
  },
];
