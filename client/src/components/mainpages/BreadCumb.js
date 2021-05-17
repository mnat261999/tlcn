import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Breadcrumb,Tag } from "antd";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./breadcumb.css";
const BreadCrumb = () => {
  const location = useLocation();
  const breadCrumbView = () => {
    const { pathname } = location;
    console.log('location',location)
    const pathnames = pathname.split("/").filter((item) => item);
    const paths = pathnames.slice(0, 2)
    console.log('path',paths)
    const capatilize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
    return (
      <div>
        <Breadcrumb>
          {paths.length > 0 ? (
            <Breadcrumb.Item>
              <Link to="/">Home</Link>
            </Breadcrumb.Item>
          ) : (
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          )}
          {paths.map((name, index) => {
            const routeTo = `/${paths.slice(0, index + 1).join("/")}`;
            console.log('routeTo',routeTo)
            console.log('name',name)
            const isLast = index === paths.length - 1;
            return isLast ? (
              <Breadcrumb.Item>{capatilize(name)}</Breadcrumb.Item>
            ) : (
              <Breadcrumb.Item>
                <Link to={`${routeTo}`}>{capatilize(name)}</Link>
              </Breadcrumb.Item>
            );
          })}
        </Breadcrumb>
      </div>
    );
  };

  return <>
  <div className="breadcumb">
  <div className="mybread slide">
    <div className="container bread_txt">
      <Tag color="#ce7852">{breadCrumbView()}</Tag>
    </div>
  </div>
</div>
  </>;
};

export default BreadCrumb;