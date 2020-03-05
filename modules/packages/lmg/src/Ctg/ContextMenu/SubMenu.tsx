import { Menu } from 'antd';
import React, { ComponentProps, FunctionComponent } from 'react';
import styled from 'styled-components';
const Wrapper = styled.div`
.ant-menu-submenu-title {
    color:#000;
    background:rgb(238,238,238);
    margin:0 !important;
}
.ant-menu-submenu-title:hover {
    color:#000;
    background:#fff;
    margin:0 !important;
}
.ant-menu-submenu-arrow::after {
    transition:none !important;
}
.ant-menu-submenu-arrow::before {
    transition:none !important;
}
.ant-menu-submenu-title:hover .ant-menu-submenu-arrow::after{
    background:#000 !important;
    
}
.ant-menu-submenu-title:hover .ant-menu-submenu-arrow::before{
    background:#000 !important;
    
}
`
interface IProps extends ComponentProps<any> {
    [x: string]: any
}
const M: FunctionComponent<IProps> = ((props) => {



    return (



        <Wrapper>
            <Menu.SubMenu {...props} >
                {
                    props.children
                }
            </Menu.SubMenu>

        </Wrapper>




    );
})
export default M