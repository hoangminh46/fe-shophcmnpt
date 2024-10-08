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

export const getCartByUserId = async (id: string) => {
  try {
    const response = await axiosInstance.get(`carts/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addProduct = async (data: any) => {
  try {
    const response = await axiosInstance.post(`/carts/${data.userID}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getOrderByUserId = async (id: string) => {
  try {
    const response = await axiosInstance.get(`orders/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addOrder = async (data: any) => {
  try {
    const response = await axiosInstance.post(`/orders/${data.userID}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
