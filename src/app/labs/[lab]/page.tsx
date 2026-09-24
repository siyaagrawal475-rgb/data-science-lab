import React from 'react';
import { notFound } from 'next/navigation';
import { InteractiveLabLayout } from '@/components/labs/InteractiveLabLayout';
import { EDALab } from '@/components/labs/EDALab';
import { DataCleaningLab } from '@/components/labs/DataCleaningLab';
import { DataVizLab } from '@/components/labs/DataVizLab';
import { CorrelationLab } from '@/components/labs/CorrelationLab';
import { VectorOperationsLab } from '@/components/labs/VectorOperationsLab';
import { DotProductLab } from '@/components/labs/DotProductLab';
import { VectorProjectionLab } from '@/components/labs/VectorProjectionLab';
import { LinearCombinationsLab } from '@/components/labs/LinearCombinationsLab';
import { MatrixOperationsLab } from '@/components/labs/MatrixOperationsLab';
import { MatrixMultiplicationLab } from '@/components/labs/MatrixMultiplicationLab';
import { MatrixTransformationLab } from '@/components/labs/MatrixTransformationLab';
import { MatrixDeterminantLab } from '@/components/labs/MatrixDeterminantLab';
import { ProbabilitySimulationLab } from '@/components/labs/ProbabilitySimulationLab';
import { DistributionLab } from '@/components/labs/DistributionLab';
import { BayesLab } from '@/components/labs/BayesLab';
import { StatisticalInferenceLab } from '@/components/labs/StatisticalInferenceLab';
import { RegressionAnalysisLab } from '@/components/labs/RegressionAnalysisLab';
import { LeastSquaresLab } from '@/components/labs/LeastSquaresLab';
import { PolynomialRegressionLab } from '@/components/labs/PolynomialRegressionLab';
import { RegularizationLab } from '@/components/labs/RegularizationLab';
import { ClassificationLab } from '@/components/labs/ClassificationLab';
import { LogisticRegressionLab } from '@/components/labs/LogisticRegressionLab';
import { KNNLab } from '@/components/labs/KNNLab';
import { ModelEvaluationLab } from '@/components/labs/ModelEvaluationLab';

interface LabPageProps {
  params: Promise<{
    lab: string;
  }>;
}

