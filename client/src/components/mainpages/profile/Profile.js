import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {isPass, isMatch} from '../utils/validation/Validation'
import {showSuccessMsg, showErrMsg} from '../utils/notification/Notification'
import {fetchAllUsers, dispatchGetAllUsers} from '../../redux/actions/userAction'
import BreadCrumb from '../BreadCumb'

const initialState = {
    name: '',
    password: '',
    cf_password: '',
    err: '',
    success: ''
}


function Profile() {
    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)

    const {user, isAdmin} = auth
    const [data, setData] = useState(initialState)
    const {name, password, cf_password, err, success} = data

    const [avatar, setAvatar] = useState(false)
    const [loading, setLoading] = useState(false)
    const [callback, setCallback] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        if(isAdmin){
            fetchAllUsers(token).then(res =>{
                dispatch(dispatchGetAllUsers(res))
            })
        }
    },[token, isAdmin, dispatch, callback])

    const handleChange = e => {
        const {name, value} = e.target
        setData({...data, [name]:value, err:'', success: ''})
    }

    const changeAvatar = async(e) => {
        e.preventDefault()
        try {
            const file = e.target.files[0]

            if(!file) return setData({...data, err: "No files were uploaded." , success: ''})

            if(file.size > 1024 * 1024)
                return setData({...data, err: "Size too large." , success: ''})

            if(file.type !== 'image/jpeg' && file.type !== 'image/png')
                return setData({...data, err: "File format is incorrect." , success: ''})

            let formData =  new FormData()
            formData.append('file', file)

            setLoading(true)
            const res = await axios.post('/api/upload_avatar', formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            })

            setLoading(false)
            setAvatar(res.data.url)
            
        } catch (err) {
            setData({...data, err: err.response.data.msg , success: ''})
        }
    }

    const updateInfor = () => {
        try {
            axios.patch('/user/update', {
                name: name ? name : user.name,
                avatar: avatar ? avatar : user.avatar
            },{
                headers: {Authorization: token}
            })

            setData({...data, err: '' , success: "Updated Success!"})
        } catch (err) {
            setData({...data, err: err.response.data.msg , success: ''})
        }
    }

    const updatePassword = () => {
        if(!isPass(password))
            return setData({...data, err: "Password must be at least 8 characters, one letter and one number.", success: ''})

        if(!isMatch(password, cf_password))
            return setData({...data, err: "Password did not match.", success: ''})

        try {
            axios.post('/user/reset', {password},{
                headers: {Authorization: token}
            })

            setData({...data, err: '' , success: "Updated Success!"})
        } catch (err) {
            setData({...data, err: err.response.data.msg , success: ''})
        }
    }

    const handleUpdate = () => {
        if(name || avatar) updateInfor()
        if(password) updatePassword()
        return <>
        {err && showErrMsg('error',err)}
        {success && showSuccessMsg('success',success)}
        </> 
    }

    const userRouter = () =>{
        return(
            <>
                <BreadCrumb/> 
                 <div className="profile_page">
                    <div className="col-left">
                        <h2>{isAdmin ? "Admin Profile": "User Profile"}</h2>

                        <div className="avatar">
                            <img src={avatar ? avatar : user.avatar} alt=""/>
                            <span>
                                <i className="fas fa-camera"></i>
                                <p>Change</p>
                                <input type="file" name="file" id="file_up" onChange={changeAvatar} />
                            </span>
                        </div>

                        <div className="form-group">
                            <input type="text" name="name" id="name" defaultValue={user.name}
                            placeholder="Your name" onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <input type="email" name="email" id="email" defaultValue={user.email}
                            placeholder="Your email address" disabled />
                        </div>

                        <div className="form-group">
                            <input type="password" name="password" id="password"
                            placeholder="New Password" value={password} onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <input type="password" name="cf_password" id="cf_password"
                            placeholder="Confirm New Password" value={cf_password} onChange={handleChange} />
                        </div>

                        <div class='note'>
                            <em style={{color: "crimson"}}> 
                            * If you update your password here, you will not be able 
                            to login quickly using google and facebook.
                            </em>
                        </div>

                        <button type="submit" class="btn btn-secondary"  onClick={handleUpdate}>Update</button>
                    </div>
                 </div>
            </>
        )
    }

    return (
        <>     
        {
            isAdmin ? '' : userRouter()
        }
        </>
    )
}
export default Profile