// import React, { FunctionComponent, useCallback } from 'react';
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

//   const renderCell = ([onChange, value]) => {
//     const getInput = ({ onChange, value }) => {
//       console.log(123);
//       if (inputType === 'Select') {
//         return (
//           <Select disabled={readOnly} onChange={onChange} value={value}>
//             {dataset.map(_ => (
//               <Option value={_.value} key={_.value}>
//                 {_.label}
//               </Option>
//             ))}
//           </Select>
//         );
//       }
//       return (
//         <Input
//           value={value}
//           onChange={e => {
//             onChange(e.target.value);
//           }}
//         />
//       );
//     };

//     return (
//       <td {...restProps}>
//         {editable ? (
//           <Form.Item style={{ margin: 0 }}>
//             {getInput({
//               onChange: v => {
//                 let _value = value.map((_, index) => {
//                   if (index == rowIndex) {
//                     return { ..._, [dataIndex]: v };
//                   }
//                   return _;
//                 });

//                 onChange(_value);
//               },
//               value: record[dataIndex],
//             })}
//           </Form.Item>
//         ) : (
//           <Button
//             icon="minus"
//             size="small"
//             type="dashed"
//             onClick={() => {
//               let _value = [...value];
//               _value.splice(rowIndex, 1);
//               onChange(_value);
//             }}
//           ></Button>
//         )}
//       </td>
//     );
//   };

//   return <EditableContext.Consumer>{renderCell}</EditableContext.Consumer>;
// };

// function EditableTable(props: {
//   dataset: Array<any>;
//   value: Array<PregnancyHistoryItem>;
//   onChange;
//   readOnly: boolean;
//   title: string;
// }) {
//   let { value: data = [], dataset = [], onChange, title } = props;
//   const cell = useCallback(p => <EditableCell {...p} readOnly={props.readOnly} />, []);
//   return (
//     <div style={{ display: 'flex' }}>
//       <span style={{ width: '90px', textAlign: 'right' }}>{title}：</span>
//       <EditableContext.Provider value={[onChange, data]}>
//         <Table
//           style={{ flex: 1 }}
//           pagination={false}
//           rowKey={() => Math.random().toString()}
//           size="small"
//           components={{
//             body: {
//               cell,
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

//     return (
//       <div>
//         <EditableTable
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
