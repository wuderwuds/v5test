import { createSlice } from "@reduxjs/toolkit";
import { myInitialData } from "../initialData";

const userSlice = createSlice({
    name: "token",
    initialState: myInitialData.token,
    reducers:{
        setToken(_, action) {
            return action.payload
        },
        cleanToken() {           
           return localStorage.removeItem('reduxV5Test')
        }
    }
})

export const { setToken, cleanToken } = userSlice.actions;
export const tokenReducer = userSlice.reducer;