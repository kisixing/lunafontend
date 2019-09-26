import React from 'react';
import './App.css';
import Demo from './Demo';
import 'antd/dist/antd.css';
const App: React.FC = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <Demo />
      <Demo />
    </div>
  );
};

export default App;
