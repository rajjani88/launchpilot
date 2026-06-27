export type Platform = "ANDROID" | "IOS";

export interface AppModel {
  id: string;
  projectId: string;
  platform: Platform;
  storeUrl: string | null;
  bundleId: string | null;
  name: string;
  category: string | null;
  country: string | null;
  language: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Upload {
  id: string;
  appId: string;
  type: string; // 'APK', 'IPA', 'SCREENSHOT', 'ICON'
  url: string;
  filename: string;
  size: number;
  createdAt: string;
}
