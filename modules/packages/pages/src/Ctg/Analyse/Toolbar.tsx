import request from "@lianmed/request";
import { event } from '@lianmed/utils';
import { Alert, Button, Checkbox, Divider, message, Modal } from 'antd';
import 'antd/dist/antd.css';
import React, { FC, useState } from 'react';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { useCtgData } from './useCtgData';
export const ANALYSE_SUCCESS_TYPE = "(●'◡'●)"
export { useCtgData };
// background:linear-gradient(45deg, #e0e0e0, #fff) !important;


export interface IToolbarProps {
    type: any;
    id: any;
    note: any;
    onDownload: any;
    showHistory: any;
    mapFormToMark: any;
    startTime: any;
    endTime: any;
    mark: any;
    analysis_ref: any;
    old_ref: any;
    autoFm: any;
    setAutoFm: any;
    autoAnalyse: any;
    setAutoAnalyse: any;
    showBase: any;
    setShowBase: any;
    initData: any;
    currentHistory: any;
    isEditBase: any;
    setIsEditBase: any;
    fetchHistoryList: any;
    fetal: any;
    setDisabled: any;
    disabled: any;
}

export const Ctg_Analyse: FC<IToolbarProps> = function (props) {
    const {
        type,
        id,
        note,
        onDownload = (url: string) => { },
        showHistory = false,
        mapFormToMark,
        startTime,
        endTime,
        mark,
        analysis_ref,
        old_ref,
        autoFm,
        setAutoFm,
        autoAnalyse,
        setAutoAnalyse,
        showBase,
        setShowBase,
        initData,
        currentHistory,
        isEditBase,
        setIsEditBase,
        fetchHistoryList,
        fetal,
        setDisabled,
        disabled
    } = props
    const [visible, setVisible] = useState(false)
    const [pdfBase64, setPdfBase64] = useState('')
    const [padBase64Loading, setPadBase64Loading] = useState(false)
    const isRemote = type === 'remote'



    function checkInput() {
        const rightData = analysis_ref.current.getFieldsValue()

        // 远程
        if (isRemote && rightData) {
            const { diagnosistxt, NST } = rightData

            if (!NST) {
                message.warn({ content: '请选择NST类型' })
                return false
            }
            if (!diagnosistxt) {
                message.warn({ content: '请填写诊断意见' })
                return false
            }
        }
        return true
    }
    const getrRequestData = () => {
        const rightData = analysis_ref.current.getFieldsValue()
        const { wave, diagnosistxt, NST, CST_OCT, ...analyseData } = rightData
        const curData: { [x: string]: number } = mapFormToMark[`${mark}_ref`].current.getFieldsValue()
        const oldData: { [x: string]: number } = old_ref.current[mark] || {}

        const isedit = Object.entries(curData).find(([k, v]) => oldData[k] !== v) ? true : false
        const identify = type === 'default' ? { note } : { id, note }
        // const identify = { note }
        const requestData = {
            ...identify,
            diagnosis: JSON.stringify(rightData),
            analysis: JSON.stringify(initData),
            result: JSON.stringify({
                ...analyseData,
                ...curData,
                isedit,
                type: mark,
                startTime: startTime,
                endTime: endTime,
                // startTime: ref.current.drawAnalyse.analysisData.analysis.start,
                // endTime: ref.current.drawAnalyse.analysisData.analysis.end

            }),
            fetalnum: fetal,
            show_fetalmovement: window['obvue'] ? !!window['obvue'].setting.show_fetalmovement : true,
            prenatalVisitStatus: 1,
            prenatalVisitRsuit: 1,
            prenatalVisitException: 1,
            id: currentHistory?.id
        }
        return requestData
        // const rightData = analysis_ref.current.getFieldsValue()
        // const { wave, diagnosistxt, NST, CST_OCT, ...analyseData } = rightData
        // const curData: { [x: string]: number } = others.mapFormToMark[`${mark}_ref`].current.getFieldsValue()
        // const oldData: { [x: string]: number } = old_ref.current[mark] || {}

        // const isedit = Object.entries(curData).find(([k, v]) => oldData[k] !== v) ? true : false
        // const identify = type === 'default' ? { note } : { id, note }
        // // const identify = { note }
        // const requestData = {
        //   ...identify,
        //   diagnosis: JSON.stringify({ wave, diagnosistxt, NST, CST_OCT }),
        //   result: JSON.stringify({
        //     ...analyseData,
        //     ...curData,
        //     isedit,
        //     type: mark,
        //     startTime: startTime,
        //     endTime: endTime
        //     // startTime: ref.current.drawAnalyse.analysisData.analysis.start,
        //     // endTime: ref.current.drawAnalyse.analysisData.analysis.end
        //   }),
        //   fetalnum: fetal,
        //   show_fetalmovement: window['obvue'] ? !!window['obvue'].setting.show_fetalmovement : true
        // }
        // return requestData
    }
    const getPrintUrl = (path: string) => {

        const url = `${path}?query=${encodeURIComponent(btoa(unescape(encodeURIComponent(JSON.stringify(getrRequestData())))))}`
        console.log('url', url);
        return url
    }

    const submit = () => {
        const ok = checkInput()
        const flag = type === "default"
        ok && request[(flag && !currentHistory?.id) ? 'post' : 'put'](flag ? '/diagnosis-histories' : '/serviceorders', { data: getrRequestData(), successText: '保存成功！' })
            .then((r: any) => {
                fetchHistoryList()
                // event.emit(ANALYSE_SUCCESS_TYPE, type == "default" ? note : id)
                event.emit(ANALYSE_SUCCESS_TYPE, note)
            })
    }

    const history = () => {
        const data = {
            'note.equals': note
        }


        request.get<any>(`/ctg-exams-criteria`, { params: data }).then(function (r) {
            if (r.length > 0) {
                const diagnosis = r[0].diagnosis;
                let t;
                try {
                    const data = JSON.parse(diagnosis) || {}
                    t = (
                        <div>
                            {
                                Array.isArray(data) && (data.map(d => {
                                    return <>
                                        <Divider></Divider>
                                        {
                                            d.NST && <div>NST：<span>{d.NST}</span></div>
                                        }
                                        {
                                            d.CST_OCT && <div>CST/OCT：<span>{d.CST_OCT}</span></div>
                                        }
                                        <div>诊断：<span>{d.diagnosistxt}</span></div>
                                        <div>时间：<span>{d.timestamp}</span></div>
                                    </>
                                }))
                            }
                        </div>
                    )
                } catch (error) {
                }
                info(t || '暂无记录');
            }
        })
    }

    const info = (message: any) => {
        Modal.info({
            title: '历史记录',
            content: message,
            onOk() { }
        });
    }
    const btnDisabled = !note || !disabled
    return (

        <>
            <div style={{ height: 40, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', justifyItems: 'center', margin: 6 }}>
                    <div>
                        <Checkbox checked={autoFm} onChange={e => setAutoFm(e.target.checked)} style={{}}>自动胎动</Checkbox>
                        <Checkbox checked={autoAnalyse} onChange={e => setAutoAnalyse(e.target.checked)} style={{}}>弹窗时自动分析</Checkbox>
                        <Checkbox checked={showBase} onChange={e => setShowBase(e.target.checked)} style={{}}>显示基线</Checkbox>
                        {
                            showHistory && <>
                                <Checkbox checked={!isEditBase} onChange={e => setIsEditBase(!e.target.checked)} style={{}}>修改加减速</Checkbox>
                                <Checkbox checked={isEditBase} onChange={e => setIsEditBase(e.target.checked)} style={{}}>修改基线</Checkbox>
                            </>
                        }
                    </div>

                </div>
                <div style={{}}>
                    {false && <Alert message="选段时间过短" style={{ background: 'red', color: '#fff', display: 'inline-block', border: 0, padding: '1px 4px', marginRight: 10 }} />}

                    <Button size="small" style={{}} onClick={history} disabled={btnDisabled}>历史分析</Button>
                    <Button size="small" style={{}} disabled={!note} onClick={() => setDisabled(!disabled)}>{disabled ? '修改评分' : '确认'}</Button>
                    <Button size="small" onClick={() => {
                        request.get<any>(getPrintUrl('/ctg-exams-analysis-pdf-preview')).then(r => {
                            setVisible(true)
                            setPdfBase64(r.pdfdata)
                        }).finally(() => setPadBase64Loading(false))
                        setPadBase64Loading(true)

                    }} style={{}} type="primary" disabled={btnDisabled || !initData} loading={padBase64Loading}>打印预览</Button>
                    <Button size="small" type="primary" onClick={submit} disabled={btnDisabled || !initData}>{currentHistory ? '保存修改' : '保存'}</Button>
                </div>
            </div>
            <Modal getContainer={false} centered visible={visible} closable={false} okText="打印" cancelText="取消" onCancel={() => setVisible(false)} onOk={() => {
                onDownload(getPrintUrl('/ctg-exams-analysis-pdf'))
                setVisible(false)

            }}>
                <Document
                    file={pdfBase64 ? `data:application/pdf;base64,${pdfBase64}` : null}
                    renderMode="canvas"

                >
                    <Page pageNumber={1} scale={0.8} />
                </Document>
            </Modal>
        </>
    );
}
export default Ctg_Analyse;
