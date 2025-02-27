// api/userApi.ts
import axiosInstance from "@/axiosConfig";

export const login = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post(
      "/api/auth/login",
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  try {
    await axiosInstance.post('/api/auth/logout');
    localStorage.removeItem('user');
  } catch (error) {
    console.error('Lỗi khi đăng xuất:', error);
    throw error;
  }
};

export const register = async (
  id: string,
  email: string,
  password: string,
  fullName: string,
  otp: string
) => {
  try {
    const response = await axiosInstance.post("/users", {
      id,
      email,
      password,
      fullName,
      otp,
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
  try {
    const response = await axiosInstance.get("/api/users");
    return response.data;
  } catch (error) {
    throw error;
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
  if (data) {
    try {
      const response = await axiosInstance.put("/change-password", {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        renewPassword: data.renewPassword,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export const deleteProduct = async (data: any) => {
  try {
    const response = await axiosInstance.delete(
      `/carts/${data.cartID}/items/${data.productID}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editQuantityProduct = async (data: any) => {
  try {
    const response = await axiosInstance.put(
      `/carts/${data.cartID}/items/${data.productID}`,
      { quantity: data.quantity }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
