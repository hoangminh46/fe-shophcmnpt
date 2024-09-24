import axiosInstance from "@/axiosConfig";

export const getProduct = async () => {
  try {
    const response = await axiosInstance.get("/products");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCartByUserId = async (id:string) => {
  try {
    const response = await axiosInstance.get(`carts/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
