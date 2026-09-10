import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { BUNDLE_PRICE_CENTS, getTest } from "@/lib/tests";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Sign in first." }, { status: 401 });
    }

    const body = await req.json().catch(() => null);
    const plan = body?.plan === "bundle" ? "bundle" : "single";
    const testId = typeof body?.testId === "string" ? body.testId : null;

    let amountCents: number;
    let test = null;
    let name: string;
    let description: string;

    if (plan === "bundle") {
      amountCents = BUNDLE_PRICE_CENTS;
      name = "The U Test — all six reports";
      description = "Every test, every two-page report, including tests you haven't taken yet.";
    } else {
      test = testId ? getTest(testId) : undefined;
      if (!test) {
        return NextResponse.json({ error: "Pick a test first." }, { status: 400 });
      }
      amountCents = test.priceCents;
      name = `${test.name} — full report`;
      description = `Result: ${test.archetype} · 2 pages · PDF + permanent web copy`;
    }

    const origin = req.headers.get("origin") || new URL(req.url).origin;
    const cancelParams = new URLSearchParams({ plan });
    if (test) cancelParams.set("testId", test.id);

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: session.user.email || undefined,
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: amountCents,
            product_data: { name, description },
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout?${cancelParams.toString()}`,
      metadata: {
        userId: session.user.id,
        plan,
        testId: test?.id ?? "",
      },
    });

    if (typeof checkoutSession.payment_intent !== "string") {
      throw new Error("Stripe did not return a payment intent for this session.");
    }

    await prisma.purchase.create({
      data: {
        userId: session.user.id,
        type: plan,
        testId: test?.id ?? null,
        amountCents,
        stripePaymentIntentId: checkoutSession.payment_intent,
        status: "pending",
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (err) {
    console.error("create-session failed:", err);
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: `[server] ${message}` }, { status: 500 });
  }
}
