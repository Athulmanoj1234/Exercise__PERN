import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { AppDispatch } from '../redux/store';
import { adminDetails } from '../redux/adminInfo';
import { url } from '../constants';

const Profile = () => {

  const dispatch = useDispatch<AppDispatch>();

  useEffect(()=> {
     dispatch(adminDetails());
   }, []);

   const adminLogout = async ()=> {
    await axios.post(`${url}/adminlogout`, {}, { withCredentials: true });
   }
    
   return (
    <div>
     hii profile
    <button onClick={adminLogout}>logout</button> 
    </div>
  )
}

export default Profile;
