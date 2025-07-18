import { configureStore } from "@reduxjs/toolkit";
import { videoApi } from "@/services/api/videoApi.ts";
import { managerApi } from "../services/api/managerApi.ts";
import { userApi } from "../services/api/userApi";

export const store = configureStore({
  reducer: {
    [managerApi.reducerPath]: managerApi.reducer,
    [videoApi.reducerPath]: videoApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      managerApi.middleware,
      videoApi.middleware,
      userApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
