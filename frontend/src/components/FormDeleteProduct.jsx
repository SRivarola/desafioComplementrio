import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/authContext";
import { IoWarning } from "react-icons/io5";
import { alertError, toastSuccess } from "../helpers/toasts";

axios.defaults.withCredentials = true;

const FormDeleteProduct = ({ products, setNewProduct }) => {

    const [selectedProduct, setSelectedProduct] = useState('');
    const [product, setProduct] = useState(null);

    const getProduct = async() => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/products/${selectedProduct}`);
            if(response.status === 200) {
                setProduct(response.data.response);
            };
        } catch (error) {
            console.error(error);
        }
    }

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/products/${selectedProduct}`);

            if(response.status === 200) {
                toastSuccess('Product deleted!')
                setNewProduct(prev => !prev)
                setSelectedProduct('');
                setProduct(null);
            } else {
                alertError('Something went wrong, please try again!')
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        selectedProduct && getProduct()
    }, [selectedProduct])

  return (
        <div 
            className="self-center w-[900px] mt-[20px] p-[30px] bg-white rounded-xl font-poppins flex flex-col gap-[20px]"
        >
            <h2 className="text-center text-xl font-semibold">Delete Product</h2>
            <div>
                <select onChange={(e) => setSelectedProduct(e.target.value)} className="outline-none border-2 rounded p-2">
                    <option value='' >Seleccione un producto</option>
                    {
                        products.map( product => <option key={product._id} value={product._id} >{product.title}</option> )
                    }
                </select>
                {
                    product && selectedProduct ? (
                        <div className="flex flex-col gap-5">
                            <div className="mt-5 flex justify-center">
                                <h2 className="font-semibold">Product to Delete</h2>
                            </div>
                            <div className="flex gap-5">
                                <div className="w-[150px] h-[150px] flex justify-center rounded-lg shadow-lg border py-1">
                                    <img className="h-full" src={`${import.meta.env.VITE_BASE_IMG_URL}/${product.thumbnail[0]}`} alt={product.title} />
                                </div>
                                <div className=" flex flex-col justify-between my-3">
                                    <p><span className="font-semibold">Title:</span> {product.title}</p>
                                    <p><span className="font-semibold">Description:</span> {product.description}</p>
                                    <p><span className="font-semibold">Price:</span> {product.price}</p>
                                    <p><span className="font-semibold">Stock:</span> {product.stock}</p>
                                </div>
                            </div>
                            <div>
                                <div className="flex flex-col gap-8 justify-center items-center">
                                    <div className="flex flex-col justify-center items-center w-fit bg-black rounded-lg py-2 px-6 text-[#F7ED1C] shadow-lg shadow-slate-400">
                                        <div className="flex gap-5 items-center" >
                                            <IoWarning className="text-3xl"/>
                                            <h3 className="text-xl font-semibold">WARNING</h3>
                                            <IoWarning className="text-3xl"/>
                                        </div>
                                        <div>
                                            <p className="text-white text-sm font-semibold uppercase">this action is permanent</p>
                                        </div>
                                    </div>
                                    <div>
                                        <button onClick={handleDelete} className="font-semibold text-white text-lg bg-red-600 py-3 px-16 rounded-full shadow-lg shadow-red-400">DELETE PRODUCT</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null
                }
            </div>
        </div>
  )
}
export default FormDeleteProduct