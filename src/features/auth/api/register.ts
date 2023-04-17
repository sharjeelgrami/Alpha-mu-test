import { UserResponse } from "../types";

export type RegisterCredentialsDTO = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export const registerWithEmailAndPassword = (
  data: RegisterCredentialsDTO
): Promise<UserResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: {
          id: "1",
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          bio: "I am a developer",
          role: "ADMIN",
        },
        jwt: "token",
      });
    }, 1000);
  });
};
