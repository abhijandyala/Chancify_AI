/**
 * Probability calculation using logistic regression.
 * Maps composite scores (0-1000) to admission probabilities (0-1).
 */

export interface CalibrationParams {
  A: number; // steepness
  C: number; // center score
}

export function logisticProb(
  score0to1000: number,
  A: number,
  C: number
): number {
  const p = 1 / (1 + Math.exp(-A * (score0to1000 - C)));
  return Math.max(0.02, Math.min(0.98, p)); // clamp 2%..98%
}

export function defaultCal(acceptRate: number): CalibrationParams {
  // Heuristic defaults if no per-college calibration yet
  const R = Math.max(0.03, Math.min(0.8, acceptRate)); // cap extremes

  // Steeper curve for more selective schools
  const A = 0.012 + 0.02 * (0.15 - R);

  // Mean applicant score assumption
  const meanScore = 600;

  // Solve for C where P(meanScore) ≈ R
  const logitR = Math.log(R / (1 - R));
  const C = meanScore - (1 / A) * logitR;

  return { A, C };
}

export function probabilityToPercentile(
  probability: number,
  acceptanceRate: number
): number {
  if (acceptanceRate <= 0) return 50;

  const ratio = probability / acceptanceRate;

  let percentile: number;
  if (ratio >= 1.0) {
    // Above average: map to 50-100
    percentile = 50 + 50 * (1 - Math.exp(-0.5 * (ratio - 1)));
  } else {
    // Below average: map to 0-50
    percentile = 50 * ratio;
  }

  return Math.max(0, Math.min(100, percentile));
}

