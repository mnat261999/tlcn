import React, {useState, useEffect, useContext} from 'react'
import {useParams,useHistory} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
import { Avatar } from 'antd';

function OrderHistoryDetailAdmin() {
    const state = useContext(GlobalState)
    const [history] = state.userAPI.history
    const his = useHistory()
    const [orderDetails, setOrderDetails] = useState([])

    const params = useParams()

    useEffect(() => {
        if(params.id){
            history.forEach(item =>{
                if(item._id === params.id) setOrderDetails(item)
            })
        }
    },[params.id, history])


    if(orderDetails.length === 0) return null;
    return (
        <>
            <div className="col-right">
                <div className="profile_page edit_user">
                    <div className="row">
                        <button onClick={() => his.goBack()} className="go_back">
                            <i className="fas fa-long-arrow-alt-left"></i> Go Back
                        </button>
                    </div>
                </div>
                <div style={{overflowX: "auto"}} className="mr-b mt-20">
                    <table className="customers">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Postal Code</th>
                                <th>Country Code</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{orderDetails.address.recipient_name}</td>
                                <td>{orderDetails.address.line1 + " - " + orderDetails.address.city}</td>
                                <td>{orderDetails.address.postal_code}</td>
                                <td>{orderDetails.address.country_code}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div style={{overflowX: "auto"}} className="mr-b mt-20">
                    <table className="customers">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Products</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orderDetails.cart.map(item =>(
                                <tr key={item._id}>
                                    <td><Avatar shape="square" size={64} src={item.images.url}/></td>
                                    <td>{item.content}</td>
                                    <td>{item.quantity}</td>
                                    <td>$ {item.price * item.quantity}</td>
                                </tr>
                                ))
                            }
                    
                        </tbody>
                    </table>
                </div>
            </div>  
        </>
    );
}

export default OrderHistoryDetailAdmin;