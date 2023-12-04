import { NavLink, Link } from 'react-router-dom'
import logo from '../public/images/logo.jpg'
import { useContext, useEffect, useState } from 'react';
import SignoutButton from './SignoutButton';
import LoginButton from './loginButton';
import { AuthContext } from '../context/authContext';
import { FiShoppingCart } from "react-icons/fi";
import axios from 'axios';

const NavBar = () => {
  
  const {isLogin, user} = useContext(AuthContext);
  const [isCart, setIsCart] = useState(false)

  const getCart = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/carts/`)
      if(response.status === 200) {
        setIsCart(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCart()
  }, []) 

  return (
    <nav className="relative flex justify-evenly items-center p-4 h-[100px] bg-[#7d5e3a] border-b-2 border-b-[#d5d6c5] text-white z-20">
        <div className='w-[300px] flex gap-12'>
          <NavLink to='/products' className='font-semibold' >Products</NavLink>
          {user?.role === 'USER' && <NavLink to='/premium' className='font-semibold' >Premium</NavLink>}
        </div>
        <div className='relative flex justify-center w-[300px]'>
          <Link to='/' className='relative w-[150px]'>
            <img className='absolute left-0 top-[-25px] w-[150px] h-[150px] rounded-full border-2 border-[#d5d6c5]' src={logo} alt='logo'/>
          </Link>
        </div>
        {
          isLogin ? (
              <div className='flex justify-center items-center gap-2 w-[300px]'>
                <div className='flex gap-2'>
                  <div>
                    <img className='rounded-full ' src={user?.photo} alt='avatar'/>
                  </div>
                  <div>
                    <p className='capitalize font-semibold'>{`${user.first_name} ${user.last_name}`}</p>
                    <p className='text-sm italic'>{user.mail}</p>
                  </div>
                </div>
                <SignoutButton />
                { 
                  user.role !== 'ADMIN' && 
                    <Link to='carts' className='relative' >
                      <FiShoppingCart className='text-2xl ml-10'/>
                      {
                        isCart &&
                        <span className='absolute top-[-1px] right-[-5px] flex justify-center items-center bg-red-600 h-2 w-2 rounded-full text-center text-[11px] font-semibold'></span>
                      }
                    </Link>
                }
              </div>
            ) : <LoginButton />
        }
    </nav>
  )
}
export default NavBar