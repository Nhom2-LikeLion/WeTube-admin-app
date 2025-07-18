import { configureStore } from "@reduxjs/toolkit";
import { videoApi } from "@/services/api/videoApi.ts";
import { managerApi } from "../services/api/managerApi.ts";
<<<<<<< HEAD
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
=======
import { videoApi } from "../services/api/videoApi.ts";
import { authApi } from "../services/api/authApi.ts";


export const store = configureStore({
    reducer:{
        //dangnhap 
        
        [managerApi.reducerPath]: managerApi.reducer,
        [videoApi.reducerPath]: videoApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
    },
        middleware:(getDefaultMiddleware) =>
            getDefaultMiddleware()
                 .concat(managerApi.middleware)
                 .concat(videoApi.middleware)
                 .concat(authApi.middleware),
})

>>>>>>> a363cefb7061dbe24e92b3183f0a255fa9b7f3ff

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
