import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { AppsModule } from './modules/apps/apps.module';
import { AiModule } from './modules/ai/ai.module';
import { AuditsModule } from './modules/audits/audits.module';
import { StripeModule } from './modules/stripe/stripe.module';
import { MailModule } from './modules/mail/mail.module';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379', 10),
      },
    }),
    PrismaModule, 
    ProjectsModule, 
    AppsModule,
    AiModule,
    AuditsModule,
    StripeModule,
    MailModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
