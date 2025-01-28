import React, { useEffect } from 'react'
import { url } from '../constants';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { userDetails } from '../redux/userinfo';
import Userlogin from './userlogin';

interface userInfo{
  user: {userInfo: {
    id: string;
    username: string;
    email: string;
    profilephoto: string;
  }};
  admin: {};
}

const UserProfile = () => {
  
  const dispatch = useDispatch<AppDispatch>();

  useEffect(()=> {
    
    dispatch(userDetails());
  }, [dispatch]);

  const { userInfo } = useSelector((state: userInfo)=> state?.user)
  console.log(userInfo);

  const handleLogout = async ()=> {
    await axios.post(`${url}/logout`, {}, { withCredentials: true });
  }

  return (
    <div>
      <Userlogin />
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default UserProfile;
