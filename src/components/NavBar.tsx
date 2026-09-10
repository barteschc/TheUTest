"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import styles from "./NavBar.module.css";

export function NavBar() {
  const { data: session } = useSession();

  return (
    <div className={styles.bar}>
      <Link href="/" className={styles.brand}>
        <span className={styles.mark}>U</span>
        <span className={styles.brandName}>The U Test</span>
      </Link>
      <div className={styles.links}>
        <Link href="/tests" className={styles.link}>
          Tests
        </Link>
        <Link href="/sample-report" className={styles.link}>
          Sample report
        </Link>
        <Link href={session ? "/account" : "/login"} className={styles.link}>
          My reports
        </Link>
        <Link href="/tests" className={styles.cta}>
          Start free →
        </Link>
      </div>
    </div>
  );
}
