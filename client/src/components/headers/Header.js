
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
    const [cart] = state.userAPI.cart

    const home = async() => {
      window.location.href = '/';
    }
    const adoption = async() => {
        window.location.href = '/adoption';
    }
    const product = async() => {
        window.location.href = '/product';
    }
    const news = async() => {
        window.location.href = '/news';
    }


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

  const handleProfile = async () => {
    try {
        window.location.href = "/profile";
    } catch (err) {
        window.location.href = "/profile";
    }
}

const handleHistory = async () => {
  try {
      window.location.href = "/history";
  } catch (err) {
      window.location.href = "/history";
  }
}
    const IconFont = createFromIconfontCN({
      scriptUrl: [
        '//at.alicdn.com/t/font_2520839_3xfc6cekias.js', 
        '//at.alicdn.com/t/font_2520839_dpus1tqve4p.js',
        '//at.alicdn.com/t/font_2520839_9pnrampty8l.js'
      ],
    });


   useEffect(() => {
    const nav = document.querySelector(".nav-menu");
    const navigation = document.querySelector(".navigation");
    const header = document.querySelector(".header");
    const nav_link = document.querySelectorAll(".scroll-link");
    const openBtn = document.querySelector(".hamburger");
    const closeBtn = document.querySelector(".close");
    const navLeft = nav.getBoundingClientRect().left;
    const show = document.querySelector(".show");

   console.log('show',show);
   if(show)
   {
    navigation.classList.remove("show");
    nav.classList.remove("show");
    document.body.classList.remove("show");
   }

    openBtn.addEventListener("click", () => {
      if (navLeft < 0) {
        for(var x=0; x < nav_link.length; x++)
            {
                nav_link[x].classList.add("nav-link-response");
                nav_link[x].classList.remove("nav_link");
            }
        header.classList.remove("header");
        navigation.classList.add("show");
        nav.classList.add("show");
        document.body.classList.add("show");
      }
    });

    closeBtn.addEventListener("click", () => {
      if (navLeft < 0) {
        for(var x=0; x < nav_link.length; x++)
        {
            nav_link[x].classList.remove("nav-link-response");
            nav_link[x].classList.add("nav_link");
        }
        header.classList.add("header");
        navigation.classList.remove("show");
        nav.classList.remove("show");
        document.body.classList.remove("show");
      }
  });

  const navBar = document.querySelector(".navigation");
  const navHeight = navBar.getBoundingClientRect().height;
  window.addEventListener("scroll", () => {
    const scrollHeight = window.pageYOffset;
    if (scrollHeight > navHeight) {
      navBar.classList.add("fix-nav");
      for(var x=0; x < nav_link.length; x++)
      {
          nav_link[x].classList.add("nav-link-response");
          nav_link[x].classList.remove("nav_link");
      } 

    } else {
      navBar.classList.remove("fix-nav");
      for(var x=0; x < nav_link.length; x++)
      {
          nav_link[x].classList.remove("nav-link-response");
          nav_link[x].classList.add("nav_link");
      }
    }
  });

  });
  
    const menu = (
      <Menu>
        <Menu.Item icon={<LoginOutlined />}>
          <Link to="/login">
            Đăng nhập
          </Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item icon={<IconFont type="iconregister" style={{ fontSize: '16px'}}/>}>
          <Link to='/register'>
            Đăng ký
          </Link>
        </Menu.Item>
      </Menu>
    );

    const menu1 =(
      <Menu>
        <Menu.Item>
          <Link target="_blank" class='user-name' onClick={handleProfile}>
            <Avatar size={20} src={user.avatar} />
            <span>{user.name}</span>
          </Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item icon={<IconFont type="iconhistory" style={{ fontSize: '20px'}}/>}>
          <Link to='/' onClick={handleHistory}>
            Lịch sử mua hàng
          </Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item icon={<IconFont type="iconlogout" style={{ fontSize: '20px'}}/>}>
          <Link to='/' onClick={handleLogout}>
            Đăng xuất
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
          <Link>
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
                <Link onClick={home} class="nav-item nav-link scroll-link">Trang chủ</Link>
                <Link onClick={adoption} class="nav-item nav-link scroll-link">Nhận nuôi</Link>
                <Link onClick={product} class="nav-item nav-link scroll-link">Sản phẩm</Link>
                <Link onClick={news} class="nav-item nav-link scroll-link">Tin tức</Link>
                <Link class="nav-item nav-link scroll-link">Liên hệ</Link>
            </ul>
          </div>

          <div className="nav-icons">
            {
               isLogged ? userLink() :  normal()
            }
            <Link to="/cart">
                <Badge count={cart.length}>
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