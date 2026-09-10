"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { loadAnswers } from "@/lib/quiz-storage";
import { REPORT_CONTENTS } from "@/lib/report-content";
import type { Answers } from "@/lib/scoring";
import { topTrait, traitsFor } from "@/lib/scoring";
import { formatPrice, SINGLE_PRICE_CENTS, BUNDLE_PRICE_CENTS, Test } from "@/lib/tests";
import styles from "./Result.module.css";

interface Access {
  bundleActive: boolean;
  purchasedTestIds: string[];
}

export function ResultClient({ test }: { test: Test }) {
  const router = useRouter();
  const [answers, setAnswers] = useState<Answers | null>(null);
  const [notFoundYet, setNotFoundYet] = useState(false);
  const [access, setAccess] = useState<Access | null>(null);

  useEffect(() => {
    const stored = loadAnswers(test.id);
    if (stored && Object.keys(stored).length === test.questions.length) {
      setAnswers(stored);
    } else {
      fetch(`/api/quiz-results/${test.id}`)
        .then((r) => r.json())
        .then((d) => {
          if (d.answers) setAnswers(d.answers);
          else setNotFoundYet(true);
        })
        .catch(() => setNotFoundYet(true));
    }

    fetch("/api/access")
      .then((r) => r.json())
      .then(setAccess)
      .catch(() => setAccess({ bundleActive: false, purchasedTestIds: [] }));
  }, [test.id, test.questions.length]);

  useEffect(() => {
    if (notFoundYet) router.replace(`/tests/${test.id}/quiz`);
  }, [notFoundYet, router, test.id]);

  if (!answers) {
    return <div style={{ padding: "80px var(--space-6)" }}>Loading your result…</div>;
  }

  const traits = traitsFor(test, answers);
  const top = topTrait(traits);
  const owned = access?.bundleActive || access?.purchasedTestIds.includes(test.id);

  return (
    <div>
      <div className={styles.hero}>
        <div className={styles.completeLabel}>
          {test.name} complete · {test.questions.length} of {test.questions.length} answered
        </div>
        <h1>{test.archetype}</h1>
        <p>{test.para}</p>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>What we can already tell you</h2>
          <div className="meta">Free · no email required</div>
        </div>
        <div className={`cell-grid ${styles.freeGrid}`}>
          <div className={styles.cell}>
            <div className={styles.readLabel}>Your strongest dimension</div>
            <div className={styles.topRow}>
              <span className={styles.topName}>{top.name}</span>
              <span className={styles.topScore}>{top.score}</span>
            </div>
            <div className={styles.bar}>
              <div className={styles.barFill} style={{ width: top.pct }} />
            </div>
            <div className={styles.note}>{top.note}</div>
            <div className={styles.shownOf}>1 of 5 dimensions shown</div>
          </div>
          {test.reads.map((r) => (
            <div key={r.label} className={styles.cell}>
              <div className={styles.readLabel}>{r.label}</div>
              <div className={styles.readBody}>{r.body}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={`cell-grid ${styles.lowerGrid}`}>
        <div className={styles.contentsCell}>
          <div className="kicker" style={{ marginBottom: "var(--space-4)" }}>
            What&apos;s in the {formatPrice(SINGLE_PRICE_CENTS)} report
          </div>
          <div className={styles.contentsList}>
            {REPORT_CONTENTS.map((c) => (
              <div key={c.num} className={styles.contentsRow}>
                <div className={styles.contentsNum}>{c.num}</div>
                <div>
                  <div className={styles.contentsTitle}>{c.title}</div>
                  <div className={styles.contentsBody}>{c.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.paywallCell}>
          {owned ? (
            <div className={styles.ownedBox}>
              <div className="kicker">Already unlocked</div>
              <p style={{ margin: 0, fontSize: 15, color: "var(--color-neutral-800)" }}>
                You already own this report{access?.bundleActive ? " — it's part of your bundle." : "."}
              </p>
              <Link href={`/tests/${test.id}/report`} className="btn btn-primary btn-block">
                Open my report →
              </Link>
            </div>
          ) : (
            <>
              <div className={styles.lockedLabel}>Locked</div>
              <div className={styles.lockedBox}>
                <div className={styles.lockedTitle}>Trait profile</div>
                <div className={styles.lockedTraits} aria-hidden="true">
                  {traits.map((t) => (
                    <div key={t.name}>
                      <div className={styles.lockedTraitRow}>
                        <span>{t.name}</span>
                        <span>{t.score}</span>
                      </div>
                      <div className={styles.lockedBar}>
                        <div className={styles.lockedBarFill} style={{ width: t.pct }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.pitch}>
                You&apos;ve seen one dimension. The other four are scored and waiting, along with your failure
                pattern under pressure and the thirty-day correction.
              </div>
              <div className={styles.priceRow}>
                <div className={styles.priceNow}>{formatPrice(SINGLE_PRICE_CENTS)}</div>
                <div className="meta">one-off · instant PDF</div>
              </div>
              <Link href={`/checkout?testId=${test.id}&plan=single`} className="btn btn-primary btn-block">
                Unlock my report →
              </Link>
              <div className={styles.wideBox}>
                <div className={styles.wideLabel}>Or go wider</div>
                <div className={styles.wideBody}>
                  All six tests and all six reports for {formatPrice(BUNDLE_PRICE_CENTS)} — the price of under
                  three bought separately.
                </div>
                <Link href={`/checkout?testId=${test.id}&plan=bundle`} className="btn btn-outline btn-block">
                  Unlock everything — {formatPrice(BUNDLE_PRICE_CENTS)} →
                </Link>
              </div>
              <Link href="/tests" className="btn btn-plain">
                No thanks — take another test
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
