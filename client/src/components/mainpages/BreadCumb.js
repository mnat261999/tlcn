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
  const [name_pet, setNamePet] = state.petsAPI.name_pet
  const location = useLocation();
  //console.log('name_pet',name_pet)

  const items = [
    { to: '/', label: 'Home' },
    { to: '/login', label: 'Login' },
    { to: '/register', label: 'Register' },
    { to: '/forgot_password', label: 'Forgot Password' },
    { to: `/user/reset/${token}`, label: 'Reset' },
    { to: '/profile', label: 'My profile' },
    { to: '/adoption', label: 'Adoption' },
    { to: `/adoption/${id_pet}`, label: name_pet}
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
      <Link to="/">Home</Link>
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