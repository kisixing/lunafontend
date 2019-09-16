import React from 'react';
import { createVirtualBox, IFieldProps } from '@uform/antd';
// import style from 'FirstInspection.less';
interface A extends IFieldProps {
  title: string;
}
export default createVirtualBox('inspection_card', (props: A) => {
  return (
    <fieldset
      className="code-box-meta markdown"
      style={{
        position: 'relative',
        fontSize: '14px',
        lineHeight: '2',
        border: '1px solid #ccc',
        margin: '10px',
        borderRadius: '2px',
      }}
    >
      {/* <div
        className="code-box-title"
        style={{
          position: 'absolute',
          marginLeft: '16px',
          padding: '1px 8px',
          top: '-14px',
          background: '#fff',
        }}
      >
        <span>{props.title}</span>
      </div> */}
      <legend style={{ width: 'auto', margin: '0', marginLeft: '16px', border: '0' }}>
        {props.title}
      </legend>
      <div className="code-box-description" style={{ padding: '18px' }}>
        {props.children}
      </div>
    </fieldset>
  );
});
