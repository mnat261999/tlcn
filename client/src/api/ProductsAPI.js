import {useState, useEffect} from 'react'
import axios from 'axios'


function ProductsAPI(token) {
    const [products, setProducts] = useState([])

    const [productsUi, setProductUi] = useState([])


    const [callback, setCallback] = useState(false)

    const [currentPage, setCurrentPage]= useState(1)
    
    const [productsCount, setProductsCount] = useState('')

    const [resPerPage, setResPerPage] = useState('')

    const [loading, setLoading] = useState(false)

    const [name_product, setNameProduct] = useState('')

    const [productsList, setProductsList] = useState([])

    const [reviewsProduct, setReviewProductList] = useState([])

    const [productId, setProductId] = useState('')
    

    useEffect(() => {
        const getProducts = async () => {
          console.log('test 123')
        const res = await axios.get(`/api/products?page=${currentPage}`)
        console.log('test products')
        setProducts(res.data.products)
        setProductsCount(res.data.productsCount)
        setResPerPage(res.data.resPerPage)
    }
        getProducts()


        const getProductsList = async () => {
            const res = await axios.get('/api/products_list')
            setProductsList(res.data.products_list)
        }
        getProductsList()

        const getReviewProductList = async () => {
            const res = await axios.get(`/api/reviews_product?id=${productId}`)
            setReviewProductList(res.data.reviews)
        }
        getReviewProductList()

        const getProductsUi = async () => {
          const res = await axios.get('/api/ui/products')

          setProductUi(res.data.products)

    }
        getProductsUi()


    },[callback,currentPage,productId])


    return {
        products: [products, setProducts],
        callback: [callback, setCallback],
        currentPage:[currentPage, setCurrentPage],
        productsCount:[productsCount, setProductsCount],
        resPerPage:[resPerPage, setResPerPage],
        loading:[loading, setLoading],
        name_product:[name_product, setNameProduct],
        productsList:[productsList, setProductsList],
        reviewsProduct:[reviewsProduct, setReviewProductList],
        productId: [productId, setProductId],
        productsUi: [productsUi, setProductUi]
    }
}

export default ProductsAPI;