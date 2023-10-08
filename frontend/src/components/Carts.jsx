import axios from "axios"
import { useEffect, useState } from "react"
import Cart from "./Cart"

const cartId = '64db8adf75b9ce7063832702'

const Carts = () => {


    const [totalAmount, setTotalAmount] = useState(null)
    const [cart, setCart] = useState(null)

    useEffect(() => {
      axios.get(`http://localhost:7000/api/carts/${cartId}`)
        .then(res => {
          setCart(res.data.payload)
        })
      axios.get(`http://localhost:7000/api/carts/bills/${cartId}`)
        .then(res => {
          setTotalAmount(res.data.payload)
        })
    }, [])


    
  return (
    <div className="p-20">
      <h1 className="text-center font-caprasimo text-white text-2xl">CARRITO DE COMPRAS</h1>
      {
        cart && totalAmount && <Cart cart={cart} total={totalAmount} />
      }
    </div>
  )
}
export default Carts