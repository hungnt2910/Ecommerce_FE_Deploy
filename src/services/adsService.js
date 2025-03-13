import axios from "axios";
import { API_URL } from "./API";

export const getAds = async () => {
  try {
    const response = await axios.get(`${API_URL}ads/active`);
    return response.data;
  } catch (error) {
    console.error("Error fetching ads:", error);
    return [];
  }
};
