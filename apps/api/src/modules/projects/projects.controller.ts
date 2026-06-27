import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';

// Optional: Add clerkExpressRequireAuth here or in main.ts
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  async findAll(@Query('workspaceId') workspaceId: string) {
    if (!workspaceId) {
      return [];
    }
    return this.projectsService.findAllByWorkspace(workspaceId);
  }

  @Post()
  async create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }
}
