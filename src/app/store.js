import { configureStore } from '@reduxjs/toolkit';
import SearchBarReducer from '../features/SearchBar/SearchBarSlice';
import MainReducer from '../features/Main/MainSlice';
import SuggestionsReducer from '../features/Suggestions/suggestionsSlice';
import loadingScreenReducer from '../features/Loading/loadingScreenSlice';

export const store = configureStore({
  reducer: {
    LoadingScreen: loadingScreenReducer,
    searchBar: SearchBarReducer,
    Suggestions: SuggestionsReducer,
    Main: MainReducer
  },
});
