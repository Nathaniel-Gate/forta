import { z } from "zod";

/** Shared by the client form and the /api/enquiry route, so validation cannot drift. */

export const intents = ["review", "call", "engagement"] as const;
export const companySizes = ["Under 100", "100–249", "250–499", "500–1,000", "Over 1,000"] as const;

export const enquirySchema = z.object({
  intent: z.enum(intents),
  name: z.string().trim().min(2, "Please enter your full name").max(120),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your work email")
    .email("Please enter a valid email address")
    .max(200),
  company: z.string().trim().min(2, "Please enter your company").max(160),
  role: z.string().trim().min(2, "Please enter your role").max(120),
  companySize: z.enum(companySizes, { message: "Please choose a company size" }),
  message: z.string().trim().max(2000, "Please keep this under 2,000 characters").optional().or(z.literal("")),
  estimate: z.string().max(600).optional(),
  consent: z.literal(true, { message: "Please confirm we may contact you about this enquiry" }),
  /** Honeypot: real people never see or fill this. */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type EnquiryInput = z.input<typeof enquirySchema>;
export type Enquiry = z.output<typeof enquirySchema>;
