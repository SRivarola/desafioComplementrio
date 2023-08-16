import CartItem from "./CartItem"

const Cart = ({cart, total}) => {
    console.log(cart)
  return (
    <div className="p-[50px]">
        <div className="flex flex-col gap-5">
            {
                cart.map(item => <CartItem key={item._id} {...item} />)
            }
        </div>
        <div className="text-white mt-2">
            <h1 className="w-[390px] text-right text-lg"><span className="font-semibold">TOTAL:</span> ${total.toLocaleString()}</h1>
        </div>
    </div>
  )
}
export default Cart