import React from 'react';
import { FormInstance } from 'antd/lib/form';
import { AnalyseType } from '@lianmed/lmg/lib/interface';
interface IProps {
    name: string;
    dataSource: any[] & {
        deformed: boolean;
    };
    hidden: boolean;
    disabled: boolean;
    mark: AnalyseType;
    [x: string]: any;
}
declare const _default: React.MemoExoticComponent<React.ForwardRefExoticComponent<Pick<IProps, React.ReactText> & React.RefAttributes<FormInstance>>>;
export default _default;
