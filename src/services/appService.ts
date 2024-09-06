import axiosInstance from "@/axiosConfig";

export const getProduct = async () => {
  try {
    const response = await axiosInstance.get("/products");
    return response.data;
  } catch (error) {
    throw error;
  }
};