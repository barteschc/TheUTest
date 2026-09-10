import { loadStripe, Stripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null> | null = null;

/**
 * Takes the publishable key as an argument (passed down from a server
 * component reading a plain, non-NEXT_PUBLIC_-prefixed env var) rather than
 * reading process.env directly here. Keeps the key out of the special
 * NEXT_PUBLIC_ build-time-inlining path entirely.
 */
export function getStripe(publishableKey: string) {
  if (!stripePromise) {
    stripePromise = loadStripe(publishableKey);
  }
  return stripePromise;
}
