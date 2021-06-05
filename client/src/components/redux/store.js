import React from 'react'
import { createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers/index'
import {Provider} from 'react-redux'

const middlewares = [thunkMiddleware];
const store = createStore(rootReducer,
    composeWithDevTools(applyMiddleware(...middlewares))
)

function DataProvider({children}) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default DataProvider