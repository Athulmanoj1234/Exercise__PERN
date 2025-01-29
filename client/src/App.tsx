import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Profile from './pages/profile';
import Userlogin from './pages/userlogin';
import UserProfile from './pages/UserProfile';
import { Fragment, useEffect } from 'react';
import Header from './components/header/header';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './redux/store';
import { userDetails } from './redux/userinfo';


function App() {
  
  const dispatch = useDispatch<AppDispatch>();

  useEffect(()=> {
    dispatch(userDetails());
  }, [dispatch]);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Header />} />   
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/adminprofile' element={<Profile />}/>
        <Route path='/userlogin' element={<Userlogin />} />
        <Route path='/userprofile' element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
      
  )
}

export default App;
