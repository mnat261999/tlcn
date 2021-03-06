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
      '//at.alicdn.com/t/font_2520839_5ng5lkrrovm.js',
      '//at.alicdn.com/t/font_2520839_zdkkbqi5vp.js',
      '//at.alicdn.com/t/font_2520839_ivqawpasde8.js',
      '//at.alicdn.com/t/font_2520839_wwwjhyp7f.js',
      '//at.alicdn.com/t/font_2520839_ebx4e8n5w3.js',
      '//at.alicdn.com/t/font_2520839_878ovwu9sc8.js',
      '//at.alicdn.com/t/font_2520839_eqz5g0o1jq9.js'
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
              <Link to ='/admin/all_product'>All Products</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to='/admin/create_product'>Create Product</Link>
            </Menu.Item>
        </SubMenu>

        <SubMenu key="sub2" icon={<IconFont type="iconcategory" style={{ fontSize: '20px'}}/>} title="Category">
          <Menu.Item key="3">
            <Link to='/admin/category'>Categories</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to='/admin/typepage'>Type Page</Link>
          </Menu.Item>
        </SubMenu>

        <SubMenu key="sub3" icon={<IconFont type="iconpet_icon" style={{ fontSize: '20px'}}/>} title="Case">
            <Menu.Item key="5">
              <Link to ='/admin/all_pet'>All Pets</Link>
            </Menu.Item>
            <Menu.Item key="6">
              <Link to='/admin/create_pet'>Create Pet</Link>
            </Menu.Item>
            <Menu.Item key="7">
              <Link to='/admin/type'>Types</Link>
            </Menu.Item>
            <Menu.Item key="8">
            <Link to='/admin/status'>Status</Link>
            </Menu.Item>
        </SubMenu>



        <SubMenu key="sub4" icon={<IconFont type="iconnew" style={{ fontSize: '20px'}}/>} title="Post">
            <Menu.Item key="9">
              <Link to ='/admin/all_post'>All Post</Link>
            </Menu.Item>
            <Menu.Item key="10">
              <Link to='/admin/create_post'>Create Post</Link>
            </Menu.Item>
            <Menu.Item key="11">
              <Link to='/admin/topic'>Create Topics</Link>
            </Menu.Item>
        </SubMenu>
 
        <Menu.Item icon={<IconFont type="iconhistory1" style={{ fontSize: '20px'}}/>}>
          <Link to='/admin/history'>All History</Link>
        </Menu.Item>

        <Menu.Item icon={<IconFont type="iconstar" style={{ fontSize: '22px'}}/>}>
          <Link to='/admin/review'>Reviews</Link>
        </Menu.Item>
      </Menu>
      
    </Sider>
    );
}

export default SiderBar;