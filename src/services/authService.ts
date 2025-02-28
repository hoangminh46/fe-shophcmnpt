// api/userApi.ts
import axiosInstance from "@/axiosConfig";

//Api đăng nhập/ đăng xuất
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

//Api đăng ký
export const register = async (
  email: string,
  password: string,
  fullName: string,
) => {
  try {
    const response = await axiosInstance.post("/api/auth/register", {
      email,
      password,
      fullName
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyRegister = async (
  email: string,
  otp: string,
) => {
  try {
    const response = await axiosInstance.post("/api/auth/verify-register", {
      email,
      otp
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

//Api quên mật khẩu
export const sendResetCode = async (email: string) => {
  try {
    const response = await axiosInstance.post("/api/auth/send-reset-code", {
      email,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyResetCode = async (email: string, otp: string) => {
  try {
    const response = await axiosInstance.post("/api/auth/verify-reset-code", {
      email,
      otp
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const sendResetPassword = async (email: string, newPassword: string) => {
  try {
    const response = await axiosInstance.post("/api/auth/reset-password", {
      email,
      newPassword,
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
