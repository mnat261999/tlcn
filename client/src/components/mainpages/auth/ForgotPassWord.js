import React, {useState} from 'react'
import axios from 'axios'
import {isEmail} from '../utils/validation/Validation'
import {showErrMsg, showSuccessMsg} from '../utils/notification/Notification'

import {Link} from 'react-router-dom'

const initialState = {
    email: '',
    err: '',
    success: ''
}

function ForgotPassword(){
    const [data, setData] = useState(initialState)
    const {email, err, success} = data

    const handleChangeInput = e => {
        const {name, value} = e.target
        setData({...data, [name]:value, err: '', success: ''})
    }

    
    const forgotPassword = async () => {
        if(!isEmail(email))
            return setData({...data, err: 'Invalid emails.', success: ''})
            
        try {
            const res = await axios.post('/user/forgot', {email})

            console.log('reset',res)
            localStorage.setItem('access_token', res.data.access_token)

            return setData({...data, err: '', success: res.data.msg})
        } catch (err) {
            err.response.data.msg && setData({...data, err:  err.response.data.msg, success: ''})
        }
    }
    
    return (
        <>
        <div className="body">
        {err && showErrMsg('error',err)}
        {success && showSuccessMsg('success',success)}
            <div className="login-form w3_form">
                <div className="login w3_login">
                <h2 className="login-header w3_header">Forgot your password?</h2>
                <div className="w3l_grid">
                    <div className="login-container" >
                            <div><input type="text" placeholder="Email"  id="email" value={email} name="email" onChange={handleChangeInput}/></div>
                            <div><button type="submit" onClick={forgotPassword}>Verify your email</button></div>
                    </div>
                </div>
                </div>
            </div>
        </div>

        </>
    )
}
export default ForgotPassword