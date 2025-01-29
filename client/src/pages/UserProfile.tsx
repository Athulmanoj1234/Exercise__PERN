import React, { useEffect, useState } from 'react'
import { url } from '../constants';
import axios from 'axios';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { userDetails } from '../redux/userinfo';
import Userlogin from './userlogin';
import { Link } from 'react-router-dom';

interface userInfo{
  id: string;
  username: string;
  email: string;
  profilephoto: string;
}

interface AdminUserState{
  user: userInfo
  admin: {}
} 
  

const UserProfile = () => {
  
  const [redirect, setRedirect] = useState<boolean>(false);
  const [userDetailDisplay, setUserDetailDisplay] = useState<userInfo | undefined>();
  const navigate: NavigateFunction = useNavigate();

  const { userInfo } = useSelector((state: {user: { userInfo: userInfo }})=> state?.user);
  console.log(userInfo)

  useEffect(()=> {
    if(userInfo){
      setUserDetailDisplay(userInfo);
    }
  }, [userInfo]);

  const handleLogout = async ()=> {
    await axios.post(`${url}/logout`, {}, { withCredentials: true });
  }

  const redirectToLogin = ()=> {
    setRedirect(true);
  }

  if(redirect){
    navigate('/userlogin');
  }
  

  return (
    <div>
      { userDetailDisplay?.email && (  
        <div className='flex flex-col items-end gap-0.3 p-2'>
          <div className='flex pt-6 px-4 gap-3'>
            <img src={userInfo.profilephoto} alt='this' className='rounded-3xl h-12 w-12' />
            <p className='mt-2'>{userInfo.username}</p>
          </div>
        <button onClick={handleLogout} className='mr-6 bg-blue-600 text-white rounded-3xl p-2 hover:bg-blue-800'>logout</button>
        </div> ) }
      { !userDetailDisplay?.email && (
        <div className='flex justify-end gap-4 p-5'>
          <button onClick={redirectToLogin} className='p-2 bg-blue-500 text-white rounded-3xl hover:bg-blue-700 hover:scale-125'>Sign Up</button>
          <button onClick={redirectToLogin} className='p-2 bg-blue-500 text-white rounded-3xl hover:bg-blue-700 hover:scale-125'>Sign In</button>
        </div> )}
     </div>
  )
}

export default UserProfile;
