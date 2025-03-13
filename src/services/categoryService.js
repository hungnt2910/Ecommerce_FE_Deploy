import axios from "axios";
import { API_URL } from "./API";

export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}categories`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};
