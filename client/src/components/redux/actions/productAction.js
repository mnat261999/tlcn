import ACTIONS from './index'
import axios from 'axios'

export const fetchAllProducts = async (token) => {
    const res = await axios.get('/api/admin/products', {
        headers: {Authorization: token}
    })
    console.log( 'res'+res)
    return res
}

export const dispatchGetAllProducts = (res) => {
    return {
        type: ACTIONS.GET_ALL_PRODUCTS,
        payload: res.data
    }
}