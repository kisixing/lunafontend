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

    ,
export const MultiParamL = (props: { data: ICacheItem, isFullScreen: boolean, height: number }) => {
    const {
        data,
        isFullScreen,
        height
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
    const keys = ['脉率bpm', '血氧%', '体温℃', '心率bpm', '呼吸(次/分)', '血压(SDM)mmHg'];


    return (

        !!(ecgData.length) && (
            <div style={{ width: isFullScreen ? 220 : '100%', borderRight: isFullScreen && border }}>
                {
                    isFullScreen ?
                        (
                            <>
                                <Gg title="脉率" value={ecgData[0] || ''} unit="bpm" color={Suit.option.fhrcolor1} />
                                <Gg title="血氧" value={ecgData[1] || ''} unit="%" color={Suit.option.tococolor} />
                                <Gg title="体温" small value={ecgData[2] || ''} unit="℃" />
                                <Gg title="心率" small value={ecgData[3] || ''} unit="bpm" />
                                <Gg title="呼吸" small value={ecgData[4] || ''} unit="次/分" />
                                <Gg title="血压SDM" small value={ecgData[5] || ''} unit="mmHg" />
                            </>
                        ) : (
                            <div style={{ height, display: 'flex', alignItems: 'center', justifyContent: 'space-around', fontSize: 10 }}>

                                {
                                    keys.map((_, i) => {
                                        return (
                                            <span>{_}{ecgData[i]}</span>
                                        )
                                    })
                                }
                            </div>
                        )
                }
            </div>
        )
    );
};


