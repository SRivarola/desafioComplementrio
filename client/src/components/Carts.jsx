import axios from "axios"
import { useEffect, useState } from "react"

const Carts = () => {

    const [cart, setCart] = useState(null)

    useEffect(() => {
      axios.post('http://localhost:8080/api/carts/')
        .then(res => {
            if(res.data.success){
                setCart(res.data.payload)
            }
        })
    }, [])
    
  return (
    <div>Carts</div>
  )
}
export default Carts