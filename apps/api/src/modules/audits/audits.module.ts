import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { AuditsService } from './audits.service';
import { AuditsController } from './audits.controller';
import { AuditProcessor } from './audit.processor';
import { AiModule } from '../ai/ai.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'auditQueue',
    }),
    AiModule
  ],
  controllers: [AuditsController],
  providers: [AuditsService, AuditProcessor],
})
export class AuditsModule {}
