import React from 'react';
import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';
type T = ButtonProps & { interval?: number };
export default ({ children, onClick, interval, ...others }: T) => {
  let block = false;
  let _onClick = onClick;
  if (typeof interval === 'number' && interval > 0) {
    _onClick = e => {
      if (block) {
        return;
      }
      block = true;
      setTimeout(() => {
        block = false;
      }, interval);
      onClick && onClick(e);
    };
  }
  return (
    <Button onClick={_onClick} {...others}>
      {children}
    </Button>
  );
};
