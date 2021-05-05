import ACTIONS from './index'
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'


export const createAction =  (postData,token) => {
    return async (dispatch, getState) =>{
        const {res } = axios.post('/api/admin/posts/new', postData, {
            headers: {Authorization: token}
        });
    }

};