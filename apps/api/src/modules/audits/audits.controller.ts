import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { AuditsService } from './audits.service';

@Controller('audits')
export class AuditsController {
  constructor(private readonly auditsService: AuditsService) {}

  @Post()
  async triggerAudit(@Body('appId') appId: string) {
    return this.auditsService.triggerAudit(appId);
  }

  @Get(':appId')
  async getAuditHistory(@Param('appId') appId: string) {
    return this.auditsService.getAuditHistory(appId);
  }
}
