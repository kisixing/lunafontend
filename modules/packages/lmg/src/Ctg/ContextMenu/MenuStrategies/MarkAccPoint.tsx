import { Menu } from 'antd';
import React, { } from 'react';
import { IMenuProps } from ".";

export default ((props: IMenuProps) => {

    const fn = (marked = true) => {
        props.s.current.drawAnalyse.markAccPoint()
    }

    return (
        <Menu>
            <Menu.Item key="1" onClick={e => fn()}>标记加速</Menu.Item>
        </Menu>
    );




})
