import { Link } from "react-router-dom";

const RecoverPass = () => {
    
  return (
    <div className="absolute top-0 w-full h-[100vh] bg-black text-white flex flex-col justify-center items-center gap-10 p-28">
        <h1 className="font-semibold text-2xl">PASS RECOVERY</h1>
        <div className="flex flex-col items-center justify-center text-xl gap-2">
            <p className="">Don't Forget to check your email</p>
            <p className="flex items-center">
                Return to <Link to="/" className="font-bold text-2xl pl-2">HOME</Link>
            </p>
        </div>
    </div>
  )
}
export default RecoverPass