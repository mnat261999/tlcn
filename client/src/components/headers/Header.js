
import React, {useEffect,useContext} from 'react';
import {Link} from 'react-router-dom';
import { Menu, Dropdown} from 'antd';
import 'antd/dist/antd.css';
import { LoginOutlined,TeamOutlined } from '@ant-design/icons';
import {GlobalState} from '../../GlobalState';


function Header(){

  const state = useContext(GlobalState)


  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'js/index.js';
    script.async = true;
    document.body.appendChild(script);
  });
  
    const menu = (
      <Menu className="customMenu">
        <Menu.Item icon={<LoginOutlined />}>
          <Link to="/login">
            Sign In
          </Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item icon={<TeamOutlined />}>
          <Link to='/register'>
            Sign Up
          </Link>
        </Menu.Item>
      </Menu>
    );
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
          <Dropdown overlay={menu} placement="bottomCenter" arrow>
            <Link className="icon__item">
              <i className="fas fa-user" />
            </Link>
          </Dropdown>

            <Link className="icon__item">
              <i className="fas fa-shopping-cart" />
              <span>2</span>
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