import { z } from "zod";

export const onboardingSchema = z.object({
  firstName: z.string().nonempty("First name is required"),
  lastName: z.string().nonempty("Last name is required"),
  gender: z.string().optional(),
  dob: z.date().optional(),
  location: z.string().nonempty("Location is required"),
  role: z.string().nonempty("Role is required"),
  industry: z.string().nonempty("Industry is required"),
});

export type OnboardingFormValues = z.infer<typeof onboardingSchema>;