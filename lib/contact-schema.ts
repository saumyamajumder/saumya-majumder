// `zod/mini` is the tree-shakable build of Zod 4: same validation engine,
// functional API. It keeps the client bundle a fraction of full `zod`.
import * as z from "zod/mini";
import { budgetRanges, projectTypes } from "@/lib/contact-options";

/** Shared by the client form and the /api/contact route handler. */
export const contactSchema = z.object({
  name: z
    .string()
    .check(
      z.trim(),
      z.minLength(2, "Please enter your full name."),
      z.maxLength(80, "That name is a bit long."),
    ),
  // Trim first, then validate the format (same order as before).
  email: z
    .string()
    .check(
      z.trim(),
      z.regex(z.regexes.email, "Please enter a valid email address."),
      z.maxLength(160),
    ),
  projectType: z.enum(projectTypes, { error: "Please choose a project type." }),
  budget: z.optional(z.union([z.enum(budgetRanges), z.literal("")])),
  details: z
    .string()
    .check(
      z.trim(),
      z.minLength(10, "Please share a few more details (at least 10 characters)."),
      z.maxLength(5000, "Please keep the details under 5000 characters."),
    ),
  /** Honeypot — real visitors never see or fill this field. */
  website: z.optional(z.string().check(z.maxLength(0))),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
