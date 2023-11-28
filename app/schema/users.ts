import { z } from "zod";

export const UserSchema = z.object(
  {
    email: z
    .string()
    .min(2, {message: "This field has to be filled.",})
    .email("This is not a valid email"),
    passwordHash: z
    .string()
    .min(10, {message: "Minimum 10",})
  }
)