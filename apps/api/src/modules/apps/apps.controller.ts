import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { AppsService } from './apps.service';
import { CreateAppDto } from './dto/create-app.dto';

@Controller('apps')
export class AppsController {
  constructor(private readonly appsService: AppsService) {}

  @Get()
  async findAll(@Query('projectId') projectId: string) {
    if (!projectId) {
      return [];
    }
    return this.appsService.findAllByProject(projectId);
  }

  @Post()
  async create(@Body() createAppDto: CreateAppDto) {
    return this.appsService.create(createAppDto);
  }
}
