import React, {createContext, useState, useEffect} from 'react'
import UserAPI from './api/UserAPI'
import CategoriesAPI from './api/CategoriesAPI'
import ProductsAPI from './api/ProductsAPI'
import TypesAPI from './api/TypesAPI'
import StatusesAPI from './api/StatusAPI.js'
import PetsAPI from './api/PetsAPI'
import MyPostsAPI from './api/MyPostsAPI'
import TopicsAPI from './api/TopicsAPI'
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios';
export const GlobalState = createContext()


export const DataProvider = ({children}) =>{

     const token = useSelector(state => state.token)
     const auth = useSelector(state => state.auth)
     
     const {isAdmin} = auth;
     //console.log(isAdmin)
     

     const state = {
        token: token,
        userAPI: UserAPI(token),
        productsAPI: ProductsAPI(token),
        categoriesAPI: CategoriesAPI(),
        typesAPI : TypesAPI(),
        statusesAPI: StatusesAPI(),
        petsAPI: PetsAPI(),
        myPostsAPI: MyPostsAPI(token),
        topicsAPI: TopicsAPI()
    } 

    console.log(state)


    return(
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}
