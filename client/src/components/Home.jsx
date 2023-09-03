import { useContext, useEffect } from 'react'
import banner from '../public/images/bannerJD.jpg'
import { AuthContext } from '../context/authContext'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  
  const { isLogin } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if(!isLogin){
      navigate('/login')
    }
  }, [isLogin]);

  return (
    <div className="z-10">
      <div className='relative w-screen'>
        <img className='w-full' src={banner} alt='banner' />
      </div>

    </div>
  )
}
export default Home