import axios from "axios";
import { useEffect, useState } from "react"
import { alertError, toastSuccess } from "../helpers/toasts";

axios.defaults.withCredentials = true;

const FormUpdateProduct = ({ products }) => {

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);
        try {
            const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/products/${selectedProduct}`, formData);

            if(response.status === 200) {
                toastSuccess('Product updated!')
                setProduct(response.data.response)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        selectedProduct && getProduct()
    }, [selectedProduct])

  return (
        <div 
            className="self-center w-[900px] mt-[20px] p-[30px] bg-white rounded-xl font-poppins flex flex-col gap-[20px]"
        >
            <h2 className="text-center text-xl font-semibold">Update Product</h2>
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
                                <h2 className="font-semibold">Product to Update</h2>
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
                            <form 
                                onSubmit={(e) => handleSubmit(e)}
                                id="set_form"
                                className="flex flex-col mt-5 gap-5 w-full"
                            >
                                <p className="ml-2 mb-5 font-semibold w-full text-center">Update Data</p>
                                <div className="flex w-full flex-wrap">
                                    <div className="flex w-[50%] px-5 my-3">
                                        <label htmlFor="title" className="font-semibold ">Title:</label>
                                        <input 
                                            className="outline-none ml-2 border-b border-black w-full"
                                            type="text"
                                            name="title"
                                            id="title"
                                        />
                                    </div>
                                    <div className="flex w-[50%] px-5 my-3">
                                        <label htmlFor="description" className="font-semibold">Description:</label>
                                        <input 
                                            className="outline-none ml-2 border-b border-black w-full"
                                            type="text"
                                            name="description"
                                            id="description"
                                        />
                                    </div>
                                    <div className="flex w-[50%] px-5 mb-3 mt-5">
                                        <label htmlFor="price" className="font-semibold">Price:</label>
                                        <input 
                                            className="outline-none ml-2 border-b border-black w-full"
                                            type="text"
                                            name="price"
                                            id="price"                                
                                        />
                                    </div>
                                    <div className="flex w-[50%] px-5 mb-3 mt-5">
                                        <label htmlFor="stock" className="font-semibold">Stock:</label>
                                        <input 
                                            className="outline-none ml-2 border-b border-black w-full"
                                            type="number"
                                            name="stock"
                                            id="stock"
                                        />
                                    </div>
                                    <div className="flex w-[50%] px-5 my-3 items-center">
                                        <label htmlFor="thumbnail" className="flex font-semibold cursor-pointer h-6">Thimbnail:</label>
                                        <input 
                                            className="outline-none ml-2 border-b border-black w-full"
                                            type="file"
                                            name="file"
                                            id="thumbnail"
                                        />
                                    </div>
                                    <div className="flex w-[50%] px-5 my-3">
                                        <input
                                            className="cursor-pointer uppercase bg-black text-white w-full rounded-full py-2 font-semibold"
                                            type="submit"
                                            value='Update Product'
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                    ) : null
                }
            </div>
        </div>
  )
}
export default FormUpdateProduct