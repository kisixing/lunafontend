import React, { useState, useEffect } from 'react';
import { ICacheItem } from "../services/types";
import { MultiParamL } from "./MultiParamL";
import styled from "styled-components";
const border = '1px dashed #ccc'

const Wrap = styled.div`
    height: 100%;
    display: flex;
    align-items: center; 
    justify-content: space-around; 
    font-size: 12px;
    .aa {
      position:relative;
    }
    .aa::after {
        content: "";
        position: absolute;
        z-index: -1;
        top: 60%;
        left: -0.1em;
        right: -0.1em;
        bottom: 0;
        transition: top 200ms cubic-bezier(0, .8, .13, 1);
        background-color: rgba(79,192,141,0.5);
        z-index:1;
      }
      .aa:hover::after {
        top: 0%;
      }
`
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
                            <Wrap>
                                <span className="aa"><sup>脉率</sup> <span  style={{ fontSize }}>{ecgData.pulseRate}</span><sup>bpm</sup></span>
                                <span className="aa"><sup>血氧</sup> <span  style={{ fontSize }}>{ecgData.bloodOxygen}</span><sup>%</sup></span>
                                <span className="aa"><sup>体温</sup> <span  style={{ fontSize }}>{ecgData.temperature}</span><sup>℃</sup></span>
                                <span className="aa"><sup>呼吸</sup> <span  style={{ fontSize }}>{ecgData.respRate}</span><sup>次/分</sup></span>
                                <span className="aa"><sup>血压(SDM)</sup><span  style={{ fontSize }}>{ecgData.bloodPress}</span><sup>mmHg</sup></span>
                            </Wrap>
                        )
                }
            </div>
        )
    );
};


