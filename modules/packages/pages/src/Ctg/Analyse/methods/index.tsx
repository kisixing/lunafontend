import React from 'react';

import Table from './Table'
import { tableData } from "./tableData";
interface IProps {

    mark: any
    Fischer_ref: any
    Nst_ref: any
    Krebs_ref: any
    disabled: boolean
}

const Methods = (props: IProps) => {

    const { mark, disabled } = props

    return (
        <>
            {
                Object.entries(tableData).map(([k, v]) => (
                    <Table disabled={disabled} key={k} hidden={k !== mark} dataSource={v} ref={props[`${k}_ref`]} />
                ))
            }
        </>
    );
}

export default Methods