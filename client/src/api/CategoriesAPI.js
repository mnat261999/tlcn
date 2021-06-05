import {useState, useEffect} from 'react'
import axios from 'axios'

function CategoriesAPI() {
    const [categories, setCategories] = useState([])

    const [callback, setCallback] = useState(false)

    const [typePage, setTypePage] = useState([])

    const [categoriesListProduct, setCategoriesListProduct] = useState([])

    const [categoriesList, setCategoriesList] = useState([])

    const [categoriesGroupListProduct, setCategoriesGroupListProduct] = useState([])
    useEffect(() =>{
        const getCategories = async () =>{
            const res = await axios.get('/api/category')
            setCategories(res.data.categoryList)
        }

        getCategories()

        const getCategoriesList = async () =>{
            const res = await axios.get('/api/category_list')
            setCategoriesList(res.data.categories)
        }

        getCategoriesList()


        const getCategoriesListProduct = async () =>{
            const res = await axios.get('/api/category_product')
            setCategoriesListProduct(res.data.categoriesListProduct)
        }

        getCategoriesListProduct()

        const getTypePage = async () =>{
            const res = await axios.get('/api/typepage')
            setTypePage(res.data)
        }

        getTypePage()


        const getCategoriesGroupListProduct = async () =>{
            const res = await axios.get('/api/category_group_list')
            setCategoriesGroupListProduct(res.data.groupListProduct)
        }

        getCategoriesGroupListProduct()


    },[callback])
    return {
        categories: [categories, setCategories],
        callback: [callback, setCallback],
        typePage: [typePage, setTypePage],
        categoriesListProduct:[categoriesListProduct, setCategoriesListProduct],
        categoriesList:[categoriesList, setCategoriesList],
        categoriesGroupListProduct:[categoriesGroupListProduct, setCategoriesGroupListProduct]
    }
}

export default CategoriesAPI;