import axios from "axios";
import { API } from "../..";
import UpdatePostDTO from "../../../models/dto/updatePostDTO";

export async function update(
  idPost: number,
  token: string,
  post: UpdatePostDTO
) {
  try {
    const response = await axios.put(
      `${API}/posts/${idPost}`,
      post,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar pressão:", error);
    throw new Error("Erro ao atualizar pressão. Por favor, tente novamente.");
  }
}