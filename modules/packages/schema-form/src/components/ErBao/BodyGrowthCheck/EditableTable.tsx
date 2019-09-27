import React from 'react';
import { Table, Input, Select } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import Button from 'antd/es/button/button';
const { Option } = Select;
function C(props: any) {
  const { value, onChange, dataset, showIndex = true } = props;

  const changeField = (targetKey: string, key: string, _value) => {
    const data = value.map(_ => {
      if (_.key === targetKey) {
        return { ..._, [key]: _value };
      }
      return _;
    });
    onChange(data);
  };
  const columns: Array<ColumnProps<any>> = dataset
    .map(({ title, key, dataset }) => {
      return {
        title: title,
        dataIndex: key,
        align: 'center',
        render: function(cured, record) {
          //   return cure ? (
          //     <Icon type="check" style={{ color: '#29b6f6' }} />
          //   ) : (
          //     <Icon type="close" style={{ color: '#f44336' }} />
          //   );
          const isSelect = !!dataset;
          return (
            <div key={key}>
              {isSelect ? (
                <Select
                  value={cured}
                  onChange={value => {
                    changeField(record.key, key, value);
                  }}
                >
                  {dataset.map(_ => {
                    return (
                      <Option value={_.value} key={_.value}>
                        {_.label}
                      </Option>
                    );
                  })}
                </Select>
              ) : (
                <Input value={cured} onChange={e => changeField(record.key, key, e.target.value)} />
              )}
            </div>
          );
        },
      };
    })
    .concat({
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
              },
            ]);
          }}
        ></Button>
      ),
      align: 'center',
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
  if (showIndex) {
    columns.unshift({
      title: '序号',
      width: 50,
      align: 'center',
      render: function(cured, record, index) {
        return index;
      },
    });
  }
  return (
    <Table
      size="small"
      rowKey="key"
      pagination={false}
      columns={columns}
      dataSource={value}
      // style={{ flex: 1 }}
    />
  );
}

export default C;
