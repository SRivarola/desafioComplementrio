import { useState, useContext } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { AuthContext } from "../context/authContext";
import { BsEyeSlashFill } from "react-icons/bs"
import { AiFillGithub } from "react-icons/ai"
import { toastSuccess } from "../helpers/toasts";

axios.defaults.withCredentials = true;

const initialValues = {
    mail: '',
    password: ''
}

const Login = () => {

    const navigate = useNavigate()

    const [data, setData] = useState(initialValues)
    const [errorMessage, setErrorMessage] = useState(null)
    const { setIsLogin, setUser } = useContext(AuthContext) 
    const [seePass, setSeePass] = useState(false)

    const handleChange = (e) => {
        const name = e.target.name
        setData({
            ...data,
            [name]: e.target.value
        })
    }

    const handleMouseDown = () => {
        setSeePass(true)
    }

    const handleMouseUp = () => {
        setSeePass(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(data.mail && data.password){
            try {
                const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/login`, data)
                console.log(response)
                if(response.status === 200){
                    toastSuccess(`Bienvenido, ${response.data.user.mail}!`)
                    setIsLogin(true)
                    navigate('/products')
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            setErrorMessage('Mail and password are required')
        }

    } 


  return (
        <form className="w-full mt-4 px-10 flex flex-col gap-2">
            <div className="flex relative">
                <label className="font-semibold">Email</label>
                <input 
                    className="px-4 w-full ml-3 border-b-2 transition-all duration-75 focus:outline-none focus:border-b-black"
                    name="mail" 
                    type="mail"
                    placeholder="instert your mail"
                    value={data.mail}
                    onChange={(e) => handleChange(e)}
                    required
                />
            </div>
            <div className="flex relative">
                <label className="font-semibold">Password</label>
                <input 
                    className="px-4 w-full ml-3 border-b-2 transition-all duration-75 focus:outline-none focus:border-b-black"
                    name="password" 
                    type={seePass ? "text" : "password"}
                    placeholder="insert a password"
                    value={data.password}
                    onChange={(e) => handleChange(e)}
                    required
                />
                <BsEyeSlashFill className="absolute right-[8px] top-[2px] cursor-pointer" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} />            
            </div>
            {
                errorMessage ? (
                    <p className="text-center mt-2 text-red-600">*{errorMessage}</p>
                ) : (
                    ''
                )
            }
            <div className="w-full flex gap-10 justify-center items-center mt-5">
                <button 
                    onClick={(e) => handleSubmit(e)}
                    type="button" 
                    className="cursor-pointer w-[150px] text-white bg-black px-3 py-1 rounded font-semibold" 
                    value=''
                >LOGIN</button>
                <p className="font-semibold">or</p>
                <a
                    href={`${import.meta.env.VITE_BASE_URL}/auth/github`}
                    className="flex items-center justify-center gap-3 cursor-pointer w-[150px] text-white bg-black px-3 py-1 rounded font-semibold"
                >
                    LOGIN WITH <AiFillGithub className="text-[20px]"/>
                </a>
            </div>
        </form>
  )
}
export default Login