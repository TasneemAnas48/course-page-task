import * as z from "zod";

export const signupValidation = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  email: z.string().email("Invalid email format"),
  phoneNumber: z
    .string()
    .regex(/^\d+$/, "Phone must contain only numbers")
    .min(10, "Phone must be at least 10 digits"),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string()
}).refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  }
);
