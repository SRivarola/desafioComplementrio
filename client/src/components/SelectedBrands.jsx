import selectedProducts from "../helpers/selectedProducts";
import SelectedCard from "./SelectedCard";

const SelectedBrands = () => {
  return (
    <div className="my-20 flex flex-col items-center">
        <h1 className=" font-caprasimo text-center text-white text-3xl">Our Whiskey's Selection</h1>
        <div className="w-[90%] flex justify-center gap-16 mt-5">
            {
                selectedProducts.map( item => (
                    <SelectedCard key={item.id} {...item} />
                ))
            }
        </div>
    </div>
  )
}
export default SelectedBrands