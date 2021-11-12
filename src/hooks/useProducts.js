import { useContext } from "react";
import { ProductsContext } from "../contexts/ProductsProvider";


const useProducts = () => {
    return useContext(ProductsContext);
}
export default useProducts;