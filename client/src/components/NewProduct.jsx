const NewProduct = () => {
  return (
    <div className="flex flex-col py-20">
        <h1 className="text-center text-white font-caprasimo text-2xl">Products Admin</h1>
        <form id="set_form" className="self-center w-[60%] mt-[50px] p-[30px] bg-white rounded-xl font-poppins flex flex-col gap-[20px]" method="POST">
            <h2 className="text-center text-xl font-semibold">Add Product</h2>
            <div className="flex justify-between items-start">
                <div>
                    <label className="flex items-center">
                        <p className="w-[120px]">Product Title:</p>
                        <input className="border-b border-b-[#161616] ml-[5px] p-[5px] w-[250px] focus:outline-none focus:border-b-2" type="text" placeholder="product title" />
                    </label>
                </div>
                <div>
                    <label className="flex items-start">
                        <p className="w-[130px]">Product Description:</p>
                        <textarea className="flex h-[100px] border border-[#161616] rounded-md ml-[5px] p-[5px] w-[250px] focus:outline-none focus:border-2 resize-none" placeholder="product description" />
                    </label>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <div>
                    <label className="flex items-center">
                        <p className="w-[120px]">Product Price:</p>
                        <input className="border-b border-b-[#161616] ml-[5px] p-[5px] w-[250px] focus:outline-none focus:border-b-2" type="number" placeholder="product price" />
                    </label>
                </div>
                <div>
                    <label className="flex items-center">
                        <p className="w-[130px]">Product image:</p>
                        <input className="border-b border-b-[#161616] ml-[5px] p-[5px] w-[250px]" type="file" />
                    </label>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <div>
                    <label className="flex items-center">
                        <p className="w-[120px]">Product Stock:</p>
                        <input className="border-b border-b-[#161616] ml-[5px] p-[5px] w-[250px] focus:outline-none focus:border-b-2" type="number" placeholder="product stock" />
                    </label>
                </div>
                <div>
                    <label className="flex items-center">
                        <p className="w-[130px]">Product Code:</p>
                        <input className="border-b border-b-[#161616] ml-[5px] p-[5px] w-[250px] focus:outline-none focus:border-b-2" type="text" placeholder="product code" />
                    </label>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <div>
                    <label className="flex items-center">
                        <p className="w-[120px]">Product Status:</p>
                        <select className="select">
                            <option value="true">true</option>
                            <option value="false">false</option>
                        </select>
                    </label>
                </div>
                <div>
                    <button type="submit" className="bg-black text-white rounded-full px-[50px] py-[8px] w-[390px] font-semibold text-lg">SET PRODUCT</button>
                </div>
            </div>
        </form>
    </div>
  )
}
export default NewProduct