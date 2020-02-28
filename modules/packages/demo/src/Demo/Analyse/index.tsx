import React, { useState, useEffect } from 'react';
import { Layout, Modal, DatePicker, Divider, Pagination } from 'antd';
import request from "@lianmed/request";
// import { parse, stringify } from 'qs';
import { obvuew } from "@lianmed/f_types";
// import 'antd/dist/antd.css';
import SiderMenu from "./containers/SiderMenu";
import Content from './containers/Content';
import moment from "moment";
import { formatDate } from '@lianmed/utils';
import { Ctg_Analyse } from "@lianmed/pages";
const styles = require('./index.module.css')

const App = (props: any) => {

    const [dataSource, setDataSource] = useState<obvuew.prenatal_visitspage[]>([])
    const [pregnancy, setPregnancy] = useState({})
    const [selected, setSelected] = useState<obvuew.prenatal_visitspage>({})
    const [sDate, setSDate] = useState(formatDate(new Date('2019-1-1')))
    const [eDate, setEDate] = useState(formatDate())
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(0)
    useEffect(() => {
        fetchList()
    }, [eDate, sDate, page])



    const fetchList = (loader = true) => {
        const qs = `?CTGExamId.specified=true&pregnancyId.specified=true&size=16&page=${page}&sort=visitDate%2Casc&visitDate.greaterOrEqualThan=${sDate}&visitDate.lessOrEqualThan=${eDate}`

        request
            .get(`/prenatal-visitspage${qs}`)
            .then(function (response) {
                setDataSource(response)
            })

        request
            .get(`/prenatal-visits/count?${qs}`)
            .then(function (t) {
                setTotal(t)
            })

        return []
    };

    const setItem = (item: any) => {
        console.log('selected',selected)
        setSelected(item)
    };

    // tabs标签卡切换



    // console.log('loading -->', isLoading)

    return (
        <div >
            <div>
                <span>开始时间:</span><DatePicker value={moment(sDate)} onChange={e => setSDate(formatDate(e))} />
                <Divider type="vertical" />
                <span>结束时间:</span><DatePicker value={moment(eDate)} onChange={e => setEDate(formatDate(e))} />
            </div>
            <Layout style={{ height: 'cacl(100vh - 160px)' }}>
                <Layout.Sider style={{ background: '#fff' }} width={260} className={styles['app-sider']} >
                    <SiderMenu setItem={setItem} selected={selected} dataSource={dataSource} />
                    <Pagination size="small" total={total} onChange={p => setPage(p)} />
                </Layout.Sider>
                <Layout.Content className={styles['app-content']}>
                    {/* <Content selected={selected} /> */}
                    <Ctg_Analyse docid={selected && selected.ctgexam && selected.ctgexam.note} />
                </Layout.Content>
            </Layout>

        </div>
    );
}

export default App;
