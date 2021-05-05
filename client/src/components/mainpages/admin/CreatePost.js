import { useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import { Row, Col } from 'antd';
import './css/form.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios'
import {useDispatch,useSelector} from 'react-redux'
import Loading from '../utils/loading/Loading'
import {createAction} from '../../redux/actions/postAction'


const initialState = {
    title: '',
    description: 'aaa'
}

const CreatePost = () =>{
    const token = useSelector(state => state.token)
    console.log('token')
    console.log(token)
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const {user:{_id, name}, isAdmin} = auth


    const [currentImage, setCurrentImage] = useState('Choose image');
    const [state, setState] = useState({
		title: '',
		description: '',
		image: '',
	});
    const [value, setValue] = useState('');

    const [slug, setSlug] = useState('');
    const [slugButton, setSlugButton] = useState(false);

    const [imagePreview, setImagePreview] = useState(false);
    const [loading, setLoading] = useState(false)

    const fileHandle = async e =>{
        e.preventDefault()
        try {
            console.log(e.target.files[0].name)
            setCurrentImage(e.target.files[0].name)

            setState({
				...state,
				[e.target.name]: e.target.files[0],
			});

            const file = e.target.files[0]
            if(!file) return alert("File not exist.")

            if(file.size > 1024 * 1024) // 1mb
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
            setImagePreview(res.data)
        } catch (err) {
            
        }
    };

    const handleChangeInput = e =>{
		setState({
			...state,
			[e.target.name]: e.target.value,
		});

        const createSlug = e.target.value.trim().split(' ').join('-');
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

    const styleUpload = {
        display: imagePreview ? "block" : "none"
    }


    const createPost = (e) => {
		e.preventDefault();
        const { title, description, image } = state;
        const formData = new FormData();
        formData.append('title', title);
        formData.append('body', value);
        formData.append('image', image);
        formData.append('description', description);
        formData.append('slug', slug);
        formData.append('name', name);
        formData.append('id', _id);

        dispatch(createAction(formData));
	
	};
    
    const handleDestroy = async () => {
        try {
            setLoading(true)
            await axios.post('/api/destroy_admin', {public_id: imagePreview.public_id}, {
                headers: {Authorization: token}
            })
            setLoading(false)
            setCurrentImage('Choose image')
            setImagePreview(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleDescription = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value,
		});
	};

    return <div className="create">
        <Helmet>
			<title>Create new post</title>
			<meta name='description' content='Create a new post' />
		</Helmet>

        <div className="create-product">
        <h2>Create a new post</h2>
                    <form  onSubmit={createPost}>
                        <Row gutter={[48, 16]}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                               <div className ='card'>
                                    <div className="group">
                                        <label htmlFor="title">Post Title</label>
                                        <input className="group-control" type="text" name="title" id="title" placeholder='Post title...' required onChange={handleChangeInput} />
                                    </div>

                                    <div className="group">
                                        <label className='image__label' htmlFor="image">{loading?currentImage:currentImage}</label>
                                        <input type="file" name="image" id="image" required onChange={fileHandle} />
                                    </div>
                                    
                                    <div className='group'>
                                                <label htmlFor='body'>Post body</label>
                                                <ReactQuill
                                                    theme='snow'
                                                    id='body'
                                                    placeholder='Post body...'
                                                    value={value}
                                                    onChange={setValue}
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
                                        onChange={handleDescription}
                                        defaultValue={state.description}
										placeholder='meta description...'
										maxLength='150'></textarea>
									<p className='length'>
                                        {state.description?state.description.length:'0'}
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
                                            value={slug}
                                            className='group-control'
                                            placeholder='Post URL...'
                                            onChange={slugHandle}
                                        />
                                    </div>

                                    <div className='group'>
                                        {slugButton ? (
                                            <button class='btn btn-default' onClick={handleURL}>
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
                                                <img src={imagePreview ? imagePreview.url : ''} alt=""/>
                                                <span className="cancel" onClick={handleDestroy}>X</span>
                                            </div>
                                        }
                                        </div>
                                    </div>

                                    <div className='group'>
                                                <input
                                                    type='submit'
                                                    value='CREATE POST'
                                                    className='btn'
                                                />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </form>

        </div>
    </div>
}

export default CreatePost