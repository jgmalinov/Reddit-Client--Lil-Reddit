import { createSlice } from "@reduxjs/toolkit";

const loadingScreenSlice = createSlice({
    name: 'LoadingScreen',
    initialState: {
        loading: true,
        initial: true,
        style: [ {display: 'none'}, {display: 'flex'}, ]
    },
    reducers: {
        toggleLoading: (state, action) => {
            state.loading = action.payload;
        },
        toggleInitial: (state, action) => {
            state.initial = action.payload;
        }
    }
});

export const loadingSelector = (state) => state.LoadingScreen.loading;
export const loadingStyleSelector = (state) => state.LoadingScreen.style;
export const initialSelector = (state) => state.LoadingScreen.initial;
export const {toggleLoading, toggleInitial} = loadingScreenSlice.actions;

export default loadingScreenSlice.reducer;