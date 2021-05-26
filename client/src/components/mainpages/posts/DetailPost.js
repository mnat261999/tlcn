import React, {useContext, useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
import { Row, Col } from 'antd';
import FilterPost from './FilterPost'
//import Foot from './pawprint.svg'
import moment from 'moment';
import Aos from 'aos'
import "aos/dist/aos.css"

function DetailPost() {
    const params = useParams()
    const state = useContext(GlobalState)
    const [posts, setPosts] = state.myPostsAPI.posts
    const [title, setTitle] = state.myPostsAPI.title
    const [detailPost, setDetailPost] = useState([])

    console.log({params})
    

    useEffect(() =>{
        Aos.init({duration: 2000}); 
        if(params.id){

            posts.forEach(post => {
                if(post.slug === params.id){
                    localStorage.setItem('id_post', post.slug)
                    setDetailPost(post)
                    setTitle(post.title)
                } 
            })
        }
    },[params.id, posts,setTitle])

    console.log({detailPost})

    if(detailPost.length === 0) return null;

    
    return (
        <>
        <div class="bg-gray-100 lg:py-28 h-full">
            <div className='container'>
                <Row gutter={[40, 40]} >
                    <Col xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 18}} lx={{span: 18}} data-aos="zoom-out-right">
                        <div className="border-b-2 border-white px-1 py-4">
                            <h1 className='mt-20 text-5xl tracking-wide leading-relaxed text-black'>{detailPost.title}</h1>
                            <div className="flex items-center">
                                {/* <img src={Foot} className="w-14 h-14 rounded-full mr-4" alt=""></img> */}
                                <p className="text-gray-900 mb-0">{moment(detailPost.updatedAt).format('MM/DD/YYYY')} bởi <span className="text-blue-600">{detailPost.userName}</span></p>
                            </div>
                        </div>
                        <div className="text-black py-4" dangerouslySetInnerHTML={{ __html: detailPost.body }} />
                    </Col>

                    <Col xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 6}} lx={{span: 6}} data-aos="zoom-out-left">
                        <FilterPost/>
                    </Col>
                </Row>
            </div>
        </div>
        </>
    );
}

export default DetailPost;