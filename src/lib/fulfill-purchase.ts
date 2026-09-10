import { prisma } from "./prisma";

/** Idempotent: safe to call from both the client-confirmation route and the Stripe webhook. */
export async function fulfillPurchase(paymentIntentId: string) {
  const purchase = await prisma.purchase.findUnique({ where: { stripePaymentIntentId: paymentIntentId } });
  if (!purchase || purchase.status === "succeeded") return purchase;

  const updated = await prisma.purchase.update({
    where: { id: purchase.id },
    data: { status: "succeeded" },
  });

  if (updated.type === "bundle") {
    await prisma.user.update({ where: { id: updated.userId }, data: { bundleActive: true } });
  }

  return updated;
}
