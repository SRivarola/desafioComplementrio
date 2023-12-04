const CartItem = ({product}) => {
  
    const { product_id: { title, price, thumbnail }, quantity } = product

  return (
    <div className="relative flex items-center text-white font-semibold font-poppins gap-5" >
      <div className="w-[100px]">
        <img className="w-[100%] h-auto rounded" src={`/src/public/images/${thumbnail[0]}`} alt={title} />
      </div>
      <p className="w-[300px] text-xl">{title}</p>
      <p className="w-[150px] text-center">{quantity}</p>
      <p className=" w-[150px] text-center">${price.toLocaleString()}</p>
      <p className=" w-[150px] text-center">${(quantity * price).toLocaleString()}</p>
    </div>
  )
}
export default CartItem