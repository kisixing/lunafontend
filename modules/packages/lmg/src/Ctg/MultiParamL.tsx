import { Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import React, { useRef, useEffect } from 'react';
import { IBloodListItem } from "../services/types";
import { Suit } from "./Suit";
import Queue from '../Ecg/Queue';
const border = '1px dashed #ccc'
const Gg = (props: { title?: string, value?: any, unit?: string, color?: string, small?: boolean }) => {
    const { title, value, unit, color = '#333', small = false } = props
    return (
        <div style={{ position: 'relative', height: small ? 34 : 100, fontFamily: 'arial', borderBottom: border }}>
            <div style={{ position: 'absolute', left: 10, top: 4, fontSize: 16 }}>
                {title}
                <sub style={{ color: '#aaa' }}>({unit})</sub>
            </div>
            <div style={{ fontSize: small ? 18 : 64, lineHeight: small ? '34px' : '120px', textAlign: 'right', marginRight: 10, color }}>{value || ''}</div>
        </div>
    )
}

export const MultiParamL = (props: { ecgData: any[], p: Queue, bloodList: IBloodListItem[] }) => {
    const ref = useRef<HTMLDivElement>()
    const {
        ecgData = [],
        p,
        bloodList = [
            // { time: '测试时间', dia_bp: 110, mean_bp: 110, sys_bp: 110 }
        ]
    } = props
    useEffect(() => {
        const id = setInterval(() => {
            const _ = p.B[0]
            ref.current.style.height = `${_ === 50 ? 0 : _}%`

        }, 50)
        return () => {
            clearInterval(id)
        }
    }, [p])
    const columns: ColumnType<IBloodListItem>[] = [
        { dataIndex: 'sys_bp', title: 'SBP' },
        { dataIndex: 'mean_bp', title: 'MBP' },
        { dataIndex: 'dia_bp', title: 'DBP' },
        { dataIndex: 'time', title: '时间' },
    ]
    return (

        <>
            <Gg title="脉率" value={ecgData[0] || ''} unit="bpm" color={Suit.option.fhrcolor1} />
            <Gg title="血氧" value={(
                <>
                    <span>{ecgData[1] || ''}</span>
                    <div style={{ display: 'inline-block', width: 14, height: 46, border: '2px solid red', position: 'relative' }}>
                        <div ref={ref} style={{ background: 'blue',  width: 14 - 4, position: 'absolute', bottom: 0 }}></div>
                    </div>
                </>
            )} unit="%" color={Suit.option.tococolor} />
            <Gg title="体温" small value={ecgData[2] || ''} unit="℃" />
            <Gg title="心率" small value={ecgData[3] || ''} unit="bpm" />
            <Gg title="呼吸" small value={ecgData[4] || ''} unit="次/分" />
            {/* <Gg title="血压SDM" small value={ecgData[5] || ''} unit="mmHg" /> */}
            {/* <div>实时袖带压：0</div> */}
            <Table title={() => `血压(mmHg)：${ecgData[5]}`} rowKey="id" size="small" pagination={false} columns={columns} dataSource={bloodList}>

            </Table>
        </>
    );
};


