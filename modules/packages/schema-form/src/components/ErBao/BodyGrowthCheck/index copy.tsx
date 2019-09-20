// import React, { FunctionComponent } from 'react';
// import { Checkbox, Table, Form, DatePicker, Button, Select, Input } from 'antd';
// import { registerFormField, connect } from '@uform/antd';

// import { PregnancyHistoryItem } from './type';

// const { Column } = Table;
// const { Option } = Select;

// const EditableContext = React.createContext({});

// const EditableCell: FunctionComponent<any> = function(props) {
//   const {
//     editable,
//     dataIndex,
//     title,
//     inputType,
//     record,
//     index,
//     children,
//     rowIndex,
//     readOnly,
//     dataset = [],
//     ...restProps
//   } = props;
//   const getInput = () => {
//     if (inputType === 'Select') {
//       return (
//         <Select disabled={readOnly}>
//           {dataset.map(_ => (
//             <Option value={_.value} key={_.value}>
//               {_.label}
//             </Option>
//           ))}
//         </Select>
//       );
//     }
//     return <MyInput />;
//   };
//   const renderCell = ({ getFieldDecorator }) => {
//     return (
//       <td {...restProps}>
//         {editable ? (
//           <Form.Item style={{ margin: 0 }}>
//             {getFieldDecorator(`${dataIndex}:${rowIndex}`, {
//               rules: [
//                 {
//                   required: true,
//                   message: `Please Input ${title}!`,
//                 },
//               ],
//               initialValue: record[dataIndex],
//             })(getInput())}
//           </Form.Item>
//         ) : (
//           <Button icon="minus" size="small" type="dashed" onClick={() => {}}></Button>
//         )}
//       </td>
//     );
//   };

//   return <EditableContext.Consumer>{renderCell}</EditableContext.Consumer>;
// };

// const MyInput: FunctionComponent<any> = React.forwardRef((props, ref) => {
//   return (
//     <Input
//       {...props}
//       onChange={e => {
//         props.onChange(e.target.value);
//       }}
//       ref={ref}
//     />
//   );
// });

// function EditableTable(props: {
//   dataset: Array<any>;
//   value: Array<PregnancyHistoryItem>;
//   onChange;
//   form: any;
//   readOnly: boolean;
//   title: string;
// }) {
//   let { value: data = [], dataset = [], onChange, title } = props;
//   let flag = false;

//   if (flag) {
//     onChange(data);
//   }

//   return (
//     <div style={{ display: 'flex' }}>
//       <span style={{ width: '90px', textAlign: 'right' }}>{title}：</span>
//       <EditableContext.Provider value={props.form}>
//         <Table
//           style={{ flex: 1 }}
//           pagination={false}
//           rowKey={() => Math.random().toString()}
//           size="small"
//           components={{
//             body: {
//               cell: p => <EditableCell {...p} readOnly={props.readOnly} />,
//             },
//           }}
//           bordered
//           dataSource={data}
//         >
//           {dataset.map(d => {
//             return (
//               <Column
//                 align="center"
//                 title={d.title}
//                 dataIndex={d.key}
//                 key={d.key}
//                 onCell={(record, rowIndex) => {
//                   return {
//                     record,
//                     rowIndex,
//                     dataIndex: d.key,
//                     inputType: d.dataset ? 'Select' : 'Input',
//                     dataset: d.dataset,
//                     editable: true,
//                   };
//                 }}
//               />
//             );
//           })}
//           <Column
//             width={50}
//             align="center"
//             title={
//               <Button
//                 icon="plus"
//                 size="small"
//                 type="dashed"
//                 onClick={() => onChange([...data, {}])}
//               ></Button>
//             }
//           />
//         </Table>
//       </EditableContext.Provider>
//     </div>
//   );
// }

// export default registerFormField(
//   'body_growth_check',
//   connect({})((props: any) => {
//     const { dataset = [], value = [], onChange, readOnly, title } = props;

//     const EditableFormTable: any = Form.create({
//       onValuesChange(props, keyValue) {
//         console.log(props, value);
//         const [keyRowIndex, cellValue]: [string, any] = Object.entries(keyValue)[0];
//         const [key, rowIndex] = keyRowIndex.split(':');
//         onChange(
//           value.map((v, index) => {
//             if (index === parseInt(rowIndex)) {
//               return {
//                 ...v,
//                 [key]: cellValue,
//               };
//             }
//             return v;
//           })
//         );
//       },
//     })(EditableTable);

//     return (
//       <div>
//         <EditableFormTable
//           value={value}
//           onChange={onChange}
//           readOnly={readOnly}
//           dataset={dataset}
//           title={title}
//         />
//       </div>
//     );
//   })
// );
