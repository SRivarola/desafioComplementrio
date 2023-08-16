import axios from "axios"
import { useState } from "react"

const initialValues = {
    title: '',
    description: '',
    price: '',
    thumbnail: [],
    stock: '',
    code: '',
    status: true
}

const NewProduct = () => {

    const [data, setData] = useState(initialValues)
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    const handleChange = (e) => {
        const name = e.target.name
        setData({
            ...data,
            [name]: e.target.value
        })
    }

    const handleFile = (e) => {
        setData({
            ...data,
            thumbnail: [e.target.files[0].name]
        })
    }

    const handleSelect = (e) => {
        setData({
            ...data,
            status: e.target.value === 'true' ? true : false
        })
    }

    const clearMessage = (setState) => {
        setTimeout(() => {
            setState('')
        }, 2000);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(data.title !== '', data.description !== '', data.price !== '', data.stock !== '', data.code !== ''){
            setErrorMessage('')
            axios.post('http://localhost:8080/api/products', data)
                .then(res => {
                    console.log(res)
                    if(res.data.success){
                        setSuccessMessage(res.data.message)
                        clearMessage(setSuccessMessage)
                    } else {
                        setErrorMessage(res.response.data.message)
                        clearMessage(setErrorMessage)
                    }
                })
        } else {
            setErrorMessage('*missing fields')
            clearMessage(setErrorMessage)
        }
    }

  return (
    <div className="flex flex-col py-20">
        <h1 className="text-center text-white font-caprasimo text-2xl">Products Admin</h1>
        <form id="set_form" className="self-center w-[60%] mt-[50px] p-[30px] bg-white rounded-xl font-poppins flex flex-col gap-[20px]" method="POST">
            <h2 className="text-center text-xl font-semibold">Add Product</h2>
            <div className="flex justify-between items-start">
                <div>
                    <label className="flex items-center">
                        <p className="w-[120px]">Product Title:</p>
                        <input
                            name="title"
                            value={data.title}
                            onChange={(e) => handleChange(e)} 
                            type="text" 
                            className="border-b border-b-[#161616] ml-[5px] p-[5px] w-[250px] focus:outline-none focus:border-b-2" 
                            placeholder="product title" 
                        />
                    </label>
                </div>
                <div>
                    <label className="flex items-start">
                        <p className="w-[130px]">Product Description:</p>
                        <textarea
                            name="description"
                            value={data.description}
                            onChange={(e) => handleChange(e)} 
                            className="flex h-[100px] border border-[#161616] rounded-md ml-[5px] p-[5px] w-[250px] focus:outline-none focus:border-2 resize-none" 
                            placeholder="product description" 
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
                            value={data.price}
                            onChange={(e) => handleChange(e)} 
                            type="number" 
                            className="border-b border-b-[#161616] ml-[5px] p-[5px] w-[250px] focus:outline-none focus:border-b-2" 
                            placeholder="product price" 
                        />
                    </label>
                </div>
                <div>
                    <label className="flex items-center">
                        <p className="w-[130px]">Product image:</p>
                        <input
                            onChange={(e) => handleFile(e)}
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
                            value={data.stock}
                            onChange={(e) => handleChange(e)}
                            type="number" 
                            placeholder="product stock" 
                            className="border-b border-b-[#161616] ml-[5px] p-[5px] w-[250px] focus:outline-none focus:border-b-2" 
                        />
                    </label>
                </div>
                <div>
                    <label className="flex items-center">
                        <p className="w-[130px]">Product Code:</p>
                        <input
                            name="code"
                            value={data.code}
                            onChange={(e) => handleChange(e)} 
                            type="text" 
                            placeholder="product code" 
                            className="border-b border-b-[#161616] ml-[5px] p-[5px] w-[250px] focus:outline-none focus:border-b-2" 
                        />
                    </label>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <div>
                    <label className="flex items-center">
                        <p className="w-[120px]">Product Status:</p>
                        <select className="select" onChange={(e) => handleSelect(e)}>
                            <option value="true">true</option>
                            <option value="false">false</option>
                        </select>
                    </label>
                </div>
                <div>
                    <button 
                        type="submit"
                        onClick={(e) => handleSubmit(e)}
                        className="bg-black text-white rounded-full px-[50px] py-[8px] w-[390px] font-semibold text-lg"
                    >
                        SET PRODUCT
                    </button>
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