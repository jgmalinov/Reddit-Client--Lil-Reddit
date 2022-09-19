import { configureStore } from '@reduxjs/toolkit';
import SearchBarReducer from '../features/SearchBar/SearchBarSlice';
import MainReducer from '../features/Main/MainSlice';

export const store = configureStore({
  reducer: {
    searchBar: SearchBarReducer,
    Main: MainReducer
  },
});
