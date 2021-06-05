import React, {useState, useContext} from 'react'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'
import {useSelector} from 'react-redux'
import './css/alluser.css'
import './css/category.css'
import {Link} from 'react-router-dom'
import { Row, Col } from 'antd';
import {showSuccessMsg, showErrMsg} from '../utils/notification/Notification'

function Type() {
    const state = useContext(GlobalState)
    console.log(state)
    const [types] = state.typesAPI.types
    const [type, setType] = useState('')

    const token = useSelector(state => state.token)
    const [callback, setCallback] = state.typesAPI.callback
    const [onEdit, setOnEdit] = useState(false)
    const [id, setID] = useState('')

    const [err, setErr] = useState(false)
    const [success, setSuccess] = useState(false)

    const createType = async e =>{
        e.preventDefault()
        try {
            if(onEdit){
                const res = await axios.put(`/api/type/${id}`, {name: type}, {
                    headers: {Authorization: token}
                })
                setSuccess('Update is successful')
            }else{
                const res = await axios.post('/api/type', {name: type}, {
                    headers: {Authorization: token}
                })
                setSuccess('Create is successful')
            }
            setOnEdit(false)
            setType('') 
            setCallback(!callback)
            
        } catch (err) {
            alert(err.response.data.msg)
        }

        return <>
        {success && showSuccessMsg('success',success)}
        {err && showErrMsg('error',err)}
        </>
    }


    const editType = async (id, name) =>{
        setID(id)
        setType(name)
        setOnEdit(true)
        setSuccess('Update is successful')

        return <>
        {success && showSuccessMsg('success',success)}
        {err && showErrMsg('error',err)}
        </>
    }

    const deleteType = async id =>{
        try {
            const res = await axios.delete(`/api/type/${id}`, {
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
                    <h2>All Types</h2>
                    
                    <form className='category' onSubmit={createType}>
                    <Row gutter={[8, 8]} type="flex" justify="end" align="center">
                        <Col span={8}><input type="text" name="type" placeholder="Type's name" value={type} required onChange={e => setType(e.target.value)} /></Col>
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
                                    types.map(type =>(
                                        <tr key={type._id}>
                                            <td>{type._id}</td>
                                            <td>{type.name}</td>
                                            <td>
                                                <Link onClick={() => editType(type._id, type.name)}>
                                                    <i className="fas fa-edit" title="Edit"></i>
                                                </Link>
                                                <Link onClick={() => deleteType(type._id)}>
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

export default Type;