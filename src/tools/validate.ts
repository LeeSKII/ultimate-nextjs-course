import { z } from "zod";

export const issueFormSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(255, { message: "Title is required" }),
  status: z.optional(z.enum(["OPEN", "IN_PROGRESS", "CLOSED"])),
  description: z.string().min(1),
});
