import { Table, Input, Select } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import Button from 'antd/es/button/button';
import React from 'react';
import S from './Strategies';
import moment from 'moment';
const { Option } = Select;
const items = [
  {
    title: '检查时间',
    key: 'checkTime',
    type: 'date',
    width: '200px',
  },
  {
    title: '产程时间',
    key: 'duringTime',
    type: 'string',
  },
  {
    title: '宫口开张',
    key: 'gongkouStatus',
    type: 'number',
  },
  {
    title: '抬头下降',
    key: 'taitouStatus',
    type: 'select',
    dataset: [
      { value: '0', label: '+5' },
      { value: '1', label: '+4' },
      { value: '2', label: '+3' },
      { value: '3', label: '+2' },
      { value: '4', label: '+1' },
      { value: '5', label: '0' },
      { value: '6', label: '-1' },
      { value: '7', label: '-2' },
      { value: '8', label: '-3' },
      { value: '9', label: '-4' },
      { value: '10', label: '-5' },
    ],
  },
  {
    title: '血压',
    key: 'bp',
    type: 'string',
  },
  {
    title: '宫缩',
    key: 'gongsuo',
    type: 'string',
  },
  {
    title: '羊水性状',
    key: 'yangshuiStatus',
    type: 'select',
    dataset: [
      { value: '0', label: '清' },
      { value: '1', label: '1度' },
      { value: '2', label: '2度' },
      { value: '3', label: '3度' },
    ],
  },
  {
    title: '事件',
    key: 'event',
    type: 'select',
    dataset: [
      { value: '0', label: '阴检' },
      { value: '1', label: '人工破膜' },
      { value: '2', label: '吸氧' },
      { value: '3', label: '滴催' },
      { value: '4', label: '宫颈封闭' },
      { value: '5', label: '肛查' },
      { value: '6', label: '剖宫产' },
    ],
  },
  {
    title: '记录人',
    key: 'recorder',
    type: 'string',
  },
];

export default ({ value, onChange }) => {
  const changeField = (targetKey: string, key: string, _value) => {
    const data = value.map(_ => {
      if (_.key === targetKey) {
        return { ..._, [key]: _value };
      }
      return _;
    });
    onChange(data);
  };

  const columns: Array<ColumnProps<any>> = [
    {
      dataIndex: Math.random().toString(),
      title: '序号',

      render: function(cured, record, index) {
        return index + 1;
      },
    },
  ]
    .concat(
      (items as Array<any>).map(({ title, key, dataset, type, width }) => {
        //判断
        dataset = dataset as any;
        return {
          title: title,
          dataIndex: key,
          width: width || '140px',
          align: 'center',
          render: function(cured, record, rowIndex) {
            const C = S[type];
            // const isSelect = !!dataset;
            return (
              <C
                dataset={dataset}
                value={cured}
                onChange={v => {
                  changeField(record.key, key, v);
                }}
              />
            );
          },
        };
      })
    )
    .concat({
      dataIndex: Math.random().toString(),
      title: (
        <Button
          size="small"
          icon="plus"
          onClick={() => {
            onChange([
              ...value,
              {
                key: Math.random()
                  .toString()
                  .slice(2),
                checkTime: moment(new Date()),
                duringTime: (value[value.length - 1] && value[value.length - 1].duringTime) || 0,
              },
            ]);
          }}
        ></Button>
      ) as any,

      render: function(a, b, rowIndex) {
        return (
          <Button
            size="small"
            icon="minus"
            onClick={() => {
              const _value = [...value];
              _value.splice(rowIndex, 1);
              onChange(_value);
            }}
          ></Button>
        );
      },
    });

  return columns;
};
