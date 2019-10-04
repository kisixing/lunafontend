import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { Layout, Menu, Breadcrumb, Icon } from 'antd';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default class SiderDemo extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout style={{ height: '100vh', overflow: 'hidden' }}>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed} theme="dark">
          <div
            className="logo"
            style={{
              height: 64,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#fff',
              fontSize: 18,
            }}
          >
            Demo
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="user" />
                  <span>曲线组件</span>
                </span>
              }
            >
              <Menu.Item key="1">
                <Link to="/Ctg">
                  <Icon type="user" />
                  Ctg
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/Ecg">
                  <Icon type="video-camera" />
                  Ecg
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/Partogram">
                  <Icon type="upload" />
                  Partogram
                </Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              style={{ padding: '0 24px', fontSize: 20 }}
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 280,
            }}
          >
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}
