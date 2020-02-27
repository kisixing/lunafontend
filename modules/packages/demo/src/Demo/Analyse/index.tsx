import React, { Component } from 'react';
import { Layout, Modal } from 'antd';
import request from "@lianmed/request";
import { event } from '@lianmed/utils';
import moment from "moment";
// import { parse, stringify } from 'qs';

// import 'antd/dist/antd.css';
import SiderMenu from "./containers/SiderMenu";
import Header from './containers/Header';
import Content from './containers/Content';
import ReportContent from './containers/ReportContent';
import PageLoading from './components/PageLoading';
const styles = require('./App.less')


class App extends Component {
    constructor(props:any) {
        super(props);
        this.state = {
            isLoading: true,
            selected: {},
            dataSource: [],
            pregnancy: {},
            activeKey: 'archive',
        } as any
    }

    componentDidMount() {
        // TODO 设置固定账户密码，静默登录
        this.fetchList();



        event.on('signed', this.fetchList);
    }



    // TODO 11.12 档案列表请求方式
    fetchList = (loader = true) => {


        request
            .get(`/prenatal-visitspage`)
            .then(function (response) {
                // handle success

            })
            .catch(function (error) {
                // handle error
                console.log('/prenatal-visitspage-encrypt', error);
            });
        return []
    };

    setItem = (item:any) => {
        this.setState({ selected: item });
    };

    // tabs标签卡切换
    tabChange = (key:any) => {
        this.setState({ activeKey: key });
    };

    render() {
        const { isLoading, selected, dataSource, pregnancy, activeKey } = this.state as any;
        // console.log('loading -->', isLoading)
     
        return (
            <Layout className={styles['app-wrapper']}>
                <Layout.Header className={styles['app-header']}>
                    <Header dataSource={pregnancy} activeKey={activeKey} onChange={this.tabChange} />
                </Layout.Header>

                {activeKey === 'archive' ? (
                    <Layout style={{ height: '100%' }}>
                        <Layout.Sider width={260} className={styles['app-sider']}>
                            <SiderMenu setItem={this.setItem} selected={selected} dataSource={dataSource} />
                        </Layout.Sider>
                        <Layout.Content className={styles['app-content']}>
                            <Content selected={selected} />
                        </Layout.Content>
                    </Layout>
                ) : (
                        <ReportContent dataSource={dataSource} fetchList={this.fetchList} />
                    )}
            </Layout>
        );
    }
}

export default App;
