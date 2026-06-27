import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
      apiVersion: '2025-01-27.acacia',
    });
  }

  async createCheckoutSession(priceId: string, customerId: string, successUrl: string, cancelUrl: string) {
    return this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer: customerId,
      success_url: successUrl,
      cancel_url: cancelUrl,
    });
  }

  constructWebhookEvent(payload: string | Buffer, signature: string) {
    return this.stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || 'whsec_placeholder'
    );
  }
}
