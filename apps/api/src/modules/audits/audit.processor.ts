import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import { AiService } from '../ai/ai.service';
import { PrismaService } from '../../prisma/prisma.service';

@Processor('auditQueue')
export class AuditProcessor extends WorkerHost {
  private readonly logger = new Logger(AuditProcessor.name);

  constructor(
    private readonly aiService: AiService,
    private readonly prisma: PrismaService,
  ) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    this.logger.log(`Processing job ${job.id} of type ${job.name}`);
    
    const { appId } = job.data;

    try {
      // 1. Fetch App Data
      const app = await this.prisma.app.findUnique({ where: { id: appId } });
      if (!app) {
        throw new Error('App not found');
      }

      // 2. Perform AI Audit
      const prompt = `Analyze the application named "${app.name}" for platform "${app.platform}". Provide a brief initial audit.`;
      
      this.logger.log(`Calling AI Service for appId: ${appId}`);
      const analysisResult = await this.aiService.analyzeApp(prompt, 'openai');

      // 3. Save Results
      await this.prisma.auditHistory.create({
        data: {
          appId,
          overallScore: 85, // Placeholder, in reality parsed from AI output
          asoScore: 85,
          uiScore: 85,
          uxScore: 85,
        }
      });

      this.logger.log(`Audit completed for appId: ${appId}`);
      return { success: true };
    } catch (error) {
      this.logger.error(`Audit failed for appId: ${appId}`, error);
      throw error;
    }
  }
}
