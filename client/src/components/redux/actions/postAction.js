import ACTIONS from './index'
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'


const token = localStorage.getItem('token')
export const createAction = (postData) => {

    return async (dispatch, getState) =>{
        dispatch({type: ACTIONS.SET_LOADER});
        try {
            console.log('data')
            const {data} = await axios.post('/api/admin/posts/new', postData, {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            });
            dispatch({type: ACTIONS.SET_LOADER});

            console.log(data);
        } catch (error) {
            const { errors } = error.response.data;
            console.log(error.response);
            console.log(errors);
            dispatch({type: ACTIONS.SET_LOADER});
            dispatch({type: ACTIONS.CREATE_ERRORS, payload: errors});

        }
    }

};