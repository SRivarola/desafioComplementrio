import { useContext, useEffect } from 'react'
import { AuthContext } from '../context/authContext'
import { useNavigate } from 'react-router-dom'
import SliderHome from './SliderHome'
import SelectedBrands from './SelectedBrands'

const Home = () => {
  
  const { isLogin } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if(!isLogin){
      navigate('/login')
    }
  }, [isLogin]);

  return (
    <div className='flex flex-col r'>
      <SliderHome />
      <SelectedBrands />
    </div>
  )
}
export default Home