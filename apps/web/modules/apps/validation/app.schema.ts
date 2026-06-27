import { z } from "zod";

export const CreateAppSchema = z.object({
  name: z.string().min(1, "App name is required").max(100),
  platform: z.enum(["ANDROID", "IOS"]),
  storeUrl: z.string().url("Must be a valid URL").optional().or(z.literal('')),
  bundleId: z.string().max(100).optional(),
});

export type CreateAppInput = z.infer<typeof CreateAppSchema>;
