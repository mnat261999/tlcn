import React from 'react';
import { Layout, Menu } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const {Sider} = Layout;

function SiderBar() {
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
          <Link to='/alluser'>All User</Link>
        </Menu.Item>
        <Menu.Item  icon={<VideoCameraOutlined />}>
            <Link to='/admin1'>nav</Link>
        </Menu.Item>
        <Menu.Item icon={<UploadOutlined />}>
          nav 3
        </Menu.Item>
        <Menu.Item  icon={<UserOutlined />}>
          nav 4
        </Menu.Item>
      </Menu>
    </Sider>
    );
}

export default SiderBar;