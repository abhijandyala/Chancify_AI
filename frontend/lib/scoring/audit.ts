/**
 * Audit trail for probability calculations.
 * Shows user exactly what contributed to their score.
 */

import { FACTOR_WEIGHTS, FactorKey } from './weights';

export interface AuditRow {
  factor: FactorKey;
  weight: number;
  score0to10: number | null; // null if not used (policy-gated)
  weightedContribution: number | null; // score * weight
  note?: string;
}

export interface AuditReport {
  compositeScore: number;
  probability: number;
  acceptanceRate: number;
  percentileEstimate: number;
  factorBreakdown: AuditRow[];
  policyNotes: string[];
}

export function buildAudit(
  scores: Partial<Record<FactorKey, number>>,
  usedKeys: FactorKey[]
): AuditRow[] {
  const rows: AuditRow[] = [];

  for (const k of Object.keys(FACTOR_WEIGHTS) as FactorKey[]) {
    const weight = FACTOR_WEIGHTS[k];

    if (!usedKeys.includes(k)) {
      rows.push({
        factor: k,
        weight,
        score0to10: null,
        weightedContribution: null,
        note: 'policy-gated',
      });
      continue;
    }

    const s = Math.max(0, Math.min(10, scores[k] ?? 5));

    let note: string | undefined;
    if (s === 5 && !(k in scores)) {
      note = 'neutral default (no data)';
    } else if (s >= 9.0) {
      note = 'exceptional strength';
    } else if (s <= 3.0) {
      note = 'area of concern';
    }

    rows.push({
      factor: k,
      weight,
      score0to10: Number(s.toFixed(1)),
      weightedContribution: Number((s * weight).toFixed(3)),
      note,
    });
  }

  return rows;
}

export function identifyStrengthsAndWeaknesses(
  auditRows: AuditRow[],
  topN = 3
): { strengths: string[]; weaknesses: string[] } {
  // Filter to only used factors
  const usedRows = auditRows.filter((row) => row.score0to10 !== null);

  // Sort by score
  const sortedByScore = [...usedRows].sort(
    (a, b) => (b.score0to10 ?? 0) - (a.score0to10 ?? 0)
  );

  const strengths = sortedByScore
    .slice(0, topN)
    .filter((row) => (row.score0to10 ?? 0) >= 7.0)
    .map((row) => `${row.factor} (${row.score0to10}/10)`);

  const weaknesses = sortedByScore
    .slice(-topN)
    .reverse()
    .filter((row) => (row.score0to10 ?? 0) <= 6.0)
    .map((row) => `${row.factor} (${row.score0to10}/10)`);

  return { strengths, weaknesses };
}

