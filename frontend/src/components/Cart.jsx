import { useEffect, useState } from "react";
import CartItem from "./CartItem";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

const Cart = ({cart}) => {

  const [total, setTotal] = useState(null)
  const navigate = useNavigate()

  const getTotal = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/carts/total`)
        if(response.status === 200) {
            setTotal(response.data.response[0].total)
        }
    } catch (error) {
        console.log(error)
    }
  }

  const handleOrder = async () => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/tickets`);
        if(response.status === 201){
            navigate(`/checkout/${response.data.response}`)
        }
    } catch (error) {
        console.error(error)
    }
  }

  useEffect(() => {
    getTotal()      
  }, [cart])
  
  return (
    <div className="mx-40 p-[50px] flex justify-center border rounded-xl mt-5 bg-white shadow-xl shadow-black">
        <div className="flex flex-col gap-5 w-fit ">
            <div className="h-12 relative flex items-center text-black font-poppins font-semibold text-xl w-fit border-2 rounded-lg shadow">
                <p className="w-[400px] text-center border-x">PRODUCT</p>
                <p className="w-[150px] text-center border-x border-[#a6a6a6]">QUANTITY</p>
                <p className="w-[150px] text-center border-x border-[#a6a6a6]">PRICE P/U</p>
                <p className="w-[150px] text-center border-x ">TOTAL PRICE</p>
            </div>
            <div className="flex bg-[#a6a6a6] h-[1px]"></div>

            {
                cart.map(item => <CartItem key={item._id} product={item} />)
            }
            {
                total &&
                <div className="text-black mt-2 flex justify-end px-8 ">
                    <h1 className=" text-right text-lg flex justify-end gap-8">
                        <span className="font-semibold">TOTAL:</span>
                        <span className="font-semibold w-[100px]">${total.toLocaleString()}</span>
                    </h1>
                </div>
            }
            <div className="w-full flex justify-end mt-5">
                <button onClick={handleOrder} className="rounded-full bg-blue-600 text-white text-lg py-2 px-16 font-semibold shadow-lg shadow-blue-300 border-2 border-blue-700">BUY</button>
            </div>
        </div>
    </div>
  )
}
export default Cart