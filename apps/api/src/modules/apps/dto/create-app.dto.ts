import { Platform } from '@prisma/client';

export class CreateAppDto {
  projectId: string;
  name: string;
  platform: Platform;
  storeUrl?: string;
  bundleId?: string;
}
