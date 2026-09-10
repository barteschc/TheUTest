"use client";

import Link from "next/link";
import { CORRECTIONS, FAILURE_BODY, FAILURE_TITLE, HOW_YOU_READ, KEEPER_LINE } from "@/lib/report-content";
import type { Trait } from "@/lib/scoring";
import type { Test } from "@/lib/tests";
import styles from "./Report.module.css";

export function ReportView({ test, traits, banner }: { test: Test; traits: Trait[]; banner: string }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.topBar}>
        <div className="kicker">{banner}</div>
        <div className={styles.topActions}>
          <button type="button" className={styles.topBtn} onClick={() => window.print()}>
            Download PDF
          </button>
          <Link href="/account" className={styles.topBtn}>
            My reports
          </Link>
        </div>
      </div>

      <div className={styles.sheet}>
        <div className={styles.sheetHead}>
          <div className={styles.brand}>
            <span className={styles.brandMark}>U</span>
            <span className={styles.brandName}>The U Test</span>
          </div>
          <div className={styles.pageOf}>Page 1 / 2 · {test.name}</div>
        </div>

        <div className="kicker" style={{ marginBottom: "var(--space-3)" }}>
          Primary archetype
        </div>
        <h1>{test.archetype}</h1>
        <p className={styles.sheetLede}>{test.para}</p>

        <div className={styles.block}>
          <div className="kicker" style={{ marginBottom: "6px" }}>
            Trait scores
          </div>
          <div style={{ fontSize: 13, color: "var(--color-neutral-700)", marginBottom: "var(--space-4)" }}>
            Scored against {test.framework}
          </div>
          <div>
            {traits.map((t) => (
              <div key={t.name} className={styles.traitRow}>
                <div className={styles.traitHead}>
                  <span>{t.name}</span>
                  <span>{t.score} / 100</span>
                </div>
                <div className={styles.traitBar}>
                  <div className={styles.traitBarFill} style={{ width: t.pct }} />
                </div>
                <div className={styles.traitNote}>{t.note}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.block} style={{ marginBottom: 0 }}>
          <div className="kicker" style={{ marginBottom: "var(--space-3)" }}>
            How you read to other people
          </div>
          <div className={`cell-grid ${styles.howGrid}`}>
            {HOW_YOU_READ.map((h) => (
              <div key={h.label} className={styles.howCell}>
                <div className={styles.howLabel}>{h.label}</div>
                <div className={styles.howBody}>{h.body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.sheet}>
        <div className={styles.sheetHead}>
          <div className={styles.brand}>
            <span className={styles.brandMark}>U</span>
            <span className={styles.brandName}>The U Test</span>
          </div>
          <div className={styles.pageOf}>Page 2 / 2 · {test.name}</div>
        </div>

        <div className="kicker" style={{ marginBottom: "var(--space-3)" }}>
          Your failure pattern under pressure
        </div>
        <h2 className={styles.failureTitle}>{FAILURE_TITLE}</h2>
        <p className={styles.failureBody}>{FAILURE_BODY}</p>

        <div className={styles.block}>
          <div className="kicker" style={{ marginBottom: "var(--space-4)" }}>
            The thirty-day correction
          </div>
          <div>
            {CORRECTIONS.map((c) => (
              <div key={c.when} className={styles.correctionRow}>
                <div className={styles.correctionWhen}>{c.when}</div>
                <div>
                  <div className={styles.correctionTitle}>{c.title}</div>
                  <div className={styles.correctionBody}>{c.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.keeper}>
          <div className={styles.keeperLabel}>One sentence to keep</div>
          <div className={styles.keeperLine}>{KEEPER_LINE}</div>
        </div>

        <div className={styles.disclaimer}>
          The U Test is a self-report instrument, not a clinical assessment. It describes patterns, not pathology,
          and it is not a substitute for care from a qualified professional.
        </div>
      </div>
    </div>
  );
}
