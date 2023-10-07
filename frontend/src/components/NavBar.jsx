import { NavLink, Link } from 'react-router-dom'
import logo from '../public/images/logo.jpg'
import { useContext } from 'react';
import SignoutButton from './SignoutButton';
import LoginButton from './loginButton';
import { AuthContext } from '../context/authContext';

const NavBar = () => {
  
  const {isLogin} = useContext(AuthContext);

  return (
    <nav className="relative flex justify-evenly items-center p-4 h-[100px] bg-[#7d5e3a] border-b-2 border-b-[#d5d6c5] text-white z-20">
        <NavLink to='/products' className='font-semibold' >Products</NavLink>
        <Link to='/' className='relative w-[150px]'><img className='absolute left-0 top-[-25px] w-[150px] h-[150px] rounded-full border-2 border-[#d5d6c5]' src={logo} alt='logo'/></Link>
        {
          isLogin ? <SignoutButton /> : <LoginButton />
        }
    </nav>
  )
}
export default NavBar