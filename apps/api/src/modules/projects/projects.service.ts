import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllByWorkspace(workspaceId: string) {
    return this.prisma.project.findMany({
      where: { workspaceId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(createProjectDto: CreateProjectDto) {
    // In a real app, verify the workspace exists and the user has access.
    // Assuming workspace exists for this demo.
    
    return this.prisma.project.create({
      data: {
        name: createProjectDto.name,
        description: createProjectDto.description,
        workspaceId: createProjectDto.workspaceId,
      },
    });
  }
}
