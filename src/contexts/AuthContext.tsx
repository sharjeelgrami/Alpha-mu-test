import { createContext, useMemo } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryKey,
  QueryStatus,
} from "@tanstack/react-query";
import { loginFn, logoutFn, registerFn, loadUser } from "lib/auth";
import { type AuthUser } from "features/auth";
// import { AxiosError } from "axios";

// TODO: improve types
export interface AuthContextValue {
  user: AuthUser | null | undefined;
  authStatus: QueryStatus;
  error: unknown;
  refetchUser: Function;
  login: Function;
  isLoggingIn: boolean;
  logout: () => void;
  isLoggingOut: boolean;
  register: Function;
  isRegistering: boolean;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
AuthContext.displayName = "AuthContext";

export interface AuthProviderProps {
  children: React.ReactNode;
  authKey?: QueryKey;
  waitInitial?: boolean;
}

export function AuthProvider(props: AuthProviderProps) {
  const { children, authKey = ["auth-user"], waitInitial = true } = props;
  const queryClient = useQueryClient();

  const {
    data: user,
    error,
    status,
    fetchStatus,
    refetch,
  } = useQuery(authKey, loadUser);

  const loginMutation = useMutation(loginFn, {
    onSuccess: (user) => {
      queryClient.setQueryData(authKey, user);
    },
  });

  const registerMutation = useMutation(registerFn);

  const logoutMutation = useMutation(logoutFn, {
    onSuccess: () => {
      queryClient.clear();
    },
  });

  const value = useMemo(
    () => ({
      user,
      authStatus: status,
      error,
      refetchUser: refetch,
      login: loginMutation.mutateAsync,
      isLoggingIn: loginMutation.isLoading,
      logout: logoutMutation.mutateAsync,
      isLoggingOut: logoutMutation.isLoading,
      register: registerMutation.mutateAsync,
      isRegistering: registerMutation.isLoading,
    }),
    [
      user,
      status,
      error,
      refetch,
      loginMutation.mutateAsync,
      loginMutation.isLoading,
      logoutMutation.mutateAsync,
      logoutMutation.isLoading,
      registerMutation.mutateAsync,
      registerMutation.isLoading,
    ]
  );

  if (status === "success" || !waitInitial) {
    return (
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
  }

  if (status === "loading" || fetchStatus === "idle") {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log("AuthContext", error);
    return <div>Something went wrong</div>;
  }

  return <div>Unhandled status: {status}</div>;
}
