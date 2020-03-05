import { useEffect, useState } from 'react';

import { event } from '@lianmed/utils'
import request from "@lianmed/request";
const CTGChart = (docid: string) => {
    const [loading, setLoading] = useState(false)
    const [ctgData, setCtgData] = useState<{ fetalnum: string; docid?: string; fhr1?: any }>({ fetalnum: '1', docid })
    useEffect(() => {
        if(docid){
            setLoading(true)
            request.get(`/ctg-exams-data/${docid}`).then(res => {
                setCtgData({ docid, ...res })
            }).finally(() => setLoading(false))
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


    return {
        ctgData, loading,


    };
}

export default CTGChart
