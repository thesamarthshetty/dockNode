import z from "zod";

const registerUserValidation = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["user", "admin"]), // if roles are fixed
});

const registerLoginValidation = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const passResetValidation = z.object({
  email: z.email("Invalid email address"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
});

export { registerUserValidation, registerLoginValidation, passResetValidation };
