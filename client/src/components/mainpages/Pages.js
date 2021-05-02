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
import Admin from './admin/Admin'
import AllUser from './admin/AllUser'
import EditUser from './admin/EditUser'




function Pages() {
    const auth = useSelector(state => state.auth)
    const {isLogged, isAdmin} = auth
    return (
        <>
        <Switch>
            {
                isAdmin?<Route path="/" exact component={Admin} />:<Route path="/" exact component={Home} />
            }
            <Route path="/login" exact component={isLogged ? NotFound : Login} />
            <Route path="/register" exact component={isLogged ? NotFound : Register} />
            <Route path="/user/activate/:activation_token" exact component={ActivationEmail} />
            <Route path="/forgot_password" exact component={isLogged ? NotFound:ForgotPass} />
            <Route path="/user/reset/:token" exact component={isLogged ? NotFound : ResetPass} />
            <Route path="/profile" component={isLogged ? Profile : NotFound} exact />
            <Route path="/admin/alluser" component={isAdmin ? AllUser : NotFound} exact />
            <Route path="/admin/edit_user/:id" component={isAdmin ? EditUser : NotFound} exact />
        </Switch>
        </>
    );
}

export default Pages;