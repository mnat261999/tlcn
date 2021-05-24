import React,{useContext,useSelector} from 'react';
import BreadCrumb from '../BreadCumb'
import {GlobalState} from '../../../GlobalState'
import { Row, Col } from 'antd';
import PostItem from '../posts/Posts'
import { htmlToText } from 'html-to-text';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Aos from 'aos'
import "aos/dist/aos.css"

function Posts() {
    const state = useContext(GlobalState)
    const [posts, setPosts] = state.myPostsAPI.posts
    const [topics] = state.topicsAPI.topics
    const [filter, setFilter] = state.myPostsAPI.filter
    const [all, setALL] = state.myPostsAPI.all
    const [numPostByTopic, setNumPostByTopic] = state.myPostsAPI.numPostByTopic

    console.log('state all post.js')
    console.log({numPostByTopic})

    const handleFilter = async (text) => {
        setFilter(text)
        console.log({filter})
        console.log({text})
    }
    return (
        <>
            <div class="bg-gray-100 lg:py-28 h-full lg:flex lg:justify-center pb-96">
                <div className="container">
                    <Row gutter={[40, 40]} >
                        <Col xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 18}} lx={{span: 18}}>
                            
                            <h1 className='mt-20 text-4xl'>Tin Tức</h1>
                            <Row gutter={[16, 16]} >
                                {
                                    posts.map((post) => (
                                        <Col xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 12}} lx={{span: 12}}>
                                            <div className="bg-white lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg lg:rounded-lg transition duration-700 ease-in-out ... transform hover:scale-105">
                                                <div className="lg:w-1/2">
                                                    <div className="h-96 bg-cover lg:rounded-lg lg:h-full" style={{backgroundImage: `url(${post.images.url})`}} />
                                                </div>
                                                <div className="flex flex-col justify-between m-6">
                                                        
                                                    <div className="mb-6">
                                                        <div className="flex justify-between items-center">
                                                            <span className="font-light text-gray-600">{moment(post.updatedAt).format('MM/DD/YYYY')}</span><Link className="px-2 py-1 bg-pink-600 text-gray-100 font-bold rounded hover:bg-pink-500" value={post.topic}>{topics.find(_=>_._id === post.topic) && topics.find(_=>_._id === post.topic).name || ""}</Link>
                                                        </div>
                                                        <div className="mt-4">
                                                            <div className="h-28"><Link className="text-3xl text-gray-700 font-bold hover:underline mt-4">{post.title}</Link></div>
                                                            <p className="mt-2 text-gray-600 truncate-3-lines">
                                                                {post.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-between items-center mt-4 mb-4">
                                                        <a href="#" className="text-blue-500 hover:underline">Read more</a>
                                                        <div className="flex items-center">
                                                            <img src={post.userAvatar} alt="avatar" className="w-14 h-14 rounded-full mr-4" />
                                                            <h1 className="text-gray-700 font-bold hover:underline">{post.userName}</h1>
                                                        </div>
                                                    </div>
                                                            

                                                </div>
                                            </div>
                                        </Col>

                                    ))
                                }
                            </Row>
                        </Col>

                        <Col xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 6}} lx={{span: 6}}>
                            <h1 className='mt-20 text-4xl'>Chuyên mục</h1>
                            <ul>
                            <Link onClick={() => handleFilter("")}>
                                        <li className="px-1 py-4 border-b border-t border-white hover:border-gray-200 transition duration-300">
                                            <Link className="flex items-center text-gray-600 cursor-pointer">
                                                <span className="inline-block h-4 w-4 bg-green-300 mr-3" />
                                                Tất cả bài viết
                                                <span className="text-gray-500 ml-auto">{all} bài viết</span>
                                                <i className="text-gray-500 bx bx-right-arrow-alt ml-1" />
                                            </Link>
                                        </li>
                            </Link>
                            
                            {
                                topics.map(topic => (
                                    <Link onClick={() => handleFilter("?topic="+topic._id)}  value={"topic=" + topic._id} key={topic._id}>
                                        <li className="px-1 py-4 border-b border-t border-white hover:border-gray-200 transition duration-300">
                                            <Link className="flex items-center text-gray-600 cursor-pointer">
                                                <span className="inline-block h-4 w-4 bg-green-300 mr-3" />
                                                {topic.name}
                                                <span className="text-gray-500 ml-auto" value={topic._id}>{numPostByTopic.find(_=>_._id === topic._id) && numPostByTopic.find(_=>_._id === topic._id).count || 0} bài viết</span>
                                                <i className="text-gray-500 bx bx-right-arrow-alt ml-1" />
                                            </Link>
                                        </li>
                                    </Link>
                                ))
                            }
                            </ul>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    );
}

export default Posts;