const ProductDetail = ({_id, title, description, price, thumbnail}) => {
  return (
    <div className="flex p-20 text-white">
        <div>
            <img src={`/src/public/images/${thumbnail[0]}`} />
        </div>
        <div>
            <h1>{title}</h1>
            <p>{description}</p>
            <h3>{price}</h3>
            <div>
                <button>
                    ADD TO CART
                </button>
            </div>
        </div>
    </div>
  )
}
export default ProductDetail