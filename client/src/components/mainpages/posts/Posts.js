import React,{useContext,useSelector} from 'react';
import BreadCrumb from '../BreadCumb'
import {GlobalState} from '../../../GlobalState'
import { Row, Col } from 'antd';
import PostItem from '../posts/Posts'

function Posts() {
    const state = useContext(GlobalState)
    const [posts, setPosts] = state.myPostsAPI.posts

    console.log('state all post.js')
    console.log(posts)
    return (
        <>
        <BreadCrumb/>
        <div className='container' style={{marginTop:'100px'}}>
            <Row>

            </Row>
        </div>
        </>
    );
}

export default Posts;