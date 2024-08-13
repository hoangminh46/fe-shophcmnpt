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
