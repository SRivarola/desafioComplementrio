import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import ProductDetail from "./ProductDetail"

const ProductDetailContainer = () => {

  const { pid } = useParams()
  const [data, setData] = useState(null)

  useEffect(() => {
    axios.get(`http://localhost:8080/api/products/${pid}`, {
      params: {
        pid: pid
      }
    })
      .then(res => {
        setData(res.data.payload)
      })
  }, [])
  
  return (
    <div>
      {
        data && <ProductDetail {...data} />
      }
    </div>
  )
}
export default ProductDetailContainer