import React, {useState,useContext} from 'react';
import BreadCrumb from '../BreadCumb'
import {Link, useHistory} from 'react-router-dom'
import {showErrMsg, showSuccessMsg} from '../utils/notification/Notification'
import axios from 'axios'
import {dispatchLogin} from '../../redux/actions/authAction'
import {useDispatch,useSelector} from 'react-redux'
import {GlobalState} from '../../../GlobalState'



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
    return (
        <>
        <BreadCrumb/>
        <div className="body">
        {err && showErrMsg('error',err)}
        {success && showSuccessMsg('success',success)}
            <div className="login-form w3_form">
                <div className="login w3_login">
                <h2 className="login-header w3_header">Log in</h2>
                <div className="w3l_grid">

                    <div className="login-container" >
                    <form onSubmit={handleSubmit}>
                        <div><input type="text" placeholder="Email"  id="email" value={email} name="email" onChange={handleChangeInput}/></div>
                        <div><input type="password" placeholder="Password" id="password" value={password} name="password" onChange={handleChangeInput}/></div>
                        <div><button type="submit">Login</button></div>
                    </form>
                    <div className="second-section w3_section">
                        <div className="bottom-header w3_bottom">
                            <h3>OR</h3>
                        </div>
                        <div className="social-links w3_social">
                            <ul>
                            {/* facebook */}
                            <li>
                                <a className="facebook" href="#" target="blank"><i className="fa fa-facebook"/></a>
                            </li>
                            {/* google plus */}
                            <li>
                                <a className="googleplus" href="#" target="blank"><i className="fa fa-google-plus"/></a>
                            </li>
                            </ul>
                        </div>
                    </div>
                    <div className="bottom-text w3_bottom_text">
                            <p>No account yet?<Link to='/register'>Signup</Link></p>
                            <h4><Link to='/forgot_password'>Forgot your password?</Link></h4>  
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