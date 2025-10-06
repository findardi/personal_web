import z from "zod";

const strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~])(?!.*\s).{12,}$/;

export const createUserSchema = z.object({
  username: z.string().nonempty("Username is required"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(12, "Password must have 12 characters")
    .regex(
      strongPasswordRegex,
      "Password must include at least one uppercase letter, one lowercase letter, one number, one special character and contain no spaces"
    ),
});

export const loginUserSchema = z.object({
  username: z.string().nonempty("Username is required"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(12, "Password must have 12 characters"),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type LoginUserInput = z.infer<typeof loginUserSchema>;
