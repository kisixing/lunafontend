import { Dropdown, Menu } from 'antd';
import React, { PropsWithChildren, useRef, useState } from 'react';
import { Suit } from '../../Suit';
import { PointType } from '../../../interface';


export default ((props: PropsWithChildren<{}>) => {




    return (
        <Menu >
            <Menu.Item key="1" >标记加速</Menu.Item>
            <Menu.Item key="2">取消标记</Menu.Item>
        </Menu>
    );




})
