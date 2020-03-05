import { Menu } from 'antd';
import React, { ComponentProps, FunctionComponent } from 'react';
import { MenuItem } from "react-contextmenu";
import styled from 'styled-components';
const Wrapper = styled.div`
.ant-menu-submenu-title, .ant-menu-item{
    line-height:24px !important;
    height:24px !important;
    color:black;
    background:rgb(238,238,238);
    margin:0 !important;
}
.ant-menu-submenu-title, .ant-menu-item:hover {
    color:black;
    background:#fff;
    margin:0 !important;
}
`
interface IProps extends ComponentProps<any> {
    onClick?: any
    [x: string]: any
}
const M: FunctionComponent<IProps> = ((props) => {

    const { onClick = () => {console.log('default click') }, ...o } = props

    return (



        <Wrapper>
            <MenuItem >

                <Menu.Item onClick={onClick} {...o} >
                    {
                        props.children
                    }
                </Menu.Item>
            </MenuItem>

        </Wrapper>




    );
})
export default M