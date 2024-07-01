import { ReactNode, useState } from "react";
import { signIn as signInApi } from "../api/request/auth/SignIn";
import LoginRequest from "../models/dto/LoginRequestDTO";
import Auth from "../models/Auth";
import { AuthContext } from "../context/AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [authData, setAuthData] = useState<Auth | undefined>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const signIn = async (credentials: LoginRequest) => {
        setIsLoading(true);
        try {
          const response = await signInApi(credentials);
          if ("message" in response) {
            setErrorMessage(response.message);
          } else {
            const user = response as Auth;
            setAuthData(user);
          }
        } catch (error) {
          console.error("Erro ao entrar:", error);
          setErrorMessage("Erro ao entrar")
        } finally {
          setIsLoading(false);
        }
      };

    const signOut = async () => {
        setAuthData(undefined);
    };

    return (
        <AuthContext.Provider
            value={{
                authData,
                setAuthData,
                signIn,
                signOut,
                isLoading,
                errorMessage, // Passar mensagem de erro pelo contexto
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
