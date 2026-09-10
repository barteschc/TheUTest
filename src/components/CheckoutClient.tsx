"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { BUNDLE_PRICE_CENTS, formatPrice, getTest, SINGLE_PRICE_CENTS, TESTS } from "@/lib/tests";
import styles from "./Checkout.module.css";

const BUNDLE_SAVINGS_CENTS = SINGLE_PRICE_CENTS * TESTS.length - BUNDLE_PRICE_CENTS;

type Plan = "single" | "bundle";

export function CheckoutClient() {
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();

  const urlTestId = searchParams.get("testId");
  const activeTest = urlTestId ? getTest(urlTestId) : undefined;

  const [plan, setPlan] = useState<Plan>(
    searchParams.get("plan") === "bundle" || !activeTest ? "bundle" : "single"
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const priceCents = plan === "bundle" ? BUNDLE_PRICE_CENTS : activeTest?.priceCents ?? 0;

  async function handleContinue() {
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/checkout/create-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, testId: activeTest?.id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `Could not start checkout (HTTP ${res.status}).`);
      window.location.href = data.url;
    } catch (e) {
      setError(`[create-session] ${e instanceof Error ? e.message : String(e)}`);
      setSubmitting(false);
    }
  }

  if (status === "loading") {
    return <div style={{ padding: "80px var(--space-6)" }}>Loading…</div>;
  }

  if (status !== "authenticated") {
    const callbackUrl = `/checkout?${searchParams.toString()}`;
    return (
      <div style={{ padding: "80px var(--space-6)", maxWidth: 520 }}>
        <div className="kicker" style={{ marginBottom: "var(--space-4)" }}>
          Checkout
        </div>
        <h1 style={{ fontSize: "clamp(28px,4vw,40px)", letterSpacing: "-0.03em" }}>Sign in to pay.</h1>
        <p style={{ color: "var(--color-neutral-700)", marginBottom: "var(--space-6)" }}>
          Your report gets tied to your account so it&apos;s there permanently, on any device.
        </p>
        <div style={{ display: "flex", gap: "var(--space-3)", flexWrap: "wrap" }}>
          <Link href={`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`} className="btn btn-primary">
            Sign in →
          </Link>
          <Link href={`/register?callbackUrl=${encodeURIComponent(callbackUrl)}`} className="btn btn-outline">
            Create account
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`cell-grid ${styles.grid}`}>
      <div className={styles.left}>
        <div className="kicker" style={{ marginBottom: "var(--space-4)" }}>
          Checkout
        </div>
        <h1>One payment. Two pages. Yours forever.</h1>
        <p style={{ color: "var(--color-neutral-700)", fontSize: 15, marginBottom: "var(--space-6)" }}>
          You&apos;ll enter your card details on Stripe&apos;s secure payment page next, then land straight back
          here with your report unlocked.
        </p>

        {error && <div className="error-text" style={{ marginBottom: "var(--space-4)" }}>{error}</div>}

        <button type="button" className="btn btn-primary btn-block" onClick={handleContinue} disabled={submitting}>
          {submitting ? "Redirecting to Stripe…" : "Continue to payment →"}
        </button>
        <div className={styles.refundNote} style={{ marginTop: "var(--space-4)" }}>
          Full refund if you read it and think it&apos;s generic. Say so within 14 days — no argument, no form.
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.orderLabel}>Order</div>
        <div className={styles.plans}>
          {activeTest && (
            <button
              type="button"
              className={styles.planRow}
              style={{ background: plan === "single" ? "var(--color-accent-200)" : "var(--color-bg)" }}
              onClick={() => setPlan("single")}
            >
              <span className={styles.planMark}>{plan === "single" ? "●" : "○"}</span>
              <span>
                <span className={styles.planTitle}>This report — {formatPrice(activeTest.priceCents)}</span>
                <span className={styles.planSub} style={{ color: "var(--color-neutral-700)" }}>
                  {activeTest.name} only
                </span>
              </span>
            </button>
          )}
          <button
            type="button"
            className={styles.planRow}
            style={{ background: plan === "bundle" ? "var(--color-accent-200)" : "var(--color-bg)" }}
            onClick={() => setPlan("bundle")}
          >
            <span className={styles.planMark}>{plan === "bundle" ? "●" : "○"}</span>
            <span>
              <span className={styles.planTitle}>All six reports — {formatPrice(BUNDLE_PRICE_CENTS)}</span>
              <span className={styles.planSub} style={{ color: "var(--color-accent-700)" }}>
                Save {formatPrice(BUNDLE_SAVINGS_CENTS)} · future tests included
              </span>
            </span>
          </button>
        </div>

        <div className={styles.summary}>
          <div className={styles.summaryTitle}>
            {plan === "bundle" ? "All six reports — bundle" : `${activeTest?.name} — full report`}
          </div>
          <div className={styles.summaryDesc}>
            {plan === "bundle"
              ? "Every test, every two-page report, including the ones you haven't taken yet"
              : `Result: ${activeTest?.archetype} · 2 pages · PDF + permanent web copy`}
          </div>
        </div>
        <div className={styles.lineRow}>
          <span>Subtotal</span>
          <span>{formatPrice(priceCents)}</span>
        </div>
        <div className={styles.lineRow} style={{ color: "var(--color-neutral-700)" }}>
          <span>Tax</span>
          <span>Included</span>
        </div>
        <div className={styles.totalRow}>
          <span>Total</span>
          <span>{formatPrice(priceCents)}</span>
        </div>
        {activeTest && (
          <Link href={`/tests/${activeTest.id}/result`} className="btn btn-plain">
            ← Back to my free result
          </Link>
        )}
      </div>
    </div>
  );
}
