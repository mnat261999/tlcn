import React from 'react';
import {Switch, Route} from 'react-router-dom'
import {useSelector} from 'react-redux'
import Home from './homepage/Home'
import Login from './auth/Login'
import Register from './auth/Register'
import ActivationEmail from './auth/ActivationEmail'


function Pages() {
    return (
        <>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/user/activate/:activation_token" exact component={ActivationEmail} />
        </Switch>
        </>
    );
}

export default Pages;