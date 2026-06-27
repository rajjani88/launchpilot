import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
// import { StripeController } from './stripe.controller'; // Assuming controller handles webhooks

@Module({
  // controllers: [StripeController],
  providers: [StripeService],
  exports: [StripeService],
})
export class StripeModule {}
