import React from 'react';
export interface IRiskItem {
    cured: boolean;
    fator: string;
    key: string;
    remark: string;
}
export interface IValue {
    level: string;
    risks: Array<IRiskItem>;
    infectiousDisease: object;
}
declare const context: React.Context<[IValue, (value: IValue) => void]>;
export default context;
