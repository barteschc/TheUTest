import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getTest } from "@/lib/tests";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    // Anonymous quiz-taking is allowed; there's just nothing to persist server-side.
    return NextResponse.json({ ok: true, saved: false });
  }

  const body = await req.json().catch(() => null);
  const testId = typeof body?.testId === "string" ? body.testId : "";
  const answers = body?.answers;

  if (!getTest(testId) || typeof answers !== "object" || answers === null) {
    return NextResponse.json({ error: "Invalid quiz result." }, { status: 400 });
  }

  await prisma.quizResult.upsert({
    where: { userId_testId: { userId: session.user.id, testId } },
    update: { answers },
    create: { userId: session.user.id, testId, answers },
  });

  return NextResponse.json({ ok: true, saved: true });
}
