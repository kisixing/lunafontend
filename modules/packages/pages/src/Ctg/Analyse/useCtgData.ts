import { useEffect, useState } from 'react';

import { event } from '@lianmed/utils'
import request from "@lianmed/request";
const CTGChart = (docid: string) => {

    const [ctgData, setCtgData] = useState<{ fetalnum: string; docid?: string }>({fetalnum:'1',docid})
    useEffect(() => {
        request.get(`/ctg-exams-data/${docid}`).then(res => {
            setCtgData({ docid, ...res })
        })
    }, [])

    useEffect(() => {
        const fn = data => {
            setCtgData({ ...ctgData, ...data })
        }
        event.on('analysis:setCtgData', fn)
        return () => {
            event.off('analysis:setCtgData', fn)
        }
    }, [ctgData])


    return [ctgData];
}

export default CTGChart
