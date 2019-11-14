import React, { useMemo, useRef, useLayoutEffect, useState } from 'react';
import Ctg from './Ctg';
import Preview from './Preview';

export const Context = React.createContext({})

interface IProps {
    age: number
    docid: string
    end: number
    fetalcount: number
    inpatientNO: string
    name: string
    start: number
    startdate: string
    print_interval: number
    onDownload: () => void
    wh: { w: number, h: number }
}

const PrintPreview = (props: IProps) => {
    const { docid } = props;
    const [wh, setWh] = useState({ w: 0, h: 0 })
    useLayoutEffect(() => {
        const { clientHeight, clientWidth } = inputEl.current;
        setWh({ h: clientHeight, w: clientWidth })
    }, [])

    const inputEl = useRef(null);

    // const onDownload = () => {

    //     const filePath = `${request.configure.apiPrefix}/ctg-exams-pdfurl/${docid}`
    //     window.open(filePath)
    // }

    const v = useMemo(() => { return {} }, []);
    return (
        <Context.Provider value={v}>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }} ref={inputEl}>
                <div style={{ height: 240, textAlign: 'center' }}>
                    <Preview wh={wh} {...props} />
                </div>
                <div style={{
                    flex: 1,
                    padding: 24,
                    marginTop: 12,
                    border: '1px solid #eee'
                }}>
                    <Ctg docid={docid} />
                </div>
            </div>

        </Context.Provider>
    );
}

export default PrintPreview;
