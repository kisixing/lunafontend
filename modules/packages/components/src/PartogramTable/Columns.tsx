import { ColumnProps } from 'antd/lib/table';
import Button from 'antd/es/button/button';
import React from 'react';
import S from './Strategies';
import items from './columnData'

export default ({ value, onChange, onCommit,onDel }) => {
  const changeField = (targetKey: string, key: string, _value) => {
    const data = value.map(_ => {
      if (_.id === targetKey) {
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
      width: '50px',
      render: function (cured, record, index) {
        return index + 1;
      },
    },
  ]
    .concat(
      (items as Array<any>).map(({ title, key, dataset, type, width, ...others }) => {
        //判断
        dataset = dataset as any;
        return {
          title: title,
          dataIndex: key,
          width: width || '140px',
          align: 'center',
          render: function (cured, record, rowIndex) {
            const C = S[type];
            return (
              <C
                dataset={dataset}
                value={cured}
                onChange={v => {
                  changeField(record.id, key, v);
                }}
                {...others}
              />
            );
          },
          ...others
        };
      })
    )
    .concat({
      dataIndex: Math.random().toString(),
      width: '100px',
      title: (
        <Button
          size="small"
          icon="plus"
          onClick={() => {
            onCommit()
          }}
        ></Button>
      ) as any,

      render: function (a, b, rowIndex) {
        return (
          <span>
            <Button
              size="small"
              icon="minus"
              onClick={() => {
                onDel(b.outerId)
              }}
            ></Button>
            <Button
              size="small"
              icon="check"
              onClick={() => {
                const { outerId, visitTime, pregnancy, doctor, ...other } = b
                onCommit({
                  gynecologicalExam: other,
                  visitTime: visitTime._isAMomentObject ? visitTime.toJSON() : visitTime,
                  id: outerId,
                  pregnancy,
                  // doctor
                })
              }}
            ></Button>
          </span>
        );
      },
    });

  return columns;
};
