/**
 * Complete Example: Chancify AI Probability Calculation (TypeScript)
 * Shows how to use the frontend scoring library.
 */

import {
  computeComposite0to1000,
  applyConductPenalty,
  defaultCal,
  logisticProb,
  probabilityToPercentile,
  buildAudit,
  identifyStrengthsAndWeaknesses,
  type FactorScores,
  type CollegePolicy,
  type AuditReport,
} from '../frontend/lib/scoring';

// Sample student profile
const studentScores: FactorScores = {
  grades: 8.8,
  rigor: 8.2,
  testing: 8.5,
  essay: 7.8,
  ecs_leadership: 8.3,
  recommendations: 8.0,
  plan_timing: 8.0,
  major_fit: 7.0,
  geography_residency: 6.0,
  firstgen_diversity: 8.0,
  awards_publications: 7.5,
  demonstrated_interest: 8.0,
  interview: 7.5,
  conduct_record: 9.0,
  hs_reputation: 7.5,
};

// College policies
const colleges = [
  {
    name: 'Elite University',
    acceptanceRate: 0.04,
    policy: { usesTesting: true, needAware: false },
  },
  {
    name: 'Highly Selective',
    acceptanceRate: 0.09,
    policy: { usesTesting: true, needAware: false },
  },
  {
    name: 'State University',
    acceptanceRate: 0.28,
    policy: { usesTesting: false, needAware: true }, // Test-optional
  },
];

// Calculate probabilities
function calculateProbability(
  scores: FactorScores,
  acceptanceRate: number,
  policy: CollegePolicy
): AuditReport {
  // Step 1: Compute composite
  const result = computeComposite0to1000(scores, policy);

  // Step 2: Apply conduct penalty
  const finalComposite = applyConductPenalty(
    result.composite,
    scores.conduct_record
  );

  // Step 3: Calculate probability
  const { A, C } = defaultCal(acceptanceRate);
  const probability = logisticProb(finalComposite, A, C);

  // Step 4: Estimate percentile
  const percentile = probabilityToPercentile(probability, acceptanceRate);

  // Step 5: Build audit
  const factorBreakdown = buildAudit(scores, result.used);

  // Step 6: Policy notes
  const policyNotes: string[] = [];
  if (!policy.usesTesting) {
    policyNotes.push('Test-optional: standardized testing not used');
  }
  if (!policy.needAware) {
    policyNotes.push('Need-blind: ability to pay not considered');
  }
  if (result.clusterNote) {
    policyNotes.push(result.clusterNote);
  }

  return {
    compositeScore: finalComposite,
    probability,
    acceptanceRate,
    percentileEstimate: percentile,
    factorBreakdown,
    policyNotes,
  };
}

// Run calculations
console.log('='.repeat(80));
console.log('CHANCIFY AI - TYPESCRIPT EXAMPLE');
console.log('='.repeat(80));
console.log('');

for (const college of colleges) {
  const report = calculateProbability(
    studentScores,
    college.acceptanceRate,
    college.policy
  );

  console.log(`\nCOLLEGE: ${college.name}`);
  console.log('-'.repeat(80));
  console.log(`Acceptance Rate:     ${(college.acceptanceRate * 100).toFixed(1)}%`);
  console.log(`Composite Score:     ${report.compositeScore.toFixed(0)} / 1000`);
  console.log(`Admission Prob:      ${(report.probability * 100).toFixed(1)}%`);
  console.log(`Percentile Estimate: ~${report.percentileEstimate.toFixed(0)}th`);
  console.log('');

  // Show insights
  const insights = identifyStrengthsAndWeaknesses(report.factorBreakdown, 3);

  if (insights.strengths.length > 0) {
    console.log('Top Strengths:');
    insights.strengths.forEach((s) => console.log(`  ✓ ${s}`));
    console.log('');
  }

  if (insights.weaknesses.length > 0) {
    console.log('Areas to Improve:');
    insights.weaknesses.forEach((w) => console.log(`  ⚠ ${w}`));
    console.log('');
  }

  if (report.policyNotes.length > 0) {
    console.log('Policy Notes:');
    report.policyNotes.forEach((n) => console.log(`  • ${n}`));
  }
}

console.log('\n' + '='.repeat(80));
console.log('COMPLETE - Ready to integrate into React components');
console.log('='.repeat(80));

export { calculateProbability };

