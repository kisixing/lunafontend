import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'antd';
import { Context } from './index'
import usePrintConfig from "./usePrintConfig";
import useSign from "./useSign";
import request from "@lianmed/request";
import { IProps as IP } from "./index";
const COEFFICIENT = 240

interface IProps extends IP {
    diagnosis: string
    onTotalChange: (total: number) => void
    pdfBase64: string
    setPdfBase64: (s: string) => void
}
const Preview = (props: IProps) => {
    const { onDownload, docid, print_interval, diagnosis, onTotalChange, pdfBase64, setPdfBase64, ...args } = props;
    const [pdfBase64Loading, setPdfBase64Loading] = useState(false)

    const handlePreview = () => {
        setPdfBase64Loading(true)
        request.post(`/ctg-exams-pdf`, {
            data: {
                docid,
                diagnosis,
                start: startingTime,
                end: endingTime,
                ...args
            },
        }).then(res => {
            setPdfBase64Loading(false)
            const pdfData = res.pdfdata && `data:application/pdf;base64,${res.pdfdata}`;
            setPdfBase64(pdfData)
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
        // toggleLocking,
        // toggleCustomiz
    } = usePrintConfig(value, print_interval)



    const { signHandler, qrCodeBase64, modalVisible, qrCodeBase64Loading, setModalVisible } = useSign(docid, setPdfBase64)


    useEffect(() => {
        onTotalChange(total)
    }, [total])
    return (
        <Context.Consumer>
            {
                (v: any) => {
                    setValue(v)
                    return (
                        <div style={{ display: 'flex', height: '100%' }}>


                            <div style={{ width: 400, padding: 24, background: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', border: '1px solid #d9d9d9' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Button icon="forward" onClick={forward} />
                                        <div style={{ marginLeft: 6 }}>
                                            时间：0分
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Button icon="backward" onClick={backward} />
                                        <div style={{ marginLeft: 6 }}>
                                            时间：0分
                                        </div>
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
                                <div style={{ display: 'flex' }}>
                                    <Button block disabled={!locking} type="primary" loading={pdfBase64Loading} onClick={handlePreview} style={{ marginRight: 10 }}>
                                        <span>生成</span>
                                    </Button>
                                    <Button block disabled={!pdfBase64} type="primary" loading={qrCodeBase64Loading} onClick={signHandler} style={{ marginRight: 10 }}>
                                        <span> 签名</span>
                                    </Button>
                                    <Button block disabled={!pdfBase64} type="primary" onClick={onDownload}>
                                        <span>打印</span>
                                    </Button>
                                </div>
                            </div>

                            <Modal visible={modalVisible} footer={null} centered onCancel={() => setModalVisible(false)} bodyStyle={{ textAlign: 'center' }}>
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