const storagePrefix = "tp_app";

const storage = {
  // persist user auth token
  getToken: (): string | null => {
    return JSON.parse(
      window.localStorage.getItem(`${storagePrefix}_token`) as string
    );
  },
  setToken: (token: string) => {
    window.localStorage.setItem(
      `${storagePrefix}_token`,
      JSON.stringify(token)
    );
  },
  clearToken: () => {
    window.localStorage.removeItem(`${storagePrefix}_token`);
  },
  // presist theme preference
  getTheme: (): string | null => {
    return JSON.parse(
      window.localStorage.getItem(`${storagePrefix}_theme`) as string
    );
  },
  setTheme: (theme: string) => {
    window.localStorage.setItem(
      `${storagePrefix}_theme`,
      JSON.stringify(theme)
    );
  },
  clearTheme: () => {
    window.localStorage.removeItem(`${storagePrefix}_theme`);
  },
};

export default storage;
