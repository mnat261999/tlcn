import React, {useContext, useState, useEffect} from 'react'
import {useParams, Link,useHistory} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
import { Row, Col} from 'antd';
import { Avatar } from 'antd';
import Aos from 'aos'
import "aos/dist/aos.css"
import { Image } from 'antd';


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function DetailProduct() {
    const params = useParams()
    const history = useHistory()
    const state = useContext(GlobalState)
    const [products] = state.productsAPI.products
    const [detailProduct, setDetailProduct] = useState([])
    const [name_product, setNameProduct] = state.productsAPI.name_product
    const [categoriesListProduct] = state.categoriesAPI.categoriesListProduct
    const [productsList] = state.productsAPI.productsList
    const addCart = state.userAPI.addCart

    console.log('params',params)

    useEffect(() =>{
        Aos.init({duration: 2000}); 
        if(params.id){

            products.forEach(product => {
                if(product._id === params.id){
                    localStorage.setItem('id_product', product._id)
                    setDetailProduct(product)
                    setNameProduct(product.content)
                } 
            })
        }
    },[params.id, products,setNameProduct])

    
    console.log('detailProduct',detailProduct)

    const detail = async(id) => {
        window.location.href = `/product/${id}`;
    }

    if(detailProduct.length === 0) return null;
    return (
        <>
        <div className="bg-gray-100">
            <div className="container pt-20 pb-20">
                <div className="group-detail" data-aos="fade-up" data-aos-easing="ease-out-cubic">
                    <Row gutter={[16, 16]}>
                        <Col data-aos="zoom-out-right" xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 9}} lx={{span: 9}}><Image width={300}  src={detailProduct.images.url} /></Col> 
                        <Col data-aos="zoom-out-left"  xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 15}} lx={{span: 15}}>
                            <div className="name-detail">
                                <h3>{detailProduct.content}</h3>
                            </div>
                            <div className="group-description-more mt-10">
                                <div className="description-more-info">
                                    <p>Mã sản phẩm: <span>{detailProduct._id}</span></p>
                                    <p>Loại sản phẩm: <span value={detailProduct.category}>{categoriesListProduct.find(_=>_._id === detailProduct.category).name || ""}</span></p>
                                    <p>Sản phẩm có sẵn: <span>{detailProduct.stock} sản phẩm</span></p>
                                    <p>Đã bán: <span>{detailProduct.sold} sản phẩm</span></p>
                                    <p>Gía: <span>{numberWithCommas(detailProduct.price)} <u>vnd</u></span></p>
                                    <button className="mt-9 bg-red-500 transition duration-700 ease-in-out ... transform hover:scale-110 text-white font-bold py-3 px-20 rounded-lg focus:outline-none" onClick={() => addCart(detailProduct)}>
                                    Thêm vào giỏ hàng
                                    </button>
                                </div>
                            </div>
                        </Col> 
                    </Row>
                </div>
                <div class="group-description" data-aos="fade-up" data-aos-easing="ease-out-cubic">
                    <h2>Mô tả sản phẩm</h2>
                    <div dangerouslySetInnerHTML={{ __html: detailProduct.description }} /> 
                </div>
                <div class="group-products-type" data-aos="fade-up" data-aos-easing="ease-out-cubic">
                    <h3 className="text-3xl">Sản phẩm cùng loại</h3>
                    <div class="products-type">
                    {
                        products.map(product => (
                            product.category === detailProduct.category 
                            &&
                            <div className="item-products-type" data-aos="flip-left" data-aos-easing="ease-out-cubic">
                                <Link  onClick={() => detail(product._id)}>
                                    <div className="ig-products-type">
                                        <img src={product.images.url} alt=""></img>
                                    </div>
                                    <div className="name-products-type">
                                        <p>{product.content}</p>
                                    </div>
                                </Link>
                                <div className="price-products-type">
                                    <div className="group-price">
                                        <span>{numberWithCommas(product.price)} <u>đ</u></span>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default DetailProduct;