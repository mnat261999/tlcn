import React, {useState} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import {showErrMsg, showSuccessMsg} from '../utils/notification/Notification'
import {isPass, isMatch} from '../utils/validation/Validation'



const initialState = {
    password: '',
    cf_password: '',
    err: '',
    success: ''
}

function ResetPassword() {
    const [data, setData] = useState(initialState)
    const {token} = useParams()

    const {password, cf_password, err, success} = data

    const handleChangeInput = e => {
        const {name, value} = e.target
        setData({...data, [name]:value, err: '', success: ''})
    }


    const handleResetPass = async () => {
        if(!isPass(password))
            return setData({...data, err: "Password must be at least 8 characters, one letter and one number.", success: ''})

        if(!isMatch(password, cf_password))
            return setData({...data, err: "Password did not match.", success: ''})
        
        try {
            const res = await axios.post('/user/reset', {password}, {
                headers: {Authorization: token}
            })

            return setData({...data, err: "", success: res.data.msg})

        } catch (err) {
            err.response.data.msg && setData({...data, err: err.response.data.msg, success: ''})
        }
        
    }


    return (
        <>
        <div className="body">
        {err && showErrMsg('error',err)}
        {success && showSuccessMsg('success',success)}
            <div className="login-form w3_form">
                <div className="login w3_login">
                <h2 className="login-header w3_header">Reset password</h2>
                <div className="w3l_grid">
                    <div className="login-container" >
                        <div><input type="password" placeholder="Password" id="password" value={password} name="password" onChange={handleChangeInput}/></div>
                        <div><input type="password" placeholder="Confirm password" id="cf_password" value={cf_password} name="cf_password" onChange={handleChangeInput} /></div>
                        <div><button className="submit" type="submit" onClick={handleResetPass}>Reset</button></div>
                    </div>
                </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default ResetPassword
