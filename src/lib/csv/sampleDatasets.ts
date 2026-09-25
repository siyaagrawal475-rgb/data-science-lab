/**
 * Curated Real-World Educational Sample Datasets
 * Data Science Lab — Phase 13
 */

export interface SampleDatasetInfo {
  id: string;
  name: string;
  unitNumber: number;
  unitCategory: string;
  description: string;
  csvContent: string;
  recommendedVisualizations: string[];
}

export const SAMPLE_DATASETS: SampleDatasetInfo[] = [
  {
    id: 'ecommerce_sales',
    name: 'E-Commerce Store Sales & Marketing',
    unitNumber: 1,
    unitCategory: 'EDA & Descriptive Statistics',
    description: '15 retail transactions with ad spend, customer age, unit sales, rating, and revenue metrics.',
    recommendedVisualizations: ['Histogram', 'BoxPlot', 'ScatterPlot', 'DensityPlot', 'ECDFPlot', 'CorrelationHeatmap'],
    csvContent: `order_id,customer_age,ad_spend_usd,units_sold,customer_rating,revenue_usd,discount_applied
1001,24,120,4,4.5,320,0
1002,35,350,12,4.8,960,1
1003,42,210,7,4.1,560,0
1004,29,180,6,3.9,480,0
1005,51,520,18,4.9,1440,1
1006,33,290,9,4.2,720,0
1007,22,95,3,3.5,240,0
1008,48,440,15,4.7,1200,1
1009,38,310,10,4.3,800,0
1010,27,150,5,4.0,400,0
1011,56,600,20,5.0,1600,1
1012,31,230,8,4.1,640,0
1013,45,410,14,4.6,1120,1
1014,26,140,4,3.8,320,0
1015,60,650,22,4.9,1760,1`,
  },
  {
    id: 'housing_pricing',
    name: 'Residential Property Valuations',
    unitNumber: 5,
    unitCategory: 'Regression Analysis',
    description: '14 suburban home listings with square footage, bedrooms, bathrooms, age, and sale prices.',
    recommendedVisualizations: ['ScatterPlot', 'RegressionLine', 'ResidualPlot', 'PolynomialFitPlot'],
    csvContent: `property_id,square_feet,bedrooms,bathrooms,age_years,sale_price_k
101,1100,2,1.0,15,225
102,1450,3,2.0,10,290
103,1800,3,2.5,8,360
104,2150,4,2.5,5,435
105,2500,4,3.0,3,510
106,950,2,1.0,22,190
107,1650,3,2.0,12,325
108,2300,4,3.0,6,465
109,2850,5,3.5,2,580
110,1300,3,1.5,18,260
111,1950,4,2.5,7,395
112,2700,4,3.5,4,545
113,1550,3,2.0,14,310
114,3100,5,4.0,1,630`,
  },
  {
    id: 'customer_churn',
    name: 'Telecom Customer Retention & Churn',
    unitNumber: 6,
    unitCategory: 'Classification & ML',
    description: '14 telecom accounts with monthly charges, tenure months, support tickets, and churn outcome.',
    recommendedVisualizations: ['ROCCurvePlot', 'DecisionBoundary', 'ConfusionMatrix', 'LogisticRegression'],
    csvContent: `account_id,tenure_months,monthly_charges,support_calls,contract_type,churned
501,4,85.50,4,month-to-month,1
502,36,65.20,1,two-year,0
503,12,79.00,3,month-to-month,1
504,48,55.40,0,two-year,0
505,8,92.10,5,month-to-month,1
506,24,60.80,1,one-year,0
507,2,88.00,4,month-to-month,1
508,60,70.15,0,two-year,0
509,18,74.50,2,one-year,0
510,6,95.00,6,month-to-month,1
511,42,58.30,1,two-year,0
512,15,82.00,3,month-to-month,1
513,30,68.90,1,one-year,0
514,54,62.10,0,two-year,0`,
  },
  {
    id: 'ab_test_experiment',
    name: 'Checkout Flow Conversion A/B Test',
    unitNumber: 4,
    unitCategory: 'Probability & Inference',
    description: 'Observed session durations and conversion flags comparing Control (A) vs Treatment (B).',
    recommendedVisualizations: ['DensityPlot', 'ECDFPlot', 'BoxPlot', 'HypothesisTesting'],
    csvContent: `session_id,variant,duration_sec,pages_viewed,completed_purchase
8001,Control_A,142,3,0
8002,Treatment_B,95,4,1
8003,Control_A,210,5,1
8004,Treatment_B,88,3,1
8005,Control_A,165,2,0
8006,Treatment_B,102,4,1
8007,Control_A,180,4,0
8008,Treatment_B,78,3,1
8009,Control_A,135,2,0
8010,Treatment_B,92,5,1
8011,Control_A,195,4,1
8012,Treatment_B,84,3,1
8013,Control_A,155,3,0
8014,Treatment_B,110,4,1`,
  },
  {
    id: 'feature_vectors',
    name: 'Feature Embeddings & Vector Space',
    unitNumber: 2,
    unitCategory: 'Linear Algebra & Vectors',
    description: 'Document and item coordinate vectors for dot product and cosine similarity calculations.',
    recommendedVisualizations: ['CoordinatePlane', 'VectorAddition', 'CosineSimilarity', 'DotProduct'],
    csvContent: `entity_id,x_coordinate,y_coordinate,dimension_z,relevance_score
Doc_SciFi,4.5,2.0,3.1,0.85
Doc_Action,4.0,3.5,2.8,0.78
Doc_Romance,1.2,5.0,1.0,0.32
Doc_Drama,1.8,4.2,1.5,0.41
Doc_Thriller,4.8,2.5,3.8,0.92
Doc_Comedy,2.5,4.8,1.2,0.45`,
  },
  {
    id: 'transformation_matrix',
    name: '2D Affine Transformation Matrices',
    unitNumber: 3,
    unitCategory: 'Matrices & Linear Transformations',
    description: '2x2 and 3x3 coordinate transformation matrices for spatial scaling, rotation, and shear.',
    recommendedVisualizations: ['MatrixTransformGrid', 'MatrixMultiplication', 'DeterminantArea'],
    csvContent: `m00,m01,m10,m11,det_area
1.5,0.0,0.0,1.5,2.25
0.0,-1.0,1.0,0.0,1.00
1.0,0.5,0.0,1.0,1.00
2.0,1.0,1.0,2.0,3.00`,
  },
];
