import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Ctg } from '@lianmed/lmg';
import useCtgData from '@lianmed/pages/lib/Ctg/Analyse/useCtgData';
import Setting from './Setting';
import { Select } from 'antd';
import { Form, Row, Col, Input, Button, } from 'antd';
import SettingEvent from './SettingEvent';
import SettingBase from './SettingBase';
import SettingResult from './SettingResult';


const ButtonGroup = Button.Group;
const border = { border: '1px solid #ddd' }
const header = ['产检记录', '入院病历', '事件记录', 'CTG档案', '分娩记录']
const toplist: string[] = header ? header : Array(7).fill(65).map((_, i) => _ + i).map(_ => String.fromCharCode(_))
const formItemLayout = {
  labelCol: {
    xs: { span: 4 },
    sm: { span: 64 },
  },
  wrapperCol: {
    xs: { span: 20 },
    sm: { span: 20 },
  },
};
function CtgPanel({ form: { getFieldDecorator } }: any) {
  const box = useRef<HTMLDivElement>(null)
  const [datacache, setDatacache] = useState(new Map());
  const [activeH, setActiveH] = useState('产检记录')
  const { ctgData } = useCtgData('1_1112_160415144057')
  function callback(key: string) {
    console.log(key);
  }
  function handleSearch() {

  }

  useEffect(() => {


    return () => {
    }
  }, []);
  return (
    <div>
  </div>
  );
}
export default (
  CtgPanel
)