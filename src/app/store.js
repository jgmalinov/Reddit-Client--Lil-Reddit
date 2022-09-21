import { configureStore } from '@reduxjs/toolkit';
import SearchBarReducer from '../features/SearchBar/SearchBarSlice';
import MainReducer from '../features/Main/MainSlice';
import SuggestionsReducer from '../features/Suggestions/suggestionsSlice';

export const store = configureStore({
  reducer: {
    searchBar: SearchBarReducer,
    Suggestions: SuggestionsReducer,
    Main: MainReducer
  },
});
