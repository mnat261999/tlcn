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
}

function Register() {
    const [user, setUser] = useState(initialState)

    const {name, email, password,cf_password} = user

    const handleChangeInput = e => {
        const {name, value} = e.target
        setUser({...user, [name]:value})
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            e.preventDefault()
            if(isEmpty(name) || isEmpty(password))
            {
              showErrMsg('error','Please fill in all fields.')
              return setUser({...user})
            }
                
            if(!isEmail(email))
            {
              showErrMsg('error','Invalid emails.')
              return setUser({...user})
            }
                
            if(!isPass(password))
            {
              showErrMsg('error','Password must be at least 8 characters, one letter and one number.')
              return setUser({...user})
            }
                
            
            if(!isMatch(password, cf_password))
            {
              showErrMsg('error','Password did not match.')
              return setUser({...user})

            }
                
            try {
                const res = await axios.post('/user/register', {
                    name, email, password
                })
                showSuccessMsg('success',res.data.msg)
                //setUser({...user, err: '', success: res.data.msg})
            } catch (err) {
                err.response.data.msg && 
                showErrMsg('error',err.response.data.msg)
                //setUser({...user, err: err.response.data.msg, success: ''})
            }
        } catch (err) {
            err.response.data.msg && 
            setUser({...user, err: err.response.data.msg, success: ''})
        }
    }
    return (
        <>
        <div className="body">
{/*         {err && showErrMsg('error',err)}
        {success && showSuccessMsg('success',success)} */}
            <div className="login-form w3_form">
                <div className="login w3_login">
                <h2 className="login-header w3_header">Đăng ký</h2>
                <div className="w3l_grid">
                    <div className="login-container" >
                        <form onSubmit={handleSubmit}>
                            <div><input type="text" placeholder="Name"  id="name" value={name} name="name" onChange={handleChangeInput}/></div>
                            <div><input type="text" placeholder="Email"  id="email" value={email} name="email" onChange={handleChangeInput}/></div>
                            <div><input type="password" placeholder="Mật khẩu" id="password" value={password} name="password" onChange={handleChangeInput}/></div>
                            <div><input type="password" placeholder="Xác nhận mật khẩu" id="cf_password" value={cf_password} name="cf_password" onChange={handleChangeInput} /></div>
                            <div><button className="submit" type="submit">Đăng ký</button></div>
                        </form> 
                        <div className="bottom-text w3_bottom_text">
                            <p>Nếu đã có tài khoản?<Link to='/login'>Đăng nhập</Link></p>
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