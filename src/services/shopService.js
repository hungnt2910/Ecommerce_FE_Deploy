import axios from "axios";
import { API_URL } from "./API";

export const getShopInfo = async (shopId) => {
  try {
    const response = await axios.get(`${API_URL}shops/${shopId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching ads:", error);
    return [];
  }
};

export const getArticle = async () => {
    try {
      const response = await axios.get(`${API_URL}article`);
      return response.data;
    } catch (error) {
      console.error("Error fetching ads:", error);
      return [];
    }
  };