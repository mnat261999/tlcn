import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import {GlobalState} from '../../../GlobalState'
import Loading from '../utils/loading/Loading'
import {useHistory, useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'
import { Row, Col } from 'antd';
import './css/createProduct.css'
import './css/form.css'
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import quillEmoji from "react-quill-emoji";
import "react-quill-emoji/dist/quill-emoji.css";

const initialState = {
    name: '',
    price: 0,
    discount: 0,
/*     description: 'description', */
    content: 'content',
    stock: 0,
    category: '',
    _id: ''
}

function CreateProduct() {
    const state = useContext(GlobalState)
    const [product, setProduct] = useState(initialState)
    const [categories] = state.categoriesAPI.categories
    const [categoriesListProduct] = state.categoriesAPI.categoriesListProduct
    const [categoriesList] = state.categoriesAPI.categoriesList
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
    const [description, setDescription] = useState('');

    Quill.register(
        {
          "formats/emoji": quillEmoji.EmojiBlot,
          "modules/emoji-toolbar": quillEmoji.ToolbarEmoji,
          "modules/emoji-textarea": quillEmoji.TextAreaEmoji,
          "modules/emoji-shortname": quillEmoji.ShortNameEmoji
        },
        true
      );

    useEffect(() => {
        if(param.id){
            console.log('param.id')
            console.log(param.id)
            setOnEdit(true)
            products.forEach(product => {
                if(product._id === param.id) {
                    console.log('product')
                    console.log(product)
                    setProduct(product)
                    setDescription(product.description)
                    setImages(product.images)
                }
            })
        }else{
            console.log('param.id1')
            console.log(param.id)
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

            if(file.size > 2* 1024 * 1024) // 1mb
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

    const handleDescription = async e =>{
        console.log('e')
        console.log(e)
        setDescription(e)

    }

    const handleChangeInput = e =>{
        const {name, value} = e.target
        setProduct({...product, [name]:value})
    }

/*     const createCategoryList = (cate, options =[]) => {

        cate.map((cat) =>{
            options.push({value:cat._id, name: cat.name, parentId: cat.parentId});
            if(cat.children.length > 0)
            {
                createCategoryList(cat.children, options)
            }
        })

        return options;
    }; */

    const handleSubmit = async e =>{
        e.preventDefault()
        try {
            if(!isAdmin) return alert("You're not an admin")
            if(!images) return alert("No Image Upload")

            if(onEdit){
                await axios.put(`/api/admin/products/${product._id}`, {...product,description, images}, {
                    headers: {Authorization: token}
                })
            }else{
                await axios.post('/api/admin/products/new', {...product, description, images}, {
                    headers: {Authorization: token}
                })
/* 
                console.log(typeof res.data.productnew._id)
                let _id_update_cat;
                categoriesList.map(_ =>{
                    if(_._id === res.data.productnew.category)
                    {
                        _id_update_cat = _._id
                    }
                })

                console.log({_id_update_cat})

                await axios.patch(`/api/update_category_product/${_id_update_cat}`, {products:res.data.productnew._id}, {
                    headers: {Authorization: token}
                }) */
            }
            setCallback(!callback)
            history.push("/admin/all_product")
        } catch (err) {
            //alert(err.response.data.msg)
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
                        <label htmlFor="discount">Discount</label>
                        <input class="group-control" type="number" name="discount" id="discount" required
                        value={product.discount} onChange={handleChangeInput} />
                    </div>

                    <div className="group">
                        <label htmlFor="price">Stock</label>
                        <input class="group-control" type="number" name="stock" id="stock" required
                        value={product.stock} onChange={handleChangeInput} />
                    </div>

                    <div className="group">
                        <label htmlFor="description">Description</label>
 {/*                        <textarea class="group-control" type="text" name="description" id="description" required
                        value={product.description} rows="5" onChange={handleChangeInput} /> */}
                         <ReactQuill
                            class="group-control"
							theme='snow'
							name="description" 
                            id="description"
							placeholder='Description...'
							value={description}
							onChange={handleDescription}
                            formats={[
                                "header",
                                "font",
                                "size",
                                "align",
                                "bold",
                                "italic",
                                "underline",
                                "strike",
                                "blockquote",
                                "list",
                                "bullet",
                                "indent",
                                "color",
                                "background",
                                "emoji",
                            ]}
                            modules={{
                            toolbar: {
                                container: [
                                    [{ header: [1, 2, 3, 4, 5, 6] }, { font: [] }],
                                    [{ size: [] }],
                                    [{ color: [] }, { background: [] }],
                                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                    [{ align: [] }],
                                    [{ list: 'ordered' }, { list: 'bullet' }],
                                    ["emoji"],
                                    ['clean'],
                                    ['code-block']
                                ]
                            },
                            "emoji-toolbar": true,
                            "emoji-textarea": true,
                            "emoji-shortname": true,
                        }}
						/> 
                    
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
                                categoriesListProduct.map(option =><option key={option._id} value={option._id}>{option.name}</option>)
                            }
                        </select>
                    </div>

                    <button className="btn-form" type="submit">{onEdit? "Update" : "Create"}</button>
                </form>
                </Col>
            </Row>
        </div>
        </>
    )
}

export default CreateProduct