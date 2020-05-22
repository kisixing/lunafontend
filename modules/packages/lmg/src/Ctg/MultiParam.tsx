import React, { useRef, useState, useEffect } from 'react';
import { ICacheItem } from "../services/types";
import { Suit } from "./Suit";
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


export const MultiParam = (props: { data: ICacheItem }) => {
    const {
        data
    } = props


    const [ecgData, setEcgData] = useState(data.ecgdata)



    useEffect(() => {
        setEcgData(data.ecgdata)

        const id = setInterval(() => {
            setEcgData(data.ecgdata)
        }, 2000)
        return () => {
            clearInterval(id)
        }
    }, [data])


    return (

        !!(ecgData.length) && (
            <div style={{ width: 220, borderRight: border }}>
                <Gg title="脉率" value={`${ecgData[0] || ''}`} unit="bpm" color={Suit.option.fhrcolor1} />
                <Gg title="血氧" value={`${ecgData[1] || ''}`} unit="%" color={Suit.option.tococolor} />
                <Gg title="体温" small value={`${ecgData[2] || ''}~${ecgData[3] || ''}`} unit="℃" />
                <Gg title="心率" small value={`${ecgData[4] || ''}`} unit="bpm" />
                <Gg title="呼吸" small value={`${ecgData[5] || ''}`} unit="次/分" />
                <Gg title="血压SDM" small value={`${ecgData[6] || ''}`} unit="mmHg" />
            </div>
        )
    );
};


