import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import {GlobalState} from '../../../GlobalState'
import Loading from '../utils/loading/Loading'
import {useHistory, useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'
import { Row, Col } from 'antd';
import './css/createProduct.css'
import './css/form.css'

const initialState = {
    name: '',
    price: 0,
    description: 'description',
    content: 'content',
    stock: 0,
    category: '',
    _id: ''
}

function CreateProduct() {
    const state = useContext(GlobalState)
    const [product, setProduct] = useState(initialState)
    const [categories] = state.categoriesAPI.categories
    const [images, setImages] = useState(false)
    const [loading, setLoading] = useState(false)

    const auth = useSelector(state => state.auth)
    const {isAdmin} = auth
    const token = useSelector(state => state.token)

    //const [isAdmin] = state.userAPI.isAdmin
    //const [token] = state.token

    const history = useHistory()
    const param = useParams()

    const [products] = state.productsAPI.products
    const [onEdit, setOnEdit] = useState(false)
    const [callback, setCallback] = state.productsAPI.callback

    useEffect(() => {
        if(param.id){
            setOnEdit(true)
            products.forEach(product => {
                if(product._id === param.id) {
                    setProduct(product)
                    setImages(product.images)
                }
            })
        }else{
            setOnEdit(false)
            setProduct(initialState)
            setImages(false)
        }
    }, [param.id, products])

    const handleUpload = async e =>{
        e.preventDefault()
        try {
            if(!isAdmin) return alert("You're not an admin")
            const file = e.target.files[0]
            
            if(!file) return alert("File not exist.")

            if(file.size > 1024 * 1024) // 1mb
                return alert("Size too large!")

            if(file.type !== 'image/jpeg' && file.type !== 'image/png') // 1mb
                return alert("File format is incorrect.")

            let formData = new FormData()
            formData.append('file', file)

            setLoading(true)
            const res = await axios.post('/api/upload_product', formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            })
            setLoading(false)
            setImages(res.data)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleDestroy = async () => {
        try {
            if(!isAdmin) return alert("You're not an admin")
            setLoading(true)
            await axios.post('/api/destroy_admin', {public_id: images.public_id}, {
                headers: {Authorization: token}
            })
            setLoading(false)
            setImages(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleChangeInput = e =>{
        const {name, value} = e.target
        setProduct({...product, [name]:value})
    }

    const handleSubmit = async e =>{
        e.preventDefault()
        try {
            if(!isAdmin) return alert("You're not an admin")
            if(!images) return alert("No Image Upload")

            if(onEdit){
                await axios.put(`/api/admin/products/${product._id}`, {...product, images}, {
                    headers: {Authorization: token}
                })
            }else{
                await axios.post('/api/admin/products/new', {...product, images}, {
                    headers: {Authorization: token}
                })
            }
            setCallback(!callback)
            history.push("/admin/allproduct")
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const styleUpload = {
        display: images ? "block" : "none"
    }
    return (
        <>
        <h2>{onEdit? "Update Product" : "Create Product"}</h2>
        <div className="create_product">
            <Row gutter={[48, 16]}>
                <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                <div className="upload">
                    <input type="file" name="file" id="file_up" onChange={handleUpload}/>
                    {
                        loading ? <div id="file_load"><Loading /></div>

                        :<div id="file_img" style={styleUpload}>
                            <img src={images ? images.url : ''} alt=""/>
                            <span className="cancel" onClick={handleDestroy}>X</span>
                        </div>
                    }
                    
                </div>
                </Col>

                <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                <form className='card' onSubmit={handleSubmit}>
                    <div className="group">
                        <label htmlFor="name">Name</label>
                        <input class="group-control" type="text" name="name" id="name" required
                        value={product.name} onChange={handleChangeInput} />
                    </div>

                    <div className="group">
                        <label htmlFor="price">Price</label>
                        <input class="group-control" type="number" name="price" id="price" required
                        value={product.price} onChange={handleChangeInput} />
                    </div>

                    <div className="group">
                        <label htmlFor="price">Stock</label>
                        <input class="group-control" type="number" name="stock" id="stock" required
                        value={product.stock} onChange={handleChangeInput} />
                    </div>

                    <div className="group">
                        <label htmlFor="description">Description</label>
                        <textarea class="group-control" type="text" name="description" id="description" required
                        value={product.description} rows="5" onChange={handleChangeInput} />
                    
                    </div>

                    <div className="group">
                        <label htmlFor="content">Content</label>
                        <textarea class="group-control" type="text" name="content" id="content" required
                        value={product.content} rows="7" onChange={handleChangeInput} />
                    </div>

                    <div className="group">
                        <label htmlFor="categories">Categories: </label>
                        <select class="group-control" name="category" value={product.category} onChange={handleChangeInput} >
                            <option value="">Please select a category</option>
                            {
                                categories.map(category => (
                                    <option value={category._id} key={category._id}>
                                        {category.name}
                                    </option>
                                ))
                            }
                        </select>
                    </div>

                    <button className="btn" type="submit">{onEdit? "Update" : "Create"}</button>
                </form>
                </Col>
            </Row>
        </div>
        </>
    )
}

export default CreateProduct