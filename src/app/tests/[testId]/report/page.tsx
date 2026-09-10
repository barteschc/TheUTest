import { notFound, redirect } from "next/navigation";
import { ReportView } from "@/components/ReportView";
import { getUserAccess, hasAccessToTest } from "@/lib/access";
import { prisma } from "@/lib/prisma";
import { traitsFor, type Answers } from "@/lib/scoring";
import { getTest } from "@/lib/tests";

export const dynamic = "force-dynamic";

export default async function ReportPage({ params }: { params: Promise<{ testId: string }> }) {
  const { testId } = await params;
  const test = getTest(testId);
  if (!test) notFound();

  const access = await getUserAccess();
  if (!hasAccessToTest(access, test.id)) {
    redirect(`/tests/${test.id}/result`);
  }

  const quizResult = access.userId
    ? await prisma.quizResult.findUnique({
        where: { userId_testId: { userId: access.userId, testId: test.id } },
      })
    : null;
  const answers = (quizResult?.answers as Answers) || {};

  const traits = traitsFor(test, answers);
  const banner = access.bundleActive ? "Bundle · all reports unlocked" : "Purchased · full report";

  return <ReportView test={test} traits={traits} banner={banner} />;
}
