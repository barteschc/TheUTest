import Link from "next/link";
import { BUNDLE_PRICE_CENTS, formatPrice, SINGLE_PRICE_CENTS, TESTS } from "@/lib/tests";
import styles from "./page.module.css";

const BUNDLE_SAVINGS_CENTS = SINGLE_PRICE_CENTS * TESTS.length - BUNDLE_PRICE_CENTS;

export default function TestsPage() {
  return (
    <div className={styles.wrap}>
      <div className="kicker" style={{ marginBottom: "var(--space-4)" }}>
        All assessments
      </div>
      <h1 className={styles.title}>Pick the one you&apos;ve been avoiding.</h1>
      <p className={styles.lede}>
        Every test is free end to end. The two-page report is {formatPrice(SINGLE_PRICE_CENTS)}, bought per test,
        never a subscription.
      </p>

      <div className={styles.bundleBand}>
        <div>
          <h3>Or take all six and keep every report — {formatPrice(BUNDLE_PRICE_CENTS)}</h3>
          <p>Saves {formatPrice(BUNDLE_SAVINGS_CENTS)} against buying them one at a time.</p>
        </div>
        <Link href="/checkout?plan=bundle" className="btn btn-primary btn-sm">
          Get the bundle →
        </Link>
      </div>

      <div className={`cell-grid cell-grid--bordered ${styles.grid}`}>
        {TESTS.map((t) => (
          <div key={t.id} className={styles.card}>
            <div className="kicker" style={{ fontSize: 11 }}>
              {t.kicker}
            </div>
            <div className={styles.cardName}>{t.name}</div>
            <div className={styles.cardBlurb}>{t.blurb}</div>
            <div className="meta">{t.meta}</div>
            <Link href={`/tests/${t.id}/quiz`} className="btn btn-primary btn-block">
              Take it free →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
