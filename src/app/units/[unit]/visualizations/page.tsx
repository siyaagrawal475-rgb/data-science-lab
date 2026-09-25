import React from 'react';
import { notFound } from 'next/navigation';

import { UNITS_DATA } from '@/lib/constants';
import { UNIT_1_LESSONS } from '@/data/unit1/lessons';
import { UNIT_1_QUIZ } from '@/data/unit1/quizzes';
import { UNIT_1_FLASHCARDS } from '@/data/unit1/flashcards';
import { UNIT_1_FORMULAS } from '@/data/unit1/formulas';
import { UNIT_1_COMPARISONS } from '@/data/unit1/comparisonTables';
import { UNIT_1_MINI_PROJECT } from '@/data/unit1/miniProjects';
import { UNIT_1_EXAMPLES } from '@/data/unit1/realLifeExamples';

import { UNIT_2_LESSONS } from '@/data/unit2/lessons';
import { UNIT_2_QUIZ } from '@/data/unit2/quizzes';
import { UNIT_2_FLASHCARDS } from '@/data/unit2/flashcards';
import { UNIT_2_FORMULAS } from '@/data/unit2/formulas';
import { UNIT_2_COMPARISONS } from '@/data/unit2/comparisonTables';
import { UNIT_2_MINI_PROJECT } from '@/data/unit2/miniProjects';
import { UNIT_2_EXAMPLES } from '@/data/unit2/realLifeExamples';

import { UNIT_3_LESSONS } from '@/data/unit3/lessons';
import { UNIT_3_QUIZ } from '@/data/unit3/quizzes';
import { UNIT_3_FLASHCARDS } from '@/data/unit3/flashcards';
import { UNIT_3_FORMULAS } from '@/data/unit3/formulas';
import { UNIT_3_COMPARISONS } from '@/data/unit3/comparisonTables';
import { UNIT_3_MINI_PROJECT } from '@/data/unit3/miniProjects';
import { UNIT_3_EXAMPLES } from '@/data/unit3/realLifeExamples';

import { UNIT_4_LESSONS } from '@/data/unit4/lessons';
import { UNIT_4_QUIZ } from '@/data/unit4/quizzes';
import { UNIT_4_FLASHCARDS } from '@/data/unit4/flashcards';
import { UNIT_4_FORMULAS } from '@/data/unit4/formulas';
import { UNIT_4_COMPARISONS } from '@/data/unit4/comparisonTables';
import { UNIT_4_MINI_PROJECT } from '@/data/unit4/miniProjects';
import { UNIT_4_EXAMPLES } from '@/data/unit4/realLifeExamples';

import { UNIT_5_LESSONS } from '@/data/unit5/lessons';
import { UNIT_5_QUIZ } from '@/data/unit5/quizzes';
import { UNIT_5_FLASHCARDS } from '@/data/unit5/flashcards';
import { UNIT_5_FORMULAS } from '@/data/unit5/formulas';
import { UNIT_5_COMPARISONS } from '@/data/unit5/comparisonTables';
import { UNIT_5_MINI_PROJECT } from '@/data/unit5/miniProjects';
import { UNIT_5_EXAMPLES } from '@/data/unit5/realLifeExamples';

import { UNIT_6_LESSONS } from '@/data/unit6/lessons';
import { UNIT_6_QUIZ } from '@/data/unit6/quizzes';
import { UNIT_6_FLASHCARDS } from '@/data/unit6/flashcards';
import { UNIT_6_FORMULAS } from '@/data/unit6/formulas';
import { UNIT_6_COMPARISONS } from '@/data/unit6/comparisonTables';
import { UNIT_6_MINI_PROJECT } from '@/data/unit6/miniProjects';
import { UNIT_6_EXAMPLES } from '@/data/unit6/realLifeExamples';

