import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchAllProducts, dispatchGetAllProducts} from '../../redux/actions/productAction'
import {showSuccessMsg, showErrMsg} from '../utils/notification/Notification'
import { Avatar } from 'antd';
import './css/alluser.css'



function AllProduct() {
    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)

    const products = useSelector(state => state.products)

    const {user, isAdmin} = auth


    const [loading, setLoading] = useState(false)
    const [callback, setCallback] = useState(false)

    const [err, setErr] = useState(false)
    const [success, setSuccess] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        if(isAdmin){
            fetchAllProducts(token).then(res =>{
                dispatch(dispatchGetAllProducts(res))
            })
        }
    },[token, isAdmin, dispatch, callback])


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
            setLoading(false)
            setCallback(!callback)
            setSuccess('Product is delete')
            

        } catch (err) {
            err.response.data.msg && setErr(err.response.data.msg)
        }
    }

    return (
        <>
        <div className="col-right">
            {err && showErrMsg('error',err)}
                    {success && showSuccessMsg('success',success)}
                    <h2>All Products</h2>

                    <div style={{overflowX: "auto"}}>
                        <table className="customers">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Description</th>
                                    <th>Content</th>
                                    <th>Stock</th>
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
                                            <td>{product.description}</td>
                                            <td>{product.content}</td>
                                            <td>{product.stock}</td>
                                            <td> <Avatar shape="square" size={64} src={product.images.url}/></td>
                                            <td>
                                                <Link>
                                                    <i className="fas fa-edit" title="Edit"></i>
                                                </Link>
                                                <i className="fas fa-trash-alt" title="Remove"
                                                onClick={() => deleteProduct(product._id,product.images.public_id)}></i>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
        </>
    );
}

export default AllProduct;