import { Dropdown, Menu } from 'antd';
import React, { PropsWithChildren } from 'react';
import { Suit } from '../Suit';

const menu = (
    <Menu onClick={(e) => console.log(111, e.domEvent.target)}>
        <Menu.Item key="1">11st menu item</Menu.Item>
        <Menu.Item key="2">22nd menu item</Menu.Item>
        <Menu.Item key="3">33rd menu item</Menu.Item>
    </Menu>
);

export default ((props: PropsWithChildren<{ s: React.MutableRefObject<Suit> }>) => {
    const s = props.s
    return (

        <Dropdown overlay={menu} trigger={['contextMenu']}>
            <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0 }} onContextMenu={e => {
                const target = e.currentTarget
                const { clientX, clientY } = e

                const { x, y } = target.getBoundingClientRect()
                const offsetX = clientX - x
                const offsetY = clientY - y
                s.current.reviceAnalyse(offsetX, offsetY);
            }}>
                {
                    props.children
                }
            </div>
            {/* {
                    React.Children.map(props.children, (_: any) => {
                        return React.cloneElement(_, {
                            onContextMenu: e => {
                                // e.preventDefault()
                                // e.stopPropagation()
                                console.log('menu', e)
                                // return false
                            }
                        })
                    })
                } */}
        </Dropdown>


    );
})
