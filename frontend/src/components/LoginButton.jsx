import React from 'react';
import { PiSignInBold } from 'react-icons/pi'
import { Link } from 'react-router-dom';

const LoginButton = () => {
  
  return ( 
    <Link to='/login' className='flex items-center gap-2 bg-slate-400/40 rounded-full py-3 px-5 font-semibold' ><PiSignInBold className='text-2xl' /> login</Link>
  )
}
export default LoginButton;