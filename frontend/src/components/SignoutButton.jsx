import React, { useContext } from 'react';
import { PiSignOutBold } from 'react-icons/pi'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { alertError, toastSuccess } from '../helpers/toasts';

axios.defaults.withCredentials = true;

const SignoutButton = () => {

  const { setIsLogin, setUser, user } = useContext(AuthContext)

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/signout`);
      
      if(response.status === 200) {
        toastSuccess(`Bye bye, ${user.mail}`)
        setIsLogin(false)
        setUser(null)
        navigate('/')
      }
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <button className='flex items-center gap-2' onClick={handleClick}><PiSignOutBold className='text-2xl'/></button>
  )
}
export default SignoutButton;
