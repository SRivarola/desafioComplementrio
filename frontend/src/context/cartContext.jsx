import axios from 'axios';
import { createContext, useEffect, useState, useContext } from "react";
import { AuthContext } from './authContext';
import { toastSuccess } from '../helpers/toasts';

axios.defaults.withCredentials = true;

export const CartContext = createContext();

const CartContextProvider = ({children}) => {

    const {isLogin, user} = useContext(AuthContext);

    const [isCart, setIsCart] = useState(false)
    const [cart, setCart] = useState(null);
    const [total, setTotal] = useState(null)
    
    const getCart = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/carts/`)
        if(response.status === 200) {
            setCart(response.data.response)
            setIsCart(true)
        } else {
            setCart(null)
        }
      } catch (error) {
        setCart(null)
      }
    };

    const deleteCart = async (id) => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/carts/${id}`);
            if(response.status === 200) {
                toastSuccess('Product deleted!')
                setIsCart(prev => !prev)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const emptyCart = async () => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/carts`);
            console.log(response)
            if(response.status === 200) {
                toastSuccess('The cart is empty')
                setIsCart(prev => !prev);
            };
        } catch (error) {
            console.error(error)
        }
    }

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
        if(isLogin && user && user.role !== 'ADMIN') {
            getCart()
            getTotal()
        }
    }, [isLogin, isCart])

    return (
        <CartContext.Provider value={{
            isCart,
            setIsCart,
            cart,
            deleteCart,
            emptyCart,
            total
        }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider;