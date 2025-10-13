/**
 * Factor weights for college admissions probability calculation.
 * Total weights sum to 100.0%
 */

export const FACTOR_WEIGHTS = {
  grades: 25.0,
  rigor: 12.0,
  testing: 8.0,
  essay: 8.0,
  ecs_leadership: 7.5,
  recommendations: 4.0,
  plan_timing: 4.0,
  athletic_recruit: 4.0,
  major_fit: 3.0,
  geography_residency: 3.0,
  firstgen_diversity: 3.0,
  ability_to_pay: 3.0, // used only if college is need-aware
  awards_publications: 2.0,
  portfolio_audition: 2.0,
  policy_knob: 2.0, // special institutional priorities
  demonstrated_interest: 1.5,
  legacy: 1.5,
  interview: 1.0,
  conduct_record: 0.5, // negative if issues
  hs_reputation: 2.0,
} as const;

export type FactorKey = keyof typeof FACTOR_WEIGHTS;

export const CLUSTER_FACTORS: FactorKey[] = [
  'ecs_leadership',
  'awards_publications',
  'portfolio_audition',
  'essay',
];

export function totalWeight(): number {
  return Object.values(FACTOR_WEIGHTS).reduce((a, b) => a + b, 0);
}

export function validateWeights(): boolean {
  const total = totalWeight();
  return Math.abs(total - 100.0) < 0.01; // Allow small floating point error
}

// Validation check
if (!validateWeights()) {
  console.warn(`Factor weights should sum to 100.0, got ${totalWeight()}`);
}

