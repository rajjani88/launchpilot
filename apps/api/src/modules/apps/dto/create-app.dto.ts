import { Platform } from 'database';

export class CreateAppDto {
  projectId: string;
  name: string;
  platform: Platform;
  storeUrl?: string;
  bundleId?: string;
}
