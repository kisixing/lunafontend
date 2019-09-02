import React from 'react';
import { RadioChangeEvent } from 'antd/lib/radio';
interface datasetMap {
    value: string;
    label: string;
}
interface formItemProps {
    value: string;
    onChange: (e: RadioChangeEvent) => void;
    readOnly: boolean;
}
export declare const buttonGroupCreator: (dataset: datasetMap[], size?: string) => Function | React.FunctionComponent<formItemProps>;
export declare const selectCreator: (dataset: datasetMap[], size?: string) => Function | React.FunctionComponent<formItemProps>;
export {};
