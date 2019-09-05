import React from 'react';
interface IValue {
  level: string;
  risks: Array<any>;
  infectiousDisease: object;
}

const data: [IValue, (value: any) => void] = [
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

  function(value: any): void {
    console.log('default value', value);
  },
];
const context = React.createContext(data);
export default context;
