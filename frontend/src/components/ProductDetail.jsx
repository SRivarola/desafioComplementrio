import { useContext, useState } from "react"
import { AuthContext } from "../context/authContext"
import axios from "axios";

const ProductDetail = ({_id, title, description, price, thumbnail, stock}) => {

    const { isLogin, user } = useContext(AuthContext);
    const [quantity, setQuantity] = useState(1)

    const handleQuantity = (operation) => {
        if(operation === "-"){
            setQuantity(prev => prev - 1)
        }
        if(operation === "+"){
            setQuantity(prev => prev + 1)
        }
    }

    const handleClick = async () => {

        if(!isLogin) return navigate('/login')

        if(user.role === 'ADMIN') return 

        const data = {
            product_id: _id,
            quantity: quantity,
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/carts`, data);

        } catch (error) {
            console.log(error)
        }
        
    }

  return (
    <div className="flex p-32 text-white gap-6 justify-center">
        <div>
            <img className="rounded-lg shadow-black shadow-md" src={`${import.meta.env.VITE_BASE_IMG_URL}/${thumbnail[0]}`} />
        </div>
        <div className="bg-white w-[1px] my-2"></div>
        <div className="flex flex-col justify-between p-5 border rounded-lg bg-white text-black shadow-md shadow-black">
            <h1 className="text-2xl font-semibold">{title}</h1>
            <p className="italic">{description}</p>
            <h3 className="text-2xl">Price ${Number(price).toLocaleString()}</h3>
            <div className="w-full flex gap-2 items-center">
                <div className="flex justify-center">
                    <button 
                        onClick={() => handleQuantity('-')}
                        disabled={quantity === 1} 
                        className={`${quantity === 1 ? 'bg-[#7d7d7d] border-[#7d7d7d]' : 'bg-black border-black'} text-white h-7 w-7 flex justify-center border rounded-l font-bold`}
                    >
                        -
                    </button>
                    <p className="h-7 w-10 flex justify-center border-black border font-bold">{quantity}</p>
                    <button 
                        onClick={() => handleQuantity('+')} 
                        disabled={quantity === stock}
                        className={`${quantity === stock ? 'bg-[#7d7d7d] border-[#7d7d7d]' : 'bg-black border-black'} bg-black text-white h-7 w-7 flex justify-center border border-black rounded-r font-bold`}
                    >
                        +
                    </button>
                </div>
                <button onClick={handleClick} className="w-full text-white bg-black py-2 rounded font-semibold hover:bg-black/50 transition-all duration-300">
                    ADD TO CART
                </button>
            </div>
        </div>
    </div>
  )
}
export default ProductDetail