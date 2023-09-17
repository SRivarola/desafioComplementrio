import { useState, useContext } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { AuthContext } from "../context/authContext";
import { BsEyeSlashFill } from "react-icons/bs"

axios.defaults.withCredentials = true;

const initialValues = {
    first_name: '',
    last_name: '',
    mail: '',
    password: '',
    age: ''
}

const Register = () => {

    const [data, setData] = useState(initialValues)
    const [errorMessage, setErrorMessage] = useState(null) 
    const { setIsLogin } = useContext(AuthContext)
    const [seePass, setSeePass] = useState(false)

    const navigate = useNavigate()

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
        if(data.name && data.mail && data.password) {
            try {
                const response = await axios.post('http://localhost:8080/api/auth/register', data)
                if(response.status === 201){
                    setIsLogin(true)
                    navigate('/products')
                }
            } catch (error) {
                setErrorMessage(error.response.data.message)
            }
        } else {
            setErrorMessage('Name, mail and password are required')
        }
    } 

  return (
    <form className="w-full mt-4 px-10 flex flex-col gap-2" onSubmit={(e) => handleSubmit(e)}>
        <div className="flex relative">
            <label className="w-[100px] font-semibold">First Name:</label>
            <input 
                className="px-4 w-full ml-3 border-b-2 transition-all duration-75 focus:outline-none focus:border-b-black placeholder:italic"
                name="fisrt_name" 
                type="text"
                placeholder="insert your name"
                value={data.first_name}
                onChange={(e) => handleChange(e)}
                required
            />
        </div>
        <div className="flex relative">
            <label className="w-[100px] font-semibold">Last Name:</label>
            <input 
                className="px-4 w-full ml-3 border-b-2 transition-all duration-75 focus:outline-none focus:border-b-black placeholder:italic"
                name="last_name" 
                type="text"
                placeholder="insert your name"
                value={data.last_name}
                onChange={(e) => handleChange(e)}
                required
            />
        </div>
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
        <div className="flex relative">
            <label className="font-semibold">Age</label>
            <input 
                className="px-4 w-full ml-3 border-b-2 transition-all duration-75 focus:outline-none focus:border-b-black"
                name="age" 
                type="number"
                placeholder="insert your age"
                value={data.age}
                onChange={(e) => handleChange(e)}
            />
        </div>
        {
            errorMessage ? (
                <p className="text-center mt-2 text-red-600">*{errorMessage}</p>
            ) : (
                ''
            )
        }
        <div className="w-full flex justify-center mt-5">
            <input 
                type="submit" 
                className="cursor-pointer text-white bg-black px-3 py-1 rounded font-semibold" 
                value='REGISTER'
            />
        </div>
    </form>
  )
}
export default Register