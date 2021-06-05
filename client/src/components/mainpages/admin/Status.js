import React, {useState, useContext} from 'react'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'
import {useSelector} from 'react-redux'
import './css/alluser.css'
import './css/category.css'
import {Link} from 'react-router-dom'
import { Row, Col } from 'antd';
import {showSuccessMsg, showErrMsg} from '../utils/notification/Notification'

function Status() {
    const state = useContext(GlobalState)
    console.log(state)
    const [statuses] = state.statusesAPI.statuses
    const [status, setStatus] = useState('')

    const token = useSelector(state => state.token)
    const [callback, setCallback] = state.statusesAPI.callback
    const [onEdit, setOnEdit] = useState(false)
    const [id, setID] = useState('')

    const [err, setErr] = useState(false)
    const [success, setSuccess] = useState(false)

    const createStatus = async e =>{
        e.preventDefault()
        try {
            if(onEdit){
                const res = await axios.put(`/api/status/${id}`, {name: status}, {
                    headers: {Authorization: token}
                })
                setSuccess('Update is successful')
            }else{
                const res = await axios.post('/api/status', {name: status}, {
                    headers: {Authorization: token}
                })
                setSuccess('Create is successful')
            }
            setOnEdit(false)
            setStatus('') 
            setCallback(!callback)
            
        } catch (err) {
            alert(err.response.data.msg)
        }

        return <>
        {success && showSuccessMsg('success',success)}
        {err && showErrMsg('error',err)}
        </>
    }


    const editsetStatus = async (id, name) =>{
        setID(id)
        setStatus(name)
        setOnEdit(true)
        setSuccess('Update is successful')

        return <>
        {success && showSuccessMsg('success',success)}
        {err && showErrMsg('error',err)}
        </>
    }

    const deletesetStatus = async id =>{
        try {
            const res = await axios.delete(`/api/status/${id}`, {
                headers: {Authorization: token}
            })
            setSuccess('Delete is successful')
            setCallback(!callback)
        } catch (err) {
            setErr(err.response.data.msg)
        }
        return <>
        {success && showSuccessMsg('success',success)}
        {err && showErrMsg('error',err)}
        </>
    }
    return (
        <>
        <div className="col-right">
                    <h2>All Statuses</h2>
                    
                    <form className='category' onSubmit={createStatus}>
                    <Row gutter={[8, 8]} type="flex" justify="end" align="center">
                        <Col span={8}><input type="text" name="status" placeholder="Status" value={status} required onChange={e => setStatus(e.target.value)} /></Col>
                        <Col span={4}><button type="submit">{onEdit? "Update" : "Create"}</button></Col>
                    </Row>
                    </form>

                    <div style={{overflowX: "auto"}}>
                        <table className="customers">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    statuses.map(status =>(
                                        <tr key={status._id}>
                                            <td>{status._id}</td>
                                            <td>{status.name}</td>
                                            <td>
                                                <Link onClick={() => editsetStatus(status._id, status.name)}>
                                                    <i className="fas fa-edit" title="Edit"></i>
                                                </Link>
                                                <Link onClick={() => deletesetStatus(status._id)}>
                                                    <i className="fas fa-trash-alt" title="Remove"></i>
                                                </Link>
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

export default Status;