import React from 'react';
import { Context } from './index';
import { Ctg as L } from '@lianmed/lmg';

const CTGChart = (props: { ctgData: any }) => {
  const { ctgData } = props;
  console.log('zzz',props)
  return (
    <Context.Consumer>
      {(value: any) => {
        return (

          <L suitType={2} data={ctgData} mutableSuitObject={value} />
        )
      }}
    </Context.Consumer>
  );
}

export default CTGChart
