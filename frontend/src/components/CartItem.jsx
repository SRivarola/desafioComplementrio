const CartItem = ({product}) => {
  
    const { product_id: { title, price, thumbnail }, quantity } = product

  return (
    <>
      <div className="relative flex items-center text-black font-semibold font-poppins w-fit" >
        <div className="w-[100px]">
          <img className="w-[100%] h-auto rounded border shadow-lg" src={`${import.meta.env.VITE_BASE_IMG_URL}/${thumbnail[0]}`} alt={title} />
        </div>
        <p className="w-[300px] text-xl">{title}</p>
        <p className="w-[150px] text-center">{quantity}</p>
        <p className=" w-[150px] text-center">${price.toLocaleString()}</p>
        <p className=" w-[150px] text-center">${(quantity * price).toLocaleString()}</p>
      </div>
      <div className="w-full bg-[#a6a6a6] h-[1px]"></div>
    </>
  )
}
export default CartItem