import React from 'react';
import { FormInstance } from 'antd/lib/form';
interface IProps {
    name: string;
    dataSource: any;
    hidden: boolean;
    disabled: boolean;
    [x: string]: any;
}
declare const _default: React.MemoExoticComponent<React.ForwardRefExoticComponent<Pick<IProps, React.ReactText> & React.RefAttributes<FormInstance>>>;
export default _default;
