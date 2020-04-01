import React, { useState, useEffect } from 'react';
import { Button, Modal, Radio } from 'antd';
import usePrintConfig from "./hooks/usePrintConfig";
import useSign from "./hooks/useSign";
import useSave from "./hooks/useSave";
import useArchive from "./hooks/useArchive";
import { IProps as IP, Context } from "../index";
import styled from 'styled-components';
import { fetchCtgExamsPdf } from '../../services';
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
    onTotalChange: (total: number) => void
    pdfBase64: string
    setPdfBase64: (s: string) => void
    empId?: string
}
const Preview = (props: IProps) => {
    const { onDownload, docid, print_interval, diagnosis, onTotalChange, pdfBase64, setPdfBase64, empId = null, ...args } = props;
    const [pdfBase64Loading, setPdfBase64Loading] = useState(false)
    const handlePreview = () => {
        setPdfBase64Loading(true)
        fetchCtgExamsPdf({
            docid,
            diagnosis,
            start: startingTime,
            end: endingTime,
            outputType,
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
        total,
        backward,
        forward,
        toggleLocking,
        selectAll,
        editable,
        outputType,
        setOutputType
        // toggleCustomiz
    } = usePrintConfig(value, print_interval)


    const { setBizSn, bizSn, archive, archiveLoading, archived } = useArchive(docid)

    const { fetchQrCode, qrCodeBase64, modalVisible, qrCodeBase64Loading, setModalVisible, signed } = useSign(bizSn, setPdfBase64, setBizSn, empId)
    const { caEnable, save, saveLoading, saved } = useSave(bizSn, setBizSn)


    useEffect(() => {
        onTotalChange(total)
    }, [total])
    return (
        <Context.Consumer>
            {
                (v: any) => {
                    setValue(v)
                    return (
                        <div id="modal_id" style={{ display: 'flex', height: '100%' }}>


                            <Wrapper style={{ width: 400, padding: 24, background: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', border: '1px solid #d9d9d9' }}>
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

                                        {(startingTime / COEFFICIENT).toFixed(1)}
                                        <span>分</span>

                                    </span>

                                    <span>
                                        <span>结束时间：</span>

                                        {(endingTime / COEFFICIENT).toFixed(1)}
                                        <span>分</span>
                                    </span>
                                    <span>
                                        <span>时长：</span>
                                        {total}
                                        <span>分</span>
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
                                    <Radio.Group value={outputType} onChange={setOutputType}>
                                        <Radio value="180">90~180</Radio>
                                        <Radio value="210">50~210</Radio>
                                    </Radio.Group>
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
                                    <Button block disabled={!(signed || saved)} type="primary" loading={archiveLoading} onClick={archive}>
                                        <span>{archived ? '取消归档' : '归档'}</span>
                                    </Button>
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

export default Preview