import axios from "axios";
import { API } from "../..";
import CreatePostDTO from "../../../models/dto/CreatePostDTO";

export async function create(token: string, post: CreatePostDTO) {
  try {
    const response = await axios.post(
      `${API}/posts/`,
      post,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    console.log(token);

    return response.data;
  } catch (error) {
    console.error("Erro ao criar pressão:", error);
    throw new Error("Erro ao criar pressão. Por favor, tente novamente.");
  }
}