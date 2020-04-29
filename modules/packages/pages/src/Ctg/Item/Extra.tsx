import React, { useMemo, memo } from 'react';
import { Tag, Button } from 'antd';
import { CloseOutlined } from "@ant-design/icons";
import useItemAlarm from "./useItemAlarm";
import { mapStatusToColor, mapStatusToText, BedStatus } from "@lianmed/lmg/lib/services/WsService";
import styled from 'styled-components';

import "antd/lib/card/style/index.css"
import "antd/lib/tag/style/index.css"
import { Suit } from '@lianmed/lmg/lib/Ctg/Suit';
interface IProps {
    status: BedStatus
    suit: Suit
    onClose?: (e: React.MouseEvent) => void
    bedname: string

}

const SB = styled(Button)`
:hover {
    background: rgba(255,255,255,.2)
}
`

const Bed = memo<any>(({ bedname }) => {
    console.log('ggg');

    return <span style={{ marginRight: '8px', color: '#fff' }}>{bedname}号</span>
})
const Status = memo<any>(({ alarmStatus, status }) => {

    return !!mapStatusToColor[status] && (
        <Tag style={{ border: '2px solid #fff' }} color={alarmStatus ? '#f5222d' : mapStatusToColor[status]}>
            {alarmStatus ? alarmStatus : mapStatusToText[status]}
        </Tag>

    )
})


const C = (props: IProps) => {
    const { status, suit, onClose, bedname } = props;
    const [alarmStatus] = useItemAlarm(suit)

    const close = useMemo(() =>
        onClose &&
        (
            <SB
                title="关闭监护窗口"
                icon={<CloseOutlined />}
                size="small"
                type="link"
                style={{ color: "#fff" }}
                onClick={onClose}
            ></SB>
        )
        , [onClose])


    return (
        <>
            <Bed bedname={bedname} />

            <Status alarmStatus={alarmStatus} status={status} />
            {
                close
            }
        </>
    )


}
export default memo(C);
