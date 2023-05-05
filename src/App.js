import React from 'react';
import './App.css';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Login from './views/Login';
import Signup from './views/Signup';
import Profile from './views/Profile';

function App() {
  return (
    <>
      <Header />
      <div className="d-flex flex-column justify-content-center mt-5" data-testid="landing-view">
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='signup' element={<Signup />} />
          <Route path='profile' element={<Profile />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
