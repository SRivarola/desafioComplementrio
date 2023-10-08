import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import SliderHome from './SliderHome'
import SelectedBrands from './SelectedBrands'

const Home = () => {
  
  const navigate = useNavigate()

  const authCheck = async () => {
      try {
          const response = await axios.get('http://localhost:7000/api/auth/check-session'); 
          if(!response.data.success){
            navigate('/login')
          }
      } catch (error) {
        navigate('/login')
        console.log(error)
      }
  } 

  useEffect( () => {
      authCheck()
  }, [])

  return (
    <div className='flex flex-col r'>
      <SliderHome />
      <SelectedBrands />
    </div>
  )
}
export default Home