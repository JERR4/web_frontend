import { combineReducers, configureStore } from "@reduxjs/toolkit";

import partsReducer from './slices/partsSlice';


const rootReducer = combineReducers({

    parts: partsReducer,

});

const store = configureStore({
    reducer: rootReducer,
    
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;