/**
 * Core scoring logic for computing composite student scores.
 * Scores are on 0-10 scale, composite is 0-1000.
 */

import { FACTOR_WEIGHTS, FactorKey, CLUSTER_FACTORS } from './weights';

export type FactorScores = Partial<Record<FactorKey, number>>; // each 0..10 (neutral 5 if missing)

export interface CollegePolicy {
  usesTesting: boolean;
  needAware: boolean;
}

export interface RenormOptions {
  treatMissingAsNeutral?: boolean; // default true
}

export interface ScoringResult {
  composite: number;
  sumW: number;
  used: FactorKey[];
  clusterNote?: string;
}

export function withDefaults(
  scores: FactorScores,
  policy: CollegePolicy,
  opts: RenormOptions = {}
): Required<FactorScores> {
  const neutral = 5;
  const treatMissing = opts.treatMissingAsNeutral ?? true;
  const out: any = {};

  for (const k of Object.keys(FACTOR_WEIGHTS) as FactorKey[]) {
    let v = scores[k];
    if (v == null) {
      v = treatMissing ? neutral : undefined;
    }

    // Policy gates
    if (k === 'testing' && !policy.usesTesting) v = undefined;
    if (k === 'ability_to_pay' && !policy.needAware) v = undefined;

    out[k] = v;
  }

  return out;
}

function clampScore(score: number, min = 0, max = 10): number {
  return Math.max(min, Math.min(max, score));
}

function applyClusterDampening(
  scores: Record<string, number>,
  weights: Record<string, number>
): { weights: Record<string, number>; note?: string } {
  // Find cluster factors with score >= 8
  const highs = CLUSTER_FACTORS.filter((k) => (scores[k] ?? 0) >= 8);

  if (highs.length < 2) {
    return { weights, note: undefined };
  }

  // Dampen cluster contribution by 15%
  const dampened: Record<string, number> = { ...weights };
  for (const k of CLUSTER_FACTORS) {
    if (k in dampened) {
      dampened[k] = dampened[k] * 0.85;
    }
  }

  return {
    weights: dampened,
    note: `cluster_dampened_15pct: ${highs.join(',')}`,
  };
}

export function computeComposite0to1000(
  rawScores: FactorScores,
  policy: CollegePolicy
): ScoringResult {
  const scores = withDefaults(rawScores, policy);

  // Build effective weights (skip undefined)
  const entries = Object.entries(FACTOR_WEIGHTS) as [FactorKey, number][];
  const active: [FactorKey, number][] = entries.filter(
    ([k]) => scores[k] != null
  );

  // Clamp scores
  const _scores: Record<string, number> = {};
  for (const [k] of active) {
    _scores[k] = clampScore(scores[k]!);
  }

  // Start with active weights
  let effWeights: Record<string, number> = {};
  for (const [k, w] of active) {
    effWeights[k] = w;
  }

  // Apply cluster dampening
  const { weights: damp, note } = applyClusterDampening(_scores, effWeights);
  effWeights = damp;

  // Weighted sum
  let wsum = 0;
  for (const [k] of active) {
    wsum += _scores[k] * effWeights[k];
  }

  const sumW = Object.values(effWeights).reduce((a, b) => a + b, 0);

  // Normalize to 0..1000 scale
  const composite = (wsum / (10 * sumW)) * 1000;

  return {
    composite,
    sumW,
    used: active.map(([k]) => k),
    clusterNote: note,
  };
}

export function applyConductPenalty(
  composite: number,
  conductScore?: number
): number {
  if (conductScore == null || conductScore >= 5) {
    return composite;
  }

  // Scale penalty up to -40 points at score 0
  const penalty = (5 - conductScore) * 8; // 0..40
  return Math.max(0, composite - penalty);
}

