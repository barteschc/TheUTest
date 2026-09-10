import type { Metadata } from "next";
import type { ReactNode } from "react";
import { NavBar } from "@/components/NavBar";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "The U Test — assessments for people who can take it",
  description:
    "Archetype and personality assessments scored on how you behave under pressure. Every test is free. Buy the two-page report if you want the part that stings.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div style={{ minHeight: "100vh", background: "var(--color-bg)", color: "var(--color-text)" }}>
            <NavBar />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
