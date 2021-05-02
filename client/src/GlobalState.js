import React, {createContext, useState, useEffect} from 'react'
import UserAPI from './api/UserAPI'
import {useSelector} from 'react-redux'
export const GlobalState = createContext()

export const DataProvider = ({children}) =>{

    const token = useSelector(state => state.token)

    const state = {
        token: token,
        userAPI: UserAPI(token),
        
    }

    return(
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}
