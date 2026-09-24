import { RealLifeExample } from '@/types/experiences';

export const UNIT_1_EXAMPLES: RealLifeExample[] = [
  {
    id: 'u1-ex-hospital',
    unitId: 'unit-1',
    unitNumber: 1,
    title: 'Hospital Emergency Department Patient Wait Times',
    industry: 'Healthcare Operations',
    scenario:
      'A metropolitan hospital network experiences patient dissatisfaction regarding wait times. While administrators report an average wait time of 42 minutes, triage staff report patients waiting up to 4 hours during peak trauma surges.',
    dataVariables: 'patient_id, arrival_hour, triage_acuity_level (1-5), wait_time_minutes, discharge_status',
    whatWeWantToKnow:
      'Why does the official average of 42 minutes contradict patient and doctor reports of 3–4 hour waits?',
    mathematicalMethod:
      'Compute 5-number summary (Min, Q1, Median, Q3, Max), calculate skewness coefficient, plot a histogram and Tukey box plot, and separate analysis by triage acuity level.',
    resultInterpretation:
      'The wait time distribution is severely right-skewed. While the Median wait time is only 22 minutes (fast triage for minor ailments), extreme trauma cases create a long tail reaching 240 minutes. The arithmetic mean of 42 minutes is mathematically correct but misleading as a typical patient expectation.',
    whyItMatters:
      'Reporting the 90th percentile (115 minutes) and median (22 minutes) allows hospital management to staff emergency bays accurately rather than relying on a single distorted average.',
  },
  {
    id: 'u1-ex-fintech',
    unitId: 'unit-1',
    unitNumber: 1,
    title: 'Credit Card Fraud Telemetry & Anomaly Screening',
    industry: 'Financial Technology & Cybersecurity',
    scenario:
      'A digital banking platform processes 5 million payment transactions daily and needs automated rules to flag suspicious transactions for secondary biometric authorization.',
    dataVariables: 'txn_id, user_id, amount_usd, distance_from_home_km, time_since_last_txn_sec, merchant_category',
    whatWeWantToKnow:
      'How can we define an objective mathematical threshold for outlier transaction amounts without blocking legitimate high-value purchases?',
    mathematicalMethod:
      'Group transactions by user historical spending category, compute log-transformed transaction amounts, and evaluate individual transactions using Z-scores and rolling Tukey 1.5×IQR fences.',
    resultInterpretation:
      'A raw $500 transaction might be normal for a luxury travel user (Z = +0.2) but represents a 4.8σ anomaly for a user whose median transaction is $12. Setting adaptive IQR fences reduces false positive fraud alerts by 78%.',
    whyItMatters:
      'Statistical normalization prevents card rejections for high-net-worth customers while instantly blocking unauthorized multi-thousand dollar card drains.',
  },
];
