import { Menu } from 'antd';
import React, { } from 'react';
import { IMenuProps } from ".";

export default ((props: IMenuProps) => {

    const fn = (marked = true) => {
        props.s.current.drawAnalyse.editAccPoint(marked)
    }

    return (
        <Menu>
            <Menu.Item key="2" onClick={e => fn(false)}>取消标记</Menu.Item>
            <Menu.Item key="1" onClick={e => fn()}>标记加速</Menu.Item>

        </Menu>
    );

})
