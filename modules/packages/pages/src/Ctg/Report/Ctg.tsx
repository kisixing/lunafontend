import React from 'react';
import { Ctg as L } from '@lianmed/lmg';
import { Context } from './index';


interface IProps {
  ctgData: any
  loading:boolean
}

const Setting = (props: IProps) => {


  return (
    <Context.Consumer>
      {(value: any) => (
        <L suitType={2} loading={props.loading} data={props.ctgData} ref={value}></L>
      )}
    </Context.Consumer>
  );
}

export default Setting