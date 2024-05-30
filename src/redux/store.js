import { configureStore } from "@reduxjs/toolkit";
import { getInitState } from "./initialData";
import { tokenReducer } from "./slices/tokenSlace";
import { dataReducer } from "./slices/dataSlace";



export const store = configureStore({
    reducer: {
     token: tokenReducer,
     data: dataReducer,
    },
    preloadedState: getInitState(),
});
store.subscribe(() => localStorage.setItem('reduxV5Test', JSON.stringify(store.getState())));
