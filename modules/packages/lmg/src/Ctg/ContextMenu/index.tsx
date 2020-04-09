import { Dropdown, Menu } from 'antd';
import React, { PropsWithChildren } from 'react';

const menu = (
    <Menu onClick={e=>console.log(e)}>
        <Menu.Item key="1">1st menu item</Menu.Item>
        <Menu.Item key="2">2nd menu item</Menu.Item>
        <Menu.Item key="3">3rd menu item</Menu.Item>
    </Menu>
);

export default ((props: PropsWithChildren<{ rightClickXy: React.MutableRefObject<{ x: number, y: number }> }>) => {

    return (

        <Dropdown overlay={menu} trigger={['contextMenu']} >
            <div style={{width:'100%',height:'100%',position:'absolute',top:0}}>
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
