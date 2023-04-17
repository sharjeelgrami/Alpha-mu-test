import { AuthUser } from "../types";

export function getUser(): Promise<AuthUser> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: "1",
        firstName: "John",
        lastName: "Doe",
        email: "jhondoe@gmail.com",
        bio: "I am a developer",
        role: "ADMIN",
      });
    }, 1000);
  });
}
