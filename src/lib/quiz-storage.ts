import type { Answers } from "./scoring";

function key(testId: string) {
  return `uTest:answers:${testId}`;
}

export function loadAnswers(testId: string): Answers | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(key(testId));
    return raw ? (JSON.parse(raw) as Answers) : null;
  } catch {
    return null;
  }
}

export function saveAnswers(testId: string, answers: Answers) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(key(testId), JSON.stringify(answers));
  } catch {
    // sessionStorage unavailable (private mode etc) — quiz state just won't survive a refresh.
  }
}

export function clearAnswers(testId: string) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(key(testId));
  } catch {
    // ignore
  }
}
