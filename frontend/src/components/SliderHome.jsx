
import imgArray from '../helpers/sliderHome'
import { useState } from 'react'
import Glider from 'react-glider'
import 'glider-js/glider.min.css'

const SliderHome = () => {

    const [hPic, setHPic] = useState(window.screen.width / 3.3 + "px") 
    
  return (
    <div className={`relative w-full h-[${hPic}] relative overflow-hidden text-white`}>
        <Glider
            hasDots
            slidesToShow={1}
            scrollPropagate
        >
            {
                imgArray.map(item => (
                    <img key={item.id} className='w-[100%]' src={item.url} alt={`banner${item.id}`}/>
                ))
            }
        </Glider>
    </div>
  )
}
export default SliderHome