"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import styles from "./AuthForm.module.css";

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/account";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      if (mode === "register") {
        const res = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Something went wrong.");
          setBusy(false);
          return;
        }
      }

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(
          result.error === "CredentialsSignin"
            ? "Wrong email or password."
            : `Sign-in error: ${result.error}`
        );
        setBusy(false);
        return;
      }

      router.push(callbackUrl);
      router.refresh();
    } catch (err) {
      setError(`Something went wrong: ${err instanceof Error ? err.message : String(err)}`);
      setBusy(false);
    }
  }

  return (
    <div className={styles.wrap}>
      <div className="kicker" style={{ marginBottom: "var(--space-4)" }}>
        {mode === "login" ? "Sign in" : "Create your account"}
      </div>
      <h1 style={{ fontSize: "clamp(28px,4vw,40px)", letterSpacing: "-0.03em" }}>
        {mode === "login" ? "Welcome back." : "One account, every report."}
      </h1>
      <p style={{ color: "var(--color-neutral-700)", fontSize: 15 }}>
        {mode === "login"
          ? "Sign in to unlock a report or see your past results."
          : "You need an account so your purchase and results stay with you."}
      </p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className="field">
          <span>Email</span>
          <input
            className="input"
            type="text"
            inputMode="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </label>
        <label className="field">
          <span>Password</span>
          <input
            className="input"
            type="password"
            required
            minLength={mode === "register" ? 8 : undefined}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={mode === "register" ? "At least 8 characters" : "••••••••"}
          />
        </label>

        {error && <div className="error-text">{error}</div>}

        <button type="submit" className="btn btn-primary btn-block" disabled={busy}>
          {busy ? "Please wait…" : mode === "login" ? "Sign in →" : "Create account →"}
        </button>
      </form>

      <div className={styles.foot}>
        {mode === "login" ? (
          <>
            No account yet?{" "}
            <Link href={`/register?callbackUrl=${encodeURIComponent(callbackUrl)}`}>Create one</Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link href={`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`}>Sign in</Link>
          </>
        )}
      </div>
    </div>
  );
}
