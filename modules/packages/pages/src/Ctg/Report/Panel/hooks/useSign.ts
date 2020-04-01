
import { useState, useEffect } from 'react';
import request from "@lianmed/request";
import { message } from 'antd';
import { event } from '@lianmed/utils';

const info = message.info



export default (bizSn: string, setPdfBase64: any, setBizSn: React.Dispatch<React.SetStateAction<string>>, empId: string = null, ) => {



    const [qrCodeBase64, setQrCodeBase64] = useState('')
    const [qrCodeBase64Loading, setQrCodeBase64Loading] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)

    const [signed, setSigned] = useState(false)


    useEffect(() => {
        let timeoutId = modalVisible && setInterval(fetchSigninfo, 1500)
        return () => {
            timeoutId && clearInterval(timeoutId)
        }
    }, [modalVisible])



    const fetchQrCode = () => {
        setQrCodeBase64Loading(true)
        request.post('/ca/signreq', { data: { action: "sign", docid: bizSn, msg: empId } })
            .then(r => {
                if (r && r.sn) {
                    setBizSn(r.sn)
                }
                setQrCodeBase64(r && r.data)
                setModalVisible(true)
            })
            .finally(() => setQrCodeBase64Loading(false))
    }

    const fetchSigninfo = () => {
        request.post('/ca/signinfo', { data: { bizSn } }).then(({ ret, data }) => {
            if (ret === '1') {
                setModalVisible(false)
                if (data) {
                    setSigned(true)
                    info('签名成功')
                    event.emit('signed', bizSn)
                    setPdfBase64(`data:application/pdf;base64,${data}`)
                } else {
                    info('签名失败')
                }
            }
        })
    }

    return {
        fetchQrCode, qrCodeBase64, modalVisible, setModalVisible, qrCodeBase64Loading, signed
    }
}
