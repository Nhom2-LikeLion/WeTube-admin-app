import { configureStore } from "@reduxjs/toolkit";
import { managerApi } from "../services/api/managerApi.ts";


export const store = configureStore({
    reducer:{
        //dangnhap 
        
        [managerApi.reducerPath]: managerApi.reducer,
    },
        middleware:(getDefaultMiddleware) =>
            getDefaultMiddleware().concat(managerApi.middleware),
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;