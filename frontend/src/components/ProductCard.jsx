import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/authContext"
import axios from "axios";

axios.defaults.withCredentials = true;

const ProductCard = ({_id, thumbnail, title, price}) => {

  const navigate = useNavigate();
  const { isLogin, user } = useContext(AuthContext);
  
  const handleClick = async () => {
    if(!isLogin) return navigate('/login')

    if(user.role === 'ADMIN') return 

    const data = {
      product_id: _id,
      quantity: 1,
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/carts`, data)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
    
  }

  return (
    <div className="flex flex-col">
      <Link
        to={`/products/${_id}`} 
        className="z-0 relative w-[220px] h-[306px] font-poppins rounded-t-lg overflow-hidden flex flex-col pt-4 bg-white"
      >
          <div className="relative my-0 mx-[10px] w-fit">
              <img className="w-full"  src={`/src/public/images/${thumbnail[0]}`} alt={title} />
          </div>
          <hr className="w-[90%] mt-4" />
          <div className="w-full">
            <div className="pt-[10px] text-lg text-center font-semibold">{title}</div>
            <div className="text-center text-[#1b1b80] font-bold text-lg">${price}</div>
          </div>
      </Link>
      <div className="flex justify-center items-center w-full max-h-50 h-50 bg-white rounded-b-lg">
          <button 
            onClick={handleClick}
            className="w-full bg-black text-white font-semibold border-none rounded-lg my-2 mx-5 py-[5px] px-[20px]"
          >
            ADD TO CART
          </button>
      </div>
    </div>
  )
}

export default ProductCard