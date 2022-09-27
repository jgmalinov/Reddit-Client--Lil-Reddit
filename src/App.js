import React from 'react';
import SearchBar from '../src/features/SearchBar/SearchBar';
import { Main } from './features/Main/Main';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoadingScreen from './features/Loading/loadingScreen';
import { useEffect } from 'react';
import './App.css';
import { loadingScreenRemover } from './features/Utilities/Utilities';

/*
<Route path='/Login' element={<Login />}></Route>
<Route path='/About' element={<About />}></Route>
<Route path='/Profile' element={<Profile />}>
  <Route path='/Personal-Data' element={<Personal />}></Route>
  <Route path='/Favorite-topics' element={<FavoriteTopics />}></Route>
</Route>
<Route path='/' element={<SearchBar />}></Route>
<Route path='/' element={<Main />}>
  <Route index element={<TopicalBar />}></Route>
</Route>
*/



function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={
            <div id='content'>
              <LoadingScreen />
              <SearchBar />
              <Main />
            </div>
          }></Route>
        </Routes>
      </Router>
    </div>
  );
}



export default App;
