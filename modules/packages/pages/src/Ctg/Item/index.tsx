import React, { useState } from 'react';
import { Card, Button, Tag, Tooltip } from 'antd';
import moment from 'moment';
import { Ctg as L } from '@lianmed/lmg';
import useItemAlarm from "./useItemAlarm";
import { BedStatus, ICacheItem, mapStatusToColor, mapStatusToText } from "@lianmed/lmg/lib/services/WsService";
import { Drawer } from '@lianmed/lmg/lib/interface';
import styled from 'styled-components';
import "antd/lib/card/style/index.css"
import "antd/lib/tag/style/index.css"
interface IProps {
    data: ICacheItem
    bedname: string
    name: string
    age: number
    bedNO: string
    startTime: string
    GP: string
    onDoubleClick?: (e: React.MouseEvent) => void
    onClose?: (e: React.MouseEvent) => void
    loading?: boolean
    onSuitRead?: (s: Drawer) => void
    themeColor?: string
}
interface IItemTitle {
    bedNO?: string
    GP?: string
    name?: string
    startTime?: string
    age?: number
}
const SB = styled(Button)`
    :hover {
        background: rgba(255,255,255,.2)
    }
`
const Item = (props: IProps) => {
    const { data, bedname, onClose, onDoubleClick, loading, onSuitRead, themeColor = 'rgb(74, 20, 140)' } = props;
    const status = data && data.status
    const ismulti = data && data.ismulti
    let { bedNO, GP, name, age, startTime, } = props

    const [cache, setCache] = useState<IItemTitle>({})
    const [suit, setSuit] = useState(null)
    const [alarmStatus] = useItemAlarm(suit)
    if (status === BedStatus.Stopped) {
        bedNO = cache.bedNO
        GP = cache.GP
        name = cache.name
        age = cache.age
        startTime = cache.startTime
    } else {
        bedNO !== cache.bedNO && name !== cache.name && setCache({ bedNO, GP, name, age, startTime, })
    }

    // item右上角icon
    const RenderExtra = () => {
        return (
            <div >
                <span style={{ marginRight: '8px', color: '#fff' }}>{bedname}</span>
                {
                    mapStatusToColor[status] && <Tag style={{ border: '2px solid #fff' }} color={alarmStatus ? '#f5222d' : mapStatusToColor[status]}>
                        {alarmStatus ? alarmStatus : mapStatusToText[status]}
                    </Tag>
                }
                {onClose && <SB
                    title="关闭监护窗口"
                    icon="close"
                    size="small"
                    type="link"
                    style={{ color: "#fff" }}
                    onClick={onClose}
                ></SB>}
            </div >
        );
    };

    // 床位信息
    const RenderTilte = () => {
        const text = (
            <span>
                {
                    [
                        ['床号', bedNO],
                        ['姓名', name],
                        ['年龄', age],
                        ['GP', GP],
                        ['开始时间', startTime && moment(startTime).format('HH:mm')],
                    ].map(([a, b]) => (<span key={a} style={{ marginRight: 12 }}>{a}：{b}</span>))
                }
            </span>
        )
        // 是否已经建档绑定孕册
        return (<Tooltip title={text}>{text}</Tooltip>);
    };

    return (

        <Card
            size="small"
            title={<RenderTilte />}
            style={{ height: '100%', overflow: 'hidden', userSelect: 'none' }}
            extra={<RenderExtra />}
            headStyle={{ background: themeColor, color: '#fff' }}
            bodyStyle={{ padding: 0, height: 'calc(100% - 38px)' }}
        >
            <L
                data={data}
                onReady={suit => { setSuit(suit); onSuitRead && onSuitRead(suit) }}
                onDoubleClick={onDoubleClick}
                loading={loading}
                showEcg={ismulti}
            ></L>
        </Card>

    );
}
export default Item;
