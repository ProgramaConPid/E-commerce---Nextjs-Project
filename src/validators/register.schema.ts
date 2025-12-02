import * as yup from "yup";

export const registerSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name cannot exceed 50 characters"),

  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),

  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Password must include at least one uppercase letter")
    .matches(/[a-z]/, "Password must include at least one lowercase letter")
    .matches(/[0-9]/, "Password must include at least one number"),
});
