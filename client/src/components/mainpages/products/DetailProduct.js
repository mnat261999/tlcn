import React, {useContext, useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
import { Row, Col} from 'antd';
import {Avatar, Form, Button, Input, Rate,Dropdown,Menu } from 'antd';
import Aos from 'aos'
import "aos/dist/aos.css"
import { Image } from 'antd';
import {useSelector} from 'react-redux'
import axios from 'axios'
import moment from 'moment';
import { createFromIconfontCN } from '@ant-design/icons';

const { TextArea } = Input;

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function DetailProduct() {
    const params = useParams()
    const state = useContext(GlobalState)
    const [productsUi] = state.productsAPI.productsUi
    const [detailProduct, setDetailProduct] = useState([])
    const [name_product, setNameProduct] = state.productsAPI.name_product
    const [categoriesListProduct] = state.categoriesAPI.categoriesListProduct
    const [productsList] = state.productsAPI.productsList
    const addCart = state.userAPI.addCart
    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)
    const {user, isLogged} = auth
    console.log({user})

    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const [productId, setProductId] = state.productsAPI.productId
    const [reviewsProduct, setReviewProductList] = state.productsAPI.reviewsProduct
    const [callback, setCallback] = state.productsAPI.callback

    const [onEdit, setOnEdit] = useState(false)
    console.log('params',params)

    const IconFont = createFromIconfontCN({
        scriptUrl: [
          '//at.alicdn.com/t/font_2520839_3xfc6cekias.js', 
          '//at.alicdn.com/t/font_2520839_dpus1tqve4p.js',
          '//at.alicdn.com/t/font_2520839_9pnrampty8l.js',
          '//at.alicdn.com/t/font_2520839_a8dmq0qr21l.js'
        ],
      });

    useEffect(() =>{
        Aos.init({duration: 2000}); 
        if(params.id){

          productsUi.forEach(product => {
                if(product._id === params.id){
                    localStorage.setItem('id_product', product._id)
                    setDetailProduct(product)
                    setNameProduct(product.content)
                    setProductId(product._id)
                } 
            })
        }
    },[params.id, productsUi,setNameProduct,setProductId])

    
    console.log('detailProduct',detailProduct)

    const detail = async(id) => {
        window.location.href = `/product/${id}`;
    }

    if(detailProduct.length === 0) return null;

    const normal = () =>{
        return <>
                <Form.Item>
                    <Avatar size={42} src={"https://res.cloudinary.com/lucy2619288/image/upload/v1625926380/avatar/avatar_zm3zgh.png"}/>
                </Form.Item>
        </>
      }

      const login = () =>{
        return <>
                <Form.Item>
                    <Avatar size={42} src={user.avatar}/>
                </Form.Item>
        </>
      }

      const dropdownEditReview = (id,r,c) =>{
        return <>
                <Dropdown 
                overlay={
                <Menu>
                    <Menu.Item key="1">
                        <Button type="primary" onClick={() => editReview(r,c)}>
                            Sửa review
                        </Button>
                    </Menu.Item>
                    <Menu.Item key="2" >
                        <Button type="primary" danger onClick={() => deleteReview(id,productId)}>
                            Xóa review
                        </Button>
                    </Menu.Item>
                </Menu>
        } 
        placement="bottomCenter" arrow>       
        <IconFont type="icondot_vertical" />
                </Dropdown>
            </>
      }

/*       const menu = () => (
        <Menu>
          <Menu.Item key="1">
            <Button type="primary">
                Sửa review
            </Button>
          </Menu.Item>
          <Menu.Item key="2" >
            <Button type="primary" danger>
                Xóa review
            </Button>
          </Menu.Item>
        </Menu>
      ); */

      const onChangeComment = e => {
          console.log(e.target.value)
          setComment(e.target.value)
      };

      const onChangeRating= e => {
        console.log(e)
        setRating(e)
    };

    const createReview = async e =>{
        const form = new FormData();
        form.append('rating', rating)
        form.append('comment', comment)
        form.append('productId', productId)
        const res = await axios.put('/api/review', form, {
            headers: {Authorization: token}
        })
        console.log(res)
        setComment('')
        setRating('')
        setOnEdit(false)
        setCallback(!callback)
    }

    const editReview = async (rating, comment) =>{
        setRating(rating)
        setComment(comment)
        setOnEdit(true)
    }

    const deleteReview = async (id,productId) =>{
        console.log(id)
        console.log(productId)
             await axios.delete(`/api/delete_review?id=${id}&productId=${productId}`, {
                headers: {Authorization: token}
            })
            setCallback(!callback) 
    }
    return (
        <>
        <div className="bg-gray-100">
            <div className="container-detail container pt-20 pb-20">
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
                                    <p>Loại sản phẩm: <span value={detailProduct.category}>{categoriesListProduct.find(_=>_._id) && categoriesListProduct.find(_=>_._id === detailProduct.category).name || ""}</span></p>
                                    <p>Sản phẩm có sẵn: <span>{detailProduct.stock} sản phẩm</span></p>
                                    <p>Đã bán: <span>{detailProduct.sold} sản phẩm</span></p>
                                </div>
                            </div>

                            <div className="group-description-more mt-10">
                                <div className="description-more-info">
                                    <Row gutter={[16, 16]}>
                                        <Col data-aos="zoom-out-right" xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 12}} lx={{span: 12}}>
                                            <div class="space-x-4 my-4">
                                                <div>
                                                    <h3 class="text-gray-400 text-2xl line-through">{numberWithCommas((detailProduct.price*100)/(100-detailProduct.discount))} vnd</h3>
                                                    <h1 class="text-red-500 text-5xl font-semibold">{numberWithCommas(detailProduct.price)} vnd<span className="text-3xl">(-{detailProduct.discount}%)</span></h1>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col data-aos="zoom-out-right" xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 12}} lx={{span: 12}}>
                                            {/* <p>Gía: <span>{numberWithCommas(detailProduct.price)} <u>vnd</u></span></p> */}
                                            <button className="mt-9 bg-red-500 transition duration-700 ease-in-out ... transform hover:scale-110 text-white font-bold py-3 px-20 rounded-lg focus:outline-none" onClick={() => addCart(detailProduct)}>
                                                Thêm vào giỏ hàng
                                            </button>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </Col> 
                    </Row>
                </div>

                <div className="group-description" data-aos="fade-up" data-aos-easing="ease-out-cubic">
                    <h2>Mô tả sản phẩm</h2>
                    <div dangerouslySetInnerHTML={{ __html: detailProduct.description }} /> 
                </div>

                <div className="group-comment mt-10">
                    <Form>
                        {
                            isLogged? login(): normal()
                        }
                        <Form.Item>
                            <Rate value={rating} onChange={onChangeRating} count={5} />
                        </Form.Item>
                        <Form.Item>
                            <TextArea value={comment} rows={8} showCount maxLength={1000} onChange={onChangeComment} />
                        </Form.Item>
                        <Form.Item>
                            {
                                isLogged?
                                <Button onClick={createReview} htmlType="submit" type="primary">
                                   {
                                       onEdit && "Cập nhật" || "Bình luận"
                                   }
                                </Button>
                                :
                                <Button type="primary" disabled>
                                    Bình luận
                                </Button>
                            }
                        </Form.Item>
                    </Form>
                </div>
                
                <div className="group-list-comment">
                    <div className="comment-title">
                        <h3 className="text-3xl">Nhận xét của khách hàng<span>({reviewsProduct.length} bình luận)</span></h3>
                    </div>

                    <div className="comment-item">
                        {
                             reviewsProduct.map(r =>(
                                <Row align="top" className="mt-5">
                                    <Col xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 1}} lx={{span: 1}}>
                                        <Avatar size={42} src={r.avatar}/>
                                    </Col>

                                    <Col xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 23}} lx={{span: 23}}>
                                        <Row align="top" className="comment-content">
                                                <Col xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 23}} lx={{span: 23}}>
                                                
                                                    <h3>{r.name}</h3>
                                                    <p className="comment-time">{moment(r.time).fromNow()}</p>
                                                    <Rate value={r.rating} count={5} />
                                                    <p>{r.comment}</p>
                                                
                                                </Col>
                                                <Col xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 1}} lx={{span: 1}}>
                                                {
                                                    reviewsProduct.find(_=>_.user) && reviewsProduct.find(_=>_.user === user._id) && dropdownEditReview(r._id, r.rating, r.comment) || ""
                                                }
                                                </Col>
                                        </Row>

                                    </Col>
                                </Row>
                             ))
                        }
                    </div>
                </div>
                <div className="group-products-type-detail group-products-type" data-aos="fade-up" data-aos-easing="ease-out-cubic">
                    <h3 className="text-3xl">Sản phẩm cùng loại</h3>
                    <div className="products-type">
                    {
                        productsUi.map(product => (
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