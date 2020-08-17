import Tooltip from "antd/es/tooltip";
import React, { memo } from 'react';
import styled from "styled-components";
// import { Icon as LegacyIcon } from '@ant-design/compatible';
import { IVisit, VisitedData } from ".";
import { onOpen } from "./utils";

// import settingStore from "@/utils/SettingStore";


// const settingData = settingStore.cache
// const colors = AntdThemeManipulator.colors
// declare var __VERSION: string;
const Wrapper = styled.div`
img {
    width:48px;
    height:48px;
    padding:8px;
    border-radius:48px;
    background:rgb(236,236,236);
}
.b {
    width:112px;
    padding:16px 0;
    position:relative;
    display:block;
    height:auto;
    border:0;
    box-shadow:unset;
    cursor:pointer;
    transition:all .5s;
}
.b:hover {
    background:rgb(20,20,20);
}
.b:hover .more {
    display:block;
}
.title {
    width: 88px;
    text-align: center;
    margin-top: 6px;
    text-overflow:ellipsis;
    white-space:nowrap;
    overflow:hidden;
}
.more {
    position:absolute !important;
    padding:6px;
    right:0;
    top:0;
    border:unset;
    display:none;
}
`

const Panel = ({ visitedData }: { visitedData: VisitedData }) => {
    // const [visible, setVisible] = useState(false)
    // const toggleVisible = useCallback(() => setVisible(!visible), [visible])






    const B = ({ v }: { v: IVisit }) => {
        return (
            <div title={v.title} className="b" onClick={() => onOpen(v)}>
                <div style={{ display: 'flex', alignItems: 'center', flexFlow: 'column nowrap' }}>
                    <img src={v.iconUrl} />
                    <div className="title">
                        {v.title}
                    </div>
                </div>
                {/* <MoreOutlined className="more" onClick={e => {
                    e.stopPropagation();
                    toggleVisible()
                }} /> */}
            </div>
        )
    }


    const Title = () => {
        return (
            <Wrapper style={{ display: 'flex', maxWidth: 340, flexWrap: 'wrap' }}>
                {
                    visitedData.map(_ => (
                        <B v={_} key={_.name} />
                    ))
                }
            </Wrapper>
        )
    }
    return (
        <>
            <Tooltip placement="rightBottom" title={<Title />} >
                <div style={{
                    position: 'fixed',
                    right: 0,
                    bottom: 60,
                    width: 10,
                    height: 40,
                    background: 'var(--theme-color)',
                    lineHeight: '40px',
                    color: '#fff',
                    textAlign: 'center',
                    cursor: 'pointer'
                }}>||</div>
            </Tooltip>
            {/* <Modal centered width={300} visible={visible} onCancel={toggleVisible} onOk={toggleVisible}>
                <Form>
                    <Form.Item name="title" label="标题">
                        <Input />
                    </Form.Item>
                    <Form.Item name="url" label="地址">
                        <Input />
                    </Form.Item>
                </Form>
            </Modal> */}
        </>
    );
}

export default memo(Panel)
