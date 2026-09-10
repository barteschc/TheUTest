import Link from "next/link";
import { PortraitPlaceholder } from "@/components/PortraitPlaceholder";
import { BUNDLE_PRICE_CENTS, formatPrice, SINGLE_PRICE_CENTS, TESTS } from "@/lib/tests";
import styles from "./page.module.css";

const BUNDLE_SAVINGS_CENTS = SINGLE_PRICE_CENTS * TESTS.length - BUNDLE_PRICE_CENTS;
const BUNDLE_FULL_PRICE_CENTS = SINGLE_PRICE_CENTS * TESTS.length;

export default function LandingPage() {
  return (
    <div>
      <div className={styles.hero}>
        <div className={styles.heroLeft}>
          <div className="kicker" style={{ marginBottom: "var(--space-6)" }}>
            Seven minutes. No flattery. just U
          </div>
          <h1 className={styles.heroTitle}>Understand yourself. Unlock your potential within U</h1>
          <p className={styles.heroCopy}>
            Archetype and personality assessments scored on how you behave under pressure — not how you&apos;d like
            to be described at dinner. Every test is free. Buy the report if you want the part that stings.
          </p>
          <div className={styles.heroActions}>
            <Link href="/tests" className="btn btn-primary">
              Take a test free →
            </Link>
            <Link href="/sample-report" className="btn btn-outline">
              See a real report
            </Link>
          </div>
        </div>
        <div className={styles.heroRight}>
          <div className={`cell-grid ${styles.statGrid}`}>
            <div className={styles.statCell}>
              <div className={styles.statNum}>29k</div>
              <div className={styles.statLabel}>Tests completed</div>
            </div>
            <div className={styles.statCell}>
              <div className={styles.statNum}>7</div>
              <div className={styles.statLabel}>Minutes to finish</div>
            </div>
            <div className={styles.statCell}>
              <div className={styles.statNum}>2</div>
              <div className={styles.statLabel}>Page Analysis</div>
            </div>
            <div className={styles.statCell}>
              <div className={styles.statNum}>{formatPrice(SINGLE_PRICE_CENTS)}</div>
              <div className={styles.statLabel}>Per Test</div>
            </div>
          </div>
          <div>
            <PortraitPlaceholder />
            <div className={styles.portraitCaption}>[ b&amp;w portrait — subject looking straight at the lens ]</div>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>The assessments</h2>
          <div className="meta">
            Free to take · {formatPrice(SINGLE_PRICE_CENTS)} per report · {formatPrice(BUNDLE_PRICE_CENTS)} for all
            six
          </div>
        </div>
        <div className={`cell-grid cell-grid--bordered ${styles.testGrid}`}>
          {TESTS.map((t) => (
            <Link key={t.id} href={`/tests/${t.id}/quiz`} className={styles.testCard}>
              <div className="kicker" style={{ fontSize: 11 }}>
                {t.kicker}
              </div>
              <div className={styles.testName}>{t.name}</div>
              <div className={styles.testBlurb}>{t.blurb}</div>
              <div className={styles.testMeta}>{t.meta} · Take it →</div>
            </Link>
          ))}
        </div>
      </div>

      <div className={`cell-grid ${styles.stepsGrid}`}>
        <div className={styles.stepCell}>
          <div className="kicker" style={{ marginBottom: "var(--space-3)" }}>
            01 — Take it
          </div>
          <p>Forced-choice statements, five per screen. No neutral option, because neutral is how people lie to themselves.</p>
        </div>
        <div className={styles.stepCell}>
          <div className="kicker" style={{ marginBottom: "var(--space-3)" }}>
            02 — See the verdict
          </div>
          <p>Your dominant archetype and one paragraph on what it costs you. Free, immediately, no email wall.</p>
        </div>
        <div className={styles.stepCell}>
          <div className="kicker" style={{ marginBottom: "var(--space-3)" }}>
            03 — Buy the rest
          </div>
          <p>
            Two pages: full trait scores, your failure pattern under stress, and the thirty-day correction.{" "}
            {formatPrice(SINGLE_PRICE_CENTS)} once.
          </p>
        </div>
      </div>

      <div className={`cell-grid ${styles.bundleGrid}`}>
        <div className={styles.bundleLeft}>
          <div className="kicker" style={{ marginBottom: "var(--space-4)" }}>
            The full picture
          </div>
          <h2>
            {TESTS.length} tests. {TESTS.length} reports. {formatPrice(BUNDLE_PRICE_CENTS)}.
          </h2>
          <p>
            One archetype is a snapshot. All six is a pattern — how you lead, how you attach, how you come apart,
            and who you become on a bad week at work. Buy once and every report on the site is already paid for.
          </p>
          <Link href="/checkout?plan=bundle" className="btn btn-primary">
            Get the bundle →
          </Link>
        </div>
        <div className={styles.bundleRight}>
          <div className={styles.bundlePrice}>
            <div className={styles.bundlePriceNow}>{formatPrice(BUNDLE_PRICE_CENTS)}</div>
            <div className={styles.bundlePriceWas}>{formatPrice(BUNDLE_FULL_PRICE_CENTS)}</div>
          </div>
          <div className="kicker">
            Save {formatPrice(BUNDLE_SAVINGS_CENTS)} · one payment, no subscription
          </div>
          <div className={styles.bundleList}>
            <div>All six assessments, unlimited retakes</div>
            <div>Every two-page report, PDF and web copy</div>
            <div>New tests included as they&apos;re added</div>
            <div>14-day refund, no form to fill in</div>
          </div>
        </div>
      </div>

      <div className={styles.banner}>
        <h2>
          Most people pay to be told they&apos;re special. The U Test costs {formatPrice(SINGLE_PRICE_CENTS)} to be
          told the truth.
        </h2>
        <Link href="/tests" className={`btn ${styles.bannerBtn}`}>
          Start the free test →
        </Link>
      </div>

      <div className={styles.footer}>
        <div>The U Test — assessments for people who can take it</div>
        <div>Not therapy. Not a diagnosis.</div>
      </div>
    </div>
  );
}
