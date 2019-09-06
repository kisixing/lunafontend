import React from 'react';
interface IRisk {
  cured: boolean;
  fator: string;
  key: string;
  remark: string;
}
interface IValue {
  level: string;
  risks: Array<IRisk>;
  infectiousDisease: object;
}
declare const context: React.Context<[IValue, (value: any) => void]>;
export default context;
