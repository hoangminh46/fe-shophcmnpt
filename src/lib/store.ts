import { configureStore } from "@reduxjs/toolkit";
import authSlice from "@/lib/features/authSlice";
import appSlice from "@/lib/features/appSlice";

export const shoesStore = () => {
  return configureStore({
    reducer: {
      auth: authSlice,
      app: appSlice,
    },
  });
};

export type AppStore = ReturnType<typeof shoesStore>;

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
