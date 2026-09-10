"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { Answers } from "@/lib/scoring";
import { loadAnswers, saveAnswers } from "@/lib/quiz-storage";
import { SCALE, Test } from "@/lib/tests";
import styles from "./Quiz.module.css";

const PER_PAGE = 5;

export function QuizClient({ test, initialPage = 0 }: { test: Test; initialPage?: number }) {
  const router = useRouter();
  const [page, setPage] = useState(initialPage);
  const [answers, setAnswers] = useState<Answers>(() => loadAnswers(test.id) || {});

  const totalPages = Math.ceil(test.questions.length / PER_PAGE);
  const pageQuestions = useMemo(
    () => test.questions.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE),
    [test.questions, page]
  );
  const answeredOnPage = pageQuestions.filter((_, i) => answers[page * PER_PAGE + i] !== undefined).length;
  const allAnswered = answeredOnPage === pageQuestions.length;
  const progressPct = Math.round(((page + answeredOnPage / PER_PAGE) / totalPages) * 100);

  function pick(qi: number, value: number) {
    const next = { ...answers, [qi]: value };
    setAnswers(next);
    saveAnswers(test.id, next);
  }

  function handleBack() {
    if (page === 0) {
      router.push("/tests");
      return;
    }
    setPage((p) => p - 1);
    window.scrollTo(0, 0);
  }

  async function handleNext() {
    if (!allAnswered) return;
    if (page === totalPages - 1) {
      saveAnswers(test.id, answers);
      fetch("/api/quiz-results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ testId: test.id, answers }),
      }).catch(() => {});
      router.push(`/tests/${test.id}/result`);
      return;
    }
    setPage((p) => p + 1);
    window.scrollTo(0, 0);
  }

  return (
    <div>
      <div className={styles.head}>
        <div className={styles.headName}>{test.name}</div>
        <div className="meta">
          Section {page + 1} of {totalPages}
        </div>
      </div>
      <div className={styles.progressTrack}>
        <div className={styles.progressFill} style={{ width: `${progressPct}%` }} />
      </div>

      <div className={styles.body}>
        <p className={styles.instruction}>Answer fast. First instinct scores truer than a considered one.</p>

        <div className={styles.qList}>
          {pageQuestions.map((text, i) => {
            const qi = page * PER_PAGE + i;
            return (
              <div key={qi} className={styles.qCard}>
                <div className={styles.qHead}>
                  <div className={styles.qNum}>{String(qi + 1).padStart(2, "0")}</div>
                  <div className={styles.qText}>{text}</div>
                </div>
                <div className={styles.options}>
                  {SCALE.map((label, v) => {
                    const selected = answers[qi] === v;
                    return (
                      <button
                        key={label}
                        type="button"
                        className={styles.option}
                        style={{
                          background: selected ? "var(--color-accent)" : "var(--color-bg)",
                          color: selected ? "#fff" : "var(--color-text)",
                        }}
                        onClick={() => pick(qi, v)}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.footer}>
          <button type="button" className="btn btn-outline" onClick={handleBack}>
            ← Back
          </button>
          <button
            type="button"
            className="btn"
            style={{
              background: allAnswered ? "var(--color-accent)" : "var(--color-neutral-400)",
              color: "#fff",
            }}
            onClick={handleNext}
          >
            {page === totalPages - 1 ? "See my result →" : "Next five →"}
          </button>
          <div className="meta">{allAnswered ? "" : `${PER_PAGE - answeredOnPage} left on this screen`}</div>
        </div>
      </div>
    </div>
  );
}
