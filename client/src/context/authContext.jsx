import axios from "axios";
import { useEffect } from "react";
import { createContext, useState } from "react";

export const AuthContext = createContext();

axios.defaults.withCredentials = true;

const AuthContextProvider = ({children}) => {
    const [isLogin, setIsLogin] = useState(true);

    const authCheck = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/auth/check-session'); 
            if(response.data.success){
                setIsLogin(true)
            } else {
                setIsLogin(false)
            }
        } catch (error) {
            console.log(error)
            setIsLogin(false)
        }
    } 

    useEffect( () => {
    /*     authCheck() */
    }, [])

    return (
        <AuthContext.Provider value={{
            isLogin, 
            setIsLogin
        }}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContextProvider;