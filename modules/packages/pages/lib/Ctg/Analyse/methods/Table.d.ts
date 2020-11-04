import React from 'react';
import { FormInstance } from 'antd/lib/form';
import { AnalyseType } from '@lianmed/lmg/lib/interface';
import { obvue } from "@lianmed/f_types";
interface IProps {
    name: string;
    dataSource: any[] & {
        deformed: boolean;
    };
    hidden: boolean;
    disabled: boolean;
    mark: AnalyseType;
    initData: obvue.ctg_exams_analyse;
    [x: string]: any;
}
declare const _default: React.MemoExoticComponent<React.ForwardRefExoticComponent<Pick<IProps, string | number> & React.RefAttributes<FormInstance>>>;
export default _default;
