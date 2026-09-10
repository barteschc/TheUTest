import { notFound } from "next/navigation";
import { ResultClient } from "@/components/ResultClient";
import { getTest } from "@/lib/tests";

export const dynamic = "force-dynamic";

export default async function ResultPage({ params }: { params: Promise<{ testId: string }> }) {
  const { testId } = await params;
  const test = getTest(testId);
  if (!test) notFound();

  return <ResultClient test={test} />;
}
