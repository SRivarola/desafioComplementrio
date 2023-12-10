import { useEffect, useState } from "react";
import FormCreateProduct from "../components/FormCreateProduct";
import FormDeleteProduct from "../components/FormDeleteProduct";
import FormUpdateProduct from "../components/FormUpdateProduct";
import axios from "axios";

const ManageProducts = () => {

  const [newProduct, setNewProduct] = useState(true);
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/products/all`);

      if(response.status === 200) {
        setProducts(response.data.response);
      }
    } catch (error) {
        console.error(error)
    }
  }

  useEffect(() => {
    getProducts();
  }, [newProduct]);

  return (
    <div className="flex flex-col pt-24 mb-10">
        <h1 className="text-center text-white font-caprasimo text-2xl">Products Admin</h1>
        <FormCreateProduct setNewProduct={setNewProduct} />
        <FormUpdateProduct products={products} />
        <FormDeleteProduct setNewProduct={setNewProduct} products={products} />
    </div>
  )
}
export default ManageProducts