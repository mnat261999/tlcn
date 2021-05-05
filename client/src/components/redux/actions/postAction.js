import ACTIONS from './index'
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'

const token = localStorage.getItem('token')
export const createAction = (postData) => {

    return async (dispatch, getState) =>{
        try {
            console.log('data')
            const {data} = await axios.post('/api/admin/posts/new', postData, {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            });
    
            console.log(data);
        } catch (error) {
            console.log(error.message);
        }
    }

};