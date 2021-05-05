
import React, {useEffect,useContext} from 'react';
import {Link} from 'react-router-dom';
import { Menu, Dropdown,Avatar, Image,Badge } from 'antd';
import 'antd/dist/antd.css';
import { LoginOutlined,TeamOutlined,ShoppingCartOutlined,UserOutlined } from '@ant-design/icons';
import {GlobalState} from '../../GlobalState';
import {useSelector} from 'react-redux'
import { createFromIconfontCN } from '@ant-design/icons';
import axios from 'axios'


function Header(){

   const state = useContext(GlobalState)
    console.log(state)
    const auth = useSelector(state => state.auth)
    const {user, isLogged} = auth


    const handleLogout = async () => {
      try {
          await axios.get('/user/logout')
          localStorage.removeItem('firstLogin')
          localStorage.removeItem('token')
          window.location.href = "/";
      } catch (err) {
          window.location.href = "/";
      }
  }
    const IconFont = createFromIconfontCN({
      scriptUrl: [
        '//at.alicdn.com/t/font_2520839_3xfc6cekias.js', 
        '//at.alicdn.com/t/font_2520839_dpus1tqve4p.js',
      ],
    });


  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'js/index.js';
    script.async = true;
    document.body.appendChild(script);
  });
  
    const menu = (
      <Menu>
        <Menu.Item icon={<LoginOutlined />}>
          <Link to="/login">
            Sign In
          </Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item icon={<IconFont type="iconregister" style={{ fontSize: '16px'}}/>}>
          <Link to='/register'>
            Sign Up
          </Link>
        </Menu.Item>
      </Menu>
    );

    const menu1 =(
      <Menu>
        <Menu.Item>
          <Link target="_blank" class='user-name' to="/profile">
            <Avatar size={20} src={user.avatar} />
            <span>{user.name}</span>
          </Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item icon={<IconFont type="iconlogout" style={{ fontSize: '20px'}}/>}>
          <Link to='/' onClick={handleLogout}>
            Sign Out
          </Link>
        </Menu.Item>
      </Menu>
    );

    const normal = () =>{
      return <>
            <Link>
                <Dropdown  overlay={menu} placement="bottomLeft" arrow>
                <Avatar size={42} icon={<IconFont type="iconuser" />} />
              </Dropdown>
            </Link>
      </>
    }

    const userLink =() =>{
      return <>
          <Link to='/profile'>
            <Dropdown overlay={menu1} placement="bottomLeft" arrow>
            <Avatar size={42} src={user.avatar} />
          </Dropdown>
          </Link>
      </>

    }
    return (
  <>

    <header id="header" className="header">
      <nav className="navigation">
        <div className="nav-center container">
          <Link to='/' className="logo">
            <img src="https://res.cloudinary.com/lucy2619288/image/upload/v1618744835/logo/logo_primary_iamyl6.png" alt="" />
          </Link>
          <div className="nav-menu">
            <div className="nav-top">
              <div className="logo">
                <Link>
                  <img src="https://res.cloudinary.com/lucy2619288/image/upload/v1618746342/logo/logo_edulxq.png" alt="" />
                </Link>
              </div>
              <div className="close">
                <i className="fas fa-times" />
              </div>
            </div>
            <ul className="nav-list">
              <li className="nav-item"><Link to='/' className="nav-link scroll-link">Home</Link></li>
              <li className="nav-item"><Link className="nav-link scroll-link">Adoption</Link></li>
              <li className="nav-item"><Link className="nav-link scroll-link">Products</Link></li>
              <li className="nav-item"><Link className="nav-link scroll-link">Stories</Link></li>
              <li className="nav-item"><Link className="nav-link scroll-link">Contact</Link></li>
            </ul>
          </div>

          <div className="nav-icons">
            {
               isLogged ? userLink() :  normal()
            }
            <Link>
                <Badge count={1}>
                  <Avatar  size={42} icon={<IconFont type="iconcart2"/>} />
              </Badge>
            </Link>
        </div>


          <div  className="hamburger">
            <i className="fas fa-bars" />
          </div>
        </div>
      </nav>
    </header>
  </>
    );
}
export default Header;