import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Profile from './pages/profile';
import Userlogin from './pages/userlogin';
import UserProfile from './pages/UserProfile';


function App() {
  

  return (
    <BrowserRouter>
      <Routes>
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
