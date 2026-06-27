import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuditsService {
  constructor(
    @InjectQueue('auditQueue') private auditQueue: Queue,
    private readonly prisma: PrismaService,
  ) {}

  async triggerAudit(appId: string) {
    const app = await this.prisma.app.findUnique({ where: { id: appId } });
    if (!app) {
      throw new NotFoundException('App not found');
    }

    // Add a job to the queue
    const job = await this.auditQueue.add('analyze-app', {
      appId,
    });

    return { message: 'Audit triggered', jobId: job.id };
  }

  async getAuditHistory(appId: string) {
    return this.prisma.auditHistory.findMany({
      where: { appId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
