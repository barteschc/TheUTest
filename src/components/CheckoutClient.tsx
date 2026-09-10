"use client";

import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import type { StripeElementsOptions } from "@stripe/stripe-js";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { getStripe } from "@/lib/stripe-client";
import { BUNDLE_PRICE_CENTS, formatPrice, getTest, SINGLE_PRICE_CENTS, TESTS } from "@/lib/tests";
import styles from "./Checkout.module.css";

const BUNDLE_SAVINGS_CENTS = SINGLE_PRICE_CENTS * TESTS.length - BUNDLE_PRICE_CENTS;

type Plan = "single" | "bundle";

function PaymentForm({
  email,
  setEmail,
  onSuccess,
}: {
  email: string;
  setEmail: (v: string) => void;
  onSuccess: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;
    setSubmitting(true);
    setError(null);

    const { error: submitError, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
      confirmParams: {
        payment_method_data: { billing_details: { email: email || undefined } },
      },
    });

    if (submitError) {
      setError(submitError.message || "Payment failed. Check your details and try again.");
      setSubmitting(false);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      await fetch("/api/checkout/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentIntentId: paymentIntent.id }),
      }).catch(() => {});
      onSuccess();
      return;
    }

    setError("Payment did not complete. Try a different payment method.");
    setSubmitting(false);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className="field">
        <span>Email for the PDF</span>
        <input
          className="input"
          type="text"
          inputMode="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <div className={styles.paymentBox}>
        <PaymentElement />
      </div>

      {error && <div className="error-text">{error}</div>}

      <button type="submit" className="btn btn-primary btn-block" disabled={!stripe || submitting}>
        {submitting ? "Processing…" : "Pay and open my report →"}
      </button>
      <div className={styles.refundNote}>
        Full refund if you read it and think it&apos;s generic. Say so within 14 days — no argument, no form.
      </div>
    </form>
  );
}

export function CheckoutClient({ publishableKey }: { publishableKey: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();

  const urlTestId = searchParams.get("testId");
  const activeTest = urlTestId ? getTest(urlTestId) : undefined;

  const [plan, setPlan] = useState<Plan>(
    searchParams.get("plan") === "bundle" || !activeTest ? "bundle" : "single"
  );
  const [email, setEmail] = useState(session?.user?.email || "");
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setEmail((prev) => prev || session?.user?.email || "");
  }, [session?.user?.email]);

  useEffect(() => {
    if (status !== "authenticated") return;
    if (plan === "single" && !activeTest) return;

    setClientSecret(null);
    setError(null);

    fetch("/api/checkout/create-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan, testId: activeTest?.id }),
    })
      .then(async (r) => {
        const data = await r.json();
        if (!r.ok) throw new Error(data.error || "Could not start checkout.");
        setClientSecret(data.clientSecret);
      })
      .catch((e) => setError(e.message));
  }, [status, plan, activeTest]);

  const priceCents = plan === "bundle" ? BUNDLE_PRICE_CENTS : activeTest?.priceCents ?? 0;

  const options: StripeElementsOptions | undefined = useMemo(
    () =>
      clientSecret
        ? {
            clientSecret,
            appearance: {
              theme: "night" as const,
              variables: {
                colorPrimary: "#ec3013",
                colorBackground: "#141211",
                colorText: "#f5f3f1",
                colorDanger: "#ff8368",
                fontFamily: "Archivo, system-ui, sans-serif",
                borderRadius: "0px",
                spacingUnit: "4px",
              },
            },
          }
        : undefined,
    [clientSecret]
  );

  function handleSuccess() {
    router.push(plan === "bundle" || !activeTest ? "/account" : `/tests/${activeTest.id}/report`);
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

        {error && <div className="error-text" style={{ marginBottom: "var(--space-4)" }}>{error}</div>}

        {clientSecret && options ? (
          <Elements stripe={getStripe(publishableKey)} options={options}>
            <PaymentForm email={email} setEmail={setEmail} onSuccess={handleSuccess} />
          </Elements>
        ) : (
          !error && <div style={{ color: "var(--color-neutral-700)" }}>Preparing checkout…</div>
        )}
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
