import React from 'react';
interface IValue {
  level: string;
  risks: Array<any>;
  infectiousDisease: object;
}
declare const context: React.Context<[IValue, (value: any) => void]>;
export default context;
