import { createSlice } from "@reduxjs/toolkit";

const SearchBarSlice = createSlice({
    name: 'SearchBar',
    initialState: {
        after: '',
        before: '',
        beforeList: [],
        lastSearch: '',
        firstCall: true,
        sortCriteria: 'relevance'
    },
    reducers: {
        updateBeforeAndAfter: (state, action) => {
            const scenario = action.payload.scenario;
            switch (scenario) {
                case 'newSearch' || 'sort':
                    state.before = null;
                    state.after = action.payload.after;
                    break
                case 'next':
                    state.beforeList.push(state.before);
                    state.before = state.after;
                    state.after = action.payload.after;
                    break
                default:
                    state.after = state.before;
                    state.before = state.beforeList.pop();
            };
        },
        toggleFirstCall: (state, action) => {
            state.firstCall = false;
        },
        setLastSearch: (state, action) => {
            state.lastSearch = action.payload;
        },
        setSortCriteria: (state, action) => {
            state.sortCriteria = action.payload;
        }
    }
})

export const selectAfter = (state) => state.searchBar.after;
export const selectBefore = (state) => state.searchBar.before;
export const selectFirstCall = (state) => state.searchBar.firstCall;
export const selectLastSearch = (state) => state.searchBar.lastSearch;
export const selectSortCriteria = (state) => state.searchBar.sortCriteria;

export const { updateBeforeAndAfter, toggleFirstCall, setLastSearch, setSortCriteria } = SearchBarSlice.actions;
export default SearchBarSlice.reducer;