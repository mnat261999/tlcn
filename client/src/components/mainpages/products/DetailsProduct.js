import React, {useContext, useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
import { Row, Col, Button} from 'antd';
import Products from './Products'
import Aos from 'aos'
import "aos/dist/aos.css"


function DetailsProduct() {
    const params = useParams()
    const state = useContext(GlobalState)
    const [products, setProducts] = state.productsAPI.products
    const [detailProduct, setDetailProduct] = useState([])
    const [name_product, setNameProduct] = state.productsAPI.name_product
    const [statuses] = state.statusesAPI.statuses
    const [quantity, setQuantity] = useState(1)
    const addCart = state.userAPI.addCart


    console.log('params',params)
    useEffect(() =>{
        Aos.init({duration: 2000}); 
        if(params.id){

            products.forEach(product => {
                if(product._id === params.id){
                    localStorage.setItem('id_product', product._id)
                    setDetailProduct(product)
                    setNameProduct(product.name)
                } 
            })
        }
    },[params.id, products,setNameProduct])

    const increaseQty = () => {
        const count = document.querySelector('.count')

        if (count.valueAsNumber >= detailProduct.stock) return;

        const qty = count.valueAsNumber + 1;
        setQuantity(qty)
    }

    const decreaseQty = () => {

        const count = document.querySelector('.count')

        if (count.valueAsNumber <= 1) return;

        const qty = count.valueAsNumber - 1;
        setQuantity(qty)

    }

    console.log('detailProduct',detailProduct)

    if(detailProduct.length === 0) return null;
    return (
        <>
        <div className='container'>
            <Row gutter={[16, 16]} style={{marginTop:'100px'}} >
                <Col data-aos="zoom-out-right" xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 9}} lx={{span: 9}}><img alt="" className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200" src={detailProduct.images.url} /></Col>
                <Col data-aos="zoom-out-left"  xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 15}} lx={{span: 15}}>
                    <div className="flex-wrap content-center ">
                        <h1 className='detail_name text-5xl font-bold'>{detailProduct.name}</h1>
                        <ul className='detail_list text-2xl leading-10'>
                            <li><strong>#id: </strong>{detailProduct._id}</li>
                            <li><strong>Description: </strong>{detailProduct.description}</li>
                            <li><strong>Content: </strong>{detailProduct.content}</li>
                            <li><strong>Stock: </strong>{detailProduct.stock}</li>
                            <li><strong>Ratings: </strong></li>
                            <Button type="primary" size="small" style={{ background: '#17a2b8', margin: '10px', borderRadius: '10px', }}  onClick={decreaseQty}>-</Button>
                            <input type="number" className="form-control count d-inline " value={quantity} readOnly style={{width:'50px', textAlign:'center'}}/>
                            <Button type="primary" size="small" style={{ background: '#17a2b8', margin: '10px', borderRadius: '10px', }} onClick={increaseQty}>+</Button>
                            <li><button className="mt-9 bg-red-500 transition duration-700 ease-in-out ... transform hover:scale-110 text-white font-bold py-3 px-20 rounded-full focus:outline-none" onClick={() => addCart(detailProduct)}>
                            Buy
                        </button></li>
                        </ul>
                    </div>
                </Col>
            </Row>
            <div>
                <h1 className='detail_name text-5xl font-bold mt-20'>Related products</h1>
                    {
                        <Products />
                    }
            </div>
        </div>
        </>
    );
}

export default DetailsProduct;