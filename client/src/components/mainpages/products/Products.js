import React,{useContext} from 'react';
import {GlobalState} from '../../../GlobalState'
import ProductItem from '../utils/productItem/ProductItem'

function Products() {
    const state = useContext(GlobalState)
    const [categoriesGroupListProduct]=state.categoriesAPI.categoriesGroupListProduct
    console.log({categoriesGroupListProduct})
    return (
        <>
            <div className="bg-gray-100 lg:py-28 h-full pb-96">
                <div className='container'>
                    <div>
                    {
                    categoriesGroupListProduct.map(product =>{
                        return <ProductItem key={product._id} product={product} data-aos="fade-right"/>
                    })
                    }
                    </div>
                </div>
            </div>
        </>
    );
}

export default Products;