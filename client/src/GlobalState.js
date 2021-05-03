import React, {createContext, useState, useEffect} from 'react'
import UserAPI from './api/UserAPI'
import CategoriesAPI from './api/CategoriesAPI'
import ProductsAPI from './api/ProductsAPI'
import TypesAPI from './api/TypesAPI'
import StatusesAPI from './api/StatusAPI.js'
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios';
export const GlobalState = createContext()


export const DataProvider = ({children}) =>{

     const token = useSelector(state => state.token)
     const auth = useSelector(state => state.auth)
     

     const state = {
        token: token,
        productsAPI: ProductsAPI(),
        userAPI: UserAPI(token),
        categoriesAPI: CategoriesAPI(),
        typesAPI : TypesAPI(),
        statusesAPI: StatusesAPI()
        
    } 


    return(
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}
