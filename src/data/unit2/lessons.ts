import { UnitId } from '@/types';
import { FullLessonData } from '@/data/unit1/lessons';

export const UNIT_2_LESSONS: FullLessonData[] = [
  {
    id: 'u2-l1',
    slug: 'vectors',
    order: 1,
    unitId: 'unit-2' as UnitId,
    unitNumber: 2,
    title: 'Vectors & Their Representation',
    shortDescription: 'Discover how vectors serve as the universal geometric and numerical container for data points, feature spaces, and machine learning embeddings.',
    estimatedDuration: 15,
    contentType: 'concept',
    learningObjectives: [
      'Define vectors from physics, computer science, and data science perspectives.',
      'Understand column vs. row vector orientations and coordinate representations.',
      'Represent multi-dimensional tabular records as vectors in Rn feature space.',
      'Connect vector indexing to NumPy array structures.',
    ],
    mainExplanation: 'In data science, a vector is far more than an arrow with magnitude and direction: it is an ordered list of real numbers representing a single entity in high-dimensional feature space. Whether capturing customer behavior (age, annual income, credit score), tabular sensor measurements, or a 1536-dimensional OpenAI text embedding, vectors are the fundamental building block of all modern statistical computing and machine learning algorithms.',
    conceptSections: [
      {
        id: 'c1-perspectives',
        title: 'Three Perspectives on Vectors',
        content: [
          'Vectors can be conceptualized across three complementary domains:',
          '1. Physics Perspective: Directed arrows situated in space characterized strictly by length (magnitude) and direction, invariant to origin shifts.',
          '2. Computer Science Perspective: Ordered flat numerical arrays or indexed lists of numbers (e.g. float arrays in memory).',
          '3. Data Science & Machine Learning Perspective: Coordinates identifying points or states within an n-dimensional feature space, where every dimension represents an empirical attribute or variable.',
        ],
        callout: {
          type: 'info',
          title: 'The Data Science View',
          text: 'When we represent a housing record as v = [3, 1850, 450000] (bedrooms, sqft, price), each axis corresponds to a distinct observable variable, mapping the physical house to a single coordinate in 3D feature space.',
        },
      },
      {
        id: 'c2-notation',
        title: 'Mathematical Notation & Orientation',
        content: [
          'In standard linear algebra, vectors are represented by convention as column vectors unless explicitly transposed into row vectors.',
          'An n-dimensional column vector v in Rn is expressed as a single column of n scalar entries: v = [v1, v2, ..., vn]^T.',
          'Row vectors are typically generated via the matrix transpose operator: v^T = [v1, v2, ..., vn].',
        ],
        codeSnippet: {
          language: 'python',
          code: `import numpy as np

# 1D array (mathematical vector)
v = np.array([3.0, 1850.0, 450000.0])

# Column vector representation (shape: 3 x 1)
v_col = v.reshape(-1, 1)

# Transposed row vector (shape: 1 x 3)
v_row = v_col.T

print(f"Dimension: {v.ndim}, Length: {len(v)}, Shape: {v_col.shape}")`,
          caption: 'Vector definition and transposition in Python NumPy',
        },
      },
    ],
    keyTakeaways: [
      'A vector in data science is an ordered tuple of features that places an observation into n-dimensional space.',
      'By default, algebraic conventions treat vectors as column vectors of size n x 1.',
      'High-dimensional embeddings (e.g., text, images) are simply vectors with hundreds or thousands of coordinate dimensions.',
    ],
    practiceQuestions: [
      {
        id: 'pq-2-1-1',
        question: 'In machine learning feature engineering, what does a single vector v in R^5 typically represent?',
        options: [
          'Five separate complete datasets',
          'A single observation characterized by 5 numeric features',
          'A 5x5 square matrix of coefficients',
          'A random scalar seed value',
        ],
        correctIndex: 1,
        explanation: 'Each vector v in R^5 represents a single data point or sample containing 5 distinct quantitative coordinates/features.',
      },
      {
        id: 'pq-2-1-2',
        question: 'If vector v is a 4x1 column vector, what is the shape of its transpose v^T?',
        options: ['4 x 4', '1 x 4 (row vector)', '4 x 1', '1 x 1 (scalar)'],
        correctIndex: 1,
        explanation: 'Transposing an n x 1 column vector inverts rows and columns, creating a 1 x n row vector.',
      },
    ],
    nextLessonSlug: 'vector-operations',
  },
  {
    id: 'u2-l2',
    slug: 'vector-operations',
    order: 2,
    unitId: 'unit-2' as UnitId,
    unitNumber: 2,
    title: 'Vector Addition, Subtraction & Scalar Multiplication',
    shortDescription: 'Master element-wise vector arithmetic, tip-to-tail geometric addition, vector displacement, and scalar scaling transformations.',
    estimatedDuration: 18,
    contentType: 'concept',
    learningObjectives: [
      'Perform element-wise vector addition and subtraction.',
      'Understand the parallelogram rule and tip-to-tail geometric addition.',
      'Scale vectors algebraically and visualize direction reversal for negative scalars.',
      'Identify how vector arithmetic underpins gradient descent updates in ML.',
    ],
    mainExplanation: 'Vector addition and scalar multiplication are the two fundamental operations that define linear vector spaces. In machine learning, vector addition allows combining signals or updating parameters, while scalar multiplication scales magnitudes (such as multiplying a gradient vector by a learning rate α in gradient descent).',
    conceptSections: [
      {
        id: 'c1-addition',
        title: 'Element-wise Addition & Geometric Triangle Rule',
        content: [
          'Given two vectors u, v in Rn, their sum w = u + v is defined element-wise: w_i = u_i + v_i.',
          'Geometrically, vector addition translates the tail of vector v to the tip of vector u (the tip-to-tail method). The resulting vector connects the origin (0, 0) to the final tip of v.',
          'Vector addition is commutative (u + v = v + u) and associative ((u + v) + w = u + (v + w)).',
        ],
        callout: {
          type: 'tip',
          title: 'Parallelogram Law',
          text: 'The diagonal of the parallelogram formed by vectors u and v originating from the origin corresponds exactly to the vector sum u + v.',
        },
      },
      {
        id: 'c2-scalar',
        title: 'Scalar Multiplication & Direction Inversion',
        content: [
          'Multiplying a vector v by a real number scalar c in R scales every component by c: (c * v)_i = c * v_i.',
          'If c > 1, the vector expands in length while maintaining its direction.',
          'If 0 < c < 1, the vector shrinks (contracts) in length.',
          'If c < 0, the vector points in the exact opposite direction (180° inversion).',
        ],
        codeSnippet: {
          language: 'python',
          code: `import numpy as np

u = np.array([2, 4])
v = np.array([5, 1])

# Vector addition & subtraction
sum_vec = u + v        # [7, 5]
diff_vec = u - v       # [-3, 3]

# Gradient descent parameter update step: w_new = w_old - lr * grad
learning_rate = 0.01
gradient = np.array([12.4, -4.2])
weights = np.array([0.5, 0.8])
updated_weights = weights - learning_rate * gradient

print("Updated Weights:", updated_weights)`,
          caption: 'Vector arithmetic driving gradient descent parameter updates',
        },
      },
    ],
    keyTakeaways: [
      'Vector addition and subtraction are strictly element-wise operations requiring equal dimensionality.',
      'Scalar multiplication scales length by |c| and inverts direction when c is negative.',
      'The gradient descent update equation w ← w - η∇L is a fundamental application of vector subtraction and scalar scaling.',
    ],
    practiceQuestions: [
      {
        id: 'pq-2-2-1',
        question: 'Given vectors u = [3, -2] and v = [-1, 5], what is the resulting vector 2u + v?',
        options: ['[5, 1]', '[4, 3]', '[5, 3]', '[7, 8]'],
        correctIndex: 0,
        explanation: '2u = [6, -4]. Adding v = [-1, 5] yields [6 + (-1), -4 + 5] = [5, 1].',
      },
    ],
    prevLessonSlug: 'vectors',
    nextLessonSlug: 'vector-spaces',
  },
  {
    id: 'u2-l3',
    slug: 'vector-spaces',
    order: 3,
    unitId: 'unit-2' as UnitId,
    unitNumber: 2,
    title: 'Vector Spaces & Data Representation',
    shortDescription: 'Understand the formal axioms of vector spaces, closure properties, subspaces, and how datasets inhabit high-dimensional vector spaces.',
    estimatedDuration: 18,
    contentType: 'concept',
    learningObjectives: [
      'Understand the formal definition and closure properties of a Vector Space V over field R.',
      'Identify valid vector subspaces (lines and planes passing through the origin).',
      'Examine how machine learning features construct an ambient vector space Rn.',
    ],
    mainExplanation: 'A vector space (or linear space) is a formal mathematical collection of objects (vectors) that can be added together and scaled by numbers without leaving the set (closure). In data science, every tabular dataset with d numerical features forms a collection of points residing inside the vector space Rd.',
    conceptSections: [
      {
        id: 'c1-axioms',
        title: 'Axioms of a Vector Space',
        content: [
          'A vector space V over the real numbers R satisfies 8 fundamental properties under addition and scalar multiplication:',
          '1. Associativity of addition: u + (v + w) = (u + v) + w',
          '2. Commutativity of addition: u + v = v + u',
          '3. Identity element of addition: There exists a zero vector 0 such that v + 0 = v',
          '4. Inverse elements of addition: For every v, there exists -v such that v + (-v) = 0',
          '5. Distributivity of scalar multiplication over vector addition: c(u + v) = cu + cv',
          '6. Distributivity of scalar multiplication over field addition: (a + b)v = av + bv',
          '7. Compatibility of scalar multiplication: a(bv) = (ab)v',
          '8. Identity element of scalar multiplication: 1 * v = v',
        ],
        callout: {
          type: 'warning',
          title: 'The Zero Vector Requirement',
          text: 'Every valid linear vector space and subspace MUST contain the zero vector 0 = [0, 0, ..., 0]^T. If a subset does not contain the origin, it cannot be a vector subspace.',
        },
      },
      {
        id: 'c2-subspaces',
        title: 'Subspaces in Machine Learning',
        content: [
          'A subspace S of vector space V is a subset that is itself a vector space under the same operations.',
          'In dimensionality reduction techniques like Principal Component Analysis (PCA), we project high-dimensional data from Rd onto a lower-dimensional linear subspace Rk (where k << d) that captures the maximum variance of the data.',
        ],
      },
    ],
    keyTakeaways: [
      'Vector spaces are defined by closure under addition and scalar multiplication.',
      'A valid subspace must pass through the origin and contain the zero vector.',
      'Dimensionality reduction algorithms (e.g., PCA) find optimal low-dimensional subspaces that approximate high-dimensional data.',
    ],
    practiceQuestions: [
      {
        id: 'pq-2-3-1',
        question: 'Which of the following sets of points in R^2 forms a valid linear subspace?',
        options: [
          'The line y = 2x + 5',
          'The line y = 3x (passing through the origin (0,0))',
          'The circle x^2 + y^2 = 1',
          'The upper half-plane where y >= 0',
        ],
        correctIndex: 1,
        explanation: 'Only lines and planes passing through the origin (0, 0) satisfy both closure under addition/scalar multiplication and contain the zero vector.',
      },
    ],
    prevLessonSlug: 'vector-operations',
    nextLessonSlug: 'dot-product',
  },
  {
    id: 'u2-l4',
    slug: 'dot-product',
    order: 4,
    unitId: 'unit-2' as UnitId,
    unitNumber: 2,
    title: 'The Dot Product',
    shortDescription: 'Master the algebraic and geometric formulations of the inner product, orthogonality conditions, and cosine angle relationships.',
    estimatedDuration: 20,
    contentType: 'concept',
    learningObjectives: [
      'Calculate the algebraic inner product of two vectors.',
      'Understand the geometric formulation: u · v = ||u|| ||v|| cos(θ).',
      'Determine vector orthogonality and perpendicularity from zero dot products.',
      'Calculate Cosine Similarity for NLP and recommendation systems.',
    ],
    mainExplanation: 'The dot product (inner product) is the single most important metric for comparing vectors in machine learning. It maps two equal-dimensional vectors to a single scalar value, simultaneously capturing their lengths and the directional alignment (cosine of the angle) between them.',
    conceptSections: [
      {
        id: 'c1-algebraic-geometric',
        title: 'Algebraic vs Geometric Definitions',
        content: [
          'Algebraic definition: u · v = Σ_{i=1}^n u_i * v_i = u_1 v_1 + u_2 v_2 + ... + u_n v_n.',
          'Geometric definition: u · v = ||u||_2 * ||v||_2 * cos(θ), where θ is the angle between u and v.',
          'Equivalence theorem: Both formulas compute the exact same scalar value in Euclidean space.',
        ],
        callout: {
          type: 'math',
          title: 'Sign of the Dot Product',
          text: '• u · v > 0: Acute angle (θ < 90°), vectors point in generally similar directions.\n• u · v = 0: Orthogonal (θ = 90°), vectors are mutually perpendicular.\n• u · v < 0: Obtuse angle (θ > 90°), vectors point in opposing directions.',
        },
      },
      {
        id: 'c2-cosine-similarity',
        title: 'Cosine Similarity in Machine Learning',
        content: [
          'In Natural Language Processing (NLP) and vector search engines, documents and query sentences are represented as embedding vectors.',
          'Cosine similarity normalizes for document length by isolating pure angular orientation: cos(θ) = (u · v) / (||u|| ||v||).',
          'Cosine similarity ranges strictly between -1.0 (exact opposites) and +1.0 (exact parallel match), with 0.0 indicating complete orthogonality.',
        ],
        codeSnippet: {
          language: 'python',
          code: `import numpy as np

# Word embedding vectors (e.g. for semantic search)
doc_a = np.array([0.8, 0.6, 0.0])
doc_b = np.array([0.6, 0.8, 0.0])
doc_c = np.array([-0.8, -0.6, 0.0])

def cosine_similarity(u, v):
    return np.dot(u, v) / (np.linalg.norm(u) * np.linalg.norm(v))

print("Similarity A & B:", cosine_similarity(doc_a, doc_b)) # ~0.96 (Highly similar)
print("Similarity A & C:", cosine_similarity(doc_a, doc_c)) # -1.00 (Opposites)`,
          caption: 'Computing Cosine Similarity in Python',
        },
      },
    ],
    keyTakeaways: [
      'The dot product algebraically sums element-wise products and geometrically measures directional projection.',
      'Two non-zero vectors are orthogonal if and only if their dot product equals zero.',
      'Cosine similarity isolates direction from magnitude and is widely used in vector databases and semantic search.',
    ],
    practiceQuestions: [
      {
        id: 'pq-2-4-1',
        question: 'If vector u = [2, 3] and vector v = [-3, 2], what is their dot product u · v?',
        options: ['12', '-6', '0 (Orthogonal)', '13'],
        correctIndex: 2,
        explanation: 'u · v = (2 * -3) + (3 * 2) = -6 + 6 = 0. Since the dot product is 0, the vectors are perpendicular (orthogonal).',
      },
      {
        id: 'pq-2-4-2',
        question: 'Why is cosine similarity preferred over Euclidean distance for text document comparison?',
        options: [
          'Cosine similarity ignores word frequencies entirely',
          'Cosine similarity is invariant to text length (magnitude) and measures topical orientation',
          'Cosine similarity only works on 2D vectors',
          'Euclidean distance cannot be computed in Python',
        ],
        correctIndex: 1,
        explanation: 'A short article and a long book on the same topic have similar word proportions (direction) but different word counts (magnitude). Cosine similarity normalizes length away.',
      },
    ],
    prevLessonSlug: 'vector-spaces',
    nextLessonSlug: 'vector-norms',
  },
  {
    id: 'u2-l5',
    slug: 'vector-norms',
    order: 5,
    unitId: 'unit-2' as UnitId,
    unitNumber: 2,
    title: 'Vector Norms & Distance Metrics',
    shortDescription: 'Explore L1 Manhattan norm, L2 Euclidean norm, Lp generalizations, and their role in regularization (Lasso vs Ridge).',
    estimatedDuration: 20,
    contentType: 'concept',
    learningObjectives: [
      'Calculate L1 (Manhattan) and L2 (Euclidean) vector norms.',
      'Compute Euclidean and Manhattan distances between data points.',
      'Connect vector norms to L1 (Lasso) and L2 (Ridge) regression regularization penalties.',
      'Understand unit balls and geometric shapes induced by different norms.',
    ],
    mainExplanation: 'A norm is a mathematical function that assigns a strictly positive length or magnitude to every non-zero vector. In machine learning, norms serve two indispensable functions: measuring distance/error between predicted and true targets, and penalizing model complexity via regularization.',
    conceptSections: [
      {
        id: 'c1-l1-l2',
        title: 'L1 vs L2 Norm Formulations',
        content: [
          '1. L2 Norm (Euclidean Norm): ||v||_2 = √(Σ v_i^2). Represents the straight-line ruler distance from the origin to the vector tip.',
          '2. L1 Norm (Manhattan / Taxicab Norm): ||v||_1 = Σ |v_i|. Represents the total grid distance traversed along coordinate axes.',
          '3. L-infinity Norm (Max Norm): ||v||_inf = max(|v_i|). Measures the maximum absolute coordinate.',
        ],
        callout: {
          type: 'tip',
          title: 'Unit Ball Geometries',
          text: 'The set of vectors with norm ||v|| <= 1 creates different shapes in R^2:\n• L2 unit ball: A smooth circle\n• L1 unit ball: A diamond (with sharp coordinate axes vertices that induce sparsity in Lasso regression)\n• L-infinity unit ball: A square',
        },
      },
      {
        id: 'c2-distances',
        title: 'Distance Metrics in Machine Learning',
        content: [
          'The distance between two vectors u and v is the norm of their difference vector:',
          '• Euclidean Distance: d_2(u, v) = ||u - v||_2 = √(Σ (u_i - v_i)^2)',
          '• Manhattan Distance: d_1(u, v) = ||u - v||_1 = Σ |u_i - v_i|',
          'Algorithms like k-Nearest Neighbors (k-NN) and k-Means clustering rely directly on these distance computations to classify data points.',
        ],
      },
    ],
    keyTakeaways: [
      'The L2 norm measures straight-line Euclidean length; the L1 norm sums absolute coordinate displacements.',
      'L1 regularization drives coefficients to exact zeros (feature selection); L2 regularization shrinks weights smoothly.',
      'Distance between two points is simply the norm of their displacement vector ||u - v||.',
    ],
    practiceQuestions: [
      {
        id: 'pq-2-5-1',
        question: 'Given vector v = [3, -4], what are its L1 and L2 norms?',
        options: [
          '||v||_1 = 7, ||v||_2 = 5',
          '||v||_1 = 5, ||v||_2 = 7',
          '||v||_1 = -1, ||v||_2 = 25',
          '||v||_1 = 7, ||v||_2 = 25',
        ],
        correctIndex: 0,
        explanation: 'L1 norm is |3| + |-4| = 3 + 4 = 7. L2 norm is √(3^2 + (-4)^2) = √(9 + 16) = √25 = 5.',
      },
    ],
    prevLessonSlug: 'dot-product',
    nextLessonSlug: 'linear-combinations',
  },
  {
    id: 'u2-l6',
    slug: 'linear-combinations',
    order: 6,
    unitId: 'unit-2' as UnitId,
    unitNumber: 2,
    title: 'Linear Combinations',
    shortDescription: 'Understand how scaling and adding a collection of vectors produces new vectors, and explore linear dependence vs independence.',
    estimatedDuration: 18,
    contentType: 'concept',
    learningObjectives: [
      'Construct linear combinations: v = c1*v1 + c2*v2 + ... + ck*vk.',
      'Understand linear independence: no vector in the set can be formed by combining the others.',
      'Detect multicollinearity in regression feature matrices.',
    ],
    mainExplanation: 'A linear combination is formed by multiplying a set of vectors by scalar weights and summing the results. Linear combinations are the foundational mechanism behind linear regression predictions (y = Xw), neural network layer activations (a = Wx + b), and feature synthesis.',
    conceptSections: [
      {
        id: 'c1-def',
        title: 'Definition of Linear Combination',
        content: [
          'Given vectors v1, v2, ..., vk in Rn and scalars c1, c2, ..., ck in R, the vector v = c1*v1 + c2*v2 + ... + ck*vk is a linear combination of the set.',
          'In matrix-vector notation, this is compactly written as the product of matrix V = [v1 v2 ... vk] and coefficient vector c: v = V * c.',
        ],
      },
      {
        id: 'c2-independence',
        title: 'Linear Independence & Multicollinearity',
        content: [
          'A set of vectors {v1, ..., vk} is linearly independent if the only solution to c1*v1 + ... + ck*vk = 0 is c1 = c2 = ... = ck = 0.',
          'If any vector can be written as a combination of the others, the set is linearly dependent (redundant).',
          'In data science, linearly dependent feature columns cause multicollinearity, making matrix inversion impossible (singular matrices in Ordinary Least Squares regression).',
        ],
        callout: {
          type: 'warning',
          title: 'Multicollinearity in Practice',
          text: 'If your dataset contains "Weight_kg" and "Weight_lbs" = 2.20462 * "Weight_kg", one column is a pure scalar multiple of the other, introducing perfect linear dependence.',
        },
      },
    ],
    keyTakeaways: [
      'A linear combination is the weighted sum of a set of vectors.',
      'Linear independence guarantees that every vector adds a genuinely new dimension of information.',
      'Linear dependence among features causes computational instability in regression modeling.',
    ],
    practiceQuestions: [
      {
        id: 'pq-2-6-1',
        question: 'Are vectors v1 = [1, 2] and v2 = [3, 6] linearly independent?',
        options: [
          'Yes, because they contain different numbers',
          'No, because v2 = 3 * v1 (they are scalar multiples along the same line)',
          'Yes, because their dot product is positive',
          'No, because they are orthogonal',
        ],
        correctIndex: 1,
        explanation: 'v2 is exactly 3 times v1. Since one vector is a direct scalar multiple of the other, they are linearly dependent and lie on the same 1D line.',
      },
    ],
    prevLessonSlug: 'vector-norms',
    nextLessonSlug: 'basis-and-dimension',
  },
  {
    id: 'u2-l7',
    slug: 'basis-and-dimension',
    order: 7,
    unitId: 'unit-2' as UnitId,
    unitNumber: 2,
    title: 'Basis, Span & Dimension',
    shortDescription: 'Master the concept of span, standard coordinate bases, orthonormal bases, and the intrinsic dimensionality of data manifolds.',
    estimatedDuration: 20,
    contentType: 'concept',
    learningObjectives: [
      'Define the Span of a set of vectors as all reachable linear combinations.',
      'Define a Basis as a minimal linearly independent spanning set.',
      'Understand the concept of Dimension as the number of vectors in a basis.',
      'Explore standard Euclidean basis e_i and orthonormal bases.',
    ],
    mainExplanation: 'The span of a set of vectors represents the entire subspace that can be reached by taking all possible linear combinations. A basis is the minimal, most efficient set of linearly independent vectors that spans that entire subspace, providing a unique coordinate address for every single point.',
    conceptSections: [
      {
        id: 'c1-span',
        title: 'Span of a Vector Set',
        content: [
          'The span of {v1, ..., vk} is the set of all linear combinations: Span(v1, ..., vk) = {Σ c_i * v_i | c_i in R}.',
          'Geometrically:',
          '• Two non-parallel vectors in R^3 span a 2D flat plane passing through the origin.',
          '• Three linearly independent vectors in R^3 span the entire 3D space R^3.',
        ],
      },
      {
        id: 'c2-basis-dimension',
        title: 'Basis & Dimension',
        content: [
          'A basis B for a vector space V is a set of vectors that is:',
          '1. Linearly independent',
          '2. Spans V',
          'The dimension of V, denoted dim(V), is the exact number of vectors in any basis for V.',
          'The standard basis for R^2 is e1 = [1, 0]^T and e2 = [0, 1]^T.',
          'An Orthonormal Basis consists of basis vectors that are all unit length (||v_i|| = 1) and mutually orthogonal (v_i · v_j = 0 for i != j).',
        ],
        callout: {
          type: 'info',
          title: 'Orthonormal Bases in PCA',
          text: 'Principal Component Analysis constructs an orthonormal basis ordered by explained variance, rotating coordinate axes to align with the primary directions of dataset spread.',
        },
      },
    ],
    keyTakeaways: [
      'Span is the subspace generated by all possible linear combinations of a vector set.',
      'A basis is a minimal spanning set whose size defines the dimension of the subspace.',
      'Orthonormal bases provide optimal coordinate systems where dot products and projections are computationally trivial.',
    ],
    practiceQuestions: [
      {
        id: 'pq-2-7-1',
        question: 'How many vectors are required to form a basis for R^3?',
        options: [
          'Any 2 vectors',
          'Exactly 3 linearly independent vectors',
          'At least 4 vectors',
          'An infinite number of vectors',
        ],
        correctIndex: 1,
        explanation: 'Since the dimension of R^3 is 3, any basis for R^3 must consist of exactly 3 linearly independent vectors.',
      },
    ],
    prevLessonSlug: 'linear-combinations',
    nextLessonSlug: 'projections',
  },
  {
    id: 'u2-l8',
    slug: 'projections',
    order: 8,
    unitId: 'unit-2' as UnitId,
    unitNumber: 2,
    title: 'Vector Projections',
    shortDescription: 'Derive scalar and vector orthogonal projections, compute residual error vectors, and understand how projection solves linear regression.',
    estimatedDuration: 22,
    contentType: 'concept',
    learningObjectives: [
      'Derive the orthogonal projection of vector u onto vector v: proj_v(u) = ((u · v)/(v · v)) * v.',
      'Calculate the orthogonal residual / error vector e = u - proj_v(u).',
      'Understand how Ordinary Least Squares (OLS) regression is an orthogonal projection onto the column space of X.',
    ],
    mainExplanation: 'Orthogonal projection drops a perpendicular shadow from one vector onto another vector (or subspace). In machine learning, projection is the mathematical engine of approximation: when an exact solution does not exist (e.g. overdetermined linear systems), the best possible approximation is the orthogonal projection onto the feature subspace.',
    conceptSections: [
      {
        id: 'c1-derivation',
        title: 'Mathematical Derivation of Vector Projection',
        content: [
          'We seek a vector p = c * v lying along the line of v such that the error residual e = u - p is orthogonal to v.',
          'Setting the orthogonality condition (u - c*v) · v = 0:',
          'u · v - c * (v · v) = 0  ==>  c = (u · v) / (v · v).',
          'Therefore, the orthogonal projection vector is: proj_v(u) = ((u · v) / ||v||_2^2) * v.',
        ],
        callout: {
          type: 'math',
          title: 'Scalar Projection vs Vector Projection',
          text: '• Scalar projection (component): comp_v(u) = (u · v) / ||v||_2 (signed length of shadow)\n• Vector projection: proj_v(u) = comp_v(u) * (v / ||v||_2) (vector in direction of v)',
        },
      },
      {
        id: 'c2-regression-connection',
        title: 'The Linear Regression Connection',
        content: [
          'In linear regression y ≈ Xw, the target vector y typically does not lie in the column space of feature matrix X.',
          'The Ordinary Least Squares estimate ŷ = Xw_OLS is the unique orthogonal projection of y onto Col(X).',
          'This guarantees that the residual error vector e = y - ŷ is strictly perpendicular to every feature in X, minimizing the sum of squared errors ||e||_2^2.',
        ],
      },
    ],
    keyTakeaways: [
      'Orthogonal projection finds the closest point on a line or subspace to a target vector.',
      'The residual vector u - proj_v(u) is always strictly perpendicular to the projection line v.',
      'Linear regression Ordinary Least Squares (OLS) is fundamentally an orthogonal projection in high-dimensional space.',
    ],
    practiceQuestions: [
      {
        id: 'pq-2-8-1',
        question: 'Given u = [4, 2] and v = [2, 0], what is the projection vector proj_v(u)?',
        options: ['[4, 0]', '[2, 0]', '[0, 2]', '[4, 2]'],
        correctIndex: 0,
        explanation: 'u · v = (4*2) + (2*0) = 8. v · v = 2^2 + 0^2 = 4. Scalar factor c = 8 / 4 = 2. proj_v(u) = 2 * [2, 0] = [4, 0].',
      },
    ],
    prevLessonSlug: 'basis-and-dimension',
    nextLessonSlug: 'geometric-interpretation',
  },
  {
    id: 'u2-l9',
    slug: 'geometric-interpretation',
    order: 9,
    unitId: 'unit-2' as UnitId,
    unitNumber: 2,
    title: 'Geometric Interpretation of Vectors',
    shortDescription: 'Develop visual intuition for hyperplanes, normal vectors, decision boundaries, and linear classifiers like Support Vector Machines (SVMs).',
    estimatedDuration: 18,
    contentType: 'concept',
    learningObjectives: [
      'Understand the equation of a hyperplane: w^T x + b = 0.',
      'Interpret the weight vector w as the perpendicular normal vector to the decision boundary.',
      'Calculate the signed distance from any point to a separating hyperplane.',
      'Connect vector geometry to linear classifiers and SVM margins.',
    ],
    mainExplanation: 'Linear classification models (like Logistic Regression and Linear Support Vector Machines) separate classes of data points using linear boundaries called hyperplanes. The orientation and position of a hyperplane are defined entirely by a normal vector w and a scalar bias b.',
    conceptSections: [
      {
        id: 'c1-hyperplanes',
        title: 'Hyperplanes & Normal Vectors',
        content: [
          'In n-dimensional space Rn, a hyperplane is an (n-1)-dimensional flat affine subspace.',
          'The algebraic equation is: w · x + b = 0, where w is the weight vector and b is the bias offset.',
          'The weight vector w is strictly orthogonal (perpendicular) to the hyperplane surface at all points.',
        ],
      },
      {
        id: 'c2-distance-boundary',
        title: 'Signed Distance to Decision Boundary',
        content: [
          'For any query data vector x, the signed geometric distance to the hyperplane is: d(x) = (w · x + b) / ||w||_2.',
          '• If d(x) > 0, the point lies on the positive side of the decision boundary (Class +1).',
          '• If d(x) < 0, the point lies on the negative side (Class -1).',
          '• If d(x) = 0, the point lies exactly on the decision boundary.',
        ],
        callout: {
          type: 'tip',
          title: 'Support Vector Machines',
          text: 'SVMs find the optimal weight vector w that maximizes the geometric margin 2 / ||w||_2 between the decision boundary and the closest data points (support vectors).',
        },
      },
    ],
    keyTakeaways: [
      'A linear decision boundary is defined by w^T x + b = 0, where w is the normal vector orthogonal to the plane.',
      'The sign of w^T x + b determines the predicted class label; its magnitude determines classification confidence.',
      'Maximizing the margin in SVMs is mathematically equivalent to minimizing the L2 norm ||w||_2.',
    ],
    practiceQuestions: [
      {
        id: 'pq-2-9-1',
        question: 'What is the geometric relationship between the weight vector w and the decision boundary w · x + b = 0?',
        options: [
          'w is parallel to the decision boundary',
          'w is perpendicular (normal) to the decision boundary',
          'w lies on the decision boundary',
          'w is rotated 45 degrees relative to the boundary',
        ],
        correctIndex: 1,
        explanation: 'The weight vector w is always the normal vector, pointing directly perpendicular to the decision hyperplane surface.',
      },
    ],
    prevLessonSlug: 'projections',
    nextLessonSlug: 'linear-algebra-data-science',
  },
  {
    id: 'u2-l10',
    slug: 'linear-algebra-data-science',
    order: 10,
    unitId: 'unit-2' as UnitId,
    unitNumber: 2,
    title: 'Linear Algebra in Data Science',
    shortDescription: 'Synthesize Unit 2 concepts across real-world ML workflows: word embeddings, TF-IDF vectorizers, neural network layers, and recommender systems.',
    estimatedDuration: 20,
    contentType: 'case-study',
    learningObjectives: [
      'Synthesize vectors, dot products, norms, and projections into end-to-end data science pipelines.',
      'Understand how word embeddings (Word2Vec, BERT) encode semantic relationships via vector arithmetic (King - Man + Woman = Queen).',
      'Examine dot-product attention in Transformer neural networks.',
      'Prepare for matrix transformations, determinants, and matrix decompositions in Unit 3.',
    ],
    mainExplanation: 'Every modern advancement in Artificial Intelligence—from large language models to image diffusion systems—is built upon the linear algebraic foundation of vectors. In this capstone synthesis, we explore how vectors power modern semantic search, recommender systems, and neural network attention.',
    conceptSections: [
      {
        id: 'c1-embeddings',
        title: 'Word & Document Embeddings',
        content: [
          'High-dimensional vector spaces capture rich linguistic semantics.',
          'In Word2Vec vector spaces, semantic relationships manifest as linear spatial translations:',
          'vec("King") - vec("Man") + vec("Woman") ≈ vec("Queen").',
          'This famous vector arithmetic demonstrates that linear combinations in embedding space capture real-world analogies and concepts.',
        ],
      },
      {
        id: 'c2-attention',
        title: 'Dot-Product Attention in Transformers',
        content: [
          'The core mechanism of Transformer architectures (like ChatGPT and Gemini) is Scaled Dot-Product Attention:',
          'Attention(Q, K, V) = softmax((Q * K^T) / √d_k) * V.',
          'Here, Query vectors Q and Key vectors K are compared via pairwise dot products to measure relevance weights, which are then used to take linear combinations of Value vectors V.',
        ],
        callout: {
          type: 'info',
          title: 'You are now ready for Unit 3!',
          text: 'Now that you have mastered vectors, dot products, norms, and projections, you are fully equipped to explore Matrices, Matrix Multiplication, Inverses, and Determinants in Unit 3.',
        },
      },
    ],
    keyTakeaways: [
      'Vectors are the universal data representation for machine learning models and neural networks.',
      'Semantic analogies and relationships can be discovered through vector arithmetic in embedding spaces.',
      'Scaled dot-product attention in Transformers is a direct application of inner products and linear combinations.',
    ],
    practiceQuestions: [
      {
        id: 'pq-2-10-1',
        question: 'In Transformer neural networks, how does the attention mechanism determine the relevance between two tokens?',
        options: [
          'By calculating the dot product between their Query and Key vectors',
          'By sorting the words alphabetically',
          'By counting the number of characters in each word',
          'By computing random hash codes',
        ],
        correctIndex: 0,
        explanation: 'Scaled Dot-Product Attention takes the dot product between Query (Q) and Key (K) vectors to quantify semantic alignment and attention weights.',
      },
    ],
    prevLessonSlug: 'geometric-interpretation',
  },
];
