import {combineReducers} from 'redux'
import auth from './authReducer'
import token from './tokenReducer'
import users from './userReducer'
import products from './productReducer'
import posts from './postReducer'


export default combineReducers({
    auth,
    token,
    users,
    products,
    posts
})