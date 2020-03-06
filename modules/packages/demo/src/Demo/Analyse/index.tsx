import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Layout, Modal, DatePicker,  Pagination, Input, Button } from 'antd';
import request from "@lianmed/request";
import { obvue } from "@lianmed/f_types";
import SiderMenu from "./containers/SiderMenu";
import moment from "moment";
import { formatDate } from '@lianmed/utils';
import { Ctg_Analyse } from "@lianmed/pages";

const App = (props: any) => {

    const [dataSource, setDataSource] = useState<obvue.prenatal_visitspage[]>([])
    const [pregnancy, setPregnancy] = useState({})
    const [selected, setSelected] = useState<obvue.prenatal_visitspage>({})
    const [sDate, setSDate] = useState(formatDate(new Date('2020-03-1')))
    const [eDate, setEDate] = useState(formatDate())
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const docidRef = useRef('')
    const [params, setParams] = useState({
        'CTGExamId.specified': true,
        'pregnancyId.specified': true,
        'visitDate.greaterOrEqualThan': sDate,
        'visitDate.lessOrEqualThan': eDate,
        'cTGExamId.equals': 0,
        size: 10,
        sort: 'visitDate,asc',
        page,
    })
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setParams({ ...params, page })
    }, [page])
    useEffect(() => {
        fetchList()
    }, [params])

    const fetchCtgExamData = () => {
        return new Promise<number>((res, rej) => {
            const docid = docidRef.current
            if (docid) {
                request.get(`/ctg-exams-criteria?note.equals=${docid}`).then((r: any[]) => {
                    const t = r[0] || { id: 0 }
                    res(t.id)
                })
            } else {
                res()
            }
        })
    }
    const fetchList = (e?: any) => {
        setLoading(true)

        fetchCtgExamData().then(id => {
            params["cTGExamId.equals"] = id
            params["page"] = page - 1
            request
                .get(`/prenatal-visitspage`, { params })
                .then(function (response) {
                    setDataSource(response)
                    selected.id || setSelected(response[0])
                }).finally(() => setLoading(false))

            request
                .get(`/prenatal-visits/count`, { params })
                .then(function (t) {
                    setTotal(t)
                    if (page > t) setPage(t < 1 ? 1 : t)
                })

        })
    };



    return (

        <Layout style={{ height: '100%' }}>
            <Layout.Sider style={{ background: '#fff' }} width={250} >
                <div style={{ marginBottom: 5 }}>
                    <span style={{ marginRight: 14 }}>开始时间：</span><DatePicker size="small" value={moment(sDate)} onChange={e => setSDate(formatDate(e))} />
                </div>
                <div style={{ marginBottom: 5 }}>
                    <span style={{ marginRight: 14 }}>结束时间：</span><DatePicker size="small" value={moment(eDate)} onChange={e => setEDate(formatDate(e))} />
                </div>
                <div style={{ marginBottom: 5 }}>
                    <span style={{ marginRight: 28 }}>档案号：</span>
                    <Input allowClear style={{ width: 136 }} size="small" onChange={e => docidRef.current = (e.target.value)} />
                </div>
                <div style={{ marginBottom: 5 }}>
                    <span style={{ marginRight: 0 }}>已标记档案：</span>
                    <Input allowClear style={{ width: 136 }} size="small" onChange={e => docidRef.current = (e.target.value)} />
                </div>

                <Button loading={loading} type="primary" size="small" style={{ width: 220, marginBottom: 5 }} onClick={() => setParams({
                    ...params, 'visitDate.greaterOrEqualThan': sDate,
                    'visitDate.lessOrEqualThan': eDate,
                })}>搜索</Button>
                <SiderMenu setItem={setSelected} selected={selected} dataSource={dataSource} />
                <Pagination disabled={loading} showLessItems current={page} size="small" total={total} onChange={p => setPage(p)} />
            </Layout.Sider>
            <Layout.Content style={{ padding: 12 }}>
                <Ctg_Analyse docid={selected && selected.ctgexam && selected.ctgexam.note} />
            </Layout.Content>
        </Layout>

    );
}

export default App;
