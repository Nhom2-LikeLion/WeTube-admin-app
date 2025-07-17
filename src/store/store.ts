import { configureStore } from "@reduxjs/toolkit";
import { managerApi } from "../services/api/managerApi.ts";
import { userApi } from "../services/api/userApi";

export const store = configureStore({
  reducer: {
    //dangnhap

    [managerApi.reducerPath]: managerApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(managerApi.middleware, userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
