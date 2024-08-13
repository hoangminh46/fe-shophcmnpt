import { configureStore } from "@reduxjs/toolkit";
import authSlice from "@/lib/features/authSlice";

export const shoesStore = () => {
  return configureStore({
    reducer: {
      auth: authSlice,
    },
  });
};

export type AppStore = ReturnType<typeof shoesStore>;

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
