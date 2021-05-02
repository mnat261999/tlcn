import React from 'react';
import { Layout, Menu } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { createFromIconfontCN } from '@ant-design/icons';

const {Sider} = Layout;
const { SubMenu } = Menu;

function SiderBar() {
  const IconFont = createFromIconfontCN({
    scriptUrl: [
      '//at.alicdn.com/t/font_2520839_3xfc6cekias.js', 
      '//at.alicdn.com/t/font_2520839_dpus1tqve4p.js',
    ],
  });
    return (
<Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={broken => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div className="logo-sider" />
      <Menu theme="dark" mode="inline">
        <Menu.Item icon={<UserOutlined />}>
          <Link to='/admin/alluser'>All User</Link>
        </Menu.Item>
        <SubMenu key="sub1" icon={<IconFont type="iconproduct" style={{ fontSize: '20px'}}/>} title="Product">
            <Menu.Item key="1">
              <Link to ='/admin/allproduct'>All Products</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link>Create Product</Link>
            </Menu.Item>
        </SubMenu>
        <Menu.Item icon={<IconFont type="iconcategory" style={{ fontSize: '20px'}}/>}>
          <Link to='/admin/category'>Categories</Link>
        </Menu.Item>
        <Menu.Item  icon={<UserOutlined />}>
          nav 4
        </Menu.Item>
      </Menu>
    </Sider>
    );
}

export default SiderBar;