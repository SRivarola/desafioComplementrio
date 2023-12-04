import axios from "axios"
import { useEffect, useState } from "react"
import Cart from "./Cart"

const Carts = () => {

    const [totalAmount, setTotalAmount] = useState(null)
    const [cart, setCart] = useState([])

    const getCart = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/carts/`)
        if(response.status === 200) {
          setCart(response.data.response)
        }
      } catch (error) {
        console.log(error)
      }
    }
    useEffect(() => {
      getCart()
    }, [])


    
  return (
    <div className="p-20">
      <h1 className="text-center font-caprasimo text-white text-2xl">CARRITO DE COMPRAS</h1>
      {
        cart.length && <Cart cart={cart} /> 
      }
    </div>
  )
}

export default Carts