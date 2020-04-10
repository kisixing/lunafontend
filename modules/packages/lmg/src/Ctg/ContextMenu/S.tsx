import { Menu } from 'antd';
import React from 'react';

const menu = (
    <Menu onClick={(e) => {
        // console.log(1111)
        // const point = s.current.drawAnalyse.revicePoint(offsetX.current, offsetY.current);
        // point && alert(JSON.stringify(point))
    }}>
        <Menu.Item key="1">标记加速222</Menu.Item>
        <Menu.Item key="2">取消标记1113333</Menu.Item>
    </Menu>
);


export default () => menu