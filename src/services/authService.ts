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

export const getUser = async () => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const response = await axiosInstance.get("/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      localStorage.removeItem("token");
    }
  }
};

export const updateUser = async (user: any) => {
  try {
    const response = await axiosInstance.put(`/users/${user.id}`, user);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const changePass = async (data: any) => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const response = await axiosInstance.put(
        "/change-password",
        {
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
