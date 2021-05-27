import React, {useEffect,useContext} from 'react';
import {Link} from 'react-router-dom';
import { Menu, Dropdown,Avatar, Image,Badge } from 'antd';
import 'antd/dist/antd.css';
import { LoginOutlined,TeamOutlined,ShoppingCartOutlined,UserOutlined } from '@ant-design/icons';
import {GlobalState} from '../../GlobalState';
import {useSelector} from 'react-redux'
import { createFromIconfontCN } from '@ant-design/icons';
import axios from 'axios'

function HeaderPage() {
    
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
 const click = async () => {
  const show = document.querySelector(".show");
  if(show)
  {
    document.body.classList.remove("show");
  }
}
   const IconFont = createFromIconfontCN({
     scriptUrl: [
       '//at.alicdn.com/t/font_2520839_3xfc6cekias.js', 
       '//at.alicdn.com/t/font_2520839_dpus1tqve4p.js',
     ],
   });


  useEffect(() => {
   const nav = document.querySelector(".nav-menu");
   const navigation = document.querySelector(".navigation_page");
   const header = document.querySelector(".header_page");
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
       header.classList.remove("header_page");
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
       header.classList.add("header_page");
       navigation.classList.remove("show");
       nav.classList.remove("show");
       document.body.classList.remove("show");
     }
 });

 const navBar = document.querySelector(".navigation_page");
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
         <Link target="_blank" class='user-name' to="/profile">
           <Avatar size={20} src={user.avatar} />
           <span>{user.name}</span>
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
               <Dropdown overlay={menu} placement="bottomLeft" arrow>
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

   <header id="header_page" className="header_page">
     <nav className="navigation_page">
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
               <Link to='/' class="nav-item nav-link-page scroll-link">Trang chủ</Link>
               <Link to='/adoption' class="nav-item nav-link-page scroll-link">Nhận nuôi</Link>
               <Link class="nav-item nav-link-page scroll-link">Sản phẩm</Link>
               <Link to='/news' class="nav-item nav-link-page scroll-link">Tin tức</Link>
               <Link class="nav-item nav-link-page scroll-link">Liên hệ</Link>
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

export default HeaderPage;