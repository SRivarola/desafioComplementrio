const CartItem = ({product, quantity}) => {
    const { title, price, thumbnail } = product
  return (
    <div className="relative flex items-center h-[100px] text-white font-poppins gap-5">
        <img className="h-[100%]" src={`/src/public/images/${thumbnail[0]}`} alt={title} />
        <p className=" w-[200px]">{title}</p>
        <p className=" w-[50px]">${price.toLocaleString()}</p>
    </div>
  )
}
export default CartItem