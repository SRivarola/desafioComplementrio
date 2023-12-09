const ProductDetail = ({_id, title, description, price, thumbnail}) => {
  return (
    <div className="flex p-32 text-white gap-6 justify-center">
        <div>
            <img className="rounded-lg shadow-black shadow-md" src={`${import.meta.env.VITE_BASE_IMG_URL}/${thumbnail[0]}`} />
        </div>
        <div className="bg-white w-[1px] my-2"></div>
        <div className="flex flex-col justify-between p-5 border rounded-lg bg-white text-black shadow-md shadow-black">
            <h1 className="text-2xl font-semibold">{title}</h1>
            <p className="italic">{description}</p>
            <h3 className="text-2xl">Price ${Number(price).toLocaleString()}</h3>
            <div className="w-full">
                <button className="w-full text-white bg-black py-2 rounded font-semibold hover:bg-black/50 transition-all duration-300">
                    ADD TO CART
                </button>
            </div>
        </div>
    </div>
  )
}
export default ProductDetail