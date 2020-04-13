import { Menu } from 'antd';
import React, { } from 'react';


export default ((props) => {

    console.log('acc props', props)


    return (
        <Menu >
            <Menu.Item key="1" >标记减速11</Menu.Item>
            <Menu.Item key="2">取消标记</Menu.Item>
        </Menu>
    );




})
