import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productsSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
    reducer: {
        products: productReducer,
        user: userReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;