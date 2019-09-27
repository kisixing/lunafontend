import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import Lmg from '@lianmed/lmg';
import Ecg from '@lianmed/lmg/lib/Ecg';
import Friedman from '@lianmed/lmg/lib/Friedman';
import { Client } from '@lianmed/ws';
// import { event } from '@lianmed/utils';
import { event } from '@lianmed/utils';
const { TabPane } = Tabs;
export default () => {
  const [mes, setMes] = useState('');
  useEffect(() => {
    let id: NodeJS.Timeout;
    var client: WebSocket = new Client('ws://localhost:8080/', 'echo-protocol');

    client.onerror = function() {
      setMes('Connection Error');
    };

    client.onopen = function() {
      setMes('WebSocket Client Connected');

      id = setInterval(function sendNumber() {
        if (client.readyState === client.OPEN) {
          var number = Math.round(Math.random() * 0xffffff);
          client.send(number.toString());
        }
      }, 1000);
    };

    client.onclose = function() {
      setMes('echo-protocol Client Closed');
    };

    client.onmessage = function(e) {
      if (typeof e.data === 'string') {
        setMes("Client received: '" + e.data + "'");
        //如果不能解析会出错
        event.emit('socket:dataForCanvas', JSON.parse(e.data));
      } else {
        console.log(e.data);
      }
    };
    return () => {
      clearInterval(id);
    };
  }, []);
  return (
    <div>
      <div style={{ fontSize: 40, textAlign: 'center', color: 'red' }}> {mes}</div>
      <Tabs
        defaultActiveKey="1"
        onChange={v => {
          console.log(v);
        }}
        style={{ padding: 50 }}
      >
        <TabPane tab="Tab 1" key="1">
          <div style={{ width: '1000px', height: '400px', border: '1px solid red' }}>
            <Lmg data={null} />
          </div>
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
