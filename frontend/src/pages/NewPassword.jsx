import { useNavigate, useParams } from "react-router-dom"
import { BsEyeSlashFill } from "react-icons/bs"
import { useState } from "react"
import axios from "axios"

axios.defaults.withCredentials = true;

const initialValues = {
    password: ''
}
const NewPassword = () => {

    const { token } = useParams();
    const [seePass, setSeePass] = useState(false);
    const [data, setData] = useState(initialValues);
    const navigate = useNavigate()

    const handleMouseDown = () => {
        setSeePass(true);
    };

    const handleMouseUp = () => {
        setSeePass(false);
    };

    const handleChange = (e) => {
        const name = e.target.name
        setData({
            [name]: e.target.value
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            if(data.password){
                const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/auth/reset_pass`, { token, ...data });
                console.log(response)
                if(response.status === 200) {
                    navigate('/login')
                }
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

  return (
    <div className="flex justify-center items-center w-full h-[100vh] absolute top-0 left-0">
        <form 
            onSubmit={(e) => handleSubmit(e)}
            className="bg-white rounded-xl p-6 w-[450px] mt-4 px-10 flex flex-col gap-2"
        >
            <div className="flex relative">
                <label className="font-semibold w-fit">New Password:</label>
                <input 
                    className="px-4 ml-3 border-b-2 transition-all duration-75 focus:outline-none focus:border-b-black"
                    name="password" 
                    type={seePass ? "text" : "password"}
                    placeholder="insert a password"
                    value={data.password}
                    onChange={(e) => handleChange(e)}
                    required
                />
                <BsEyeSlashFill className="absolute right-[8px] top-[2px] cursor-pointer" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} />            
            </div>
            <div className="w-full flex gap-10 justify-center items-center mt-5">
                <input 
                    type="submit" 
                    className="cursor-pointer w-[150px] text-white bg-black px-3 py-1 rounded font-semibold" 
                    value='CONFIRM'
                />
            </div>
        </form>
    </div>
  )
}
export default NewPassword