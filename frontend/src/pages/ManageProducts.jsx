import FormCreateProduct from "../components/FormCreateProduct";
import FormUpdateProduct from "../components/FormUpdateProduct";


const ManageProducts = () => {


                        
  return (
    <div className="flex flex-col pt-24 mb-10">
        <h1 className="text-center text-white font-caprasimo text-2xl">Products Admin</h1>
        <FormCreateProduct />
        <FormUpdateProduct />
    </div>
  )
}
export default ManageProducts