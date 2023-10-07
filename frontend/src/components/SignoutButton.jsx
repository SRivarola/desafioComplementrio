import React, { useContext } from 'react';
import { PiSignOutBold } from 'react-icons/pi'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

axios.defaults.withCredentials = true;

const SignoutButton = () => {
  const { setIsLogin } = useContext(AuthContext)
  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/signout')
      if(response.data.success) {
        setIsLogin(false)
        navigate('/')
      }
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <button className='flex items-center gap-2' onClick={handleClick}>Singout <PiSignOutBold/></button>
  )
}
export default SignoutButton;
