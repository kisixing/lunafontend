import Button from 'antd/es/button/button';
import React from 'react';
import S from './Strategies';
import items from './columnData';

interface ITool {
  value: Array<any>;
  onChange: any;
  onCommit: any;
  onDel: any;
}

class ColumnTool {
  result = [];
  value: Array<any>;
  onChange: any;
  onCommit: any;
  onDel: any;
  constructor(data: ITool) {
    Object.assign(this, data);
  }
  unshiftIndex = unshiftIndex;
  pushColumnDataMap = pushColumnDataMap;
  pushTool = pushTool;
}

export default (data: ITool) => {
  return new ColumnTool(data)
    .unshiftIndex()
    .pushColumnDataMap()
    .pushTool()
    .result.map(_ => ({ ..._, align: 'center' }));
};

function unshiftIndex(): ColumnTool {
  this.result = [
    {
      dataIndex: Math.random().toString(),
      title: '序号',
      width: '50px',
      render: function(cured, record, index) {
        return index + 1;
      },
    },
    ...this.result,
  ];
  return this;
}

function pushColumnDataMap(): ColumnTool {
  const changeField = (targetKey: string, key: string, _value) => {
    const data = this.value.map(_ => {
      if (_.id === targetKey) {
        return { ..._, [key]: _value };
      }
      return _;
    });
    this.onChange(data);
  };

  this.result = [
    ...this.result,
    ...(items as Array<any>).map(({ title, key, dataset, type, width, ...others }) => {
      //判断
      dataset = dataset as any;
      return {
        title: title,
        dataIndex: key,
        width: width || '140px',
        align: 'center',
        render: function(cured, record, rowIndex) {
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
        ...others,
      };
    }),
  ];
  return this;
}

function pushTool(): ColumnTool {
  this.result = [
    ...this.result,
    {
      dataIndex: Math.random().toString(),
      width: '100px',
      title: (
        <Button
          size="small"
          icon="plus"
          onClick={() => {
            this.onCommit();
          }}
        ></Button>
      ) as any,

      render: (a, b, rowIndex) => {
        return (
          <span>
            <Button
              size="small"
              icon="minus"
              onClick={() => {
                this.onDel(b.outerId);
              }}
            ></Button>
            <Button
              size="small"
              icon="check"
              onClick={() => {
                const { outerId, visitTime, pregnancy, doctor, ...other } = b;
                this.onCommit({
                  gynecologicalExam: other,
                  visitTime: visitTime._isAMomentObject ? visitTime.toJSON() : visitTime,
                  id: outerId,
                  pregnancy,
                  // doctor
                });
              }}
            ></Button>
          </span>
        );
      },
    },
  ];
  return this;
}
