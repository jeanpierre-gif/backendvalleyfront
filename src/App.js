import './App.css';
import React from 'react';
import Login from './pages/LoginPage/Login';
import {Route, Routes} from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
const App=()=> {
  return (
    <div>
      <Routes>
         <Route path='/login' element={<Login/>} />
         <Route path='/' element={<MainPage/>} />
      </Routes>
    </div>
  );
}

export default App;
