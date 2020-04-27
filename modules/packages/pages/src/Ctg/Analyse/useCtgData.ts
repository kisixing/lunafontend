import { useEffect, useState } from 'react';

import { event } from '@lianmed/utils'
import request from "@lianmed/request";
import { obvue } from '@lianmed/f_types';
const regex = /./g


function copyFhr(origin: obvue.ctg_exams_data): obvue.ctg_exams_data {
    const { fhr1, fhr2, fhr3 } = origin
    return { ...origin, fhr2: fhr2 && fhr2.replace(regex, '0'), fhr3: fhr3 && fhr3.replace(regex, '0'),_fhr1: fhr1, _fhr2: fhr2, _fhr3: fhr3 }
}

const CTGChart = (docid: string) => {
    const [fetal, setFetal] = useState(1)

    const [loading, setLoading] = useState(false)
    const [ctgData, setCtgData] = useState<obvue.ctg_exams_data>({ fetalnum: '1', docid })
    useEffect(() => {
        if (docid) {
            setLoading(true)
            request.get(`/ctg-exams-data/${docid}`).then(res => {
                res && setCtgData({ docid, ...res, ...copyFhr(res) })
            }).finally(() => setLoading(false))
            setFetal(1)
        }
    }, [docid])

    useEffect(() => {
        const fn = data => {
            setCtgData({ ...ctgData, ...data })
        }
        event.on('analysis:setCtgData', fn)
        return () => {
            event.off('analysis:setCtgData', fn)
        }
    }, [ctgData])

    function setFhr(index: 1 | 2 | 3) {
        const { fhr1, fhr2, fhr3 } = ctgData
        const key = `fhr${index}`
        const value = ctgData[`_${key}`]
        const data = { ...ctgData, fhr1: fhr1 && fhr1.replace(regex, '0'), fhr2: fhr2 && fhr2.replace(regex, '0'), fhr3: fhr3 && fhr3.replace(regex, '0'), [key]: value }
        console.log('setFhr',JSON.parse(JSON.stringify(data)),JSON.parse(JSON.stringify(ctgData)))
        setCtgData(data)
    }
    return { ctgData, loading, setFhr, fetal, setFetal };
}

export default CTGChart
