// api/userApi.ts
import axiosInstance from "@/axiosConfig";

export const login = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post("/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const register = async (
  id: string,
  email: string,
  password: string,
  fullName: string
) => {
  try {
    const response = await axiosInstance.post("/users", {
      id,
      email,
      password,
      fullName,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const resetPass = async (email: string) => {
  try {
    const response = await axiosInstance.post("/reset-password", {
      email,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
