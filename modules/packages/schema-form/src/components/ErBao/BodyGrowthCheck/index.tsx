import React, { FunctionComponent } from 'react';
import { Checkbox, Table, Form, DatePicker } from 'antd';
import { registerFormField, connect } from '@uform/antd';
import moment from 'moment';
import { ColumnProps, PregnancyHistoryItem } from './type';

const columnData: Array<ColumnProps> = [
  { title: '孕次', dataIndex: '孕次', display: true },
  { title: '日期', dataIndex: '日期' },
  {
    title: '流产史',
    children: [
      { title: '自然', dataIndex: '自然' },
      { title: '人工', dataIndex: '人工' },
      { title: '药流', dataIndex: '药流' },
    ],
  },
  {
    title: '不良生育史',
    children: [
      { title: '葡萄胎', dataIndex: '葡萄胎' },
      { title: '异位妊娠', dataIndex: '异位妊娠' },
      { title: '引产', dataIndex: '引产' },
      { title: '死胎', dataIndex: '死胎' },
      { title: '早产', dataIndex: '早产' },
      { title: '死产', dataIndex: '死产' },
    ],
  },
  {
    title: '正常分娩史',
    children: [
      { title: '足月产', dataIndex: '足月产' },
      { title: '顺产', dataIndex: '顺产' },
      { title: '剖宫产', dataIndex: '剖宫产' },
    ],
  },
].map(d => {
  const onCell = ({ dataIndex, display }: ColumnProps) => {
    return (record, rowIndex) => {
      return {
        editable: !display,
        record,
        rowIndex,
        dataIndex,
        inputType: dataIndex === '日期' ? 'date' : 'checkbox',
      };
    };
  };
  if (!d.children) {
    return {
      ...d,
      onCell: onCell(d),
    };
  }
  return {
    ...d,
    children: d.children.map(dd => ({
      ...dd,
      onCell: onCell(dd),
    })),
  };
});

const { Column, ColumnGroup } = Table;

const EditableContext = React.createContext({});

const MyCheckbox: FunctionComponent<any> = React.forwardRef((props, ref) => {
  return <Checkbox checked={props.value} {...props} ref={ref} />;
});

const EditableCell: FunctionComponent<any> = function(props) {
  const {
    editable,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    rowIndex,
    readOnly,
    ...restProps
  } = props;
  const getInput = () => {
    if (inputType === 'date') {
      return <DatePicker disabled={readOnly} />;
    }
    return <MyCheckbox disabled={readOnly} />;
  };
  const renderCell = ({ getFieldDecorator }) => {
    return (
      <td {...restProps}>
        {editable ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(`${dataIndex}:${rowIndex}`, {
              rules: [
                {
                  required: true,
                  message: `Please Input ${title}!`,
                },
              ],
              initialValue: record[dataIndex],
            })(getInput())}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  return <EditableContext.Consumer>{renderCell}</EditableContext.Consumer>;
};

function EditableTable(props: {
  value: Array<PregnancyHistoryItem>;
  onChange;
  form: any;
  readOnly: boolean;
}) {
  let { value: data = [] } = props;
  let flag = false;
  for (let i = 0, len = data.length; i < len; i++) {
    if (!data[i]) {
      data[i] = {
        日期: '2019-9-11',
        自然: false,
        人工: false,
        药流: false,
        葡萄胎: false,
        异位妊娠: false,
        引产: false,
        死胎: false,
        早产: false,
        死产: false,
        足月产: false,
        顺产: false,
        剖宫产: false,
      };
      flag = true;
    }
  }
  if (flag) {
    props.onChange(data);
  }
  data = data.map((d, index) => ({
    ...d,
    日期: moment(d.日期),
    孕次: index + 1,
  }));

  return (
    <EditableContext.Provider value={props.form}>
      <Table
        rowKey={() => Math.random().toString()}
        size="small"
        components={{
          body: {
            cell: p => <EditableCell {...p} readOnly={props.readOnly} />,
          },
        }}
        bordered
        dataSource={data}
      >
        {columnData.map((d, index) => {
          if (!d.children) {
            return <Column align="center" {...d} key={index + Math.random().toString()} />;
          }
          return (
            <ColumnGroup title={d.title} key={index + Math.random().toString()}>
              {d.children.map((dd, dd_index) => {
                return <Column align="center" {...dd} key={dd_index + Math.random().toString()} />;
              })}
            </ColumnGroup>
          );
        })}
      </Table>
    </EditableContext.Provider>
  );
}

export default registerFormField(
  'body_growth_check',
  connect({})((props: any) => {
    const { value, onChange, readOnly } = props;

    const EditableFormTable: any = Form.create({
      onValuesChange(props, keyValue) {
        const [keyRowIndex, cellValue]: [string, any] = Object.entries(keyValue)[0];
        const [key, rowIndex] = keyRowIndex.split(':');
        onChange(
          value.map((v, index) => {
            if (index === parseInt(rowIndex)) {
              return {
                ...v,
                [key]: typeof cellValue === 'boolean' ? cellValue : cellValue.format(),
              };
            }
            return v;
          })
        );
      },
    })(EditableTable);

    return (
      <div>
        <EditableFormTable value={value} onChange={onChange} readOnly={readOnly} />
      </div>
    );
  })
);
