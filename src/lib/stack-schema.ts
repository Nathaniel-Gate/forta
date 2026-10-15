import { z } from "zod";

/** Shared by the stack form and /api/stack. */
export const stackSchema = z.object({
  tools: z
    .array(z.string().trim().min(1).max(60))
    .min(1, "Add at least one tool")
    .max(60, "That's a lot of tools. Send us the main 60"),
  company: z.string().trim().min(2, "Please enter your company").max(160),
  email: z.string().trim().min(1, "Please enter your work email").email("Please enter a valid email address").max(200),
  pain: z.string().trim().max(1000).optional().or(z.literal("")),
  source: z.string().max(40).optional(),
  /** Honeypot */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type StackRequestInput = z.input<typeof stackSchema>;
export type StackRequest = z.output<typeof stackSchema>;
