import React from 'react';
import { registerFormField, connect } from '@uform/antd';
import EditableCell from './EditableTable';

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
//     console.log('renderCell');
//     return (
//       <td {...restProps}>
//         {editable ? (
//           <Form.Item style={{ margin: 0 }}>
//             <Input />
//           </Form.Item>
//         ) : (
//           <Button icon="minus" size="small" type="dashed" onClick={() => {}}></Button>
//         )}
//       </td>
//     );
//   };

//   return <EditableContext.Consumer>{renderCell}</EditableContext.Consumer>;
// };

export default registerFormField(
  'body_growth_check',
  connect({})((props: any) => {
    const { dataset = [], value = [], onChange, readOnly, title } = props;
    return (
      <div style={{ display: 'flex' }}>
        <span style={{ width: '90px', textAlign: 'right' }}>{title}：</span>
        <EditableCell
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          dataset={dataset}
          title={title}
        />
      </div>
    );
  })
);
