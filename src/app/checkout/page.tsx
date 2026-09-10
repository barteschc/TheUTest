import { Suspense } from "react";
import { CheckoutClient } from "@/components/CheckoutClient";

export const dynamic = "force-dynamic";

export default function CheckoutPage() {
  const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY || "pk_test_replace_me";

  return (
    <Suspense>
      <CheckoutClient publishableKey={publishableKey} />
    </Suspense>
  );
}
