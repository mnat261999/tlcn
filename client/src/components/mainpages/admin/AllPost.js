import React, {useContext, useState} from 'react'
import {GlobalState} from '../../../GlobalState'
import { Avatar } from 'antd';
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import './css/alluser.css'
import Loading from '../utils/loading/Loading'
import axios from 'axios'

function AllPost() {
    const state = useContext(GlobalState)
    const [myPosts, setMyPosts] = state.myPostsAPI.myPosts
    const [loading, setLoading] = useState(false)
    const token = useSelector(state => state.token)
    const [callback, setCallback] = state.myPostsAPI.callback
    console.log('state all post')
    console.log(myPosts)


    const deleteMyPost = async(id, public_id) => {
        try {
            setLoading(true)
            const destroyImg = axios.post('/api/destroy_admin', {public_id},{
                headers: {Authorization: token}
            })
            const deleteMyPost = axios.delete(`/api/admin/posts/${id}`, {
                headers: {Authorization: token}
            })

            await destroyImg
            await deleteMyPost
            setCallback(!callback)
            setLoading(false)
            alert('Delete is successful')
        } catch (err) {
            alert(err.response.data.msg)
        }
    }


    return (
 <>
        <div className="col-right">
                    <h2>My Post</h2>

                    <div style={{overflowX: "auto"}}>
                        <table className="customers">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Body</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                    myPosts.map(myPost => (
                                        <tr key={myPost._id}>
                                            <td>{myPost._id}</td>
                                            <td>{myPost.title}</td>
                                            <td>
                                                <Link to={`/admin/edit_post/${myPost._id}`}>
                                                    <i className="fas fa-edit" title="Edit"></i>
                                                </Link>
                                                <i className="fas fa-trash-alt" title="Remove" onClick={() => deleteMyPost(myPost._id,myPost.images.public_id)} ></i>
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

export default AllPost;