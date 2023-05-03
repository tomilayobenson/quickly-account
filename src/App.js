import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Login from './views/Login';
import Signup from './views/Signup';
import Profile from './views/Profile';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='signup' element={<Signup />} />
        <Route path='profile' element={<Profile />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
