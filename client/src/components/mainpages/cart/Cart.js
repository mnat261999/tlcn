import React, {useContext, useState, useEffect} from 'react'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import { Row, Col} from 'antd';
import { Avatar } from 'antd';
import {showSuccessMsg, showErrMsg} from '../utils/notification/Notification'
import PaypalButton from './PaypalButton'
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function Cart() {
    const state = useContext(GlobalState)
    const [cart, setCart] = state.userAPI.cart

    const [total, setTotal] = useState(0)
    const token = useSelector(state => state.token)

    useEffect(() =>{
        const getTotal = () =>{
            const total = cart.reduce((prev, item) => {
                console.log("prev",prev)
                console.log("item.price",item.price)
                console.log("item.quantity",item.quantity)
                return prev + (item.price * item.quantity)
            },0)

            setTotal(total)
        }

        getTotal()

    },[cart])

    const addToCart = async () =>{
        await axios.patch('/user/addcart', {cart}, {
            headers: {Authorization: token}
        })
    }

    const increment = (id) =>{
        cart.forEach(item => {
            if(item._id === id){
                item.quantity += 1
            }
        })

        setCart([...cart])
        console.log({cart})
        addToCart()
    }

    const decrement = (id) =>{
        cart.forEach(item => {
            if(item._id === id){
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
            }
        })

        setCart([...cart])
        console.log({cart})
        addToCart()
    }

    const removeProduct = (id) =>{
        if(window.confirm("Do you want to delete this product?")){
            cart.forEach((item, index) => {
                if(item._id === id){
                    cart.splice(index, 1)
                }
            })

            setCart([...cart])
            addToCart()
        }
    }

    const tranSuccess = async(payment) => {
        console.log(payment)
/*         const {paymentID, address} = payment;

        await axios.post('/api/payment', {cart, paymentID, address}, {
            headers: {Authorization: token}
        })

        setCart([])
        addToCart([])
        console.log("test alert transucess")
        showSuccessMsg('success',"Bạn đã đặt hàng thành công") */

        //setCallback(!callback)
    }


    if(cart.length === 0) return<>
        <div className="bg-gray-100">
            <div className="container pt-40 pb-40 container-card">
                <div className="group-card">
                    <h2>Giỏ hàng <span>(0 sản phẩm)</span></h2>
                    <div className="no-data-cart">
                        <h3>Không có sản phẩm nào trong giỏ hàng của bạn</h3>
                        <Link className="transition duration-700 ease-in-out ... transform hover:scale-110 focus:outline-none" to="/product">Tiếp tục mua sắm</Link>
                    </div>
                </div>
            </div>
        </div>
        </>

    return (
        <>
        <div className="bg-gray-100">
            <div className="container pt-40 pb-40 container-card">
                <div className="group-card">
                    <h2 className="text-4xl">Giỏ hàng <span>({cart.length}  sản phẩm)</span></h2>
                    <div className="group-card-item">
                        <Row gutter={[16, 16]}>
                                
                                    <Col data-aos="zoom-out-left"  xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 16}} lx={{span: 16}}>
                                    {
                                        cart.map(product =>(
                                        <div class="frames-card-item" key={product._id}>
                                            <button onClick={() => removeProduct(product._id)} className="delete-item">
                                                <i className="fas fa-trash-alt" title="Remove"></i>
                                            </button> 
                                            <div className="card-items">
                                                <Row gutter={[16, 16]} justify="space-around">
                                                    <Col data-aos="zoom-out-left"  xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 6}} lx={{span: 6}}>
                                                        <Avatar shape="square" size={120} src={product.images.url}/>
                                                    </Col>
                                                    <Col data-aos="zoom-out-left"  xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 6}} lx={{span: 6}} className="text-center">
                                                        <h3 className="text-3xl font-bold">Sản phẩm</h3>
                                                        <p>{product.content}</p>
                                                    </Col>
                                                    <Col data-aos="zoom-out-left"  xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 6}} lx={{span: 6}} className="text-center">
                                                        <h3 className="text-3xl font-bold">Gía</h3>
                                                        <p className="price text-4xl">{numberWithCommas(product.price)} <u>đ</u></p>
                                                    </Col>
                                                    <Col data-aos="zoom-out-left"  xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 6}} lx={{span: 6}} className="text-center">
                                                        <h3 className="text-3xl font-bold">Số lượng</h3>
                                                        <div className="quantity-number">
                                                            <button onClick={() => decrement(product._id)} class="click-left">-</button>
                                                            <div>{product.quantity}</div>
                                                            <button onClick={() => increment(product._id)} class="click-right">+</button>
                                                        </div>
                                                    </Col>
                                                </Row> 
                                                <div className="total-item">
                                                    <p className="total-sum font-bold text-3xl">
                                                        Tổng cộng: {numberWithCommas(product.price*product.quantity)} <u>đ</u>
                                                    </p>  
                                                </div>
                                            </div>                                            
                                        </div>))
                                    }
                                    </Col>
                            <Col data-aos="zoom-out-left"  xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 8}} lx={{span: 8}}>
                                <div className="card-total-money">
                                    <div className="total-money">
                                        <h3>Thành tiền</h3>
                                        <div className=" mb-10 group-total-money">
                                            <p>{numberWithCommas(total)} <u>đ</u></p>
                                        </div>
                                        <PaypalButton
                                        total={total*4/100000}
                                        tranSuccess={tranSuccess}/>
                                        <button className="check-out transition duration-700 ease-in-out ... transform hover:scale-110 focus:outline-none">Tiến hành đặt hàng</button>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Cart;