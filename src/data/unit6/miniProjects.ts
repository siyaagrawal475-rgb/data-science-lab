import { MiniProjectData } from '@/types/experiences';

export const UNIT_6_MINI_PROJECT: MiniProjectData = {
  id: 'u6-project-spam-classification',
  title: 'NLP Email Spam Classifier & Decision Threshold Optimization',
  unitId: 'unit-6',
  unitNumber: 6,
  industryContext: 'Cybersecurity & Messaging Platforms (Gmail / Outlook)',
  scenario:
    'You are a Machine Learning Security Engineer at MailGuard. You need to train a binary classification model to detect phishing and spam emails while ensuring that legitimate business emails (ham) are virtually never routed to the spam folder (high precision constraint).',
  problemStatement:
    'Train a Logistic Regression model on email feature vectors (keyword frequencies, link count, domain authenticity score). Generate raw probability predictions p(Spam), compute the Confusion Matrix across varying decision thresholds t ∈ [0.2, 0.5, 0.8], plot the Precision-Recall curve, and select the optimal operating threshold to guarantee Precision ≥ 98%.',
  dataset: {
    name: 'mailguard_phishing_telemetry.csv',
    description: '10 email scoring instances with predicted probabilities and true labels',
    columns: ['email_id', 'link_count', 'suspicious_words', 'auth_score', 'prob_spam', 'true_label'],
    sampleRows: [
      { email_id: 'EM-101', link_count: 5, suspicious_words: 8, auth_score: 0.12, prob_spam: 0.94, true_label: 'Spam' },
      { email_id: 'EM-102', link_count: 1, suspicious_words: 0, auth_score: 0.95, prob_spam: 0.05, true_label: 'Ham' },
      { email_id: 'EM-103', link_count: 3, suspicious_words: 4, auth_score: 0.40, prob_spam: 0.72, true_label: 'Spam' },
      { email_id: 'EM-104', link_count: 2, suspicious_words: 1, auth_score: 0.88, prob_spam: 0.22, true_label: 'Ham' },
      { email_id: 'EM-105', link_count: 4, suspicious_words: 5, auth_score: 0.35, prob_spam: 0.81, true_label: 'Spam' },
      { email_id: 'EM-106', link_count: 0, suspicious_words: 0, auth_score: 0.99, prob_spam: 0.02, true_label: 'Ham' },
      { email_id: 'EM-107', link_count: 2, suspicious_words: 3, auth_score: 0.65, prob_spam: 0.54, true_label: 'Ham' },
      { email_id: 'EM-108', link_count: 7, suspicious_words: 9, auth_score: 0.08, prob_spam: 0.98, true_label: 'Spam' },
      { email_id: 'EM-109', link_count: 1, suspicious_words: 2, auth_score: 0.78, prob_spam: 0.35, true_label: 'Ham' },
      { email_id: 'EM-110', link_count: 6, suspicious_words: 6, auth_score: 0.20, prob_spam: 0.89, true_label: 'Spam' },
    ],
  },
  objectives: [
    'Calculate the Sigmoid log-odds activation function σ(z) = 1 / (1 + e⁻ᶻ)',
    'Compute Confusion Matrix components (TP, FP, TN, FN) at standard threshold t = 0.5',
    'Evaluate Precision and Recall at t = 0.5 vs high-precision threshold t = 0.70',
    'Demonstrate why adjusting decision threshold t prevents costly False Positives (legitimate emails marked as spam)',
  ],
  tasks: [
    {
      id: 'task-1',
      stepNumber: 1,
      title: 'Evaluate Standard Threshold t = 0.50',
      instruction: 'Classify emails as Spam if prob_spam ≥ 0.50. Calculate TP, FP, TN, FN, Precision, and Recall.',
      codeSnippet: `df['pred_50'] = (df['prob_spam'] >= 0.50).map({True: 'Spam', False: 'Ham'})\ntp = len(df[(df['true_label']=='Spam') & (df['pred_50']=='Spam')]) # 5\nfp = len(df[(df['true_label']=='Ham') & (df['pred_50']=='Spam')])  # 1 (EM-107)\ntn = len(df[(df['true_label']=='Ham') & (df['pred_50']=='Ham')])  # 4\nfn = len(df[(df['true_label']=='Spam') & (df['pred_50']=='Ham')]) # 0\nprec = tp / (tp + fp) # 5/6 = 83.3%\nrec = tp / (tp + fn)  # 5/5 = 100%`,
      expectedResult: 'At t = 0.50: TP=5, FP=1, TN=4, FN=0 → Precision = 83.3%, Recall = 100.0%',
      explanation: 'At standard threshold t = 0.50, email EM-107 (prob 0.54) is a False Positive, resulting in an unacceptable 16.7% false alarm rate.',
    },
    {
      id: 'task-2',
      stepNumber: 2,
      title: 'Tune Operating Threshold to t = 0.70',
      instruction: 'Increase classification threshold to t = 0.70 to eliminate False Positives.',
      codeSnippet: `df['pred_70'] = (df['prob_spam'] >= 0.70).map({True: 'Spam', False: 'Ham'})\ntp_70 = len(df[(df['true_label']=='Spam') & (df['pred_70']=='Spam')]) # 5\nfp_70 = len(df[(df['true_label']=='Ham') & (df['pred_70']=='Spam')]) # 0\nprec_70 = tp_70 / (tp_70 + fp_70) # 5/5 = 100%\nrec_70 = tp_70 / 5 # 100%`,
      expectedResult: 'At t = 0.70: TP=5, FP=0, TN=5, FN=0 → Precision = 100.0%, Recall = 100.0%',
      explanation: 'By shifting the threshold to t = 0.70, the false alarm EM-107 is correctly retained in the inbox while maintaining 100% spam detection.',
    },
    {
      id: 'task-3',
      stepNumber: 3,
      title: 'F1-Score and Harmonic Balance',
      instruction: 'Compute F1-Score at t = 0.50 vs t = 0.70.',
      codeSnippet: `f1_50 = 2 * (0.833 * 1.0) / (0.833 + 1.0) # 0.909\nf1_70 = 2 * (1.0 * 1.0) / (1.0 + 1.0) # 1.000\nprint(f"F1 at 0.50: {f1_50:.3f}, F1 at 0.70: {f1_70:.3f}")`,
      expectedResult: 'F1(t=0.50) = 0.909, F1(t=0.70) = 1.000',
      explanation: 'Optimizing the threshold directly maximizes harmonic balance and aligns with cybersecurity business constraints.',
    },
  ],
  finalInterpretation:
    'Threshold tuning is paramount in real-world ML deployment. Defaulting to t = 0.5 caused a legitimate email (EM-107) to be incorrectly marked as spam (Precision = 83.3%). Shifting the threshold to t = 0.70 completely eliminated False Positives (Precision = 100%) while preserving full catch rate (Recall = 100%).',
  challengeQuestion: {
    question: 'In a medical cancer detection algorithm where missing a tumor is life-threatening, how should the decision threshold t be adjusted relative to default 0.5?',
    options: [
      'Lower the threshold (e.g. t = 0.20) to maximize Recall and minimize False Negatives',
      'Raise the threshold (e.g. t = 0.90) to maximize Precision and minimize False Positives',
      'Keep threshold at exactly 0.50 because mathematics is neutral',
      'Randomly sample thresholds between 0 and 1',
    ],
    correctIndex: 0,
    explanation:
      'In high-stakes diagnostic screening, missing a positive case (False Negative) is catastrophic. Lowering the threshold ensures anyone with even mild suspicion is flagged for clinical evaluation.',
  },
};
