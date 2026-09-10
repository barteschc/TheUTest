import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { fulfillPurchase } from "@/lib/fulfill-purchase";
import { stripe } from "@/lib/stripe";

export const dynamic = "force-dynamic";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  const session = await auth();

  if (!session_id || !session?.user?.id) {
    redirect("/account");
  }

  const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);

  // Only the user who started this checkout can use it to unlock anything.
  if (checkoutSession.metadata?.userId !== session.user.id) {
    redirect("/account");
  }

  if (checkoutSession.payment_status === "paid" && typeof checkoutSession.payment_intent === "string") {
    await fulfillPurchase(checkoutSession.payment_intent);
  }

  const plan = checkoutSession.metadata?.plan;
  const testId = checkoutSession.metadata?.testId;

  if (plan === "single" && testId) {
    redirect(`/tests/${testId}/report`);
  }
  redirect("/account");
}
