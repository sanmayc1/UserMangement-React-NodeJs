import { object, ref, string } from "yup";

export const schema = object({
  username: string()
    .trim()
    .min(2, "Enter a valid name")
    .matches(/^[a-zA-Z\s'-]+$/, "Name contains invalid characters")
    .required("Name is required"),
  phone: string()
    .matches(/^[987]\d{9}$/, "Enter a valid phone number")
    .required("Phone Number is required"),
  email: string().required("Email is required").email("Enter a valid email"),
  password: string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one letter, one number, and one special character"
    )
    .required("Password is required"),

  confirmPassword: string()
    .required("Confirm password is required")
    .oneOf([ref("password"), null], "Passwords not match"),
});
