import { configureStore } from "@reduxjs/toolkit";
import { managerApi } from "../services/api/managerApi.ts";
import { channelApi } from '../services/api/channelApi.ts';


export const store = configureStore({
  reducer: {
    [managerApi.reducerPath]: managerApi.reducer,
    [channelApi.reducerPath]: channelApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(managerApi.middleware)
      .concat(channelApi.middleware),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;