import React from 'react';
import { IFormCardProps } from '@uform/antd/esm/type';
import { createVirtualBox } from '@uform/antd';
// import style from 'FirstInspection.less';
interface A extends IFormCardProps {
  title: string;
}
export default createVirtualBox('inspection_card', (props: A) => {
  return (
    <div
      className="code-box-meta markdown"
      style={{
        position: 'relative',
        fontSize: '14px',
        lineHeight: '2',
        border: '1px solid #ccc',
        margin: '16px 0',
        borderRadius: '2px',
      }}
    >
      <div
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
      </div>
      <div className="code-box-description" style={{ padding: '18px 24px' }}>
        {props.children}
      </div>
    </div>
  );
});
