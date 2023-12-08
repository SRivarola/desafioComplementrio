import { useState, useContext} from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { AuthContext } from "../context/authContext";

axios.defaults.withCredentials = true;

const initialValues = {
    email: ''
}

const ForgotPass = () => {
    
    const navigate = useNavigate()

    const [data, setData] = useState(initialValues)
    const [errorMessage, setErrorMessage] = useState(null)

    const handleChange = (e) => {
        const name = e.target.name
        setData({
            ...data,
            [name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(data.email){
            try {
                const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/forgot-password`, data)
                if(response.status === 200){
                    navigate('/recover_pass')
                }
            } catch (error) {
                console.log(error)
                // setErrorMessage(error.response.data.message)
            }
        } else {
            setErrorMessage('Mail is required')
        }

    } 
    return (
        <form className="w-full mt-4 px-10 flex flex-col gap-2">
            <div className="flex relative">
                <label className="font-semibold">Email</label>
                <input 
                    className="px-4 w-full ml-3 border-b-2 transition-all duration-75 focus:outline-none focus:border-b-black"
                    name="email" 
                    type="mail"
                    placeholder="instert your mail"
                    value={data.email}
                    onChange={(e) => handleChange(e)}
                    required
                />
            </div>
            {
                errorMessage ? (
                    <p className="text-center mt-2 text-red-600">*{errorMessage}</p>
                ) : (
                    'Check your email for recover the pass'
                )
            }
            <div className="w-full flex gap-10 justify-center items-center mt-5">
                <button 
                    onClick={(e) => handleSubmit(e)}
                    type="button" 
                    className="cursor-pointer w-[150px] text-white bg-black px-3 py-1 rounded font-semibold" 
                    value=''
                >RECOVER PASS</button>
            </div>
        </form>
  )
}
export default ForgotPass
