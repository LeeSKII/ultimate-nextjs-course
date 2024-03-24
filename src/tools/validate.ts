import { z } from "zod";

export const issueFormSchema = z.object({
  title: z.string().min(1).max(255),
  status: z.optional(z.enum(["OPEN", "IN_PROGRESS", "CLOSED"])),
  description: z.string().min(1),
});
