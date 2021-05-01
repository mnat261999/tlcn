import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux'
import axios from 'axios'
import { Layout, Row, Col, Icon, Badge, Menu, Dropdown, Avatar, Popover } from 'antd'
import { createFromIconfontCN } from '@ant-design/icons';
import {GlobalState} from '../../../GlobalState';
const { Header } = Layout;

function HeaderAdmin() {
    const state = useContext(GlobalState)
    console.log(state)
    const auth = useSelector(state => state.auth)
    const {user, isLogged} = auth


    const handleLogout = async () => {
        try {
            await axios.get('/user/logout')
            localStorage.removeItem('firstLogin')
            window.location.href = "/";
        } catch (err) {
            window.location.href = "/";
        }
    }

    const IconFont = createFromIconfontCN({
        scriptUrl: '//at.alicdn.com/t/font_2520839_oxs5w5hu72h.js',
    });

    
    const menu =(
        <Menu>
          <Menu.Item icon={<IconFont type="iconlogout" style={{ fontSize: '20px'}}/>}>
            <Link to='/' onClick={handleLogout}>
              Sign Out
            </Link>
          </Menu.Item>
        </Menu>
      );
  
    return (
    <Header style={{ background: '#fff', padding: 0 }}>
        <Row type="flex" justify="end" align="middle">
          <Col span={3} style={{ marginRight:20}}>
              <Link>
                    <Dropdown overlay={menu}>
                        <div>
                            <Avatar size={42} src={user.avatar} />
                            <span style={{ padding:12, color:'black'}} >{user.name}</span>
                            <span><IconFont type="icondown" style={{ fontSize: '10px',color:'black'}}/></span>
                        </div>
                    </Dropdown>
              </Link>
          </Col>
        </Row>
    </Header>
    );
}

export default HeaderAdmin;