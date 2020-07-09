import React from 'react';
import { FormInstance } from 'antd/lib/form';
interface IProps {
    name: string;
    dataSource: any[] & {
        deformed: boolean;
    };
    hidden: boolean;
    disabled: boolean;
    [x: string]: any;
}
declare const _default: React.MemoExoticComponent<React.ForwardRefExoticComponent<Pick<IProps, string | number> & React.RefAttributes<FormInstance>>>;
export default _default;
