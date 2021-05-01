import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {showErrMsg, showSuccessMsg} from '../utils/notification/Notification'
import BreadCrumb from '../BreadCumb'
import {isEmpty, isEmail, isPass, isMatch} from '../utils/validation/Validation'

const initialState = {
    name: '',
    email: '',
    password: '',
    cf_password: '',
    err: '',
    success: ''
}

function Register() {
    const [user, setUser] = useState(initialState)

    const {name, email, password,cf_password, err, success} = user

    const handleChangeInput = e => {
        const {name, value} = e.target
        setUser({...user, [name]:value, err: '', success: ''})
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            e.preventDefault()
            if(isEmpty(name) || isEmpty(password))
                return setUser({...user, err: "Please fill in all fields.", success: ''})

            if(!isEmail(email))
                return setUser({...user, err: "Invalid emails.", success: ''})
            
            if(!isPass(password))
                return setUser({...user, err: "Password must be at least 8 characters, one letter and one number.", success: ''})
            
            if(!isMatch(password, cf_password))
                return setUser({...user, err: "Password did not match.", success: ''})

            try {
                const res = await axios.post('/user/register', {
                    name, email, password
                })
    
                setUser({...user, err: '', success: res.data.msg})
            } catch (err) {
                err.response.data.msg && 
                setUser({...user, err: err.response.data.msg, success: ''})
            }
        } catch (err) {
            err.response.data.msg && 
            setUser({...user, err: err.response.data.msg, success: ''})
        }
    }
    return (
        <>
        <BreadCrumb/>
        <div className="body">
        {err && showErrMsg('error',err)}
        {success && showSuccessMsg('success',success)}
            <div className="login-form w3_form">
                <div className="login w3_login">
                <h2 className="login-header w3_header">Register</h2>
                <div className="w3l_grid">
                    <div className="login-container" >
                        <form onSubmit={handleSubmit}>
                            <div><input type="text" placeholder="Name"  id="name" value={name} name="name" onChange={handleChangeInput}/></div>
                            <div><input type="text" placeholder="Email"  id="email" value={email} name="email" onChange={handleChangeInput}/></div>
                            <div><input type="password" placeholder="Password" id="password" value={password} name="password" onChange={handleChangeInput}/></div>
                            <div><input type="password" placeholder="Confirm password" id="cf_password" value={cf_password} name="cf_password" onChange={handleChangeInput} /></div>
                            <div><button type="submit">Register</button></div>
                        </form> 
                        <div className="bottom-text w3_bottom_text">
                            <p>Already an account?<Link to='/login'>Login</Link></p>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>

        </>
    );
}

export default Register;