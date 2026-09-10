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
    if (plan === "bundle") {
      amountCents = BUNDLE_PRICE_CENTS;
    } else {
      test = testId ? getTest(testId) : undefined;
      if (!test) {
        return NextResponse.json({ error: "Pick a test first." }, { status: 400 });
      }
      amountCents = test.priceCents;
    }

    const intent = await stripe.paymentIntents.create({
      amount: amountCents,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata: {
        userId: session.user.id,
        plan,
        testId: test?.id ?? "",
      },
    });

    await prisma.purchase.create({
      data: {
        userId: session.user.id,
        type: plan,
        testId: test?.id ?? null,
        amountCents,
        stripePaymentIntentId: intent.id,
        status: "pending",
      },
    });

    return NextResponse.json({ clientSecret: intent.client_secret });
  } catch (err) {
    console.error("create-intent failed:", err);
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: `[server] ${message}` }, { status: 500 });
  }
}
