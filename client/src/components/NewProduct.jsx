import axios from "axios"
import { useState } from "react"

// const initialValues = {
//     title: '',
//     description: '',
//     price: '',
//     thumbnail: [],
//     stock: '',
//     code: '',
//     status: true
// }

const NewProduct = () => {

    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    const clearMessage = async (setState) => {
        setTimeout(() => {
            setState('')
        }, 2500);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let formData = new FormData(e.currentTarget)
        try {
            const response = await axios.post('http://localhost:8080/api/products', formData, {withCredentials: true})
            if(response.data.success){
                setSuccessMessage(response.data.message)
                clearMessage(setSuccessMessage)
                e.target.reset()
            } else {
                setErrorMessage(res.response.data.message)
                clearMessage(setErrorMessage)
            }
        } catch (error) {
            console.log(error)
        }   

    }
                        
  return (
    <div className="flex flex-col pt-24">
        <h1 className="text-center text-white font-caprasimo text-2xl">Products Admin</h1>
        <form 
            id="set_form" 
            onSubmit={handleSubmit}
            className="self-center w-[60%] mt-[20px] p-[30px] bg-white rounded-xl font-poppins flex flex-col gap-[20px]"
        >
            <h2 className="text-center text-xl font-semibold">Add Product</h2>
            <div className="flex justify-between items-start">
                <div>
                    <label className="flex items-center">
                        <p className="w-[120px]">Product Title:</p>
                        <input
                            name="title"
                            type="text" 
                            className="border-b border-b-[#161616] ml-[5px] p-[5px] w-[250px] focus:outline-none focus:border-b-2" 
                            placeholder="product title" 
                            required
                        />
                    </label>
                </div>
                <div>
                    <label className="flex items-start">
                        <p className="w-[130px]">Product Description:</p>
                        <textarea
                            name="description"
                            className="flex h-[100px] border border-[#161616] rounded-md ml-[5px] p-[5px] w-[250px] focus:outline-none focus:border-2 resize-none" 
                            placeholder="product description" 
                            required
                        />
                    </label>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <div>
                    <label className="flex items-center">
                        <p className="w-[120px]">Product Price:</p>
                        <input
                            name="price"
                            type="number" 
                            className="border-b border-b-[#161616] ml-[5px] p-[5px] w-[250px] focus:outline-none focus:border-b-2" 
                            placeholder="product price"
                            required
                        />
                    </label>
                </div>
                <div>
                    <label className="flex items-center">
                        <p className="w-[130px]">Product image:</p>
                        <input
                            name="file"
                            type="file" 
                            className="border-b border-b-[#161616] ml-[5px] p-[5px] w-[250px]" 
                        />
                    </label>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <div>
                    <label className="flex items-center">
                        <p className="w-[120px]">Product Stock:</p>
                        <input
                            name="stock"
                            type="number" 
                            placeholder="product stock" 
                            className="border-b border-b-[#161616] ml-[5px] p-[5px] w-[250px] focus:outline-none focus:border-b-2" 
                            required
                        />
                    </label>
                </div>
                <div>
                    <label className="flex items-center">
                        <p className="w-[130px]">Product Code:</p>
                        <input
                            name="code" 
                            type="text" 
                            placeholder="product code" 
                            className="border-b border-b-[#161616] ml-[5px] p-[5px] w-[250px] focus:outline-none focus:border-b-2" 
                            required
                        />
                    </label>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <div>
                    <label className="flex items-center">
                        <p className="w-[120px]">Product Status:</p>
                        <select 
                            name="status"
                            className="select" 
                            onChange={(e) => handleSelect(e)}
                        >
                            <option value="true">true</option>
                            <option value="false">false</option>
                        </select>
                    </label>
                </div>
                <div>
                    <input 
                        type="submit"
                        value='SET PRODUCT'
                        className="bg-black text-white rounded-full px-[50px] py-[8px] w-[390px] font-semibold text-lg"
                    />
                </div>
            </div>
            <div>
                {
                    errorMessage && <p className="text-center text-red-600 font-semibold italic">{errorMessage}</p>
                }
                {
                    successMessage && <p className="text-center text-green-500 font-semibold italic">{successMessage}</p>
                }
            </div>
        </form>
    </div>
  )
}
export default NewProduct