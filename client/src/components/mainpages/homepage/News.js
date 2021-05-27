import React ,{useContext,useEffect} from 'react';
import {GlobalState} from '../../../GlobalState'
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
import "aos/dist/aos.css"
import Aos from 'aos'
function News() {
    const state = useContext(GlobalState)
    const [posts_slider, setPostsSlider] = state.myPostsAPI.posts_slider
    const [topics] = state.topicsAPI.topics

    const submit = async () => {
        try {
            window.location.href = "/news";
        } catch (err) {
            window.location.href = "/news";
        }
    }

    useEffect(() => {
        Aos.init({duration: 2000}); 
    })
    return (
        <section className="news bg-gray-100">
            <div className="container">
                <h1 className="section-heading">Tin tức</h1>
                <Row gutter={[32, 32]} >
                   {
                        posts_slider.map((post) => (
                            <Col xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 12}} lx={{span: 12}} key={post._id} data-aos="flip-left" data-aos-easing="ease-out-cubic">
                                <div className="bg-white lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg lg:rounded-lg transition duration-700 ease-in-out ... transform hover:scale-105">
                                    <div className="lg:w-1/2">
                                        <div className="h-96 bg-cover lg:rounded-lg lg:h-full" style={{backgroundImage: `url(${post.images.url})`}} />
                                    </div>
                                    <div className="flex flex-col justify-between m-6">
                                                        
                                        <div className="mb-6">
                                            <Row justify="space-between">
                                                <Col xs={{span: 12}} sm={{span: 12}} md={{span: 12}} lg={{span: 12}} lx={{span: 12}}>
                                                    <span className="font-light text-gray-600">{moment(post.updatedAt).format('MM/DD/YYYY')}</span>
                                                </Col>
                                                <Col xs={{span: 12}} sm={{span: 12}} md={{span: 12}} lg={{span: 12}} lx={{span: 12}} className="text-right">
                                                    <Link className="px-2 py-1 bg-pink-600 text-gray-100 font-bold rounded hover:bg-pink-500" value={post.topic}>{topics.find(_=>_._id === post.topic) && topics.find(_=>_._id === post.topic).name || ""}</Link>
                                                </Col>
                                            </Row>
{/*                                             <div className="flex justify-between items-center">
                                                <span className="font-light text-gray-600">{moment(post.updatedAt).format('MM/DD/YYYY')}</span><Link className="px-2 py-1 bg-pink-600 text-gray-100 font-bold rounded hover:bg-pink-500" value={post.topic}>{topics.find(_=>_._id === post.topic) && topics.find(_=>_._id === post.topic).name || ""}</Link>
                                            </div> */}
                                            <div className="mt-4">
                                                <div className="md:h-28 xl:h-0"><Link to={`news/${post.slug}`} className="text-3xl text-gray-700 font-bold hover:underline mt-4">{post.title}</Link></div>
                                                    <p className="mt-2 text-gray-600 truncate-3-lines">
                                                        {post.description}
                                                    </p>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center mt-4 mb-4">
                                            <Link to={`news/${post.slug}`} className="text-blue-500 hover:underline">Read more</Link>
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

                <div className="text-center">
                    <button className="mt-9 btn-secondary transition duration-700 ease-in-out ... transform hover:scale-110 text-white font-bold py-3 px-20 rounded-full focus:outline-none" onClick={submit}>
                    Xem thêm
                   </button>
                </div>
            </div>
        </section>
    );
}

export default News;