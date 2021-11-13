import { createContext, useEffect, useState } from "react";
import axios from "axios";


export const ProductsContext = createContext();

const ProductsProvider = ({ children }) => {
    // local state
    const [products, setProducts] = useState({});
    const [isLoading, setIsloading] = useState(true);
    const [error, setError] = useState('');
    const [update, setUpdate] = useState(false);


    useEffect(() => {
        setError('');
        // setIsloading(true);
        setUpdate(false)

        axios.get('https://whispering-gorge-61124.herokuapp.com/products')
            .then(res => {
                setProducts(res.data);
                setIsloading(false);
            })
            .catch(err => {
                setError(err.message);
                setIsloading(false);
            })
    }, [update]);
    return (
        <ProductsContext.Provider value={{ products, isLoading, error, setUpdate }}>
            {children}
        </ProductsContext.Provider>
    )
}
export default ProductsProvider;