import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import Lmg from '@lianmed/lmg';
import Ecg from '@lianmed/lmg/lib/Ecg';
import Friedman from '@lianmed/lmg/lib/Friedman';
import { Client } from '@lianmed/ws';
// import { event } from '@lianmed/utils';
import { event } from '@lianmed/utils';
import datacache, { useData } from "./useData";
const { TabPane } = Tabs;


// event.on('socket:dataForCanvas', data => {

// });

export default () => {
  const [device, setDevice] = useState([])
  const [mes, setMes] = useState('');
  const [state, setState] = useState(false)
  useEffect(() => {

    useData(setDevice)

  }, []);
  return (
    <div>
      <div style={{ fontSize: 40, textAlign: 'center', color: 'red' }} onClick={() => { setState(!state) }}> {mes}</div>
      <Tabs
        defaultActiveKey="1"
        onChange={v => {
          console.log(v);
        }}
        style={{ padding: 50 }}
      >
        <TabPane tab="Tab 1" key="1">
          {
            device.length > 1 && device.slice(0, 2).map(({ device_no }) => {
              return <div  key={device_no} style={{ width: '1000px', height: '400px', border: '1px solid red' }}>
                <Lmg data={datacache[device_no]}  />
              </div>

            })
          }


        </TabPane>
        <TabPane tab="Tab 2" key="2">
          <div style={{ width: '1000px', height: '400px', border: '1px solid red' }}>
            <Ecg />
          </div>
        </TabPane>

        <TabPane tab="Tab 3" key="3">
          <div style={{ width: '100%', height: '900px', border: '1px solid red' }}>
            <Friedman />
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};
