import {useState, useEffect} from 'react'
import axios from 'axios'

function ProductsAPI() {
    const [products, setProducts] = useState([])
    const [callback, setCallback] = useState(false)
    const [currentPage, setCurrentPage]= useState(1)
    
    const [productsCount, setProductsCount] = useState('')

    const [resPerPage, setResPerPage] = useState('')

    const [loading, setLoading] = useState(false)

    const [name_product, setNameProduct] = useState('')
    

    useEffect(() => {
        const getProducts = async () => {
        const res = await axios.get('/api/products')
        console.log('test products')
        console.log(res)
        setProducts(res.data.products)
        setProductsCount(res.data.productsCount)
        setResPerPage(res.data.resPerPage)
    }
        getProducts()
    },[callback])


    return {
        products: [products, setProducts],
        callback: [callback, setCallback],
        currentPage:[currentPage, setCurrentPage],
        productsCount:[productsCount, setProductsCount],
        resPerPage:[resPerPage, setResPerPage],
        loading:[loading, setLoading],
        name_product:[name_product, setNameProduct]
    }
}

export default ProductsAPI;