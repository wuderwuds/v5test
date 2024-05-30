import { createSlice } from "@reduxjs/toolkit";
import { myInitialData } from "../initialData";

const dataSlice = createSlice({
    name: "data",
    initialState: myInitialData.data,
    reducers:{
        setData(_, action) {
            return action.payload
        },
    }
})

export const { setData } = dataSlice.actions;
export const dataReducer = dataSlice.reducer;