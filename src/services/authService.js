import axios from "axios";
import { API_URL } from "./API";

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}auth/login`, {
      email,
      password
    });

    // Check if API returns an error inside the response (some APIs do this)
    if (response.data.success === false) {
      throw new Error(response.data.message || "Login failed");
    }

    return response.data;
  } catch (error) {
    console.error("Login error:", error);

    // Throwing an error to be caught in handleSubmit
    throw error.response?.data?.message || error.message || "An unexpected error occurred";
  }
};
