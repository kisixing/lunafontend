import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Layout, Modal, DatePicker, Pagination, Input, Button, Radio } from 'antd';
import request from "@lianmed/request";
import { obvue } from "@lianmed/f_types";
import SiderMenu from "./containers/SiderMenu";
import SiderMenuC from "./containers/SiderMenuC";
import moment from "moment";
import { formatDate } from '@lianmed/utils';
import { Ctg_Analyse } from "@lianmed/pages";
import { RadioChangeEvent } from 'antd/lib/radio';

const App = (props: any) => {

    const [dataSource, setDataSource] = useState<obvue.prenatal_visitspage[]>([])
    const [dataSource1, setDataSource1] = useState<any[]>([])
    const [pregnancy, setPregnancy] = useState({})
    const [selected, setSelected] = useState<obvue.prenatal_visitspage>()
    const [selected1, setSelected1] = useState<any>()
    const [sDate, setSDate] = useState(formatDate(new Date('2020-03-1')))
    const [eDate, setEDate] = useState(formatDate())
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [type, setType] = useState(0)
    const docidRef = useRef('')
    const signRef = useRef('')
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
        type == 0 ?fetchList():fetchSignList()
    }, [params])

    const fetchCtgExamData = () => {
        return new Promise<number>((res, rej) => {
            const docid = docidRef.current
            const sign = signRef.current
            if (docid || sign) {
                request.get(`/ctg-exams-criteria`, {
                    params: {
                        page: 1,
                        size: 2,
                        'note.equals': docid || undefined,
                        'sign.equals': sign || undefined,
                    }
                }).then((r: any[]) => {
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
                    setDataSource(response);
                    selected || setSelected(response[0])
                }).finally(() => setLoading(false))

            request
                .get(`/prenatal-visits/count`, { params })
                .then(function (t) {
                    setTotal(t)
                    if (page > t) setPage(t < 1 ? 1 : t)
                })

        })
    };

    const fetchSignList = (e?: any) => {
        setLoading(true)

        fetchCtgExamData().then(id => {
            request
                .get(`/ctg-exams-criteria`, {params: {
                    page: page - 1,
                    size: 10,
                    'diagnosis.specified': true,
                    'diagnosis.contains':'SM'
                } })
                .then(function (response) {
                    setDataSource1(response);
                    selected1 || setSelected1(response[0])
                }).finally(() => setLoading(false))

            request
                .get(`/ctg-exams-criteria/count`, { params: {
                    page: page - 1,
                    size: 10,
                    'diagnosis.specified': true,
                    'diagnosis.contains':'SM'
                } })
                .then(function (t) {
                    setTotal(t)
                    if (page > t) setPage(t < 1 ? 1 : t)
                })

        })
    };

    const onRadiochange = (e: RadioChangeEvent) => {
        console.log(e.target.value);
        setType(e.target.value);
        e.target.value==1?fetchSignList():fetchList();
    }

    const onDownloadT = () => {
        console.log("on download test");
    }

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
                <Button loading={loading} type="primary" disabled size="small" style={{ width: 220, marginBottom: 5 }} onClick={() => setParams({
                    ...params, 
                })}>搜索</Button>
                <div style={{ marginBottom: 5 }}>
                    <Radio.Group defaultValue="0" size="large" onChange={onRadiochange}>
                        <Radio.Button value="0">全部</Radio.Button>
                        <Radio.Button value="1">已标记</Radio.Button>
                    </Radio.Group>
                </div>
                {type == 0?<SiderMenu setItem={setSelected} selected={selected} dataSource={dataSource} />:
                    <SiderMenuC setItem={setSelected1} selected={selected1} dataSource={dataSource1} />}
                <Pagination disabled={loading} showLessItems current={page} size="small" total={total} onChange={p => setPage(p)} />
            </Layout.Sider>
            <Layout.Content style={{ padding: 12 }}>
            {type == 0?
                <Ctg_Analyse docid={selected && selected.ctgexam && selected.ctgexam.note} onDownload={onDownloadT}/>:
                <Ctg_Analyse docid={selected1 && selected1.note} onDownload={onDownloadT}/>}
            </Layout.Content>
        </Layout>

    );
}

export default App;
