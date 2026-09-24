import { MiniProjectData } from '@/types/experiences';

export const UNIT_3_MINI_PROJECT: MiniProjectData = {
  id: 'u3-project-image-transformation',
  title: 'Computer Vision 2D Affine Image Matrix Transformations',
  unitId: 'unit-3',
  unitNumber: 3,
  industryContext: 'Computer Vision, Image Processing & Game Graphics',
  scenario:
    'You are a Graphics & Vision Engineer building a data augmentation pipeline for a convolutional neural network. You need to apply rotation, horizontal shear, and non-uniform scaling to 2D image coordinates using matrix multiplication.',
  problemStatement:
    'Given 4 vertices of a bounding box coordinate matrix P = [[0, 0], [4, 0], [4, 4], [0, 4]]ᵀ, construct transformation matrices for a 45° rotation R, a horizontal shear S_h with factor k=0.5, and compute the composite transformation matrix M = S_h · R. Calculate det(M) to verify the area scaling factor.',
  dataset: {
    name: 'bounding_box_coordinates.csv',
    description: 'Homogeneous 2D bounding box vertex coordinates',
    columns: ['vertex_id', 'x_orig', 'y_orig', 'x_transformed', 'y_transformed'],
    sampleRows: [
      { vertex_id: 'V1 (Origin)', x_orig: 0, y_orig: 0, x_transformed: 0.0, y_transformed: 0.0 },
      { vertex_id: 'V2 (Right)', x_orig: 4, y_orig: 0, x_transformed: 2.828, y_transformed: 2.828 },
      { vertex_id: 'V3 (Top-Right)', x_orig: 4, y_orig: 4, x_transformed: 1.414, y_transformed: 5.657 },
      { vertex_id: 'V4 (Top-Left)', x_orig: 0, y_orig: 4, x_transformed: -1.414, y_transformed: 2.828 },
    ],
  },
  objectives: [
    'Define the 2×2 rotation matrix R(45°) = [[cos 45°, -sin 45°], [sin 45°, cos 45°]]',
    'Define the 2×2 shear matrix S = [[1, 0.5], [0, 1]]',
    'Multiply matrices to compute composite M = S · R',
    'Compute det(M) = det(S) · det(R) and evaluate the area expansion factor',
  ],
  tasks: [
    {
      id: 'task-1',
      stepNumber: 1,
      title: 'Construct Rotation & Shear Transformation Matrices',
      instruction: 'Compute numerical values for R(45°) where cos(45°) = sin(45°) = √2/2 ≈ 0.7071, and S = [[1, 0.5], [0, 1]].',
      codeSnippet: `import numpy as np\ntheta = np.radians(45)\nR = np.array([[np.cos(theta), -np.sin(theta)], [np.sin(theta), np.cos(theta)]])\nS = np.array([[1.0, 0.5], [0.0, 1.0]])\nprint("R:\\n", np.round(R, 3))\nprint("S:\\n", S)`,
      expectedResult: 'R = [[0.707, -0.707], [0.707, 0.707]], S = [[1.0, 0.5], [0.0, 1.0]]',
      explanation: 'Rotation and shear are represented as standard linear transformation matrices acting on standard basis vectors.',
    },
    {
      id: 'task-2',
      stepNumber: 2,
      title: 'Compute Composite Transformation Matrix M = S · R',
      instruction: 'Perform matrix multiplication M = S @ R.',
      codeSnippet: `M = S @ R\nprint("Composite M:\\n", np.round(M, 4))`,
      expectedResult: 'M = [[1.0607, -0.3536], [0.7071, 0.7071]]',
      explanation: 'Matrix multiplication is associative but non-commutative (S @ R applies rotation first, then shear).',
    },
    {
      id: 'task-3',
      stepNumber: 3,
      title: 'Determinant & Area Scaling Verification',
      instruction: 'Calculate det(M) = (1.0607)(0.7071) - (-0.3536)(0.7071) and compare with original bounding box area (16.0 units²).',
      codeSnippet: `det_M = np.linalg.det(M)\nprint(f"det(M): {det_M:.4f}")\norig_area = 16.0\nnew_area = orig_area * abs(det_M)\nprint(f"Transformed Area: {new_area:.2f}")`,
      expectedResult: 'det(M) = 1.0000. Transformed Area = 16.00 units²',
      explanation: 'Because det(R) = 1 (pure rotation preserves area) and det(S) = 1 (pure shear preserves area), det(M) = det(S)·det(R) = 1.0, meaning total area is strictly preserved.',
    },
  ],
  finalInterpretation:
    'The composite matrix transformation M = S · R successfully rotates the object by 45° and shears it horizontally without altering its 2D area (det(M) = 1.0). This mathematical guarantee allows machine learning vision pipelines to synthesize realistic rotated/skewed camera perspectives without distorting the physical scale of classified objects.',
  challengeQuestion: {
    question: 'If an engineer scales the coordinates by factor k=2 along both X and Y before shearing, what will be the determinant of the resulting transformation?',
    options: [
      'det = 2.0 (doubled area)',
      'det = 4.0 (area scaled by 2² = 4)',
      'det = 1.0 (area remains constant)',
      'det = 0.0 (matrix becomes singular)',
    ],
    correctIndex: 1,
    explanation:
      'Uniform 2D scaling by factor k multiplies the determinant by k²: det(2·I) = 2² = 4. Since det(S) = 1, the composite determinant is 4 × 1 = 4.0.',
  },
};
