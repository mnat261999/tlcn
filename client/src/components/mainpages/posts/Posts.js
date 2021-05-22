import React,{useContext,useSelector} from 'react';
import BreadCrumb from '../BreadCumb'
import {GlobalState} from '../../../GlobalState'
import { Row, Col } from 'antd';
import PostItem from '../posts/Posts'
import { htmlToText } from 'html-to-text';

function Posts() {
    const state = useContext(GlobalState)
    const [posts, setPosts] = state.myPostsAPI.posts

    console.log('state all post.js')
    console.log(posts)
    return (
        <>
        <div className='container' style={{marginTop:'100px'}}>
            <Row>
           {/*  {
                 posts.map(post =>(
                     <div key={post._id}>
                            <div dangerouslySetInnerHTML={{__html: post.body}}/>
                     </div>
                )) 
            } */}
            </Row>
        </div>
        </>
    );
}

export default Posts;