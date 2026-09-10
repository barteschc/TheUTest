import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { fulfillPurchase } from "@/lib/fulfill-purchase";
import { stripe } from "@/lib/stripe";

// Called from the client right after Stripe confirms payment, so the UI can
// unlock immediately instead of waiting on the webhook. The webhook remains
// the durable source of truth for fulfillment.
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Sign in first." }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const paymentIntentId = typeof body?.paymentIntentId === "string" ? body.paymentIntentId : "";
  if (!paymentIntentId) {
    return NextResponse.json({ error: "Missing payment intent." }, { status: 400 });
  }

  const intent = await stripe.paymentIntents.retrieve(paymentIntentId);
  if (intent.metadata.userId !== session.user.id) {
    return NextResponse.json({ error: "Not your payment." }, { status: 403 });
  }
  if (intent.status !== "succeeded") {
    return NextResponse.json({ error: "Payment not completed yet." }, { status: 409 });
  }

  const purchase = await fulfillPurchase(paymentIntentId);
  return NextResponse.json({ ok: true, purchase });
}
