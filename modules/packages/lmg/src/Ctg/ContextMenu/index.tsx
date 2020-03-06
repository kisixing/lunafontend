import React, { PropsWithChildren } from 'react';
import { ContextMenu, ContextMenuTrigger } from "react-contextmenu";
import { Menu } from 'antd';
import styled from 'styled-components'
import MenuItem from "./MenuItem";
import SubMenu from "./SubMenu";
const Wrapper = styled.div`
.ant-menu-submenu-title {
    line-height:24px !important;
    height:24px !important;
    margin:0 !important;
}
.ant-menu {
    background:rgb(238,238,238)
}
`
export default ((props: PropsWithChildren<{rightClickXy:React.MutableRefObject<{x:number,y:number}>}>) => {
    const {rightClickXy} = props
    function handleClick(a: any) {
        const current = rightClickXy.current
        alert(`右击${current.x}:${current.y}`)
    }
    const a: any = { disableIfShiftIsPressed: true }
    return (
        <Wrapper >
            <ContextMenuTrigger id="some_unique_identifier" {...a} holdToDisplay={-1}>
                {/* {
                    props.children
                } */}
                {
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
                }
            </ContextMenuTrigger>
            <ContextMenu id="some_unique_identifier">




                <Menu selectable={false} onClick={handleClick} style={{ boxShadow: '0 0 5px 0px black', minWidth: 160 }} mode="vertical">
                    <MenuItem key={"1"} >
                        <span> 菜单1</span>
                    </MenuItem>
                    <MenuItem key={"2"} >
                        <span>  菜单2</span>
                    </MenuItem>
                    <SubMenu
                        key="33"
                        title={
                            <span>
                                <span>菜单3</span>
                            </span>
                        }
                    >

                        <MenuItem key={"3"} >
                            <span>菜单3.1</span>
                        </MenuItem>
                        <MenuItem key="4">菜单3.2</MenuItem>

                    </SubMenu>

                </Menu>
            </ContextMenu>

        </Wrapper>
    );
})
