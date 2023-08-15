import ProductCard from "./ProductCard"

const ProductList = ({products}) => {
  return (
    <>
        {
            products.map((product) => (<ProductCard key={product._id} {...product} />))
        }
    </>
  )
}
export default ProductList