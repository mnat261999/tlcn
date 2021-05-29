import React, {useContext, useState, useEffect} from 'react'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'
import PaypalButton from './PaypalButton'
import {useSelector} from 'react-redux'
import { Button} from 'antd';

import "./cart.css"

function Cart() {
    const state = useContext(GlobalState)
    const [cart, setCart] = state.userAPI.cart
    //const [token] = state.token
    const token = useSelector(state => state.token)
    //const [callback, setCallback] = state.userAPI.callback
    const [total, setTotal] = useState(0)
    const [quantity, setQuantity] = useState(1)

    useEffect(() =>{
        const getTotal = () =>{
            const total = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            },0)

            setTotal(total)
        }

        getTotal()

    },[cart])

     const addToCart = async (cart) =>{
        await axios.patch('/user/addcart', {cart}, {
            headers: {Authorization: token}
        })
    } 

    const increment = (id) =>{
        cart.forEach(item => {      
            if(item._id === id){
                if (item.quantity  >= cart.stock ) return;
                item.quantity += 1
            }
        })

        setCart([...cart])
        addToCart(cart)
    }

     const decrement = (id) =>{
        cart.forEach(item => {
            if(item._id === id){
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
            }
        })

        setCart([...cart])
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
            addToCart(cart)
        }
    }

   const tranSuccess = async(payment) => {
        const {paymentID, address} = payment;

        await axios.post('/api/payment', {cart, paymentID, address}, {
            headers: {Authorization: token}
        })

        setCart([])
        addToCart([])
        console.log("test alert transucess")
        alert("You have successfully placed an order.")

        //setCallback(!callback)
    }


        // if(cart.length === 0) 
        //     return <h2 style={{textAlign: "center", fontSize: "5rem"}}>Cart Empty</h2> 

        return (
            <>
            <link href="//netdna.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>
            <script src="//netdna.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
            <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>

            <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet"></link>
                    <div class="container mt-50 mb-100">
                        <table id="cart" class="table table-hover table-condensed">
                            <thead>
                                <tr>
                                    <th style={{width:'50%'}}>Product</th>
                                    <th style={{width:'10%'}}>Price</th>
                                    <th style={{width:'8%'}}>Quantity</th>
                                    <th style={{width:'22%'}} class="text-center">Subtotal</th>
                                    <th style={{width:'10%'}}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                cart.map(product => (
                                <tr>
                                    <td data-th="Product">
                                        <div class="row">
                                            <div class="col-sm-2 hidden-xs"><img src={product.images.url} alt="..." class="img-responsive"/></div>
                                            <div class="col-sm-10">
                                                <h4 class="nomargin">{product.name}</h4>
                                                <p>{product.description}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td data-th="Price">{product.price}</td>
                                    <td data-th="Quantity" class="flex-wrap">
                                        <div class="amount flex text-center ">
                                            <button onClick={() => decrement(product._id)}> - </button>
                                            <span className="mt-5">{product.quantity}</span>
                                            <button onClick={() => increment(product._id)}> + </button>
                                        </div>
                                    </td>
                                    <td data-th="Subtotal" class="text-center">{product.price * product.quantity}</td>
                                    <td class="actions" data-th="">
                                        <button class="btn btn-info btn-sm"><i class="fa fa-refresh"></i></button>
                                        <button class="btn btn-danger btn-sm"><i class="fa fa-trash-o"></i></button>								
                                    </td>
                                </tr>
                                ))
                                }
                            </tbody>
                            <tfoot>
                                <tr class="visible-xs">
                                    <td class="text-center"><strong>Total 1.99</strong></td>
                                </tr>
                                <tr>
                                    <td><a href="/product" class="btn btn-warning"><i class="fa fa-angle-left"></i> Continue Shopping</a></td>
                                    <td colspan="2" class="hidden-xs"></td>
                                    <td class="hidden-xs text-center"><strong>Total $ {total}</strong></td>
                                    <td><a href="#" class="btn btn-success btn-block">Checkout <i class="fa fa-angle-right"></i></a></td>
                                    <PaypalButton
                                        total={total}
                                        tranSuccess={tranSuccess} />
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                   </>
               );
           }

export default Cart
