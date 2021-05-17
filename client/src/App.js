
import React, {useEffect} from 'react';
import{BrowserRouter as Router} from 'react-router-dom'
import {DataProvider} from './GlobalState'
import Header from './components/headers/Header'
import HeaderAdmin from './components/mainpages/admin/HeaderAdmin'
import SiderBar from './components/mainpages/admin/SiderBar'
import MainPages from './components/mainpages/Pages'
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios';
import {dispatchLogin, fetchUser, dispatchGetUser} from './components/redux/actions/authAction'
import { Layout} from 'antd';
const { Content} = Layout;
function App() {
  const dispatch = useDispatch()
  const token = useSelector(state => state.token)
  const auth = useSelector(state => state.auth)
  const {user, isAdmin} = auth


  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin')
    if(firstLogin){
      const getToken = async () => {
        const res = await axios.post('/user/refresh_token', null)
        console.log('get token')
        console.log(res)
        dispatch({type: 'GET_TOKEN', payload: res.data.access_token})
      }
      getToken()
    }
  },[auth.isLogged,dispatch])

  useEffect(() => {
    if(token){
      const getUser = () => {
        dispatch(dispatchLogin())

        return fetchUser(token).then(res => {
          dispatch(dispatchGetUser(res))
        })
      }
      getUser()
    }
  },[token, dispatch])

  const headerUser = () =>{
    return <>
      <MainPages />
    </>
  }

  const headerAdmin = () =>{
    return <>
    <Layout style={{padding: 0 ,minHeight: '100vh' }}>
      <SiderBar/>
      <Layout className="site-layout" style={{padding: 0, minHeight: '100vh' }}>
        <HeaderAdmin/>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 500 }}>
            <MainPages />
          </div>
        </Content>
      </Layout>
    </Layout>
    </>
  }

  return (
    <DataProvider>
      <Router>
      <div className="App">
        {isAdmin?headerAdmin():headerUser()}
      </div>
      </Router>
    </DataProvider>
  );
}

export default App;
