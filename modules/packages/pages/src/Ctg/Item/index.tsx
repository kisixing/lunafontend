import React, { useState, PropsWithChildren, useRef, useCallback } from 'react';
import { Card, Tooltip } from 'antd';
import moment from 'moment';
import { Ctg as L } from '@lianmed/lmg';
import { ICacheItem, BedStatus } from "@lianmed/lmg/lib/services/WsService";
import { Drawer } from '@lianmed/lmg/lib/interface';
import Extra from "./Extra";
import styled from "styled-components";
import Bar from "./Bar";
import "antd/lib/card/style/index.css"
import "antd/lib/tag/style/index.css"
import { Suit } from '@lianmed/lmg/lib/Ctg/Suit';
interface IProps extends PropsWithChildren<{}> {
    status?: BedStatus
    data: ICacheItem
    bedname: string
    name: string
    age: string
    bedNO: string
    startTime: string
    GP: string,
    gestationalWeek: string,
    onDoubleClick?: (e: React.MouseEvent) => void
    onClose?: (e: React.MouseEvent) => void
    loading?: boolean
    onSuitRead?: (s: Drawer) => void
    themeColor?: string
}

const Wrapper = styled.div`
    height: 100%;
    user-select: none;
    .ant-card-body:hover .btn{
        opacity:1
    }
    .btn {
        opacity: 0;
    }
    .ant-modal-root {
        visibility:visible;
        float:left;
    }
`
const Item = (props: IProps) => {
    const { data, bedname, onClose, onDoubleClick, loading, onSuitRead, themeColor = 'rgb(74, 20, 140)' } = props;
    const status = props.status === undefined ? data && data.status : props.status
    const ismulti = data && data.ismulti
    let { bedNO, GP, gestationalWeek, name, age, startTime } = props;
    const [suit, setSuit] = useState(null)

    const ref = useRef<Suit>()


    // 床位信息
    const RenderTilte = () => {
        const m = moment(startTime)
        const text = (
            <span>
                {
                    [
                        ['姓名', name],
                        ['床号', bedNO],
                        ['年龄', age],
                        ['孕周', gestationalWeek],
                        ['GP', GP],
                        ['开始时间', m.isValid ? m.format('HH:mm') : ''],
                    ]
                        .filter(_ => !!_[1])
                        .map(([a, b]) => <span key={a} style={{ marginRight: 12 }}>{a}：{b}</span>)
                }
            </span>
        )
        // 是否已经建档绑定孕册
        return (<Tooltip title={text}>{text}</Tooltip>);
    };
    const onReady = useCallback(
        suit => { setSuit(suit); onSuitRead && onSuitRead(suit) },
        [],
    )
    return (
        <Wrapper >
            <Card
                size="small"
                title={<RenderTilte />}
                style={{ height: '100%' }}
                extra={<Extra bedname={bedname} onClose={onClose} status={status} suit={suit} />}
                headStyle={{ background: themeColor, color: '#fff' }}
                bodyStyle={{ padding: 0, height: 'calc(100% - 38px)' }}
            >
                <L
                    ref={ref}
                    data={data}
                    onReady={onReady}
                    onDoubleClick={onDoubleClick}
                    loading={loading}
                    showEcg={ismulti}
                ></L>
                <Bar mutableSuit={ref}>

                    {
                        props.children
                    }
                </Bar>
            </Card>
        </Wrapper>
    );
}
export default Item;
