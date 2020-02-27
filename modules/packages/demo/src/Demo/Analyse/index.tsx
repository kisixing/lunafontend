import React, { useState, useEffect } from 'react';
import { Layout, Modal, DatePicker, Divider } from 'antd';
import request from "@lianmed/request";
// import { parse, stringify } from 'qs';
import { obvuew } from "@lianmed/f_types";
// import 'antd/dist/antd.css';
import SiderMenu from "./containers/SiderMenu";
import Content from './containers/Content';
import moment from "moment";
import { formatDate } from '@lianmed/utils';
const styles = require('./index.module.css')

const App = (props: any) => {

    const [dataSource, setDataSource] = useState<obvuew.prenatal_visitspage[]>([])
    const [pregnancy, setPregnancy] = useState({})
    const [selected, setSelected] = useState({})
    const [sDate, setSDate] = useState(formatDate(new Date('2019-1-1')))
    const [eDate, setEDate] = useState(formatDate())
    useEffect(() => {
        fetchList()
    }, [eDate, sDate])



    const fetchList = (loader = true) => {


        request
            .get(`/prenatal-visitspage?CTGExamId.specified=true&pregnancyId.specified=true&size=50&page=2&sort=visitDate%2Casc&visitDate.greaterOrEqualThan=${sDate}&visitDate.lessOrEqualThan=${eDate}`)
            .then(function (response) {
                setDataSource(response)
            })
            .catch(function (error) {
                // handle error
                console.log('/prenatal-visitspage-encrypt', error);
            });
        return []
    };

    const setItem = (item: any) => {
        setSelected(item)
    };

    // tabs标签卡切换



    // console.log('loading -->', isLoading)

    return (
        <Layout className={styles['app-wrapper']} >
            <div>
                <span>开始时间:</span><DatePicker value={moment(sDate)} onChange={e => setSDate(formatDate(e))} />
                <Divider type="vertical" />
                <span>结束时间:</span><DatePicker value={moment(eDate)} onChange={e => setEDate(formatDate(e))} />
            </div>
            <Layout style={{ height: '100%' }}>
                <Layout.Sider width={260} className={styles['app-sider']}>
                    <SiderMenu setItem={setItem} selected={selected} dataSource={dataSource} />
                </Layout.Sider>
                <Layout.Content className={styles['app-content']}>
                    <Content selected={selected} />
                </Layout.Content>
            </Layout>

        </Layout>
    );
}

export default App;
