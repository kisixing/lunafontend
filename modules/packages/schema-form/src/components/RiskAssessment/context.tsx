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

const data: [IValue, (value: IValue) => void] = [
  {
    level: '0',
    risks: [
      {
        key: '20101',
        cured: false,
        fator: '',
        remark: '',
      },
    ],
    infectiousDisease: {
      HIV: true,
      HIVNote: '啊啊',
    },
  },

  function(value: IValue): void {
    console.log('default value', value);
  },
];
const context = React.createContext(data);
export default context;
