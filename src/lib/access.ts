import { auth } from "./auth";
import { prisma } from "./prisma";

export interface UserAccess {
  userId: string | null;
  bundleActive: boolean;
  purchasedTestIds: string[];
}

export async function getUserAccess(): Promise<UserAccess> {
  const session = await auth();
  if (!session?.user?.id) {
    return { userId: null, bundleActive: false, purchasedTestIds: [] };
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { purchases: { where: { status: "succeeded" } } },
  });
  if (!user) return { userId: null, bundleActive: false, purchasedTestIds: [] };

  const purchasedTestIds = user.purchases
    .filter((p) => p.type === "single" && p.testId)
    .map((p) => p.testId as string);

  return { userId: user.id, bundleActive: user.bundleActive, purchasedTestIds };
}

export function hasAccessToTest(access: UserAccess, testId: string): boolean {
  return access.bundleActive || access.purchasedTestIds.includes(testId);
}
