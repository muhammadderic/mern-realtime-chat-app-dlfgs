export type Gender = "male" | "female";

export type SignUpInputs = {
  fullName: string;
  username: string;
  password: string;
  confirmPassword: string;
  gender: Gender | null;
};

export type ConversationUser = {
  _id: string;
  fullName: string;
  username: string;
  gender: string;
  profilePic: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}