export default async function LabPage({ params }: LabPageProps) {
  const resolvedParams = await params;
  const rawLabSlug = resolvedParams.lab.toLowerCase();

  // Unit 1 Labs
  if (rawLabSlug === 'eda' || rawLabSlug === 'lab-1' || rawLabSlug === 'exploratory-data-analysis') {
    return (
      <InteractiveLabLayout
        labId="eda"
        unitId="unit-1"
        unitNumber={1}
        title="Exploratory Data Analysis Lab"
        subtitle="Perform univariate profiling, calculate 5-number summaries, and examine statistical moments across multi-channel sensor telemetry."
        estimatedMinutes={20}
        defaultChartType="histogram"
      >
        <EDALab />
      </InteractiveLabLayout>
    );
  }

  if (rawLabSlug === 'cleaning' || rawLabSlug === 'data-cleaning' || rawLabSlug === 'lab-2') {
    return (
      <InteractiveLabLayout
        labId="cleaning"
        unitId="unit-1"
        unitNumber={1}
        title="Interactive Data Cleaning Lab"
        subtitle="Detect and remediate missing data anomalies, deduplicate records, standardize categorical labels, and isolate extreme Tukey fence outliers."
        estimatedMinutes={25}
        defaultChartType="boxplot"
      >
        <DataCleaningLab />
      </InteractiveLabLayout>
    );
  }

  if (rawLabSlug === 'visualization' || rawLabSlug === 'data-visualization' || rawLabSlug === 'viz' || rawLabSlug === 'lab-3') {
    return (
      <InteractiveLabLayout
        labId="visualization"
        unitId="unit-1"
        unitNumber={1}
        title="Data Visualization Encoding Lab"
        subtitle="Test perceptual mappings across Line, Bar, Scatter, and Histogram charts to discover multi-dimensional telemetry patterns."
        estimatedMinutes={20}
        defaultChartType="scatter"
      >
        <DataVizLab />
      </InteractiveLabLayout>
    );
  }

  if (rawLabSlug === 'correlation' || rawLabSlug === 'bivariate-correlation' || rawLabSlug === 'lab-4') {
    return (
      <InteractiveLabLayout
        labId="correlation"
        unitId="unit-1"
        unitNumber={1}
        title="Bivariate Correlation Lab"
        subtitle="Evaluate mathematical relationships between continuous variables, calculate Pearson r, R², and inspect ordinary least squares linear fits."
        estimatedMinutes={15}
        defaultChartType="heatmap"
      >
        <CorrelationLab />
      </InteractiveLabLayout>
    );
  }

  // Unit 2 Labs
  if (rawLabSlug === 'vectors' || rawLabSlug === 'vector-operations' || rawLabSlug === 'unit2-lab-1') {
    return (
      <InteractiveLabLayout
        labId="vectors"
        unitId="unit-2"
        unitNumber={2}
        title="Vector Operations Lab"
        subtitle="Manipulate 2D coordinate vectors, execute vector addition, subtraction, and scalar multiplication, and inspect resultant magnitudes."
        estimatedMinutes={20}
      >
        <VectorOperationsLab />
      </InteractiveLabLayout>
    );
  }

  if (rawLabSlug === 'dot-product' || rawLabSlug === 'dot-product-angle' || rawLabSlug === 'unit2-lab-2') {
    return (
      <InteractiveLabLayout
        labId="dot-product"
        unitId="unit-2"
        unitNumber={2}
        title="Dot Product & Angle Lab"
        subtitle="Adjust vector components to examine algebraic dot products, vector magnitudes, enclosed angles, cosine similarity, and orthogonality."
        estimatedMinutes={20}
      >
        <DotProductLab />
      </InteractiveLabLayout>
    );
  }

  if (rawLabSlug === 'projection' || rawLabSlug === 'vector-projection' || rawLabSlug === 'unit2-lab-3') {
    return (
      <InteractiveLabLayout
        labId="projection"
        unitId="unit-2"
        unitNumber={2}
        title="Vector Projection Lab"
        subtitle="Decompose a target vector into its parallel projection along a base vector and its orthogonal residual error vector."
        estimatedMinutes={20}
      >
        <VectorProjectionLab />
      </InteractiveLabLayout>
    );
  }

  if (rawLabSlug === 'linear-combinations' || rawLabSlug === 'linear-combination' || rawLabSlug === 'unit2-lab-4') {
    return (
      <InteractiveLabLayout
        labId="linear-combinations"
        unitId="unit-2"
        unitNumber={2}
        title="Linear Combination Lab"
        subtitle="Synthesize resultant vectors through weighted sums of basis vectors, evaluate span coverage, and detect linear dependence."
        estimatedMinutes={20}
      >
        <LinearCombinationsLab />
      </InteractiveLabLayout>
    );
  }

  // Unit 3 Labs
  if (rawLabSlug === 'matrices' || rawLabSlug === 'matrix-operations' || rawLabSlug === 'unit3-lab-1') {
    return (
      <InteractiveLabLayout
        labId="matrices"
        unitId="unit-3"
        unitNumber={3}
        title="Matrix Operations Lab"
        subtitle="Perform elementwise matrix addition, subtraction, scalar multiplication, and transposition on 2D matrices."
        estimatedMinutes={20}
      >
        <MatrixOperationsLab />
      </InteractiveLabLayout>
    );
  }

  if (rawLabSlug === 'matrix-multiplication' || rawLabSlug === 'matrix-mult' || rawLabSlug === 'unit3-lab-2') {
    return (
      <InteractiveLabLayout
        labId="matrix-multiplication"
        unitId="unit-3"
        unitNumber={3}
        title="Matrix Multiplication Lab"
        subtitle="Verify dimension compatibility and trace row-by-column inner product dot product summations across rectangular matrix pairs."
        estimatedMinutes={20}
      >
        <MatrixMultiplicationLab />
      </InteractiveLabLayout>
    );
  }

  if (rawLabSlug === 'transformations' || rawLabSlug === 'matrix-transformations' || rawLabSlug === 'unit3-lab-3') {
    return (
      <InteractiveLabLayout
        labId="transformations"
        unitId="unit-3"
        unitNumber={3}
        title="Matrix Transformation Lab"
        subtitle="Manipulate 2×2 transformation operators, track basis vectors î and ĵ, and explore geometric rotations, shears, and area scalings."
        estimatedMinutes={20}
      >
        <MatrixTransformationLab />
      </InteractiveLabLayout>
    );
  }

  if (rawLabSlug === 'determinants' || rawLabSlug === 'determinant' || rawLabSlug === 'invertibility' || rawLabSlug === 'unit3-lab-4') {
    return (
      <InteractiveLabLayout
        labId="determinants"
        unitId="unit-3"
        unitNumber={3}
        title="Determinant & Invertibility Lab"
        subtitle="Evaluate determinants, verify invertibility conditions, inspect inverse matrices, and visualize signed area transformations."
        estimatedMinutes={20}
      >
        <MatrixDeterminantLab />
      </InteractiveLabLayout>
    );
  }

  // Unit 4 Labs
  if (rawLabSlug === 'probability' || rawLabSlug === 'probability-simulation' || rawLabSlug === 'unit4-lab-1') {
    return (
      <InteractiveLabLayout
        labId="probability"
        unitId="unit-4"
        unitNumber={4}
        title="Probability Simulation Lab"
        subtitle="Simulate coin tosses, multi-sided dice rolls, and card draws to observe empirical frequency convergence under the Law of Large Numbers."
        estimatedMinutes={20}
      >
        <ProbabilitySimulationLab />
      </InteractiveLabLayout>
    );
  }

  if (rawLabSlug === 'distributions' || rawLabSlug === 'probability-distributions' || rawLabSlug === 'unit4-lab-2') {
    return (
      <InteractiveLabLayout
        labId="distributions"
        unitId="unit-4"
        unitNumber={4}
        title="Distribution Modeling Lab"
        subtitle="Explore Normal, Binomial, Poisson, and Uniform probability models, fit parameters, and calculate tail and interval probabilities."
        estimatedMinutes={20}
      >
        <DistributionLab />
      </InteractiveLabLayout>
    );
  }

  if (rawLabSlug === 'bayes' || rawLabSlug === 'bayes-theorem' || rawLabSlug === 'bayesian-inference' || rawLabSlug === 'unit4-lab-3') {
    return (
      <InteractiveLabLayout
        labId="bayes"
        unitId="unit-4"
        unitNumber={4}
        title="Bayes' Theorem Lab"
        subtitle="Calculate posterior probabilities, update prior beliefs with evidence, and explore the base rate fallacy in fraud and diagnostic tests."
        estimatedMinutes={20}
      >
        <BayesLab />
      </InteractiveLabLayout>
    );
  }

  if (rawLabSlug === 'statistical-inference' || rawLabSlug === 'inference' || rawLabSlug === 'hypothesis-testing' || rawLabSlug === 'unit4-lab-4') {
    return (
      <InteractiveLabLayout
        labId="statistical-inference"
        unitId="unit-4"
        unitNumber={4}
        title="Statistical Inference Lab"
        subtitle="Conduct one-sample Z-tests, evaluate test statistics and p-values, construct confidence intervals, and make formal statistical decisions."
        estimatedMinutes={20}
      >
        <StatisticalInferenceLab />
      </InteractiveLabLayout>
    );
  }

  // Unit 5 Labs
  if (rawLabSlug === 'regression' || rawLabSlug === 'regression-analysis' || rawLabSlug === 'linear-regression' || rawLabSlug === 'unit5-lab-1') {
    return (
      <InteractiveLabLayout
        labId="regression"
        unitId="unit-5"
        unitNumber={5}
        title="Regression Analysis Lab"
        subtitle="Inspect bivariate scatter plots, fit Ordinary Least Squares models, analyze parameter slopes and intercepts, and generate point predictions."
        estimatedMinutes={20}
        defaultChartType="scatter"
      >
        <RegressionAnalysisLab />
      </InteractiveLabLayout>
    );
  }

  if (rawLabSlug === 'least-squares' || rawLabSlug === 'ols' || rawLabSlug === 'least-squares-lab' || rawLabSlug === 'unit5-lab-2') {
    return (
      <InteractiveLabLayout
        labId="least-squares"
        unitId="unit-5"
        unitNumber={5}
        title="Least Squares Geometry Lab"
        subtitle="Manipulate candidate regression lines, visualize geometric squared error areas, and observe how SSE minimizes at the analytical OLS solution."
        estimatedMinutes={20}
        defaultChartType="scatter"
      >
        <LeastSquaresLab />
      </InteractiveLabLayout>
    );
  }

  if (rawLabSlug === 'polynomial-regression' || rawLabSlug === 'polynomial' || rawLabSlug === 'unit5-lab-3') {
    return (
      <InteractiveLabLayout
        labId="polynomial-regression"
        unitId="unit-5"
        unitNumber={5}
        title="Polynomial Regression Lab"
        subtitle="Tune polynomial degrees from 1 to 5, compare training vs. validation error divergence, and diagnose underfitting and overfitting."
        estimatedMinutes={20}
        defaultChartType="scatter"
      >
        <PolynomialRegressionLab />
      </InteractiveLabLayout>
    );
  }

  if (rawLabSlug === 'regularization' || rawLabSlug === 'ridge-lasso' || rawLabSlug === 'unit5-lab-4') {
    return (
      <InteractiveLabLayout
        labId="regularization"
        unitId="unit-5"
        unitNumber={5}
        title="Regularization (Ridge & Lasso) Lab"
        subtitle="Tune penalty strength λ across standardized multi-feature datasets and compare L2 coefficient shrinkage against L1 exact sparsity."
        estimatedMinutes={25}
        defaultChartType="scatter"
      >
        <RegularizationLab />
      </InteractiveLabLayout>
    );
  }

  // Unit 6 Labs
  if (rawLabSlug === 'classification' || rawLabSlug === 'classification-lab' || rawLabSlug === 'unit6-lab-1') {
    return (
      <InteractiveLabLayout
        labId="classification"
        unitId="unit-6"
        unitNumber={6}
        title="Supervised Classification Lab"
        subtitle="Select datasets, train parametric (Logistic) vs. non-parametric (k-NN) classifiers, generate predictions, and evaluate confusion matrices."
        estimatedMinutes={20}
        defaultChartType="scatter"
      >
        <ClassificationLab />
      </InteractiveLabLayout>
    );
  }

  if (rawLabSlug === 'logistic-regression' || rawLabSlug === 'logistic' || rawLabSlug === 'unit6-lab-2') {
    return (
      <InteractiveLabLayout
        labId="logistic-regression"
        unitId="unit-6"
        unitNumber={6}
        title="Logistic Regression Lab"
        subtitle="Fit logistic regression models via gradient descent, inspect Binary Cross-Entropy log loss, and calibrate operational decision thresholds."
        estimatedMinutes={20}
        defaultChartType="scatter"
      >
        <LogisticRegressionLab />
      </InteractiveLabLayout>
    );
  }

  if (rawLabSlug === 'knn' || rawLabSlug === 'k-nearest-neighbors' || rawLabSlug === 'unit6-lab-3') {
    return (
      <InteractiveLabLayout
        labId="knn"
        unitId="unit-6"
        unitNumber={6}
        title="k-Nearest Neighbors (k-NN) Lab"
        subtitle="Test distance-based nearest neighbor classification, compare scaled vs. unscaled features, and inspect class voting mechanics."
        estimatedMinutes={20}
        defaultChartType="scatter"
      >
        <KNNLab />
      </InteractiveLabLayout>
    );
  }

  if (rawLabSlug === 'model-evaluation' || rawLabSlug === 'evaluation' || rawLabSlug === 'confusion-matrix' || rawLabSlug === 'unit6-lab-4') {
    return (
      <InteractiveLabLayout
        labId="model-evaluation"
        unitId="unit-6"
        unitNumber={6}
        title="Classification Model Evaluation Lab"
        subtitle="Calibrate decision thresholds across imbalanced datasets and optimize asymmetric operational cost matrices."
        estimatedMinutes={25}
        defaultChartType="scatter"
      >
        <ModelEvaluationLab />
      </InteractiveLabLayout>
    );
  }

  notFound();
}
