import { configureStore } from "@reduxjs/toolkit";
import adminReducer from './adminInfo';
import userReducer from './userinfo';

export const store = configureStore({
    reducer: {
        admin: adminReducer, //first reducer that is admin 
        user: userReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;  // define the AppDispatch type