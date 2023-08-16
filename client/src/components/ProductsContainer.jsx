import { useEffect, useState } from "react";
import axios from 'axios'
import { DebounceInput } from 'react-debounce-input';
import banner from '../public/images/banner.jpg'
import ProductList from "./ProductList";
import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi'

const ProductsContainer = () => {
      
    const [data, setData] = useState(null)
    const [query, setQuery] = useState({ title: '', page: null})

    const handleChange = (e) => {
        setQuery({
            ...query,
            title: e.target.value
        })
    }

    const nextPage = (nextPage) => {
        setQuery({
            ...query,
            page: nextPage    
        })
    }

    const prevPage = (prevPage) => {
        setQuery({
            ...query,
            page: prevPage
        })
    }

    useEffect(() => {
        axios.get(`http://localhost:8080/api/products/${query.title ? `?title=${query.title}` : ''}${query.page ? `${query.title ? '&' : '?'}page=${query.page}` : ''}`)
            .then(res => {
                setData(res.data.payload)
                console.log(res.data.payload)
            })
    }, [query.title, query.page]);

  return (
    <div className="flex flex-col p-10 caprismo">
        <div className="flex flex-col">
            <h1 className=" font-caprasimo text-center text-white text-3xl">Our Whiskey's Selection</h1>
             <form id="filter_form" className="flex flex-wrap gap-10 self-center justify-center w-[50%] mt-10 p-4 bg-white rounded-2xl font-poppins">
                <div id="formGroup" className="flex justify-center items-center flex-wrap gap-10 w-[50%] px-5">
                    <DebounceInput
                        id="title_input" 
                        placeholder="------Ingrese una letra, silaba o palabra------" 
                        type="text" 
                        minLength={1}
                        debounceTimeout={600}
                        onChange={(e) => handleChange(e)}
                        value={query.title}
                        className="w-full border-b border-[#161616dc] placeholder:text-center focus:outline-none text-center" 
                    />
                </div>
            </form>
        </div>
        <div className="flex relative justify-center self-center gap-[20px] m-[50px] w-fit">
            <div className="relative w-[220px] h-[360px] font-poppins rounded-xl overflow-hidden z-10">
                <img src={banner} alt="banner"/>
                <div className=" font-caprasimo absolute top-0 left-0 w-full h-full text-white flex justify-center items-center text-3xl text-center">
                    <p >SELECTED PRODUCTS</p>
                </div>
            </div>
            <div className="relative flex gap-[20px]">
                <div className="absolute left-[-17px] top-[165px] z-10 flex justify-center items-center text-lg">
                    <button 
                        id="left"
                        disabled={!data?.hasPrevPage}
                        onClick={() => prevPage(data.prevPage)}
                        className="flex justify-center items-center bg-black text-white border border-white h-[35px] w-[35px] rounded cursor-pointer hover:bg-[#e3972d] hover:text-black hover:border-[#e3972d] transition-all ease-linear duration-150"
                    >
                        <BiSolidLeftArrow />
                    </button>
                </div>
                {
                    data && <ProductList products={data.docs} />
                }
            </div>
            <div className="absolute right-[-16px] top-[165px] z-10 flex justify-center items-center text-lg">
                <button 
                    id="right"
                    onClick={() => nextPage(data.nextPage)}
                    disabled={!data?.hasNextPage}
                    className="flex justify-center items-center bg-black text-white border border-white h-[35px] w-[35px] rounded cursor-pointer hover:bg-[#e3972d] hover:text-black hover:border-[#e3972d] transition-all ease-linear duration-150" 
                >
                    <BiSolidRightArrow />
                </button>
            </div>
        </div>
    </div>
  )
}
export default ProductsContainer