import ACTIONS from './index'
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'

const token = localStorage.getItem('token')
export const createAction = (postData) => {

    return async (dispatch, getState) =>{
        //dispatch({type: SET_lOADER});
        try {

            const config = {
                headers:{
                    Authorization: `Thien  ${token}`,
                },
            };
            const {data} = await axios.post('/api/admin/posts/new', postData, config );
    
            console.log(data);
        } catch (error) {
            console.log(error.message);
            console.log(error.response);
        }
    }

};