import { UnitWorkspaceTabs } from '@/components/units/UnitWorkspaceTabs';
import { Unit1DistributionSim } from '@/components/simulations/Unit1DistributionSim';
import { Unit1Visualizations } from '@/components/units/Unit1Visualizations';
import { Unit2VectorSpaceSim } from '@/components/simulations/Unit2VectorSpaceSim';
import { Unit2Visualizations } from '@/components/units/Unit2Visualizations';
import { Unit3MatrixTransformSim } from '@/components/simulations/Unit3MatrixTransformSim';
import { Unit3Visualizations } from '@/components/units/Unit3Visualizations';
import { Unit4ProbabilityCLTSim } from '@/components/simulations/Unit4ProbabilityCLTSim';
import { Unit4Visualizations } from '@/components/units/Unit4Visualizations';
import { Unit5GradientDescentSim } from '@/components/simulations/Unit5GradientDescentSim';
import { Unit5Visualizations } from '@/components/units/Unit5Visualizations';
import { Unit6ClassificationBoundarySim } from '@/components/simulations/Unit6ClassificationBoundarySim';
import { Unit6Visualizations } from '@/components/units/Unit6Visualizations';

interface PageProps {
  params: Promise<{
    unit: string;
  }>;
}

export default async function UnitVisualizationsPage({ params }: PageProps) {
  const resolvedParams = await params;
  const unitParam = resolvedParams.unit.toLowerCase();

  const isUnit1 = unitParam === '1' || unitParam === 'unit-1';
  const isUnit2 = unitParam === '2' || unitParam === 'unit-2';
  const isUnit3 = unitParam === '3' || unitParam === 'unit-3';
  const isUnit4 = unitParam === '4' || unitParam === 'unit-4';
  const isUnit5 = unitParam === '5' || unitParam === 'unit-5';
  const isUnit6 = unitParam === '6' || unitParam === 'unit-6';

  if (!isUnit1 && !isUnit2 && !isUnit3 && !isUnit4 && !isUnit5 && !isUnit6) {
    notFound();
  }

  // UNIT 1
  if (isUnit1) {
    const unit = UNITS_DATA.find((u) => u.id === 'unit-1') || UNITS_DATA[0];
    const labs = [
      { id: 'eda', slug: 'eda', title: 'Exploratory Data Analysis Lab', description: 'Profile distributions, compute 5-number summaries, and examine statistical moments across multi-sensor telemetry.', duration: '20 min', difficulty: 'Intermediate' },
      { id: 'cleaning', slug: 'cleaning', title: 'Interactive Data Cleaning Lab', description: 'Execute deduplication, categorical standardization, median imputation, and Tukey fence outlier filtering.', duration: '25 min', difficulty: 'Intermediate' },
      { id: 'visualization', slug: 'visualization', title: 'Data Visualization Encoding Lab', description: 'Test perceptual mappings across Line, Bar, Scatter, and Histogram charts to discover hidden multivariate relationships.', duration: '20 min', difficulty: 'Beginner' },
      { id: 'correlation', slug: 'correlation', title: 'Bivariate Correlation Lab', description: 'Evaluate Pearson r, R², ordinary least squares linear regression fits, and learn non-causal statistical interpretations.', duration: '15 min', difficulty: 'Intermediate' },
    ];

    return (
      <UnitWorkspaceTabs
        unit={unit}
        unitId="unit-1"
        unitNumber={1}
        lessons={UNIT_1_LESSONS}
        labs={labs}
        quiz={UNIT_1_QUIZ}
        flashcards={UNIT_1_FLASHCARDS}
        formulas={UNIT_1_FORMULAS}
        comparisons={UNIT_1_COMPARISONS}
        miniProject={UNIT_1_MINI_PROJECT}
        realLifeExamples={UNIT_1_EXAMPLES}
        simulationComponent={<Unit1DistributionSim />}
        visualizationComponent={<Unit1Visualizations />}
        initialTab="visualizations"
      />
    );
  }

  // UNIT 2
  if (isUnit2) {
    const unit = UNITS_DATA.find((u) => u.id === 'unit-2') || UNITS_DATA[1];
    const labs = [
      { id: 'vectors', slug: 'vectors', title: '2D/3D Vector Operations Lab', description: 'Perform vector addition, scalar multiplication, compute Euclidean L2 norms, and test triangle inequalities.', duration: '25 min', difficulty: 'Beginner' },
      { id: 'dot-product', slug: 'dot-product', title: 'Dot Product & Projection Lab', description: 'Compute algebraic dot products, calculate cosine similarity, and project arbitrary vectors onto reference bases.', duration: '25 min', difficulty: 'Intermediate' },
      { id: 'span', slug: 'span', title: 'Linear Independence & Span Lab', description: 'Test linear independence, compute matrix ranks, verify determinant non-singularity, and visualize column spans.', duration: '20 min', difficulty: 'Advanced' },
      { id: 'norms', slug: 'norms', title: 'Vector Norms & Metric Distances Lab', description: 'Compare L1 Manhattan, L2 Euclidean, and L∞ Chebyshev metrics across high-dimensional feature embeddings.', duration: '20 min', difficulty: 'Intermediate' },
    ];

    return (
      <UnitWorkspaceTabs
        unit={unit}
        unitId="unit-2"
        unitNumber={2}
        lessons={UNIT_2_LESSONS}
        labs={labs}
        quiz={UNIT_2_QUIZ}
        flashcards={UNIT_2_FLASHCARDS}
        formulas={UNIT_2_FORMULAS}
        comparisons={UNIT_2_COMPARISONS}
        miniProject={UNIT_2_MINI_PROJECT}
        realLifeExamples={UNIT_2_EXAMPLES}
        simulationComponent={<Unit2VectorSpaceSim />}
        visualizationComponent={<Unit2Visualizations />}
        initialTab="visualizations"
      />
    );
  }

  // UNIT 3
  if (isUnit3) {
    const unit = UNITS_DATA.find((u) => u.id === 'unit-3') || UNITS_DATA[2];
    const labs = [
      { id: 'transformations', slug: 'transformations', title: 'Linear Transformation Grid Lab', description: 'Apply 2x2 rotation, shear, scaling, and reflection transformations to visualize Cartesian coordinate warping.', duration: '25 min', difficulty: 'Intermediate' },
      { id: 'matrix-mult', slug: 'matrix-mult', title: 'Matrix Multiplication & Composition Lab', description: 'Compose sequential spatial transformations and verify non-commutative geometric operations step-by-step.', duration: '20 min', difficulty: 'Intermediate' },
      { id: 'determinant', slug: 'determinant', title: 'Determinant & Area Scaling Lab', description: 'Evaluate matrix invertibility, compute signed polygon area changes, and detect singular matrix collapse.', duration: '20 min', difficulty: 'Intermediate' },
      { id: 'eigen', slug: 'eigen', title: 'Eigenvalues & Eigenvectors Lab', description: 'Calculate characteristic polynomials, solve for invariant directional axes, and execute diagonal decomposition.', duration: '30 min', difficulty: 'Advanced' },
    ];

    return (
      <UnitWorkspaceTabs
        unit={unit}
        unitId="unit-3"
        unitNumber={3}
        lessons={UNIT_3_LESSONS}
        labs={labs}
        quiz={UNIT_3_QUIZ}
        flashcards={UNIT_3_FLASHCARDS}
        formulas={UNIT_3_FORMULAS}
        comparisons={UNIT_3_COMPARISONS}
        miniProject={UNIT_3_MINI_PROJECT}
        realLifeExamples={UNIT_3_EXAMPLES}
        simulationComponent={<Unit3MatrixTransformSim />}
        visualizationComponent={<Unit3Visualizations />}
        initialTab="visualizations"
      />
    );
  }

  // UNIT 4
  if (isUnit4) {
    const unit = UNITS_DATA.find((u) => u.id === 'unit-4') || UNITS_DATA[3];
    const labs = [
      { id: 'distributions', slug: 'distributions', title: 'Probability Distributions Lab', description: 'Interact with Normal, Binomial, Poisson, and Uniform probability density/mass functions in real-time.', duration: '25 min', difficulty: 'Intermediate' },
      { id: 'clt', slug: 'clt', title: 'Central Limit Theorem Simulator Lab', description: 'Draw random samples from arbitrary non-normal populations and prove convergence of sample mean distributions.', duration: '20 min', difficulty: 'Intermediate' },
      { id: 'bayes', slug: 'bayes', title: 'Bayesian Inference & Updating Lab', description: 'Update prior probability beliefs with empirical likelihood evidence to calculate posterior distributions.', duration: '25 min', difficulty: 'Intermediate' },
      { id: 'hypothesis', slug: 'hypothesis', title: 'Hypothesis Testing & P-Value Lab', description: 'Compute z-scores, student t-statistics, critical rejection regions, and p-values for two-tailed experiments.', duration: '30 min', difficulty: 'Advanced' },
    ];

    return (
      <UnitWorkspaceTabs
        unit={unit}
        unitId="unit-4"
        unitNumber={4}
        lessons={UNIT_4_LESSONS}
        labs={labs}
        quiz={UNIT_4_QUIZ}
        flashcards={UNIT_4_FLASHCARDS}
        formulas={UNIT_4_FORMULAS}
        comparisons={UNIT_4_COMPARISONS}
        miniProject={UNIT_4_MINI_PROJECT}
        realLifeExamples={UNIT_4_EXAMPLES}
        simulationComponent={<Unit4ProbabilityCLTSim />}
        visualizationComponent={<Unit4Visualizations />}
        initialTab="visualizations"
      />
    );
  }

  // UNIT 5
  if (isUnit5) {
    const unit = UNITS_DATA.find((u) => u.id === 'unit-5') || UNITS_DATA[4];
    const labs = [
      { id: 'ols', slug: 'ols', title: 'Ordinary Least Squares Regression Lab', description: 'Fit linear regression models, minimize sum of squared residuals, and compute R² goodness-of-fit.', duration: '25 min', difficulty: 'Intermediate' },
      { id: 'gradient-descent', slug: 'gradient-descent', title: 'Gradient Descent Optimization Lab', description: 'Tune learning rates, monitor batch parameter convergence, and navigate 3D convex loss surfaces.', duration: '30 min', difficulty: 'Advanced' },
      { id: 'residuals', slug: 'residuals', title: 'Residual Diagnostic Analysis Lab', description: 'Inspect residual vs fitted plots, verify homoscedasticity, and test for normal error distributions.', duration: '20 min', difficulty: 'Intermediate' },
      { id: 'regularization', slug: 'regularization', title: 'Ridge & Lasso Regularization Lab', description: 'Apply L1 (Lasso) and L2 (Ridge) shrinkage penalties to resolve multicollinearity and induce feature sparsity.', duration: '25 min', difficulty: 'Advanced' },
    ];

    return (
      <UnitWorkspaceTabs
        unit={unit}
        unitId="unit-5"
        unitNumber={5}
        lessons={UNIT_5_LESSONS}
        labs={labs}
        quiz={UNIT_5_QUIZ}
        flashcards={UNIT_5_FLASHCARDS}
        formulas={UNIT_5_FORMULAS}
        comparisons={UNIT_5_COMPARISONS}
        miniProject={UNIT_5_MINI_PROJECT}
        realLifeExamples={UNIT_5_EXAMPLES}
        simulationComponent={<Unit5GradientDescentSim />}
        visualizationComponent={<Unit5Visualizations />}
        initialTab="visualizations"
      />
    );
  }

  // UNIT 6
  if (isUnit6) {
    const unit = UNITS_DATA.find((u) => u.id === 'unit-6') || UNITS_DATA[5];
    const labs = [
      { id: 'logistic', slug: 'logistic', title: 'Binary Logistic Regression Lab', description: 'Model Bernoulli log-odds using sigmoid activations and optimize binary cross-entropy loss functions.', duration: '25 min', difficulty: 'Intermediate' },
      { id: 'knn', slug: 'knn', title: 'K-Nearest Neighbors Decision Boundary Lab', description: 'Tune neighborhood hyperparameter k, apply distance weightings, and map non-linear decision boundaries.', duration: '25 min', difficulty: 'Beginner' },
      { id: 'evaluation', slug: 'evaluation', title: 'Confusion Matrix & ROC-AUC Lab', description: 'Calculate precision, recall, F1 scores, tune decision thresholds, and compute ROC-AUC curves.', duration: '25 min', difficulty: 'Intermediate' },
      { id: 'trees', slug: 'trees', title: 'Decision Trees & Information Gain Lab', description: 'Compute Shannon entropy, Gini impurity reductions, and optimize greedy recursive binary splits.', duration: '30 min', difficulty: 'Advanced' },
    ];

    return (
      <UnitWorkspaceTabs
        unit={unit}
        unitId="unit-6"
        unitNumber={6}
        lessons={UNIT_6_LESSONS}
        labs={labs}
        quiz={UNIT_6_QUIZ}
        flashcards={UNIT_6_FLASHCARDS}
        formulas={UNIT_6_FORMULAS}
        comparisons={UNIT_6_COMPARISONS}
        miniProject={UNIT_6_MINI_PROJECT}
        realLifeExamples={UNIT_6_EXAMPLES}
        simulationComponent={<Unit6ClassificationBoundarySim />}
        visualizationComponent={<Unit6Visualizations />}
        initialTab="visualizations"
      />
    );
  }

  notFound();
}
