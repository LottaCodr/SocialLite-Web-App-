import { z } from "zod";

export const SignUpValidation = z.object({
    name: z.string().min(2, {message: "Your name is too"}), 
    username: z.string().min(2, {message: "username is too"}),
    email: z.string().email(),
    password: z.string().min(8, {message: "Password must be at least 8 characters"})
  });
  