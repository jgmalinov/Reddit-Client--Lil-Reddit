import React from 'react';
import SearchBar from '../src/features/SearchBar/SearchBar';
import { Main } from './features/Main/Main';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoadingScreen from './features/Loading/loadingScreen';
import './App.css';
import {animationCreator} from './Animations';

window.onload = animationCreator;




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
