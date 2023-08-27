import { useState } from "react"

const Login = () => {

    const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="w-full h-screen flex justify-center items-center">
        <div className="relative w-[50%] bg-white rounded p-5">
            <h1 className="w-full text-center font-semibold">ACCESS</h1>
            <form className="w-full">
                {
                    !isLogin ? (
                        <div>
                            <lable>Name</lable>
                            <input />
                        </div>
                    ) : (
                        ''
                    )
                }

                <div>
                    <lable>Email</lable>
                    <input />
                </div>
                <div>
                    <lable>Password</lable>
                    <input />
                </div>
                {
                    !isLogin ? (
                        <div>
                            <lable>Confirm Password</lable>
                            <input />
                        </div>
                    ) : (
                        ''
                    )
                }

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