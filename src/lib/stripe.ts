import Stripe from "stripe";

const globalForStripe = globalThis as unknown as { stripe?: Stripe };

// A placeholder key from .env.example lets the app build and run without
// real Stripe credentials; actual charges will only work once real keys
// are supplied, at which point calls to the Stripe API will succeed.
export const stripe =
  globalForStripe.stripe ??
  new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_replace_me", {
    maxNetworkRetries: 3,
    timeout: 20000,
  });

if (process.env.NODE_ENV !== "production") globalForStripe.stripe = stripe;
