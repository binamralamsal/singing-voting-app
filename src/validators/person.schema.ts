import { z } from "zod";

export const profileSchema = z.object({
  fullName: z.string().max(255).min(1, "Enter your name"),
  dateOfBirth: z.string().min(1, "Provide your date of birth"),
  contactNumber: z.union([
    z
      .string()
      .min(10, "Provide valid phone number")
      .startsWith("98", "Phone number must start with 98 or 97"),
    z
      .string()
      .min(10, "Provide valid phone number")
      .startsWith("97", "Phone number must start with 98 or 97"),
  ]),
  alternateContactNumber: z.union([
    z
      .string()
      .min(10, "Provide valid phone number")
      .startsWith("98", "Phone number must start with 98 or 97")
      .optional()
      .or(z.literal("")),
    z
      .string()
      .min(10, "Provide valid phone number")
      .startsWith("97", "Phone number must start with 98 or 97")
      .optional()
      .or(z.literal("")),
  ]),
  address: z.string().min(1, "Enter your address"),
  profession: z.string().min(1, "Enter your profession"),
  motivationReason: z.string().min(1, "Enter your reason"),
});

export const clientProfileSchema = profileSchema.extend({
  agreeWithTermsAndConditions: z.boolean().refine((val) => val === true, {
    message: "Please read and accept the terms and conditions",
  }),
});
