import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const Checkout = () => {

    const { oid } = useParams()
    const [order, setOrder] = useState(null)

    const getOrder = async () => {
        try {
           const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/tickets/${oid}`);
           if(response.status === 200) {
                setOrder(response.data.response)
           }
           console.log(response)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
      oid && getOrder()
    }, [oid])
    
  return (
    <>
        {
            order ? (
                <div className="w-full h-[100vh] absolute top-0 left-0 pt-24 flex justify-center items-center">
                    <div className="bg-white p-14 rounded-lg flex flex-col gap-5">
                        <h3 className="font-semibold uppercase text-lg w-full text-center">Purchase Order</h3>
                        <div>
                            <p>Order: <span className="font-semibold pl-1">{order.code}</span></p>
                            <p>Amount: <span className="font-semibold pl-1">${order.amount.toLocaleString()}</span></p>
                        </div>
                        <div className="flex justify-center">
                            <button className="font-semibold bg-blue-600 text-white text-lg rounded-full py-2 px-16 shadow-lg shadow-blue-300">PAY</button>
                        </div>
                    </div>
                </div>
            ) : null
        }
    </>
  )
}
export default Checkout