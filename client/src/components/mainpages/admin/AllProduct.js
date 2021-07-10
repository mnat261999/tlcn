import React, {useContext, useState} from 'react'
import {GlobalState} from '../../../GlobalState'
import { Avatar,Pagination } from 'antd';
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import './css/alluser.css'
import Loading from '../utils/loading/Loading'
import axios from 'axios'




function AllProduct() {
    const state = useContext(GlobalState)
    const [products] = state.productsAPI.products
    const [categoriesListProduct] = state.categoriesAPI.categoriesListProduct
    const [loading, setLoading] = useState(false)
    const token = useSelector(state => state.token)
    const [callback, setCallback] = state.productsAPI.callback
    const [productsCount] = state.productsAPI.productsCount
    const [currentPage, setCurrentPage] = state.productsAPI.currentPage
    const [resPerPage] = state.productsAPI.resPerPage

    console.log('state all products')
    console.log(products)
    
    const onChange = page => {
        console.log('page');
        console.log(page);
        setCurrentPage(page)
      };

    const deleteProduct = async(id, public_id) => {
        try {
            setLoading(true)
            const destroyImg = axios.post('/api/destroy_admin', {public_id},{
                headers: {Authorization: token}
            })
            const deleteProduct = axios.delete(`/api/admin/products/${id}`, {
                headers: {Authorization: token}
            })

            await destroyImg
            await deleteProduct
            setCallback(!callback)
            setLoading(false)
            alert('Delete is successful')
        } catch (err) {
            alert(err.response.data.msg)
        }
    }


    return (
        <>
        <div className="col-right">
                    <h2>All Products</h2>

                    <div style={{overflowX: "auto"}} className="mr-b">
                        <table className="customers">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Price</th>
{/*                                     <th>Description</th>
                                    <th>Content</th> */}
                                    <th>Stock</th>
                                    <th>Category</th>
                                    <th>Image</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                    products.map(product => (
                                        <tr key={product._id}>
                                            <td>{product._id}</td>
                                            <td>{product.name}</td>
                                            <td>{product.price}</td>
{/*                                             <td className="txt-overflow">{product.description}</td>
                                            <td>{product.content}</td> */}
                                            <td>{product.stock}</td>
                                            <td value={product.category}>{categoriesListProduct.find(_=>_._id === product.category).name || ""}</td>
                                            <td> <Avatar shape="square" size={64} src={product.images.url}/></td>
                                            <td>
                                                <Link to={`/admin/edit_product/${product._id}`}>
                                                    <i className="fas fa-edit" title="Edit"></i>
                                                </Link>
                                                <i className="fas fa-trash-alt" title="Remove" onClick={() => deleteProduct(product._id,product.images.public_id)} ></i>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                {
                    resPerPage <= productsCount && (<Pagination defaultCurrent={1}
                        defaultPageSize={resPerPage}  total={productsCount} onChange={onChange}/>)
                }
        </>
    );
}

export default AllProduct;