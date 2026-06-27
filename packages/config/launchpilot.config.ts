export const CONFIG = {
  app: {
    name: "LaunchPilot",
    description: "AI-Powered Pre-Launch Verification for Mobile Apps",
    url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  },
  billing: {
    currency: "USD",
    plans: {
      free: {
        id: "free",
        name: "Indie Hacker",
        price: 0,
        features: ["1 App per Project", "Basic AI Audit", "Community Support"],
      },
      pro: {
        id: "pro",
        name: "Pro Studio",
        price: 49,
        stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID || "price_dummy_pro",
        features: ["Unlimited Apps", "Deep AI Code Audit", "Priority Support", "ASO Generation"],
      },
      enterprise: {
        id: "enterprise",
        name: "Enterprise",
        price: 199,
        stripePriceId: process.env.NEXT_PUBLIC_STRIPE_ENT_PRICE_ID || "price_dummy_ent",
        features: ["Custom AI Models", "Compliance Checking", "Dedicated Account Manager"],
      },
    },
  },
  features: {
    enableAsoGeneration: false,
    enablePolicyChecker: false,
    enableCompetitorAnalysis: false,
  },
};
