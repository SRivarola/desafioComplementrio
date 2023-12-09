import axios from "axios"
import { useContext, useEffect, useState } from "react"
import Cart from "../components/Cart"
import { AuthContext } from "../context/authContext"

const Carts = () => {

    const { user } = useContext(AuthContext);
    const [totalAmount, setTotalAmount] = useState(null);
    const [data, setData] = useState(null);
    const [cart, setCart] = useState([]);
    console.log(user)
    const getCart = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/carts/`)
        if(response.status === 200) {
          setData(response.data.response)
          setCart(response.data.response.docs)
        }
      } catch (error) {
        console.log(error)
      }
    }
    useEffect(() => {
      if(user && user.role !== 'ADMIN') getCart()
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