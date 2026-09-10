import { Test } from "./tests";

export interface Trait {
  name: string;
  score: number;
  pct: string;
  note: string;
}

export type Answers = Record<number, number>;

/**
 * Real weighted scoring: each test's 20 questions are written in 4
 * interleaved blocks of 5, so question i loads on dimensions[i % 5].
 * A dimension's score is the mean of its 4 answers (0–3 scale) rescaled
 * to 0–100. No answers yet for a dimension defaults to a neutral 50
 * rather than 0, so a partially-answered or unanswered (sample) report
 * doesn't read as a false negative.
 */
export function traitsFor(test: Test, answers: Answers): Trait[] {
  return test.dimensions.map((dim, dIdx) => {
    const values = [dIdx, dIdx + 5, dIdx + 10, dIdx + 15]
      .map((qi) => answers[qi])
      .filter((v): v is number => v !== undefined);

    const score = values.length
      ? Math.round((values.reduce((a, b) => a + b, 0) / (values.length * 3)) * 100)
      : 50;

    return { name: dim.name, score, pct: `${score}%`, note: dim.note };
  });
}

export function topTrait(traits: Trait[]): Trait {
  return [...traits].sort((a, b) => b.score - a.score)[0];
}
