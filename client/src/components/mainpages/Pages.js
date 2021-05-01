import React from 'react';
import {Switch, Route} from 'react-router-dom'
import {useSelector} from 'react-redux'
import Home from './homepage/Home'
import Login from './auth/Login'
import Register from './auth/Register'
import ActivationEmail from './auth/ActivationEmail'
import ForgotPass from './auth/ForgotPassWord'
import NotFound from './utils/NotFound/NotFound'
import ResetPass from './auth/ResetPassword'
import Profile from './profile/Profile'




function Pages() {
    const auth = useSelector(state => state.auth)
    const {isLogged, isAdmin} = auth
    return (
        <>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={isLogged ? NotFound : Login} />
            <Route path="/register" exact component={isLogged ? NotFound : Register} />
            <Route path="/user/activate/:activation_token" exact component={ActivationEmail} />
            <Route path="/forgot_password" exact component={isLogged ? NotFound:ForgotPass} />
            <Route path="/user/reset/:token" exact component={isLogged ? NotFound : ResetPass} />
            <Route path="/profile" component={isLogged ? Profile : NotFound} exact />
        </Switch>
        </>
    );
}

export default Pages;