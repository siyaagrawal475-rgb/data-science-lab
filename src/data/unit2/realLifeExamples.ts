import { RealLifeExample } from '@/types/experiences';

export const UNIT_2_EXAMPLES: RealLifeExample[] = [
  {
    id: 'u2-ex-nlp',
    unitId: 'unit-2',
    unitNumber: 2,
    title: 'Word2Vec Semantic Vector Embeddings & Word Arithmetic',
    industry: 'Natural Language Processing & Generative AI',
    scenario:
      'Search engines and LLMs represent words and sentences as dense 768-dimensional floating point vectors in semantic vector space.',
    dataVariables: 'v("King"), v("Man"), v("Woman"), v("Queen") ∈ ℝ⁷⁶⁸',
    whatWeWantToKnow:
      'Can vector algebra reproduce human conceptual analogies through linear combination?',
    mathematicalMethod:
      'Calculate target vector v_result = v("King") - v("Man") + v("Woman"), then query the vector database for the nearest neighbor vector using Cosine Similarity.',
    resultInterpretation:
      'The closest vector in cosine similarity to v_result is exactly v("Queen") with cos(θ) > 0.89. The vector difference (King - Man) captures the directional gender subspace offset.',
    whyItMatters:
      'Vector representations transform discrete human language into continuous geometry where neural search, semantic clustering, and LLM attention mechanisms operate seamlessly.',
  },
  {
    id: 'u2-ex-robotics',
    unitId: 'unit-2',
    unitNumber: 2,
    title: 'Autonomous Drone Navigation & Wind Drift Vector Compensation',
    industry: 'Robotics & Aerospace Engineering',
    scenario:
      'A delivery drone must fly toward a waypoint vector at velocity v_drone = [15, 0] m/s while subject to a crosswind vector v_wind = [-4, 6] m/s.',
    dataVariables: 'v_target, v_drone, v_wind, resultant_velocity_vector',
    whatWeWantToKnow:
      'What heading vector must the drone motors generate to achieve the desired ground track vector?',
    mathematicalMethod:
      'Apply vector addition v_ground = v_drone + v_wind, then solve for required motor thrust vector v_motor = v_target - v_wind using vector subtraction and trigonometric norms.',
    resultInterpretation:
      'By steering into the wind with compensation vector v_motor = [19, -6] m/s (magnitude 19.92 m/s at -17.5° angle), the drone achieves pure horizontal ground progression.',
    whyItMatters:
      'Real-time vector addition and norm decomposition ensure autonomous flight stability and battery efficiency under turbulent atmospheric conditions.',
  },
];
