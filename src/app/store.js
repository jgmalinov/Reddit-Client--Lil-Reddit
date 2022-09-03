import { configureStore } from '@reduxjs/toolkit';
import SearchBarReducer from '../features/SearchBar/SearchBarSlice';
import MainReducer from '../features/Main/MainSlice';

console.log(SearchBarReducer);

export const store = configureStore({
  reducer: {
    searchBar: SearchBarReducer,
    Main: MainReducer
  },
});
