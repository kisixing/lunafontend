import React, { useState, useEffect } from 'react';
import { ICacheItem } from "../services/types";
import { MultiParamL } from "./MultiParamL";
const border = '1px dashed #ccc'


export const MultiParam = (props: { data: ICacheItem, isFullScreen: boolean, height: number }) => {

    const {
        data,
        isFullScreen,
        height
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


    const keys = ['脉率bpm', '血氧%', '体温℃', '心率bpm', '呼吸(次/分)', '血压(SDM)mmHg'];


    return (

        !!(ecgData && ecgData.length) && (
            <div style={{ width: isFullScreen ? 280 : '100%', borderRight: isFullScreen && border }}>
                {
                    isFullScreen ?
                        (
                            <MultiParamL ecgData={ecgData} p={data.ple} bloodList={list} />
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


