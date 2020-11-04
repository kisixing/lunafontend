import React, { memo, useLayoutEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom'
import Table from './Table'
import { tableData } from "./tableData";
import { obvue } from "@lianmed/f_types";

interface IProps {

    mark: any
    mapFormToMark: any
    disabled: boolean
    initData: obvue.ctg_exams_analyse
}

const Methods = (props: IProps) => {

    const { mark, disabled, initData } = props
    const tableDataEntries = Object.entries(tableData)
    const [targetE2lements] = useState(() => tableDataEntries.reduce((a, [k, v]) => Object.assign(a, { [k]: document.createElement('div') }), {} as { [x: string]: HTMLDivElement }))

    const containerRef = useRef<HTMLDivElement>()
    useLayoutEffect(() => {

        const target = targetE2lements[mark]
        try {
            //@ts-ignore
            containerRef?.current?.innerHTML = null
            containerRef?.current.appendChild(target)
        } catch (e) {
            console.log('fuck', e)
        }
    }, [mark])
    return (
        <>
            <div ref={containerRef} />
            {
                tableDataEntries.map(([k, v]) => {
                    return ReactDOM.createPortal(<Table initData={initData} disabled={disabled} key={k} hidden={k !== mark} mark={mark} dataSource={v} ref={props.mapFormToMark[`${k}_ref`]} />, targetE2lements[k])
                })
            }
        </>
    );
}

export default memo(Methods)