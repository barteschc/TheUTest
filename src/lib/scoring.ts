import { Test, TRAIT_NOTES } from "./tests";

export interface Trait {
  name: string;
  score: number;
  pct: string;
  note: string;
}

export type Answers = Record<number, number>;

/**
 * Deterministic pseudo-scoring: a per-test seed (from its id) plus the lean
 * of the user's own answers, so retaking a test with different answers
 * shifts scores while the same answers always reproduce the same report.
 */
export function traitsFor(test: Test, answers: Answers): Trait[] {
  let seed = 0;
  for (const c of test.id) seed += c.charCodeAt(0);

  const values = Object.values(answers);
  const n = values.length;
  const sum = values.reduce((a, b) => a + b, 0);
  const lean = n ? (sum / n) * 12 : 0;

  return Object.keys(TRAIT_NOTES).map((name, i) => {
    const score = Math.max(
      18,
      Math.min(96, Math.round(46 + ((seed * (i + 3)) % 37) + (i % 2 ? lean : -lean / 2)))
    );
    return { name, score, pct: `${score}%`, note: TRAIT_NOTES[name] };
  });
}

export function topTrait(traits: Trait[]): Trait {
  return [...traits].sort((a, b) => b.score - a.score)[0];
}
