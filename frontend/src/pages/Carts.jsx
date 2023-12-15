import axios from "axios"
import { useContext, useEffect, useState } from "react"
import Cart from "../components/Cart"
import { AuthContext } from "../context/authContext"
import { CartContext } from "../context/cartContext"

const Carts = () => {

    const { cart } = useContext(CartContext);
    
  return (
    <div className="p-20">
      <h1 className="text-center font-caprasimo text-white text-2xl">CARRITO DE COMPRAS</h1>

      {
        cart?.docs?.length 
          ? <Cart cart={cart.docs} /> 
          : <div className="text-white font-semibold text-2xl text-center mt-20">
              <h3>Don't have products in Cart.</h3>
            </div>
      }
    </div>
  )
}

export default Carts