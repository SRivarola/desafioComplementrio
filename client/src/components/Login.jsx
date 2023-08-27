import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const initialValues = {
    name: '',
    mail: '',
    password: '',
    age: ''
}

const Login = () => {

    const [isLogin, setIsLogin] = useState(true)
    const [data, setData] = useState(initialValues)
    const [errorMessage, setErrorMessage] = useState(null) 

    const navigate = useNavigate()

    const handleChange = (e) => {
        const name = e.target.name
        setData({
            ...data,
            [name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(isLogin){
            if(data.mail && data.password){
                try {
                    
                } catch (error) {
                    setErrorMessage(error.response.data.message)
                }
            } else {
                setErrorMessage('Mail and password are required')
            }
        } else {
            if(data.name && data.mail && data.password) {
                try {
                    const response = await axios.post('http://localhost:8080/api/auth/register', data)
                    console.log(response)
                    if(response.status === 201){
                        navigate('/')
                    }
                } catch (error) {
                    setErrorMessage(error.response.data.message)
                }
            } else {
                setErrorMessage('Name, mail and password are required')
            }
        }
    } 

  return (
    <div className="w-full h-screen flex justify-center items-center">
        <div className="relative w-[500px] bg-white rounded-md p-5 font-poppins">
            <h1 className="w-full text-2xl text-center font-semibold">ACCESS</h1>
            <form className="w-full mt-4 px-10 flex flex-col gap-2" onSubmit={(e) => handleSubmit(e)}>
                {
                    !isLogin ? (
                        <div className="flex relative">
                            <label className="font-semibold">Name:</label>
                            <input 
                                className="px-4 w-full ml-3 border-b-2 transition-all duration-75 focus:outline-none focus:border-b-black placeholder:italic"
                                name="name" 
                                type="text"
                                placeholder="insert your name"
                                value={data.name}
                                onChange={(e) => handleChange(e)}
                                required
                            />
                        </div>
                    ) : (
                        ''
                    )
                }

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
                        type="password"
                        placeholder="insert a password"
                        value={data.password}
                        onChange={(e) => handleChange(e)}
                        required
                    />
                </div>
                {
                    !isLogin ? (
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
                    ) : (
                        ''
                    ) 
                }
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
                        value={isLogin ? 'LOGIN' : 'REGISTER'} 
                    />
                </div>
            </form>
            <div className="text-sm mt-5">
                <p className="font-semibold text-right">New in WhiskeyShop, for register user  
                    <button 
                        onClick={() => setIsLogin(!isLogin)} 
                        className="italic text-blue-700 font-semibold pl-1"
                    >
                        click here!
                    </button></p>
            </div>
        </div>
    </div>
  )
}
export default Login