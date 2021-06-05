import React, {useContext, useEffect} from 'react'
import {GlobalState} from '../../../GlobalState'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {useSelector} from 'react-redux'
import "aos/dist/aos.css"
import { Table, Tag, Space } from 'antd';

function OrderHistory() {
    const state = useContext(GlobalState)
    const [history, setHistory] = state.userAPI.history


    const columns = [
        {
          title: 'Payment ID',
          dataIndex: 'paymentID',
          key: 'paymentID'
        },
        {
          title: 'Date of Purchased',
          dataIndex: 'createdAt',
          key: 'createdAt',
        },
        {
          title: 'Action',
          dataIndex: 'action',
          key: 'action'
        },
      ];

      const rederHistory = (his) =>{
          let myHistory =[];
          his.map((h) => {
            myHistory.push({
            key: h._id,
            paymentID: h.paymentID,
            createdAt: new Date(h.createdAt).toLocaleDateString(),
            action:
                <Space size="middle">
                    <Link to={`/history/${h._id}`}>View</Link>
                </Space>
          });
        });
        return myHistory;
      }

      const data = [
        {
          key: '1',
          name: 'John Brown',
          age: 32,
          tags: ['nice', 'developer'],
        }
      ];
      
    return (
        <div className="container mt-20">
            <Table columns={columns} dataSource={rederHistory(history)} />
        </div>
    );
}

export default OrderHistory;