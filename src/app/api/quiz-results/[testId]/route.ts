import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(_req: Request, { params }: { params: Promise<{ testId: string }> }) {
  const { testId } = await params;

  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ answers: null });
  }

  const result = await prisma.quizResult.findUnique({
    where: { userId_testId: { userId: session.user.id, testId } },
  });

  return NextResponse.json({ answers: result?.answers ?? null });
}
