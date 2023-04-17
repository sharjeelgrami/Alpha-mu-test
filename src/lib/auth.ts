import {
  loginWithEmailAndPassword,
  getUser,
  registerWithEmailAndPassword,
  LoginCredentialsDTO,
  RegisterCredentialsDTO,
} from "features/auth";
import storage from "utils/storage";

export async function loadUser() {
  if (storage.getToken()) {
    const data = await getUser();
    return data;
  }
  return null;
}

export async function loginFn(data: LoginCredentialsDTO) {
  const resp = await loginWithEmailAndPassword(data);
  const { jwt, user } = resp;
  storage.setToken(jwt);
  return user;
}

export async function registerFn(data: RegisterCredentialsDTO) {
  const resp = await registerWithEmailAndPassword(data);
  const { jwt, user } = resp;
  storage.setToken(jwt);
  return user;
}

export async function logoutFn() {
  storage.clearToken();
  window.location.assign(window.location.origin as unknown as string);
}
