import { z } from "zod";

const phoneNumberSchema = z.union([
  z
    .string()
    .min(10, "Provide valid phone number")
    .max(10, "Provide valid phone number")
    .startsWith("98", "Phone number must start with 98 or 97"),
  z
    .string()
    .max(10, "Provide valid phone number")
    .min(10, "Provide valid phone number")
    .startsWith("97", "Phone number must start with 98 or 97"),
]);

export const profileSchema = z.object({
  fullName: z.string().max(255).min(1, "Enter your name"),
  dateOfBirth: z
    .string()
    .min(1, "Provide your date of birth")
    .refine(
      (date) => {
        const enteredDate = new Date(date);
        const todayDate = new Date(new Date());
        return enteredDate <= todayDate;
      },
      {
        message: "Date of birth cannot be in the future",
      }
    ),
  contactNumber: phoneNumberSchema,
  alternateContactNumber: z.union([
    z
      .string()
      .max(10, "Provide valid phone number")
      .min(10, "Provide valid phone number")
      .startsWith("98", "Phone number must start with 98 or 97")
      .optional()
      .or(z.literal("")),
    z
      .string()
      .min(10, "Provide valid phone number")
      .max(10, "Provide valid phone number")
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

export const registerSchema = z.object({
  fullName: z.string().trim().min(1, "Enter your name"),
  password: z.string().trim().min(8, "Password must be of 8 characters"),
  email: z.string().trim().email(),
});

export const loginSchema = z.object({
  password: z.string().trim().min(8, "Password must be of 8 characters"),
  email: z.string().trim().email(),
});
