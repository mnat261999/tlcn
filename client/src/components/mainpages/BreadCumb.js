import React, {useContext} from "react";
import { useLocation, Link } from "react-router-dom";
import { Breadcrumb,Tag } from "antd";
import {GlobalState} from '../../GlobalState'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./breadcumb.css";
const BreadCrumb = () => {
  const state = useContext(GlobalState)
  const token = localStorage.getItem('access_token')
  const id_pet = localStorage.getItem('id_pet')
  const [name_pet] = state.petsAPI.name_pet
  const id_post = localStorage.getItem('id_post')
  const [title] = state.myPostsAPI.title
  const id_product = localStorage.getItem('id_product')
  const [name_product] = state.productsAPI.name_product
  const location = useLocation();
  const id_payment = localStorage.getItem('id_payment')
  //console.log('name_pet',name_pet)

  const items = [
    { to: '/', label: 'Trang chủ' },
    { to: '/login', label: 'Đăng nhập' },
    { to: '/register', label: 'Đăng kí' },
    { to: '/forgot_password', label: 'Quên mật khẩu' },
    { to: `/user/reset/${token}`, label: 'Reset' },
    { to: '/profile', label: 'Hồ sơ cá nhân' },
    { to: '/adoption', label: 'Nhận nuôi' },
    { to: `/adoption/${id_pet}`, label: name_pet},
    { to: '/news', label: 'Tin tức' },
    { to: `/news/${id_post}`, label: title },
    { to: '/product', label: 'Sản phẩm' },
    { to: `/product/${id_product}`, label: name_product},
    { to: '/cart', label: 'Giỏ hàng' },
    { to: '/history', label: 'Lịch sử mua hàng' },
    { to: `/history/${id_payment}`, label: 'Chi tiết hóa đơn'},
  ]

 
  
  const { pathname } = location;
  //console.log('location',location)

  const pathnames = pathname.split("/").filter((item) => item);
  const extraBreadcrumbItems = pathnames.map((_, index) => {
    const url = `/${pathnames.slice(0, index + 1).join('/')}`;
    //console.log('url',url)
    return (
      <>
     {
       items.map((item) => (
        <Breadcrumb.Item key={item.to}>
          {url===item.to?<Link key={item.label} to={item.to}>{item.label}</Link>:''}
        </Breadcrumb.Item>
       ))
     }
      </>
    );
  });


  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">Trang chủ</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);

  return <>
  <div className="breadcumb">
  <div className="mybread slide">
    <div className="container bread_txt">
      <Tag color="#ce7852"><Breadcrumb>{breadcrumbItems}</Breadcrumb></Tag>
    </div>
  </div>
</div>
  </>;
};

export default BreadCrumb;