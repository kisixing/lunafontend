import Lmg from './Lmg';
import E from './Ecg';
import React from 'react';
export default () => {
  return (
    <div style={{ width: '1000px', height: '400px', border: '1px solid red' }}>
      <Lmg />
      <E />
    </div>
  );
};
