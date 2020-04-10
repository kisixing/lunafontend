import { Menu } from 'antd';
import React, { memo } from 'react';
import AccPoint from "./AccPoint";
import { PointType } from 'packages/lmg/src/interface';
const m = {
    AccPoint
}

interface IProps {
    pType: PointType
}

export default memo((props: IProps) => {
    return (
        <Menu >
            <Menu.Item key="1" >标记加速</Menu.Item>
            <Menu.Item key="2">取消标记</Menu.Item>
        </Menu>
    )
})