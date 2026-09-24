import { MiniProjectData } from '@/types/experiences';

export const UNIT_2_MINI_PROJECT: MiniProjectData = {
  id: 'u2-project-recommendation-similarity',
  title: 'Streaming Content Vector Embedding & Cosine Recommender',
  unitId: 'unit-2',
  unitNumber: 2,
  industryContext: 'Media Streaming & Recommendation Engines (Netflix / Spotify)',
  scenario:
    'You are an AI Recommendation Engineer at CineWave. You need to build a content-based recommendation filter using multi-genre feature vectors to recommend movie matches based on a user profile vector.',
  problemStatement:
    'Represent movies and user preference profiles as 4-dimensional genre vectors (Action, Comedy, Sci-Fi, Drama). Compute L2 vector magnitudes, calculate pairwise dot products, and evaluate Cosine Similarity to find the top 2 recommended titles for a Sci-Fi/Drama enthusiast.',
  dataset: {
    name: 'cinewave_genre_vectors.csv',
    description: '4-dimensional normalized genre score profiles (0.0 to 1.0)',
    columns: ['title', 'action', 'comedy', 'scifi', 'drama', 'runtime_mins'],
    sampleRows: [
      { title: 'User Target Profile', action: 0.2, comedy: 0.1, scifi: 0.9, drama: 0.8, runtime_mins: 0 },
      { title: 'Interstellar Drift', action: 0.3, comedy: 0.1, scifi: 0.9, drama: 0.7, runtime_mins: 165 },
      { title: 'Laugh Out Loud', action: 0.1, comedy: 0.9, scifi: 0.1, drama: 0.2, runtime_mins: 95 },
      { title: 'Cyberpunk 2099', action: 0.8, comedy: 0.1, scifi: 0.8, drama: 0.3, runtime_mins: 130 },
      { title: 'Quiet Tears', action: 0.0, comedy: 0.2, scifi: 0.1, drama: 0.95, runtime_mins: 110 },
      { title: 'Galactic Odyssey', action: 0.4, comedy: 0.2, scifi: 0.95, drama: 0.85, runtime_mins: 150 },
    ],
  },
  objectives: [
    'Calculate the Euclidean norm ||u|| of the User Profile vector u = [0.2, 0.1, 0.9, 0.8]',
    'Compute dot products between the user vector and all candidate movie vectors',
    'Calculate Cosine Similarities cos(θ) to rank all movies in descending order',
    'Explain why Cosine Similarity is preferable over raw Euclidean distance for genre embeddings',
  ],
  tasks: [
    {
      id: 'task-1',
      stepNumber: 1,
      title: 'User Vector Magnitude Calculation',
      instruction: 'Calculate the Euclidean norm ||u||₂ = √(0.2² + 0.1² + 0.9² + 0.8²).',
      codeSnippet: `import numpy as np\nu = np.array([0.2, 0.1, 0.9, 0.8])\nnorm_u = np.linalg.norm(u)\nprint(f"User Vector Norm: {norm_u:.4f}")`,
      expectedResult: '||u||₂ = √(0.04 + 0.01 + 0.81 + 0.64) = √1.50 = 1.2247',
      explanation: 'The user profile vector length is 1.2247 in 4-dimensional genre space.',
    },
    {
      id: 'task-2',
      stepNumber: 2,
      title: 'Pairwise Cosine Similarity Computation',
      instruction: 'Compute cosine similarity between User vector and candidate titles: cos(θ) = (u · v) / (||u|| ||v||).',
      codeSnippet: `movies = {\n  'Interstellar Drift': np.array([0.3, 0.1, 0.9, 0.7]),\n  'Laugh Out Loud': np.array([0.1, 0.9, 0.1, 0.2]),\n  'Cyberpunk 2099': np.array([0.8, 0.1, 0.8, 0.3]),\n  'Quiet Tears': np.array([0.0, 0.2, 0.1, 0.95]),\n  'Galactic Odyssey': np.array([0.4, 0.2, 0.95, 0.85]),\n}\nfor name, v in movies.items():\n  cos_sim = np.dot(u, v) / (np.linalg.norm(u) * np.linalg.norm(v))\n  print(f"{name}: {cos_sim:.4f}")`,
      expectedResult: 'Interstellar Drift: 0.9901, Galactic Odyssey: 0.9854, Cyberpunk 2099: 0.7745, Quiet Tears: 0.6672, Laugh Out Loud: 0.2810',
      explanation: 'Interstellar Drift (0.9901) and Galactic Odyssey (0.9854) achieve near-perfect directional alignment with the user genre preference vector.',
    },
    {
      id: 'task-3',
      stepNumber: 3,
      title: 'Orthogonal Decomposition & Projection',
      instruction: 'Compute the orthogonal projection of Cyberpunk 2099 onto the User vector.',
      codeSnippet: `v = np.array([0.8, 0.1, 0.8, 0.3])\nproj_u_v = (np.dot(v, u) / np.dot(u, u)) * u\nprint("Projection vector:", np.round(proj_u_v, 3))`,
      expectedResult: 'Projection = [0.151, 0.075, 0.678, 0.603]',
      explanation: 'The projection extracts the component of Cyberpunk 2099 that aligns strictly with the user taste vector.',
    },
  ],
  finalInterpretation:
    'By leveraging vector cosine similarity, CineWave accurately surfaces "Interstellar Drift" (0.9901) and "Galactic Odyssey" (0.9854) as the top 2 recommendations. Because cosine similarity evaluates angle rather than raw vector magnitude, users who rate films conservatively (e.g. 3/5) are matched just as accurately as enthusiastic users (5/5).',
  challengeQuestion: {
    question: 'If a user rates every movie genre with double their original rating (e.g. vector becomes 2×u), how does Cosine Similarity change?',
    options: [
      'It doubles (multiplied by 2)',
      'It quadruples (multiplied by 4)',
      'It remains completely unchanged (invariant under positive scalar multiplication)',
      'It drops to zero because the vector magnitude increased',
    ],
    correctIndex: 2,
    explanation:
      'Cosine similarity is scale-invariant. Scaling a vector by scalar k > 0 multiplies both numerator and denominator by k, leaving the ratio cos(θ) perfectly identical.',
  },
};
