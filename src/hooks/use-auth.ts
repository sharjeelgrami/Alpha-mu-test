import { AuthContext, AuthContextValue } from "contexts/AuthContext";
import { useContext } from "react";

export const useAuth = () => useContext(AuthContext) as AuthContextValue;
