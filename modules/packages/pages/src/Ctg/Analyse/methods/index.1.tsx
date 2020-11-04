import React, { memo } from 'react';

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

    const { mark, disabled,initData } = props

    return (
        <>
            {
                Object.entries(tableData).map(([k, v]) => (
                    <Table initData={initData} disabled={disabled} key={k} hidden={k !== mark} mark={mark} dataSource={v} ref={props.mapFormToMark[`${k}_ref`]} />
                ))
            }
        </>
    );
}

export default memo(Methods)