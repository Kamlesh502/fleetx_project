import axios from "axios";

export const getImages = async () => {
  const result = await axios.get(`https://picsum.photos/v2/list?page=1&limit=20`)
  return result.data;
}