import axios from "axios"
import { useContext } from "react"
import { AuthContext } from "../context/authContext"
import { useNavigate } from "react-router-dom";

const Premium = () => {

    const { user, setUser } = useContext(AuthContext);

    const navigate = useNavigate()

    const handleClick = async() => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/auth/premium/${user._id}`);
            if(response.status === 200) {
                setUser(response.data);
                navigate('/new_product')
            }
        } catch (error) {
            
        }
    }
    
  return (
    <div className="absolute top-0 w-full h-[100vh] bg-black text-white flex flex-col justify-center items-center gap-10 p-28">
        <h1 className="font-semibold text-2xl">USER PREMIUM</h1>
        <div className="flex flex-col items-center justify-center text-xl gap-2">
            <p className="">WANT TO SELL IN WHISKEY SHOP?</p>
            <p className="flex items-center">
                UPGRADE TO <button onClick={handleClick} className="font-bold text-2xl pl-2">PREMIUM</button>
            </p>
        </div>
    </div>
  )
}
export default Premium