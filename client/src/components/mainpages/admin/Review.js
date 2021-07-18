import React,{useContext,useState} from 'react';
import { Input, Space } from 'antd';
import {GlobalState} from '../../../GlobalState'
import moment from 'moment';
import { Modal, Button } from 'antd';
import {Link} from 'react-router-dom'
import axios from 'axios'
import {useSelector} from 'react-redux'

const { Search,TextArea } = Input;

function Review() {
    const state = useContext(GlobalState)
    const token = useSelector(state => state.token)
    

    const [productId, setProductId] = state.productsAPI.productId
    const [reviewsProduct] = state.productsAPI.reviewsProduct
    const [comment, setComment] = useState('')
    const [onAddReply, setOnAddReply] = useState(false)
    const [onEditReply, setOnEditReply] = useState(false)
    const [visible, setVisible] = useState(false)
    const [callback, setCallback] = state.productsAPI.callback

    const onSearch= e => {
        console.log(e)
        setProductId(e)
    };

    const showModalAddReply = () => {
        setVisible(true)
        setOnAddReply(true)  
    };

    const showModalEditReply = () => {
        setVisible(true)
        setOnEditReply(true)  
    };

    const  handleCancel = () => {
        setOnAddReply(false) 
        setOnEditReply(false)
        setVisible(false)
    };

    const ModalAdd = (id) =>{
        return <>
            <Modal
                visible={visible}
                title="Enter reply"
                //onOk={createCategory}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                    Close
                    </Button>,
                    <Button key="submit" type="primary" onClick={() => createReply(id)}>
                        {
                            onAddReply && "Reply"|| onEditReply && "Edit reply"
                        }
                    </Button>
                ]}
                >
                <TextArea style={{marginBottom :'20px'}}  placeholder="Enter reply" value={comment} onChange={handleReply}/>
            </Modal> 
        </>
      }

      const handleReply = async e => {
        console.log(e.target.value);
        setComment(e.target.value)
      };

       const createReply = async id =>{
           console.log(comment)
        const form = new FormData();
        form.append('productId', productId)
        form.append('comment', comment)
        form.append('reviewId', id)
        try {
            if(onAddReply){
                
                const res = await axios.put('/api/review_reply', form, {
                    headers: {Authorization: token}
                })
                console.log(res)
                //setComment('')
                setOnAddReply(false)
                setCallback(!callback)
                setVisible(false)
            } else if(onEditReply)
            {
                const res = await axios.put('/api/review_reply', form, {
                    headers: {Authorization: token}
                })
                console.log(res)
                setOnEditReply(false)
                setCallback(!callback)
                setVisible(false)
            }
            
        } catch (err) {
            alert(err)
        }
    }
    return (
        <div className="col-right">
             <h2>Reviews</h2>
             <Search placeholder="Enter ID Product" onSearch={onSearch} enterButton />
             
             <div style={{overflowX: "auto"}} className="mt-5">
                 {
                     reviewsProduct && reviewsProduct.length > 0 && 
                     <table className="customers">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Comment</th>
                                <th>Rating</th>
                                <th>User</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                reviewsProduct.map(r =>(
                                    <tr key={r._id}>
                                        <td>{r._id}</td>
                                        <td>{r.comment}</td>
                                        <td>{r.rating}</td>
                                        <td>{r.name}</td>
                                        <td>{moment(r.time).fromNow()}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>||<p>Do not reviews</p>
                 }
            </div>
        </div>
    );
}

export default Review;