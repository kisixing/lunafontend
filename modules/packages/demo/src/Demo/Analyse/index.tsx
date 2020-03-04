import React, { useState, useEffect } from 'react';
import { Layout, Modal, DatePicker, Divider, Pagination, Input, Button } from 'antd';
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
    const [sDate, setSDate] = useState(formatDate(new Date('2020-03-1')))
    const [eDate, setEDate] = useState(formatDate())
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [docid, setDocid] = useState('')
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        fetchList()
    }, [page])

    const fetchCtgExamData = () => {
        return new Promise<number>((res, rej) => {
            if (docid) {
                request.get(`/ctg-exams`).then((r: obvuew.ctg_exams_data) => {
                    res(r.id)
                }).catch(rej)
            } else {
                res()
            }
        })
    }
    const fetchList = (e?: any) => {
        setLoading(true)
        const params = {
            'CTGExamId.specified': true,
            'pregnancyId.specified': true,
            size: 10,
            sort: 'visitDate,asc',
            'visitDate.greaterOrEqualThan': sDate,
            'visitDate.lessOrEqualThan': eDate,
            page: page - 1

        }
        fetchCtgExamData()
        request
            .get(`/prenatal-visitspage`, { params })
            .then(function (response) {
                setDataSource(response)
            })

        request
            .get(`/prenatal-visits/count`, { params })
            .then(function (t) {
                setTotal(t)
            })
            .finally(() => setLoading(false))

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
                <div style={{ marginBottom: 5 }}>
                    <span style={{ marginRight: 14 }}>档案号：</span><Input style={{ width: 136 }} size="small" value={docid} onChange={e => setDocid(e.target.value)} />
                </div>

                <Button loading={loading} type="primary" size="small" style={{ width: 206, marginBottom: 5 }} onClick={fetchList}>搜索</Button>

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
