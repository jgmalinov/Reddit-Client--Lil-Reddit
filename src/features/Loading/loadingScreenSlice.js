import { createSlice } from "@reduxjs/toolkit";

const loadingScreenSlice = createSlice({
    name: 'LoadingScreen',
    initialState: {
        loading: true,
        style: [ {display: 'none'}, {display: 'flex'}, ]
    },
    reducers: {
        toggleLoading: (state, action) => {
            state.loading = action.payload;
        }
    }
});

export const loadingSelector = (state) => state.LoadingScreen.loading;
export const loadingStyleSelector = (state) => state.LoadingScreen.style;
export const {toggleLoading} = loadingScreenSlice.actions;

export default loadingScreenSlice.reducer;