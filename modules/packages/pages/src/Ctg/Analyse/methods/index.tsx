import React, { memo } from 'react';

import Table from './Table'
import { tableData } from "./tableData";
interface IProps {

    mark: any
    mapFormToMark:any
    disabled: boolean
}

const Methods = (props: IProps) => {

    const { mark, disabled } = props

    return (
        <>
            {
                Object.entries(tableData).map(([k, v]) => (
                    <Table disabled={disabled} key={k} hidden={k !== mark} dataSource={v} ref={props.mapFormToMark[`${k}_ref`]} />
                ))
            }
        </>
    );
}

export default memo(Methods)