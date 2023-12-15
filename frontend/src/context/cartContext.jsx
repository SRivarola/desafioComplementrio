import axios from 'axios';
import { createContext, useEffect, useState, useContext } from "react";
import { AuthContext } from './authContext';

axios.defaults.withCredentials = true;

export const CartContext = createContext();

const CartContextProvider = ({children}) => {

    const {isLogin, user} = useContext(AuthContext);

    const [isCart, setIsCart] = useState(false)
    const [cart, setCart] = useState(null);
    console.log(isCart)
    const getCart = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/carts/`)
        if(response.status === 200) {
            setCart(response.data.response)
            setIsCart(true)
        }
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
        if(isLogin && user && user.role !== 'ADMIN') {
            getCart()
        }
    }, [isLogin, isCart])

    return (
        <CartContext.Provider value={{
            isCart,
            setIsCart,
            cart
        }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider;