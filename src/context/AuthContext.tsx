import React, { createContext, useContext } from "react";
import Auth from "../models/Auth";
import LoginRequestDTO from "../models/dto/LoginRequestDTO";

interface AuthContextData {
  authData: Auth | undefined;
  setAuthData: React.Dispatch<React.SetStateAction<Auth | undefined>>;
  signIn: (credentials: LoginRequestDTO) => Promise<void>;
  signOut: () => Promise<void>;
  isLoading: boolean;
  errorMessage: string | null;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser utilizado dentro de um AuthProvider");
  }
  return context;
}
