import { obvue } from '@lianmed/f_types';
import React from 'react';
import { historyItem } from './data.d';
export declare type TableListData = obvue.prenatal_visitspage[];
export interface UpdateFormProps {
    historyList: historyItem[];
    currentHistory: historyItem;
    setCurrentHistory: (i: historyItem) => void;
}
declare const UpdateForm: React.FC<UpdateFormProps>;
export default UpdateForm;
