import { useContext } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { CartContext } from "../context/cartContext";

const CartItem = ({product}) => {
  
    const { product_id: { title, price, thumbnail }, quantity, _id } = product;
    const { deleteCart } = useContext(CartContext);

  return (
    <>
      <div className="relative flex items-center text-black font-semibold font-poppins w-fit" >
        <div className="w-[100px]">
          <img className="w-[100%] h-auto rounded border shadow-lg" src={`${import.meta.env.VITE_BASE_IMG_URL}/${thumbnail[0]}`} alt={title} />
        </div>
        <p className="w-[250px] text-xl pl-3">{title}</p>
        <p className="w-[150px] text-center">{quantity}</p>
        <p className=" w-[150px] text-center">${price.toLocaleString()}</p>
        <p className=" w-[150px] text-center">${(quantity * price).toLocaleString()}</p>
        <p className=" w-[50px] flex justify-center items-center">
          <button onClick={() => deleteCart(_id)} className="p-2 rounded hover:shadow-lg hover:border transition-all duration-200 cursor-pointer text-black hover:text-red-600">
            <FaTrashAlt />
          </button>
        </p>
      </div>
      <div className="w-full bg-[#a6a6a6] h-[1px]"></div>
    </>
  )
}
export default CartItem