import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatPrice, getTest, SINGLE_PRICE_CENTS, TESTS } from "@/lib/tests";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

function formatDate(d: Date) {
  return d.toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" });
}

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login?callbackUrl=/account");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      results: true,
      purchases: { where: { status: "succeeded" } },
    },
  });
  if (!user) redirect("/login?callbackUrl=/account");

  const purchasedTestIds = new Set(
    user.purchases.filter((p) => p.type === "single" && p.testId).map((p) => p.testId as string)
  );
  const resultsByTest = new Map(user.results.map((r) => [r.testId, r]));

  type Row = {
    key: string;
    testName: string;
    date: string;
    result: string;
    status: string;
    statusColor: string;
    action: string;
    href: string;
    filled: boolean;
  };

  const rows: Row[] = [];

  if (user.bundleActive) {
    for (const t of TESTS) {
      const result = resultsByTest.get(t.id);
      if (result) {
        rows.push({
          key: t.id,
          testName: t.name,
          date: formatDate(result.updatedAt),
          result: t.archetype,
          status: "Report ready",
          statusColor: "var(--color-accent-700)",
          action: "Open report",
          href: `/tests/${t.id}/report`,
          filled: true,
        });
      } else {
        rows.push({
          key: t.id,
          testName: t.name,
          date: "—",
          result: "Not taken yet",
          status: "Included in bundle",
          statusColor: "var(--color-neutral-700)",
          action: "Take test",
          href: `/tests/${t.id}/quiz`,
          filled: false,
        });
      }
    }
  } else {
    for (const result of user.results.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())) {
      const t = getTest(result.testId);
      if (!t) continue;
      const purchased = purchasedTestIds.has(t.id);
      rows.push({
        key: t.id,
        testName: t.name,
        date: formatDate(result.updatedAt),
        result: t.archetype,
        status: purchased ? "Report purchased" : "Free result only",
        statusColor: purchased ? "var(--color-accent-700)" : "var(--color-neutral-700)",
        action: purchased ? "Open report" : `Unlock ${formatPrice(SINGLE_PRICE_CENTS)}`,
        href: purchased ? `/tests/${t.id}/report` : `/checkout?testId=${t.id}&plan=single`,
        filled: purchased,
      });
    }
  }

  return (
    <div className={styles.wrap}>
      <div className="kicker" style={{ marginBottom: "var(--space-4)" }}>
        Account
      </div>
      <h1 className={styles.title}>Your results</h1>
      <p className={styles.sub}>{user.email} · reports stay in your account permanently</p>
      <div className={`kicker ${styles.status}`}>
        {user.bundleActive
          ? "Bundle active · all reports unlocked"
          : `Bundle not active · $32.99 for all six`}
      </div>

      {rows.length === 0 ? (
        <div className={styles.empty}>
          You haven&apos;t taken a test yet. <Link href="/tests">Pick one to start</Link> — every test is free.
        </div>
      ) : (
        <div className={styles.list}>
          {rows.map((h) => (
            <div key={h.key} className={styles.row}>
              <div>
                <div className={styles.testName}>{h.testName}</div>
                <div className={styles.date}>{h.date}</div>
              </div>
              <div className={styles.result}>{h.result}</div>
              <div className={styles.statusText} style={{ color: h.statusColor }}>
                {h.status}
              </div>
              <Link
                href={h.href}
                className={styles.action}
                style={{
                  background: h.filled ? "var(--color-bg)" : "var(--color-accent)",
                  color: h.filled ? "var(--color-text)" : "#fff",
                }}
              >
                {h.action}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
