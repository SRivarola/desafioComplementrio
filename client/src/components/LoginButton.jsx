import React from 'react';
import { PiSignInBold } from 'react-icons/pi'
import { Link } from 'react-router-dom';

const LoginButton = () => {
  
  return ( 
    <Link to='/login' className='flex items-center gap-2' >Login <PiSignInBold/></Link>
  )
}
export default LoginButton;