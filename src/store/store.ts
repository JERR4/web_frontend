import { configureStore, ThunkDispatch } from "@reduxjs/toolkit";
import partsReducer from "./slices/partsSlice.ts";
import userReducer from "./slices/userSlice.ts";
import shipmentsReducer from "./slices/shipmentsSlice";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

export const store = configureStore({
    reducer: {
        parts: partsReducer,
        user: userReducer,
        shipments: shipmentsReducer
    }
});
export type AppThunkDispatch = ThunkDispatch<RootState, never, never>
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
