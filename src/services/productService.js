import axios from "axios";
import { API_URL } from "./API";

const token = localStorage.getItem("token")
  ? JSON.parse(localStorage.getItem("token"))
  : null;

export const getProducts = async (keyword, categoryID) => {
  try {
    const response = await axios.get(`${API_URL}products/search`, {
      params: {
        keyword,
        categoryID,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const getSuggestions = async (keyword) => {
  try {
    const response = await axios.get(`${API_URL}search/suggestions`, {
      params: {
        keyword,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const getProductsByCategory = async (categoryID) => {
  try {
    const response = await axios.get(`${API_URL}products/category`, {
      params: {
        categoryID,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const getTopSellingProduct = async () => {
  try {
    const response = await axios.get(`${API_URL}products/top-selling`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.slice(0, 3);
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }
};

export const getPopularProduct2023 = async () => {
  try {
    const response = await axios.get(`${API_URL}products/popular`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }
};

export const getFurnitureCollection = async () => {
  try {
    // const response = await axios.get(`${API_URL}products/popular`);
    const response = await axios.get(
      `${API_URL}products/category?categoryID=67ca8e4e6c470100c9c094da`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }
};

export const getNewShoesCollection = async () => {
  try {
    // const response = await axios.get(`${API_URL}products/popular`);
    const response = await axios.get(
      `${API_URL}products/category/latest?categoryID=67ca8e4e6c470100c9c094db`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }
};

export const getRelatedProduct = async (categoryId) => {
  try {
    // const response = await axios.get(`${API_URL}products/popular`);
    const response = await axios.get(
      `${API_URL}products/category/latest?categoryID=${categoryId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }
};

export const getProductById = async (productID) => {
  try {
    const response = await axios.get(`${API_URL}products/detail/${productID}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Failed to fetch product:", error);
  }
};
