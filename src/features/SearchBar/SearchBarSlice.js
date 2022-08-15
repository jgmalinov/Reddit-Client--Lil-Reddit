import { createSlice, current } from "@reduxjs/toolkit";

const SearchBarSlice = createSlice({
    name: 'SearchBar',
    initialState: {
        after: '',
        before: '',
        firstCall: true, 
    },
    reducers: {
        updateBeforeAndAfter: (state, action) => {
            state.after = action.payload.after;
            state.before = action.payload.before;
            
        },
        toggleFirstCall: (state, action) => {
            state.firstCall = false;
        }
    }
})

export const selectAfter = (state) => state.searchBar.after;
export const selectBefore = (state) => state.searchBar.before;
export const selectFirstCall = (state) => state.searchBar.firstCall;

export const { updateBeforeAndAfter, toggleFirstCall } = SearchBarSlice.actions;
export default SearchBarSlice.reducer;

const instance = updateBeforeAndAfter({hleb: 2, meso: 14});
console.log(instance);
