import axios from "axios";
import { API } from "../..";

export async function deletar(id: number, token: string) {
  try {
    const response = await axios.delete(`${API}/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar pressão:", error);
    throw new Error("Erro ao deletar pressão. Por favor, tente novamente.");
  }
}