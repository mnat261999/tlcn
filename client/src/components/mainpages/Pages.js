import React,{useEffect,useContext} from 'react';
import {Switch, Route,useLocation } from 'react-router-dom'
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
import AllProduct  from './admin/AllProduct'
import Categories  from './admin/Categories'
import CreateProduct from './admin/CreateProduct'
import CreatePet from './admin/CreatePet'
import Type from './admin/Type'
import Status from './admin/Status'
import CreatePost from './admin/CreatePost'
import AllPet  from './admin/AllPet'
import AllPost  from './admin/AllPost'
import Pets from './pets/Pets'
import Posts from './posts/Posts'
import Header from '../headers/Header'
import HeaderPage from '../headers/HeaderPage'
import BreadCrumb from './BreadCumb'
import BackgroundHeader from './utils/background_header/BackgroundHeader'
import DetailPet from './pets/DetailPet'
import Topic from './admin/Topic'
import DetailPost from './posts/DetailPost'
import Products from './products/Products'
import DetailProduct from './products/DetailProduct'
import Cart from './cart/Cart'
import OrderHistory from './history/OrderHistory'
import OrderHistoryAdmin from './admin/OrderHistoryAdmin'


import TypePage from './admin/TypePage'
import Review from './admin/Review'

import {GlobalState} from '../../GlobalState'




function Pages() {
    const auth = useSelector(state => state.auth)
    const state = useContext(GlobalState)
    const {isLogged, isAdmin} = auth
    const [location, setLocation] = state.userAPI.location
    const [filter, setFilter] = state.myPostsAPI.filter

    const locate = useLocation();
     useEffect(()=>{
        setLocation(locate.pathname)
        if(location !== "/news")
        {
            setFilter("")
        }
        console.log({location});
        console.log(locate.pathname);
    })

 
    return (
        <>
        {
            isAdmin||locate.pathname==='/'&&<Header/>||<HeaderPage/>
        }
        {
            isAdmin||locate.pathname!=='/'&&<BreadCrumb/>
        }
        
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
            <Route path="/adoption" exact component={Pets} />
            <Route path="/adoption/:id" exact component={DetailPet} />
            <Route path="/news" exact component={Posts} />
            <Route path="/news/:id" exact component={DetailPost} />
            <Route path="/product" exact component={Products} />
            <Route path="/product/:id" exact component={DetailProduct} />
            <Route path="/cart" exact component={Cart} />
            <Route path="/history" exact component={isLogged ? OrderHistory : NotFound} />

            {
                isAdmin?<Route path="/admin/alluser" exact component={AllUser} />:<Route path="/admin/alluser" exact component={NotFound} />
            }
            {/* <Route path="/admin/alluser" component={isAdmin ? AllUser : NotFound} exact /> */}
            <Route path="/admin/edit_user/:id" component={isAdmin ? EditUser : NotFound} exact />

            <Route path="/admin/all_product" component={isAdmin ? AllProduct : NotFound} exact />
            <Route path="/admin/category" exact component={isAdmin ? Categories : NotFound} />
            <Route path="/admin/create_product" exact component={isAdmin ? CreateProduct : NotFound} />
            <Route path="/admin/edit_product/:id" exact component={isAdmin ? CreateProduct : NotFound} />
            <Route path="/admin/typepage" exact component={isAdmin ? TypePage : NotFound} />

            <Route path="/admin/create_pet" exact component={isAdmin ? CreatePet : NotFound} />
            <Route path="/admin/edit_pet/:id" exact component={isAdmin ? CreatePet : NotFound} />
            <Route path="/admin/all_pet" component={isAdmin ? AllPet : NotFound} exact />
            <Route path="/admin/type" exact component={isAdmin ? Type : NotFound} />
            <Route path="/admin/status" exact component={isAdmin ?  Status : NotFound} />
            
            <Route path="/admin/create_post" exact component={isAdmin ? CreatePost : NotFound} />
            <Route path="/admin/all_post" component={isAdmin ? AllPost : NotFound} exact />
            <Route path="/admin/edit_post/:id" exact component={isAdmin ? CreatePost : NotFound} />
            <Route path="/admin/topic" exact component={isAdmin ?  Topic : NotFound} />
            <Route path="/admin/profile" component={isAdmin ? '' : NotFound} exact />
            <Route path="/admin/history" exact component={isAdmin ?  OrderHistoryAdmin : NotFound} />
            <Route path="/admin/review" exact component={isAdmin ?  Review : NotFound} />
        </Switch>
        </>
    );
}

export default Pages;