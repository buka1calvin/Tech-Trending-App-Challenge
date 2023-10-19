import { configureStore } from "@reduxjs/toolkit";
import responsibilitiesReducer from "./features/ResponsibilitiesSlice";
import productsReducer from "./features/ProductsSlice";
import profileReducer from './features/ProfileSlice';

export const store=()=>{
    return configureStore({
        reducer:{
            products:productsReducer,
            responsibilities:responsibilitiesReducer,
            profile: profileReducer,
        }
    })
}

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];