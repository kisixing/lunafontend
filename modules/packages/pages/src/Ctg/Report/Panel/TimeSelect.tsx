import { Button, Modal } from 'antd';
import message from "antd/lib/message";
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchCtgExamsPdf } from '../../services';
import { Context, IProps as IP } from "../index";
import useArchive from "./hooks/useArchive";
import usePrintConfig from "./hooks/usePrintConfig";
import useSave from "./hooks/useSave";
import useSign from "./hooks/useSign";
const Wrapper = styled.div`
    .bottomBtns button {
        margin-right: 10px 
    }
    .bottomBtns button:last-child {
        margin-right: 0px 
    }
`
const COEFFICIENT = 240

interface IProps extends IP {
    diagnosis: string
    onTotalChange: (total: string) => void
    pdfBase64: string
    setPdfBase64: (s: string) => void
    empId?: string
    fetal: any;
    setFetal: any;
}
const Preview = (props: IProps) => {
    const { onDownload, docid, print_interval, diagnosis, onTotalChange, pdfBase64, setPdfBase64, empId = null, fetal, setFetal, ...args } = props;
    const [pdfBase64Loading, setPdfBase64Loading] = useState(false)
    const handlePreview = () => {
        if ((endingTime - startingTime) / COEFFICIENT < print_interval) {
            message.warn(`时长不足${print_interval}分钟`)
        }
        setPdfBase64Loading(true)
        fetchCtgExamsPdf({
            docid,
            diagnosis,
            start: startingTime,
            end: endingTime,
            outputType,
            fetal: fetal,
            show_fetalmovement: window['obvue'] ? !!window['obvue'].setting.show_fetalmovement : true,
            ...args
        }).then(r => {
            setPdfBase64Loading(false)
            setPdfBase64(r)
        })
    }

    const [value, setValue] = useState<{ suit: any }>({ suit: null })


    const {
        startingTime,
        endingTime,
        locking,
        // customizable,
        // remoteSetStartingTime,
        // remoteSetEndingTime, 
        backward,
        forward,
        toggleLocking,
        selectAll,
        editable,
        outputType,
        setOutputType,
        // toggleCustomiz
    } = usePrintConfig(value, print_interval, fetal)

    const total = dispalyTime(endingTime - startingTime)

    const { setBizSn, bizSn, archive, archiveLoading, archived } = useArchive(docid)

    const { fetchQrCode, qrCodeBase64, modalVisible, qrCodeBase64Loading, setModalVisible, signed } = useSign(bizSn, setPdfBase64, setBizSn, empId)
    const { caEnable, save, saveLoading, saved } = useSave(bizSn, setBizSn)

    console.log('fetalcount', props.fetalcount)

    useEffect(() => {
        onTotalChange(total)
    }, [total])
    useEffect(() => {
        setPdfBase64(null)
    }, [fetal])
    return (
        <Context.Consumer>
            {
                (v: any) => {
                    setValue(v)
                    return (
                        <div id="modal_id" style={{ display: 'flex', height: '100%' }}>


                            <Wrapper style={{ width: 400, padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'space-around', border: '1px solid #d9d9d9' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Button disabled={locking} onClick={forward} >向后选择</Button>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Button disabled={locking} onClick={backward} >向前选择</Button>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Button disabled={locking} onClick={selectAll} >全选</Button>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Button disabled={!editable} onClick={toggleLocking} >{locking ? '确定' : '自定义'}</Button>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span>
                                        <span>开始时间：</span>

                                        {dispalyTime(startingTime)}

                                    </span>

                                    <span>
                                        <span>结束时间：</span>

                                        {dispalyTime(endingTime)}

                                    </span>
                                    <span>
                                        <span>时长：</span>
                                        {dispalyTime(endingTime - startingTime)}
                                    </span>
                                    {/* <Button type={locking ? 'danger' : 'primary'} onClick={toggleLocking} size="small">
                                        {
                                            locking ? '重置' : '确定'
                                        }
                                    </Button> */}
                                </div>

                                {/* <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span>
                                        <span>结束时间：</span>

                                        {(endingTime / COEFFICIENT).toFixed(1)}
                                        <span>分</span>
                                    </span>
                                    {
                                        locking && (
                                            <Button type={customizable ? 'danger' : 'primary'} onClick={toggleCustomiz} size="small">
                                                {
                                                    customizable ? '确定' : '选择'
                                                }
                                            </Button>
                                        )
                                    }
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span><span>时长：</span>{total}  <span>分</span> </span>
                                </div> */}
                                <div style={{ textAlign: 'left' }}>
                                    <label>胎心率范围：</label>
                                    <select value={outputType} onChange={e => setOutputType(e.target.value)} disabled={locking}>
                                        <option value="180">90~180</option>
                                        <option value="210">50~210</option>
                                    </select>
                                    <label>胎心率：</label>
                                    <select value={fetal} onChange={v => setFetal(Number(v.target.value))} disabled={locking}>
                                        {
                                            Array((props.fetalcount || 0) + 1).fill(0).map((_, i) => {
                                                return <option key={i} value={i}>{i == 0 ? '混合' : `FHR${i}`}</option>
                                            })
                                        }
                                    </select>
                                </div>
                                <div style={{ display: 'flex' }} className="bottomBtns">
                                    <Button disabled={locking || !editable} block type="primary" loading={pdfBase64Loading} onClick={handlePreview} >
                                        <span>生成</span>
                                    </Button>
                                    {
                                        caEnable ? (
                                            <>
                                                <Button block disabled={!pdfBase64} type="primary" loading={qrCodeBase64Loading} onClick={fetchQrCode}>
                                                    <span> 签名</span>
                                                </Button>

                                            </>
                                        ) : (
                                                <Button block disabled={!pdfBase64} type="primary" loading={saveLoading} onClick={save}>
                                                    <span>保存</span>
                                                </Button>
                                            )
                                    }
                                    {
                                        true && <Button block disabled={!(signed || saved)} type="primary" loading={archiveLoading} onClick={archive}>
                                            <span>{archived ? '取消归档' : '归档'}</span>
                                        </Button>
                                    }
                                    <Button block disabled={!pdfBase64} type="primary" onClick={onDownload}>
                                        <span>打印</span>
                                    </Button>
                                </div>
                            </Wrapper>

                            <Modal getContainer={() => document.querySelector("#modal_id")} visible={modalVisible} footer={null} centered onCancel={() => setModalVisible(false)} bodyStyle={{ textAlign: 'center' }}>
                                <img alt="qrcode" src={qrCodeBase64} />
                            </Modal>
                        </div>
                    )
                }
            }
        </Context.Consumer >
    );
}
function dispalyTime(index: number) {
    const allSeconds = (index / 4) || 0
    const s = allSeconds % 60
    const m = (allSeconds - s) / 60
    return `${m}分${~~s}秒`

}
export default Preview