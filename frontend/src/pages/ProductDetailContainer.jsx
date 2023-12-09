import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import ProductDetail from "../components/ProductDetail"

const ProductDetailContainer = () => {

  const { pid } = useParams()
  const [data, setData] = useState(null)

  const getProduct = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/products/${pid}`)
      if(response){
        setData(response.data.response)
      }
    } catch (error) {
      
    }
  }

  useEffect(() => {
    getProduct()
  }, [pid])
  
  return (
    <div>
      {
        data && <ProductDetail {...data} />
      }
    </div>
  )
}
export default ProductDetailContainer