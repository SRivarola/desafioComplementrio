import axios from "axios";
import { useEffect } from "react";
import { createContext, useState } from "react";

export const AuthContext = createContext();

axios.defaults.withCredentials = true;

const AuthContextProvider = ({children}) => {

    const [isLogin, setIsLogin] = useState(false);
    const [isGitLogin, setIsGitLogin] = useState(false)
    const [user, setUser] = useState(null)

    const authCheck = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/auth/current`); 
            if(response.data.success){
                setIsLogin(true)
                setUser(response.data.user)
            } else {
                setIsLogin(false)
            }
        } catch (error) {
            setIsLogin(false)
        }
    } 

    useEffect( () => {
        authCheck()
    }, [isLogin])

    return (
        <AuthContext.Provider value={{
            isLogin, 
            setIsLogin,
            setUser,
            user, 
            setIsGitLogin,
            isGitLogin
        }}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContextProvider;