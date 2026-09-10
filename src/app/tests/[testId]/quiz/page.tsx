import { notFound } from "next/navigation";
import { QuizClient } from "@/components/QuizClient";
import { getTest } from "@/lib/tests";

export const dynamic = "force-dynamic";

export default async function QuizPage({ params }: { params: Promise<{ testId: string }> }) {
  const { testId } = await params;
  const test = getTest(testId);
  if (!test) notFound();

  return <QuizClient test={test} />;
}
