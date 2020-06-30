import React, { useState, useEffect } from 'react';
import { ICacheItem } from "../services/types";
import { MultiParamL } from "./MultiParamL";
const border = '1px dashed #ccc'


export const MultiParam = (props: { data: ICacheItem, isFullScreen: boolean }) => {

    const {
        data,
        isFullScreen,
    } = props

    if (!data || !data.realTime) return null
    const [ecgData, setEcgData] = useState(data && data.ecgdata)
    const [list, setList] = useState([])

    useEffect(() => {
        setEcgData(data.ecgdata)
        setList(data.bloodList)
        const id = setInterval(() => {
            setEcgData(data.ecgdata)
            setList(data.bloodList)

        }, 1000)
        return () => {
            clearInterval(id)
        }
    }, [data])


    // const keys = ['脉率bpm', '血氧%', '体温℃', '心率bpm', '呼吸(次/分)', '血压(SDM)mmHg'];
    const fontSize = 22

    return (

        !!(ecgData) && (
            <div style={{ width: isFullScreen ? 280 : '100%', height: isFullScreen ? 'auto' : '20%', maxHeight: isFullScreen ? 'unset' : 40, minHeight: isFullScreen ? 'auto' : 26, borderRight: isFullScreen && border }}>
                {
                    isFullScreen ?
                        (
                            <MultiParamL ecgData={ecgData} p={data.ple} bloodList={list} />
                        ) : (
                            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-around', fontSize: 12 }}>

                                <span><sup>脉率</sup> <span style={{ fontSize }}>{ecgData.pulseRate}</span><sup>bpm</sup></span>
                                <span><sup>血氧</sup> <span style={{ fontSize }}>{ecgData.bloodOxygen}</span><sup>%</sup></span>
                                <span><sup>体温</sup> <span style={{ fontSize }}>{ecgData.temperature}</span><sup>℃</sup></span>
                                <span><sup>呼吸</sup> <span style={{ fontSize }}>{ecgData.respRate}</span><sup>次/分</sup></span>
                                <span><sup>血压(SDM)</sup><span style={{ fontSize }}>{ecgData.bloodPress}</span><sup>mmHg</sup></span>

                            </div>
                        )
                }
            </div>
        )
    );
};


