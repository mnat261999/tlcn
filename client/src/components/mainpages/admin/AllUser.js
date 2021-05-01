import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {showSuccessMsg, showErrMsg} from '../utils/notification/Notification'
import {fetchAllUsers, dispatchGetAllUsers} from '../../redux/actions/userAction'
import './css/alluser.css'

const initialState = {
    name: '',
    password: '',
    cf_password: '',
    err: '',
    success: ''
}

function AllUser() {
    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)

    const users = useSelector(state => state.users)

    const {user, isAdmin} = auth
    const [data, setData] = useState(initialState)

    const [loading, setLoading] = useState(false)
    const [callback, setCallback] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        if(isAdmin){
            fetchAllUsers(token).then(res =>{
                dispatch(dispatchGetAllUsers(res))
            })
        }
    },[token, isAdmin, dispatch, callback])


    const handleDelete = async (id) => {
        try {
            if(user._id !== id){
                if(window.confirm("Are you sure you want to delete this account?")){
                    setLoading(true)
                    console.log('delete user')
                    await axios.delete(`/user/delete/${id}`, {
                        headers: {Authorization: token}
                    })
                    setLoading(false)
                    console.log('delete user')
                    setCallback(!callback)
                }
            }
            
        } catch (err) {
            setData({...data, err: err.response.data.msg , success: ''})
        }
    }
    return (
        <>
        <div className="col-right">
                    <h2>All Users</h2>

                    <div style={{overflowX: "auto"}}>
                        <table className="customers">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Admin</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                    users.map(user => (
                                        <tr key={user._id}>
                                            <td>{user._id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                {
                                                    user.role === 1
                                                    ? <i className="fas fa-check" title="Admin"></i>
                                                    : <i className="fas fa-times" title="User"></i>
                                                }
                                            </td>
                                            <td>
                                                <Link to={`/edit_user/${user._id}`}>
                                                    <i className="fas fa-edit" title="Edit"></i>
                                                </Link>
                                                <i className="fas fa-trash-alt" title="Remove"
                                                onClick={() => handleDelete(user._id)} ></i>
                                            </td>
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

export default AllUser;