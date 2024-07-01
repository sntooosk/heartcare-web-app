
import axios from "axios";
import { API } from "../..";
import LoginRequest from "../../../models/dto/LoginRequestDTO";

export async function signIn(credentials: LoginRequest) {
  try {
    const response = await axios.post(`${API}/auth/login`, credentials);
    return response.data;
  } catch (error) {
    console.error("Erro durante o login:", error);
    throw new Error("Erro ao realizar login. Por favor, tente novamente.");
  }
}
