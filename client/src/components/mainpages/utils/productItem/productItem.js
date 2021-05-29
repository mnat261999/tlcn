import React, {useContext,useEffect} from 'react'
import { Row, Col, Button } from 'antd';
import {Link} from 'react-router-dom'
import {GlobalState} from '../../../../GlobalState'
import Aos from 'aos'
import "aos/dist/aos.css"



function ProductItem({product}) {
    const state = useContext(GlobalState)
    const [statuses] = state.statusesAPI.statuses
    const addCart = state.userAPI.addCart


    useEffect(()=>{
        Aos.init({duration: 2000}); 
    })
    return (
        <Col xs={24} sm={24} md={12} lg={12} xl={6} data-aos="fade-up" data-aos-easing="ease-out-cubic">
            <Link to={`product/${product._id}`}>
                <div className="rounded overflow-hidden shadow-lg transition duration-700 ease-in-out ... transform hover:scale-110 motion-reduce:transform-none ...">
                    <Link to={`product/${product._id}`}><img  className="w-full" src={product.images.url} alt=""/></Link>
                    <div className="px-6 py-4">
                        <Link to={`product/${product._id}`}><div className="font-bold text-4xl mb-2 text-yellow-700 hover:text-yellow-500">{product.name}</div></Link>
                        <p className="text-gray-700 text-3xl truncate ..."  style={{ marginTop: '10px'}}>$
                        {product.price}
                        </p>
                        <div className="ratings mt-auto">
                        <div className="rating-outer">
                            <div className="rating-inner" style={{ width: `${(product.ratings / 5) * 100}%` }}></div>
                        </div>
                        <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
                        </div>
                        <div>
                        </div>
                    </div>
                </div>
            </Link>
            <Button type="primary" size="large" style={{ background: '#17a2b8', margin: '10px', borderRadius: '10px', width:'100px' }} onClick={() => addCart(product)}>Add Cart</Button>
            <Button href={`product/${product._id}`} type="primary" size="large" style={{ background: '#28a745', borderRadius: '10px', }}>View Details</Button>

        </Col>        
    );
}

export default ProductItem;

