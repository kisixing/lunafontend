import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { Layout, Menu } from 'antd';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default class SiderDemo extends React.Component {
  state = {
    collapsed: true,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout style={{ height: '100vh', overflow: 'hidden' }}>
        {/* <Sider trigger={null} collapsible collapsed={this.state.collapsed} theme="dark">
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
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['-1']}>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <span>组件</span>
                </span>
              }
            >
              <Menu.Item key="-1">
                <Link to="/Analyse">
                  分析
                </Link>
              </Menu.Item>
              <Menu.Item key="0">
                <Link to="/CtgPanel">
                  CtgPanel
                </Link>
              </Menu.Item>
              <Menu.Item key="1">
                <Link to="/Ctg">
                  Ctg
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/Ecg">
                  Ecg
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/Partogram">
                  Partogram
                </Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="/Pages">
                  Pages
                </Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider> */}
        <Layout>
          <Content
            style={{
              padding: 20,
              paddingTop:28,
              background: '#fff',
              height:'calc(100vh - 64px)'
            }}
          >
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}
