
import { useState, useEffect } from 'react';
import request from "@lianmed/request";
import { message } from 'antd';
import { event } from '@lianmed/utils';

const info = message.info



export default (docid: string, setPdfBase64: any) => {

    const [bizSn, setBizSn] = useState(docid);

    const [qrCodeBase64, setQrCodeBase64] = useState('')
    const [qrCodeBase64Loading, setQrCodeBase64Loading] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)

    const [signed, setSigned] = useState(false)

    const [archived, setArchived] = useState(false)
    const [archiveLoading, setArchiveLoading] = useState(false)

    useEffect(() => {
        let timeoutId = modalVisible && setInterval(fetchSigninfo, 1500)
        return () => {
            timeoutId && clearInterval(timeoutId)
        }
    }, [modalVisible])

    const archive = () => {
        setArchiveLoading(true)
        request.put(`/doc/${archived ? 'undo-' : ''}archive`, { data: { bizSn } })
            .then(r => {
                r && setArchived(!archived)
            })
            .finally(() => setArchiveLoading(false))
    }

    const fetchQrCode = () => {
        setQrCodeBase64Loading(true)
        request.post('/ca/signreq', { data: { action: "sign", docid, } })
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
                    event.emit('signed', docid)
                    setPdfBase64(`data:application/pdf;base64,${data}`)
                } else {
                    info('签名失败')
                }
            }
        })
    }

    return {
        fetchQrCode, qrCodeBase64, modalVisible, setModalVisible, qrCodeBase64Loading, signed, archive, archiveLoading, archived
    }
}
