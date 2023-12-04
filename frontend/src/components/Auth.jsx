import { useState } from "react"
import Login from "./Login"
import Register from "./Register"

const Auth = () => {

    const [isRegister, setIsRegister] = useState(true)

  return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="relative w-[500px] bg-white rounded-md p-5 font-poppins">
            <h1 className="w-full text-2xl text-center font-semibold">ACCESS</h1>
            {
                isRegister ?
                    <Login /> 
                :
                    <Register setIsRegister={setIsRegister} />
            }
            <div className="text-sm mt-5 flex justify-end">
                <p className="font-semibold">
                    {
                        isRegister ? (
                            'New in WhiskeyShop?, for register user'
                        ) : (
                            'Already have an account?, for login'
                        )
                    }
                </p>  
                <button 
                    onClick={() => setIsRegister(!isRegister)} 
                    className="italic text-blue-700 font-semibold pl-1"
                >
                    click here!
                </button>
            </div>
        </div>
    </div>
  )
}
export default Auth