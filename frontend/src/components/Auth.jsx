import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import ForgotPass from "./ForgotPass";

const Auth = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [forgotPass, setForgotPass] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleToggle = (formType) => {
    setIsRegister(formType === "register");
    setForgotPass(formType === "forgotPass");
    setIsLogin(formType === "login");
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="relative w-[500px] bg-white rounded-md p-5 font-poppins">
        <h1 className="w-full text-2xl text-center font-semibold">ACCESS</h1>

        {isLogin && <Login setForgotPass={() => handleToggle("forgotPass")} />}
        {isRegister && <Register />}
        {forgotPass && <ForgotPass setIsLogin={() => handleToggle("login")} />}

        <div className="text-sm mt-5 flex justify-end">
          <p className="font-semibold">
            {isLogin
              ? 'New in WhiskeyShop?, for register user'
              : forgotPass
              ? 'Return to login'
              : 'Already have an account?, for login'}
          </p>
          <button
            onClick={() => handleToggle(isLogin ? "register" : "login")}
            className="italic text-blue-700 font-semibold pl-1"
          >
            click here!
          </button>
        </div>
        {!forgotPass && (
          <div className="text-sm mt-5 flex justify-end">
            <p className="font-semibold">
              {!forgotPass
                ? 'Forgot your password?, no problem'
                : 'Already have an account?, for login'}
            </p>
            <button
              onClick={() => handleToggle(forgotPass ? "login" : "forgotPass")}
              className="italic text-blue-700 font-semibold pl-1"
            >
              click here!
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
