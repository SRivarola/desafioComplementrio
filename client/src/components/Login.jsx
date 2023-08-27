import { useState } from "react";
import axios from 'axios';

const Login = () => {

    const [isLogin, setIsLogin] = useState(true)
  
    const handleSubmit = async (e) => {
        e.preventDefault()
        let formData = new FormData(e.currentTarget);
        axios.post('http://localhost:8080/api/auth/register', formData)
            .then(res => console.log(res))
            .catch(err => console.log(err))    
    } 

  return (
    <div className="w-full h-screen flex justify-center items-center">
        <div className="relative w-[50%] bg-white rounded p-5">
            <h1 className="w-full text-center font-semibold">ACCESS</h1>
            <form className="w-full" onSubmit={(e) => handleSubmit(e)}>
                {
                    !isLogin ? (
                        <div>
                            <label>Name</label>
                            <input 
                                name="name" 
                                type="text"
                                required
                            />
                        </div>
                    ) : (
                        ''
                    )
                }

                <div>
                    <label>Email</label>
                    <input 
                        name="mail" 
                        type="mail"
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input 
                        name="password" 
                        type="password"
                        required
                    />
                </div>
                <div>
                    <label>Photo</label>
                    <input 
                        name="photo" 
                        type="file"
                    />
                </div>
                <div>
                    <label>Age</label>
                    <input 
                        name="age" 
                        type="number"
                    />
                </div>
                <div className="w-full flex justify-center">
                    <input type="submit" className="cursor-pointer" value={isLogin ? 'LOGIN' : 'REGISTER'} />
                </div>
            </form>
            <div className="text-xs mt-5">
                <p className=" text-right">New in WhikeyShop, for register user 
                    <button 
                        onClick={() => setIsLogin(!isLogin)} 
                        className="italic text-blue-700 font-semibold"
                    >
                        click here!
                    </button></p>
            </div>
        </div>
    </div>
  )
}
export default Login