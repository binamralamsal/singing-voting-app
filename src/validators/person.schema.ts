import { z } from "zod";

export const profileSchema = z.object({
  fullName: z.string().max(255).min(1, "Enter your name"),
  dateOfBirth: z.string().min(1, "Provide your date of birth"),
  contactNumber: z
    .string()
    .min(10, "Provide valid phone number")
    .startsWith("98", "Phone number must start with 98"),
  alternateContactNumber: z
    .string()
    .min(10, "Provide valid phone number")
    .startsWith("98", "Phone number must start with 98")
    .optional()
    .or(z.literal("")),
  address: z.string().min(1, "Enter your address"),
  profession: z.string().min(1, "Enter your profession"),
  motivationReason: z.string().min(1, "Enter your reason"),
});

export const clientProfileSchema = profileSchema.extend({
  agreeWithTermsAndConditions: z.boolean().refine((val) => val === true, {
    message: "Please read and accept the terms and conditions",
  }),
});