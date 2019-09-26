import React from 'react';
import { Tabs } from 'antd';
import Lmg from '@lianmed/lmg';
import Ecg from '@lianmed/lmg/lib/Ecg';
import Friedman from '@lianmed/lmg/lib/Friedman';

const { TabPane } = Tabs;
export default () => {
  return (
    <Tabs
      defaultActiveKey="1"
      onChange={v => {
        console.log(v);
      }}
      style={{ padding: 50 }}
    >
      <TabPane tab="Tab 1" key="1">
        <div style={{ width: '100%', height: '900px', border: '1px solid red' }}>
          <Friedman />
        </div>
      </TabPane>
      <TabPane tab="Tab 2" key="2">
        <div style={{ width: '1000px', height: '400px', border: '1px solid red' }}>
          <Ecg />
        </div>
      </TabPane>

      <TabPane tab="Tab 3" key="3">
        <Lmg data={null} />
      </TabPane>
    </Tabs>
  );
};
