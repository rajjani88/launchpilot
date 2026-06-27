import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAppDto } from './dto/create-app.dto';

@Injectable()
export class AppsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllByProject(projectId: string) {
    return this.prisma.app.findMany({
      where: { projectId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(createAppDto: CreateAppDto) {
    const project = await this.prisma.project.findUnique({
      where: { id: createAppDto.projectId },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return this.prisma.app.create({
      data: {
        name: createAppDto.name,
        platform: createAppDto.platform,
        storeUrl: createAppDto.storeUrl,
        bundleId: createAppDto.bundleId,
        projectId: createAppDto.projectId,
      },
    });
  }
}
