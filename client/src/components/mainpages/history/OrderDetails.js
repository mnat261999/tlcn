import React, {useState, useEffect, useContext} from 'react'
import {useParams} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
import { Table, Tag, Space } from 'antd';
import { Avatar } from 'antd';

function OrderDetails() {
    const state = useContext(GlobalState)
    const [history] = state.userAPI.history
    const [orderDetails, setOrderDetails] = useState([])

    const params = useParams()

    useEffect(() => {
        if(params.id){
            history.forEach(item =>{
                if(item._id === params.id) {
                    localStorage.setItem('id_payment', item._id)
                    setOrderDetails(item)
                    console.log({item})
                }
            })
        }
    },[params.id, history])

    const column1 = [
        {
          title: 'Name',
          dataIndex: 'recipient_name',
          key: 'recipient_name'
        },
        {
          title: 'Address',
          dataIndex: 'line1',
          key: 'line1',
        },
        {
          title: 'Postal Code',
          dataIndex: 'postal_code',
          key: 'postal_code'
        },
        {
          title: 'Country Code',
          dataIndex: 'country_code',
          key: 'country_code'
        }
      ];

       const rederData1 = (data) =>{
        let myData =[];
            myData.push({
            key: data._id,
            recipient_name:data.address.recipient_name,
            line1:data.address.line1 + " - " + data.address.city,
            postal_code:data.address.postal_code,
            country_code:data.address.country_code
        });
      return myData;
    }

    const column2 = [
        {
          title: '',
          dataIndex: 'images',
          key: 'images'
        },
        {
          title: 'Products',
          dataIndex: 'title',
          key: 'title',
        },
        {
          title: 'Quantity',
          dataIndex: 'quantity',
          key: 'quantity'
        },
        {
          title: 'Total',
          dataIndex: 'total',
          key: 'total'
        }
      ];

      const rederData2 = (data) =>{
        let myData =[];
        data.cart.map((d) => {
            myData.push({
            key: d._id,
            images: <Avatar shape="square" size={100} src={d.images.url}/>,
            title:d.name,
            quantity:d.quantity,
            total: d.price * d.quantity
          });
        });
      return myData;
    }
 

    if(orderDetails.length === 0) return null;
    return (
        <div className="container mt-20">
            <div className="order_detail">
                <Table columns={column1} dataSource={rederData1(orderDetails)}/>
                <Table className="mt-20 mb-20" columns={column2} dataSource={rederData2(orderDetails)}/>
            </div>
        </div>
    );
}

export default OrderDetails;