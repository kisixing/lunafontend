import 'antd/dist/antd.css';
import { FC } from 'react';
declare const Analysis: FC<{
    docid?: string;
    note?: string;
    id?: string;
    type?: 'default' | 'remote';
}>;
export default Analysis;
