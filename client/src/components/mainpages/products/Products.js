import React,{useContext, useState} from 'react';
import BreadCrumb from '../BreadCumb'
import {GlobalState} from '../../../GlobalState'
import { Row, Pagination} from 'antd';
import Loading from '../utils/loading/Loading'
import {Link} from 'react-router-dom'
import "aos/dist/aos.css"
import ProductItem from '../utils/productItem/productItem'




function Products() {
    const state = useContext(GlobalState)
    const [products, setProducts] = state.productsAPI.products
    const [loading, setLoading] = state.productsAPI.loading
    const [currentPage, setCurrentPage] = state.productsAPI.currentPage
    const [productsCount, setProductsCount] = state.productsAPI.productsCount
    const [resPerPage, setResPerPage] =state.productsAPI.resPerPage

    console.log('state all products.js')
    console.log(products)
    return (
        <>
          <div className='container' style={{ marginTop: '100px', marginLeft: '50px' }}>
           {/* <SearchPet className='column'/> */}
            <Row gutter={[24, 24]}>
            {
                products.map(products =>{
                    return <ProductItem key={products._id} product={products} data-aos="fade-right"/>
                })
            }
            </Row>
        </div>
        </>
    );
}

export default Products;