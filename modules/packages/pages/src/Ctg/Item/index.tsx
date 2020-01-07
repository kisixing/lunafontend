import React, { useState } from 'react';
import { Card, Tooltip } from 'antd';
import moment from 'moment';
import { Ctg as L } from '@lianmed/lmg';
import { ICacheItem, BedStatus } from "@lianmed/lmg/lib/services/WsService";
import { Drawer } from '@lianmed/lmg/lib/interface';
import Extra from "./Extra";
import "antd/lib/card/style/index.css"
import "antd/lib/tag/style/index.css"
interface IProps {
    status?: BedStatus
    data: ICacheItem
    bedname: string
    name: string
    age: number
    bedNO: string
    startTime: string
    GP: string,
    isIn: boolean,
    onDoubleClick?: (e: React.MouseEvent) => void
    onClose?: (e: React.MouseEvent) => void
    loading?: boolean
    onSuitRead?: (s: Drawer) => void
    themeColor?: string
}


const Item = (props: IProps) => {
    const { data, bedname, onClose, onDoubleClick, loading, onSuitRead, themeColor = 'rgb(74, 20, 140)' } = props;
    const status = props.status === undefined ? data && data.status : props.status
    const ismulti = data && data.ismulti
    let { bedNO, GP, name, age, startTime, isIn } = props;
    const [suit, setSuit] = useState(null)




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
                    ].map(([a, b]) => {
                        if (a === '床号' && !isIn) {
                            return null
                        }
                        return (
                            <span key={a} style={{ marginRight: 12 }}>
                                {a}：{b}
                            </span>
                        );
                    })
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
            extra={<Extra bedname={bedname} onClose={onClose} status={status} suit={suit} />}
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
