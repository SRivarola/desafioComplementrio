import { useEffect, useState } from "react"
import CartItem from "./CartItem"
import axios from "axios"

const Cart = ({cart}) => {

  const [total, setTotal] = useState(null)

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

  useEffect(() => {
    getTotal()      
  }, [cart])
  
  return (
    <div className="p-[50px]">
        <div className="flex flex-col gap-5">
            <div className="relative flex items-center text-white font-poppins font-semibold text-xl gap-5">
                <p className="w-[100px]"></p>
                <p className="w-[300px]">PRODUCT</p>
                <p className="w-[150px] text-center">QUANTITY</p>
                <p className="w-[150px] text-center">PRICE P/U</p>
                <p className="w-[150px] text-center">TOTAL PRICE</p>
            </div>
            {
                cart.map(item => <CartItem key={item._id} product={item} />)
            }
            {
                total &&
                <div className="text-white mt-2 w-[920px] flex justify-end px-8">
                    <h1 className="w-[390px] text-right text-lg flex justify-end gap-8">
                        <span>total:</span>
                        <span className="font-semibold">${total.toLocaleString()}</span>
                    </h1>
                </div>
            }
        </div>
    </div>
  )
}
export default Cart