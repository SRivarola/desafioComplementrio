import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/authContext"
import axios from "axios";
import { CartContext } from "../context/cartContext";
import { alertError, toastSuccess } from "../helpers/toasts";

axios.defaults.withCredentials = true;

const ProductCard = ({_id, thumbnail, title, price, owner}) => {

  const navigate = useNavigate();
  const { isLogin, user } = useContext(AuthContext);
  const { setIsCart } = useContext(CartContext);

  const handleClick = async () => {
    if(!isLogin) return navigate('/login')

    if(user.role === 'ADMIN') return 
    
    const data = {
      product_id: _id,
      quantity: 1,
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/carts`, data);
      if(response.status === 201) {
        toastSuccess('Product added!');
        setIsCart(prev => !prev);
      } else{
        alertError('Something went wrong, try again!');
      }
    } catch (error) {
      alertError('Something went wrong, try again!');
    }
    
  }

  return (
    <div className="flex flex-col">
      <Link
        to={`/products/${_id}`} 
        className="z-0 relative w-[220px] h-[308px] font-poppins rounded-t-lg overflow-hidden flex flex-col pt-4 bg-white"
      >
          <div className="relative my-0 mx-0 px-[10px] w-full flex justify-center">
              <img className="max-h-[200px]"  src={`${import.meta.env.VITE_BASE_IMG_URL}/${thumbnail[0]}`} alt={title} />
          </div>
          <hr className="w-[90%] mt-4" />
          <div className="w-full">
            <div className="pt-[10px] text-lg text-center font-semibold">{title}</div>
            <div className="text-center text-[#1b1b80] font-bold text-lg">${price}</div>
          </div>
      </Link>
      <div className="flex justify-center items-center w-full max-h-12 h-12 bg-white rounded-b-lg">
        { 
          user?._id === owner ? null 
          : (
                <button 
                  onClick={handleClick}
                  className="w-full bg-black text-white font-semibold border-none rounded-lg my-2 mx-5 py-[5px] px-[20px]"
                >
                  ADD TO CART
                </button>
          )
        }
      </div>
    </div>
  )
}

export default ProductCard