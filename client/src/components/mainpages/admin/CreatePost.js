import React, {useState, useContext, useEffect,useRef} from 'react'
import Helmet from 'react-helmet';
import { Row, Col } from 'antd';
import './css/form.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios'
import {useDispatch,useSelector} from 'react-redux'
import Loading from '../utils/loading/Loading'
import {GlobalState} from '../../../GlobalState'
import {useHistory, useParams} from 'react-router-dom'
import Quill from 'quill'

const initialState = {
    title: '',
    description: '',
    _id: ''
}

function CreatePost() {
    const state = useContext(GlobalState)
    const token = useSelector(state => state.token)
    const auth = useSelector(state => state.auth)
    const {user, isAdmin} = auth
    const [myPost, setMyPost] = useState(initialState)

    const [slug, setSlug] = useState('');
    const [slugButton, setSlugButton] = useState(false);

    const [images, setImages] = useState(false)
    const [currentImage, setCurrentImage] = useState('Choose image');

    const [loading, setLoading] = useState(false)

    const [body, setBody] = useState('');

    const [myPosts] = state.myPostsAPI.myPosts
    const [onEdit, setOnEdit] = useState(false)
    const [callback, setCallback] = state.myPostsAPI.callback

    const history = useHistory()
    const param = useParams()

    let quillRef = useRef()

    useEffect(() => {
        if(param.id){
            console.log('param.id')
            console.log(param.id)
            setOnEdit(true)
            myPosts.forEach(myPost => {
                if(myPost._id === param.id) {
                    setMyPost(myPost)
                    setImages(myPost.images)
                    setSlug(myPost.slug)
                    setBody(myPost.body)
                }
            })
        }else{
            console.log('param.id1')
            console.log(param.id)
            setOnEdit(false)
            setMyPost(initialState)
            setImages(false)
        }
    }, [param.id, myPosts])

    const handleChangeInput = e =>{
        const {name, value} = e.target
        setMyPost({...myPost, [name]:value})

        const createSlug = e.target.value.trim().split(' ').join('-').normalize("NFD").replace(/[\u0300-\u036f]/g, "");
		setSlug(createSlug);
    }

    const slugHandle = (e) => {
        setSlugButton(true);
		setSlug(e.target.value);
	};

    const handleURL = (e) => {
		e.preventDefault();
		setSlug(slug.trim().split(' ').join('-'));
	};


    const handleUpload = async e =>{
        e.preventDefault()
        try {
            console.log(e.target.files[0].name)
            setCurrentImage(e.target.files[0].name)

            const file = e.target.files[0]
            if(!file) return alert("File not exist.")

            if(file.size > 2* 1024 * 1024) // 1mb
                return alert("Size too large!")

            if(file.type !== 'image/jpeg' && file.type !== 'image/png') // 1mb
                return alert("File format is incorrect.")

            let formData = new FormData()
            formData.append('file', file)

            setLoading(true)
            const res = await axios.post('/api/upload_post', formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            })

            setLoading(false)
            setImages(res.data)
        } catch (err) {
            
        }
    };

    const handleDestroy = async () => {
        try {
            setLoading(true)
            await axios.post('/api/destroy_admin', {public_id: images.public_id}, {
                headers: {Authorization: token}
            })
            setLoading(false)
            setCurrentImage('Choose image')
            setImages(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleBody = async e =>{
        console.log('e')
        console.log(e)
        setBody(e)

    }

    const styleUpload = {
        display: images ? "block" : "none"
    }

    const handleDescription = (e) => {
        const {name, value} = e.target
        setMyPost({...myPost, [name]:value})
	};

    const handleSubmit = async e =>{
        e.preventDefault()
        try {
            if(!isAdmin) return alert("You're not an admin")
            console.log(images)
            if(!images) return alert("No Image Upload")
            if(!slug || !body) return alert("Please fill in all fields.")

            if(onEdit){
                 await axios.put(`/api/admin/posts/${myPost._id}`, {...myPost, images ,slug , body}, {
                    headers: {Authorization: token}
                }) 
            }else{
                await axios.post('/api/admin/posts/new', {...myPost, images ,slug , body}, {
                    headers: {Authorization: token}
                })
            }
            setCallback(!callback)
            history.push("/admin/all_post")
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const imageHandler = () => {
        const input = document.createElement('input')
        input.setAttribute('type', 'file')
        input.setAttribute('accept', 'image/*')
        input.click()
        input.onchange = async () => {
            const file = input.files[0]
            const formData = new FormData()
            formData.append('file', file)
            formData.append('upload_preset', 'wwosfrvh')
            const res = await axios.post('https://api.cloudinary.com/v1_1/lucy2619288/image/upload', formData)
            console.log('test upload')
            console.log(res)
            const link = res.data.url
    
            // this part the image is inserted
            // by 'image' option below, you just have to put src(link) of img here. 
            quillRef.getEditor().insertEmbed(quillRef.getEditor().getSelection().index, 'image', link)
        }
    }
    return (
<div className="create">
{/*         <Helmet>
			<title>{onEdit? "Update Post" : "Create Post"}</title>
			<meta name='description' content='Create a new post' />
		</Helmet>
 */}
        <div className="create-product">
        <h2>{onEdit? "Update Post" : "Create Post"}</h2>
                    <form onSubmit={handleSubmit}>
                        <Row gutter={[48, 16]}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                               <div className ='card'>
                                    <div className="group">
                                        <label htmlFor="title">Post Title</label>
                                        <input className="group-control" type="text" name="title" id="title" placeholder='Post title...' onChange={handleChangeInput} value ={myPost.title}/>
                                    </div>

                                    <div className="group">
                                        <label className='file__label' htmlFor="file">{loading?currentImage:currentImage}</label>
                                        <input type="file" name="file" id="file" onChange={handleUpload}/>
                                    </div>
                                    
                                    <div className='group'>
                                                <label htmlFor='body'>Post body</label>
                                                <ReactQuill
                                                    ref={el => { quillRef = el; }}
                                                    theme='snow'
                                                    id='body'
                                                    placeholder='Post body...'
                                                    value={body}
                                                    onChange={handleBody}
                                                    modules={{
                                                    toolbar: {
                                                        container: [
                                                            [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
                                                            [{ size: [] }],
                                                            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                                            [{ list: 'ordered' }, { list: 'bullet' }],
                                                            ['link', 'image', 'video'],
                                                            ['clean'],
                                                            ['code-block']
                                                        ],
                                                        handlers: {
                                                            image : imageHandler
                                                        }
                                                    }
                                                }}
                                                />
                                    </div>
                                    
                                    <div className='group'>
									<label htmlFor='description'>Meta Description</label>
									<textarea
										name='description'
										id='description'
										cols='30'
										rows='10'
										className='group-control'
										placeholder='meta description...'
										maxLength='150'
                                        onChange={handleDescription}
                                        defaultValue={myPost.description}>
                                        </textarea>
									<p className='length'>
                                        {myPost.description?myPost.description.length:'0'}
									</p>
								</div>
                               </div>
                            </Col>

                            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                                <div className="card">
                                    <div className='group'>
                                        <label htmlFor='slug'>Post URL</label>
                                        <input
                                            type='text'
                                            name='slug'
                                            id='slug'
                                            className='group-control'
                                            placeholder='Post URL...'
                                            onChange={slugHandle}
                                            value={slug}
                                        />
                                    </div>

                                    <div className='group'>
                                        {slugButton ? (
                                            <button class='btn-form btn-default' onClick={handleURL}>
                                                Update Slug
                                            </button>
                                        ) : (
                                            ''
                                        )}
                                    </div>

                                    <div className='group'>
                                        <div className='imagePreview'>
                                        {
                                            loading ? <div id="file_load"><Loading /></div>

                                            :<div id="img_post" style={styleUpload}>
                                                <img src={images ? images.url : ''} alt=""/>
                                                <span className="cancel" onClick={handleDestroy}>X</span>
                                            </div>
                                        }
                                        </div>
                                    </div>

                                    <div className='group'>
                                                <input
                                                    type='submit'
                                                    value={onEdit? "Update Post" : "Create Post"}
                                                    className='btn-form'
                                                />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </form>

        </div>
    </div>
    );
}

export default CreatePost;