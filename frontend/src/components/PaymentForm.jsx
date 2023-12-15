import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/cartContext';

axios.defaults.withCredentials = true;

const PaymentForm = () => {

    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [cartAll, setCartAll] = useState([]);
    const { setIsCart } = useContext(CartContext)


    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: 'if_required'
        })
        if (!error) {
            cartAll.forEach( async (cart) => {
                await axios.put(
                    `${import.meta.env.VITE_BASE_URL}/products/${cart.product_id._id}`, 
                    {quantity: cart.quantity}
                )
                await axios.put(
                    `${import.meta.env.VITE_BASE_URL}/carts/${cart._id}`,
                    {state: 'paid'}
                )
                setIsCart(prev => !prev)
            })
            navigate('/')
        } else {
            console.log(error);
        }
    }

    const getCart = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/carts/all`);
            if(response.status === 200) {
                setCartAll(response.data.response)
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
      getCart()
    }, [])
    

    return <>
        <form>
            <PaymentElement />
            <div className="w-full flex justify-center mt-5">
                <button
                    className="bg-blue-600 text-white py-2 px-10 rounded-full font-semibold text-lg shadow-lg shadow-blue-300"
                    onClick={handleSubmit}
                >
                    PAY
                </button>
            </div>
        </form>
    </>
}
export default PaymentForm;