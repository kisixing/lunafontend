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

const App = (props: any) => {

    const [dataSource, setDataSource] = useState<obvuew.prenatal_visitspage[]>([])
    const [pregnancy, setPregnancy] = useState({})
    const [selected, setSelected] = useState<obvuew.prenatal_visitspage>({})
    const [sDate, setSDate] = useState(formatDate(new Date('2019-02-29')))
    const [eDate, setEDate] = useState(formatDate())
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    useEffect(() => {
        fetchList()
    }, [eDate, sDate, page])



    const fetchList = (loader = true) => {
        const qs = `?CTGExamId.specified=true&pregnancyId.specified=true&size=10&page=${page}&sort=visitDate%2Casc&visitDate.greaterOrEqualThan=${sDate}&visitDate.lessOrEqualThan=${eDate}`

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
        console.log('selected', selected)
        setSelected(item)
    };

    // tabs标签卡切换



    // console.log('loading -->', isLoading)

    return (

        <Layout style={{ height: '100%' }}>
            <Layout.Sider style={{ background: '#fff' }} width={230} >
                <div style={{ marginBottom: 5 }}>
                    <span>开始时间：</span><DatePicker size="small" value={moment(sDate)} onChange={e => setSDate(formatDate(e))} />
                </div>
                <div style={{ marginBottom: 5 }}>
                    <span>结束时间：</span><DatePicker size="small" value={moment(eDate)} onChange={e => setEDate(formatDate(e))} />
                </div>
                <SiderMenu setItem={setItem} selected={selected} dataSource={dataSource} />
                <Pagination current={page} size="small" total={total} onChange={p => setPage(p)} />
            </Layout.Sider>
            <Layout.Content style={{ padding: 12 }}>
                {/* <Content selected={selected} /> */}
                <Ctg_Analyse docid={selected && selected.ctgexam && selected.ctgexam.note} />
            </Layout.Content>
        </Layout>

    );
}

export default App;
