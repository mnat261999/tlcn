import React, {useState, useContext} from 'react'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import { Row, Col } from 'antd';
import {showSuccessMsg, showErrMsg} from '../utils/notification/Notification'

function Topic() {
    const state = useContext(GlobalState)
    console.log(state)
    const [topics] = state.topicsAPI.topics
    const [topic, setTopic] = useState('')

    const token = useSelector(state => state.token)
    const [callback, setCallback] = state.topicsAPI.callback
    const [onEdit, setOnEdit] = useState(false)
    const [id, setID] = useState('')

    const [err, setErr] = useState(false)
    const [success, setSuccess] = useState(false)

    const createTopic = async e =>{
        e.preventDefault()
        try {
            if(onEdit){
                const res = await axios.put(`/api/topic/${id}`, {name: topic}, {
                    headers: {Authorization: token}
                })
                setSuccess('Update is successful')
            }else{
                const res = await axios.post('/api/topic', {name: topic}, {
                    headers: {Authorization: token}
                })
                setSuccess('Create is successful')
            }
            setOnEdit(false)
            setTopic('') 
            setCallback(!callback)
            
        } catch (err) {
            alert(err.response.data.msg)
        }

        return <>
        {success && showSuccessMsg('success',success)}
        {err && showErrMsg('error',err)}
        </>
    }

    const editTopic = async (id, name) =>{
        setID(id)
        setTopic(name)
        setOnEdit(true)
        setSuccess('Update is successful')

        return <>
        {success && showSuccessMsg('success',success)}
        {err && showErrMsg('error',err)}
        </>
    }

    const deleteTopic = async id =>{
        try {
            const res = await axios.delete(`/api/topic/${id}`, {
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
                    <h2>All Topics</h2>
                    
                    <form className='category' onSubmit={createTopic}>
                    <Row gutter={[8, 8]} type="flex" justify="end" align="center">
                        <Col span={8}><input type="text" name="type" placeholder="Type's name" value={topic} required onChange={e => setTopic(e.target.value)} /></Col>
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
                                    topics.map(topic =>(
                                        <tr key={topic._id}>
                                            <td>{topic._id}</td>
                                            <td>{topic.name}</td>
                                            <td>
                                                <Link onClick={() => editTopic(topic._id, topic.name)}>
                                                    <i className="fas fa-edit" title="Edit"></i>
                                                </Link>
                                                <Link onClick={() => deleteTopic(topic._id)}>
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

export default Topic;