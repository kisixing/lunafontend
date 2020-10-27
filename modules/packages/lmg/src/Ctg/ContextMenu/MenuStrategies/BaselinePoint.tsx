import { Menu } from 'antd';
import React, { } from 'react';
import { IMenuProps } from ".";
import { event } from "@lianmed/utils";
export default ((props: IMenuProps) => {

    const fn = (n = 0) => {
        props.s.current.drawAnalyse.editBaselinePoint(n)
        event.emit(`editBaseline:${props.s.current.data.docid}`)
    }

    return (
        <Menu>
            <Menu.Item key="1" onClick={e => fn(10)}>+10</Menu.Item>
            <Menu.Item key="2" onClick={e => fn(5)}>+5</Menu.Item>
            <Menu.Item key="3" onClick={e => fn(1)}>+1</Menu.Item>
            <Menu.Item key="4" onClick={e => fn(-1)}>-1</Menu.Item>
            <Menu.Item key="5" onClick={e => fn(-5)}>-5</Menu.Item>
            <Menu.Item key="6" onClick={e => fn(-10)}>-10</Menu.Item>
        </Menu>
    );

})
