import { configureStore } from "@reduxjs/toolkit";
import { getInitState } from "./initialData";
import { tokenReducer } from "./slices/tokenSlace";



export const store = configureStore({
    reducer: {
     token: tokenReducer,
    },
    preloadedState: getInitState(),
});
store.subscribe(() => localStorage.setItem('reduxV5Test', JSON.stringify(store.getState())));
