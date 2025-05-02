export type Gender = "male" | "female";

export type SignUpInputs = {
  fullName: string;
  username: string;
  password: string;
  confirmPassword: string;
  gender: Gender | null;
};