import { z } from "zod";

export const formSchema = z.object({
  email: z.string().email("You should enter a valid email"),
  password: z
    .string()
    .min(6, "Your password should have at least 6 characters"),
});
