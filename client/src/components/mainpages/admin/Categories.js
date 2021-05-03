import React, {useState, useContext} from 'react'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'
import {useSelector} from 'react-redux'
import './css/alluser.css'
import './css/category.css'
import {Link} from 'react-router-dom'
import { Row, Col } from 'antd';
import {showSuccessMsg, showErrMsg} from '../utils/notification/Notification'

function Categories() {
    const state = useContext(GlobalState)
    console.log(state)
    const [categories] = state.categoriesAPI.categories
    const [category, setCategory] = useState('')

    const token = useSelector(state => state.token)
    const [callback, setCallback] = state.categoriesAPI.callback
    const [onEdit, setOnEdit] = useState(false)
    const [id, setID] = useState('')

    const [err, setErr] = useState(false)
    const [success, setSuccess] = useState(false)

    const createCategory = async e =>{
        e.preventDefault()
        try {
            if(onEdit){
                const res = await axios.put(`/api/category/${id}`, {name: category}, {
                    headers: {Authorization: token}
                })
                setSuccess('Update is successful')
            }else{
                const res = await axios.post('/api/category', {name: category}, {
                    headers: {Authorization: token}
                })
                setSuccess('Create is successful')
            }
            setOnEdit(false)
            setCategory('') 
            setCallback(!callback)
            
        } catch (err) {
            alert(err.response.data.msg)
        }

        return <>
        {success && showSuccessMsg('success',success)}
        {err && showErrMsg('error',err)}
        </>
    }


    const editCategory = async (id, name) =>{
        setID(id)
        setCategory(name)
        setOnEdit(true)
        setSuccess('Update is successful')

        return <>
        {success && showSuccessMsg('success',success)}
        {err && showErrMsg('error',err)}
        </>
    }

    const deleteCategory = async id =>{
        try {
            const res = await axios.delete(`/api/category/${id}`, {
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
                    <h2>All Categories</h2>
                    
                    <form className='category' onSubmit={createCategory}>
                    <Row gutter={[8, 8]} type="flex" justify="end" align="center">
                        <Col span={8}><input type="text" name="category" placeholder="Category's name" value={category} required onChange={e => setCategory(e.target.value)} /></Col>
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
                                    categories.map(category =>(
                                        <tr key={category._id}>
                                            <td>{category._id}</td>
                                            <td>{category.name}</td>
                                            <td>
                                                <Link onClick={() => editCategory(category._id, category.name)}>
                                                    <i className="fas fa-edit" title="Edit"></i>
                                                </Link>
                                                <Link onClick={() => deleteCategory(category._id)}>
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

export default Categories;