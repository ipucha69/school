import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";

export const index = configureStore({
    reducer: {
        app: appSlice,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
            // Ignore these action types
        },
    }),
});
