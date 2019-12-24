
import { useState, useEffect } from 'react';
import request from "@lianmed/request";
import { message } from 'antd';




export default (docid: string, setPdfBase64: any) => {


    const [qrCodeBase64, setQrCodeBase64] = useState('')
    const [qrCodeBase64Loading, setQrCodeBase64Loading] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    useEffect(() => {

    }, [])

    const signHandler = () => {
        setQrCodeBase64Loading(true)
        request.post('/ca/signreq', {
            data: {
                action: "sign",
                docid
            }
        }).then(r => {
            setQrCodeBase64(r && r.data)
            setModalVisible(true)
            setQrCodeBase64Loading(false)
        })
    }
    const info = message.info
    const fetchSigninfo = () => {
        request.post('/ca/signinfo', {
            data: {
                bizSn: docid
            }
        }).then(({ ret, data }) => {
            if (ret === '1') {
                setModalVisible(false)
                if (data) {
                    info('签名成功')
                    setPdfBase64(`data:application/pdf;base64,${data}`)
                } else {
                    info('签名失败')
                }
            }
        })
    }
    useEffect(() => {
        let timeoutId = modalVisible && setInterval(fetchSigninfo, 1500)
        return () => {
            timeoutId && clearInterval(timeoutId)
        }
    }, [modalVisible])

    return {
        signHandler, qrCodeBase64, modalVisible, setModalVisible, qrCodeBase64Loading
    }
}