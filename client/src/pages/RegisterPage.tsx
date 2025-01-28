import { useState } from "react";
import axios from "axios";
import { url } from "../constants";

interface userData{
  username: string;
  password: string 
}

const initialUserData: userData = {
  username: "",
  password: ""
}

const RegisterPage = () => {
  const [userData, setUserData] = useState<userData>(initialUserData);

  const handleChange = (e: any)=> {
    const {name, value} = e.target;

    setUserData({...userData,
      [name]: value, 
    });
  }

  console.log(userData);
  
  const handleSubmit = async (e: React.FormEvent)=> {
    e.preventDefault();
    await axios.post(`${url}/register`, userData);
  }

  
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Register</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={userData.username}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your username"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
              
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full py-3 px-6 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage;
