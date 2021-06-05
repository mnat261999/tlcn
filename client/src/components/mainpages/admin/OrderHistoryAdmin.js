import React, {useContext, useEffect} from 'react'
import {GlobalState} from '../../../GlobalState'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {useSelector} from 'react-redux'


function OrderHistoryAdmin() {
    const state = useContext(GlobalState)
    const [history, setHistory] = state.userAPI.history
    return (
        <>
            <div className="col-right">
                <h2>All Order History</h2>
                <div style={{overflowX: "auto"}} className="mr-b">
                    <table className="customers">
                        <thead>
                            <tr>
                                <th>Payment ID</th>
                                <th>Date of Purchased</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                history.map(items => (
                                    <tr key={items._id}>
                                        <td>{items.paymentID}</td>
                                        <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                                        <td><Link to={`/admin/history/${items._id}`}>View</Link></td>
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

export default OrderHistoryAdmin;