import React, {useState,useContext} from 'react';
import BreadCrumb from '../BreadCumb'
import {Link, useHistory} from 'react-router-dom'
import {showErrMsg, showSuccessMsg} from '../utils/notification/Notification'
import axios from 'axios'
import {dispatchLogin} from '../../redux/actions/authAction'
import {useDispatch,useSelector} from 'react-redux'
import {GlobalState} from '../../../GlobalState'
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';



const initialState = {
    email: '',
    password: '',
    err: '',
    success: ''
}

function Login() {
    const state = useContext(GlobalState)
    const [user, setUser] = useState(initialState)
    const dispatch = useDispatch()
    const history = useHistory()
    const {email, password, err, success} = user
    const token = useSelector(state => state.token)

    

    const handleChangeInput = e => {
        const {name, value} = e.target
        setUser({...user, [name]:value, err: '', success: ''})
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const res = await axios.post('/user/login', {email, password})
            setUser({...user, err: '', success: res.data.msg})

            localStorage.setItem('firstLogin', true)
            dispatch(dispatchLogin())
            history.push("/") 

            

        } catch (err) {
            console.log(err.response)
            err.response.data.msg && 
            setUser({...user, err: err.response.data.msg, success: ''})
        }
    }

    const responseGoogle = async (response) => {
        try {
            const res = await axios.post('/user/google_login', {tokenId: response.tokenId})

            setUser({...user, error:'', success: res.data.msg})
            localStorage.setItem('firstLogin', true)

            dispatch(dispatchLogin())
            history.push('/')
        } catch (err) {
            err.response.data.msg && 
            setUser({...user, err: err.response.data.msg, success: ''})
        }
    }

    const responseFacebook = async (response) => {
        try {
            const {accessToken, userID} = response
            const res = await axios.post('/user/facebook_login', {accessToken, userID})

            setUser({...user, error:'', success: res.data.msg})
            localStorage.setItem('firstLogin', true)

            dispatch(dispatchLogin())
            history.push('/')
        } catch (err) {
            err.response.data.msg && 
            setUser({...user, err: err.response.data.msg, success: ''})
        }
    }
    return (
        <>
        <div className="body">
        {err && showErrMsg('error',err)}
        {success && showSuccessMsg('success',success)}
            <div className="login-form w3_form">
                <div className="login w3_login">
                <h2 className="login-header w3_header">Đăng nhập</h2>
                <div className="w3l_grid">

                    <div className="login-container" >
                    <form onSubmit={handleSubmit}>
                        <div><input type="text" placeholder="Email"  id="email" value={email} name="email" onChange={handleChangeInput}/></div>
                        <div><input type="password" placeholder="Mật khẩu" id="password" value={password} name="password" onChange={handleChangeInput}/></div>
                        <div><button className="submit" type="submit">Đăng nhập</button></div>
                    </form>
                    <div className="second-section w3_section">
                        <div className="bottom-header w3_bottom">
                            <h3>Hoặc</h3>
                        </div>
                        <div className="social-links w3_social">
{/*                             <ul>

                            <li>
                                <a className="facebook" href="#" target="blank"><i className="fa fa-facebook"/></a>
                            </li>

                            <li>
                                <a className="googleplus" href="#" target="blank"><i className="fa fa-google-plus"/></a>
                            </li>
                            </ul> */}
                            <GoogleLogin
                                clientId="435855610791-bpm8fma33403onru00s417ic9eqhj6r7.apps.googleusercontent.com"
                                buttonText="Login with google"
                                onSuccess={responseGoogle}
                                cookiePolicy={'single_host_origin'}
                                render={renderProps => (
                                    <Link onClick={renderProps.onClick}
                                    disabled={renderProps.disabled} className="googleplus" href="#" target="blank"><i class="fab fa-google"></i></Link>
                                  )}
                            />
                             <FacebookLogin
                            appId="826486697916876"
                            autoLoad ={false}
                            fields="name,email,picture"
                            callback={responseFacebook}       
                            render={renderProps => (
                                <Link  onClick={renderProps.onClick} className="facebook" href="#" target="blank"><i class="fab fa-facebook-f"></i></Link>
                              )}               
                            /> 
                        </div>
                    </div>
                    <div className="bottom-text w3_bottom_text">
                            <p>Nếu chưa có tài khoản?<Link to='/register'>Đăng ký</Link></p>
                            <h4><Link to='/forgot_password'>Quên mật khẩu?</Link></h4>  
                    </div>
                    </div>

                </div>
                </div>
            </div>
        </div>

        </>
    );
}

export default Login;