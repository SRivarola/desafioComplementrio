import { NavLink, Link } from 'react-router-dom'
import logo from '../public/images/logo.jpg'
import { PiSignOutBold } from 'react-icons/pi'

const NavBar = () => {
  return (
    <nav className="relative flex justify-evenly items-center p-4 h-[100px] bg-[#7d5e3a] border-b-2 border-b-[#d5d6c5] text-white z-20">
        <NavLink to='/products' className='font-semibold' >Products</NavLink>
        <Link to='/' className='relative w-[150px]'><img className='absolute left-0 top-[-25px] w-[150px] h-[150px] rounded-full border-2 border-[#d5d6c5]' src={logo} alt='logo'/></Link>
        <button className='flex items-center gap-2'>Singout <PiSignOutBold/></button>
    </nav>
  )
}
export default NavBar