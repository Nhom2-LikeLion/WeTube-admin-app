import { configureStore } from "@reduxjs/toolkit";
import { managerApi } from "../services/api/managerApi.ts";
import { videoApi } from "../services/api/videoApi.ts";


export const store = configureStore({
    reducer:{
        //dangnhap 
        
        [managerApi.reducerPath]: managerApi.reducer,
        [videoApi.reducerPath]: videoApi.reducer,
    },
        middleware:(getDefaultMiddleware) =>
            getDefaultMiddleware()
                 .concat(managerApi.middleware)
                 .concat(videoApi.middleware),
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;