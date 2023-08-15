const ProductCard = ({_id, thumbnail, title, price}) => {
  return (
    <div className="relative w-[220px] h-[360px] font-poppins rounded-lg overflow-hidden flex flex-col pt-4 z-0 bg-white">
        <div className="relative my-0 mx-[10px] w-fit">
            <img className="w-full"  src={`/src/public/images/${thumbnail[0]}`} alt={title} />
        </div>
        <hr className="w-[90%] mt-4" />
        <div className="w-full">
          <div className="pt-[10px] text-lg text-center font-semibold">{title}</div>
          <div className="text-center text-[#1b1b80] font-bold text-lg">${price}</div>
          <div className="mt-[15px] flex justify-center items-center w-full">
              <button className="bg-black text-white font-semibold border-none rounded-full py-[5px] px-[20px]">AGREGAR AL CARRITO</button>
          </div>
        </div>
    </div>
  )
}
export default ProductCard