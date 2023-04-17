import { UserResponse } from "../types";

export type LoginCredentialsDTO = {
  email: string;
  password: string;
};

// mock login request
export function loginWithEmailAndPassword(
  data: LoginCredentialsDTO
): Promise<UserResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: {
          id: "1",
          firstName: "John",
          lastName: "Doe",
          email: data.email,
          bio: "I am a developer",
          role: "ADMIN",
        },
        jwt: "token",
      });
    }, 1000);
  });
}
