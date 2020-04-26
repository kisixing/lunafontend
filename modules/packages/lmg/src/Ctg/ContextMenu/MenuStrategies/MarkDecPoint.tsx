import { Menu } from 'antd';
import React, { } from 'react';


export default ((props) => {

    const fn = (type) => {
        props.s.current.drawAnalyse.markDecPoint(type)
    }

    return (
        <Menu >
            <Menu.Item key="1" onClick={e => fn('ld')}>LD</Menu.Item>
            <Menu.Item key="2" onClick={e => fn('ed')}>ED</Menu.Item>
            <Menu.Item key="3" onClick={e => fn('vd')}>VD</Menu.Item>
        </Menu>
    );




})
