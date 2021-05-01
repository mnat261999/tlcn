import {combineReducers} from 'redux'
import auth from './authReducer'
import token from './tokenReducer'
import users from './userReducer'

export default combineReducers({
    auth,
    token,
    users
})