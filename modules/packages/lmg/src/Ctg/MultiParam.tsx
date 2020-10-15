import React, { useState, useEffect, useRef } from 'react';
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
      transition:all .2s;
    }

    .aab::after {
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
      .aab:hover::after {
        top: 0%;
      }
`
export const MultiParam = (props: { data: ICacheItem, isFullScreen: boolean }) => {

    const {
        data,
        isFullScreen,
    } = props


    const ref = useRef<HTMLDivElement>(null)
    if (!data || !data.realTime) return null
    const [ecgData, setEcgData] = useState(data && data.ecgdata)
    const [ismulti, setIsmulti] = useState(false)
    const [list, setList] = useState([])
    let fontSize = 12
    if (ref.current) {
        if (ref.current.clientWidth < 630) {
            fontSize = 12
        } else {
            fontSize = 22
        }
    }
    useEffect(() => {
        setEcgData(data.ecgdata)
        setList(data.bloodList)
        setIsmulti(data.ismulti)

        const id = setInterval(() => {
            setEcgData(JSON.parse(JSON.stringify(data.ecgdata || {})))
            setList(data.bloodList)
            setIsmulti(data.ismulti)
        }, 1000)


        return () => {
            clearInterval(id)
        }
    }, [data])


    // const keys = ['脉率bpm', '血氧%', '体温℃', '心率bpm', '呼吸(次/分)', '血压(SDM)mmHg'];

    return (

        !!(ecgData) && ismulti && (
            <div ref={ref} style={{ width: isFullScreen ? 280 : '100%', height: isFullScreen ? 'auto' : '20%', maxHeight: isFullScreen ? 'unset' : 40, minHeight: isFullScreen ? 'auto' : 26, borderRight: isFullScreen && border }}>
                {
                    isFullScreen ?
                        (
                            <MultiParamL ecgData={ecgData} p={data.ple} bloodList={list} />
                        ) : (
                            <Wrap>
                                <span style={{ fontSize }} className="aa"><span>脉率</span> <span >{ecgData.pulseRate}</span><span>bpm</span></span>
                                <span style={{ fontSize }} className="aa"><span>血氧</span> <span >{ecgData.bloodOxygen}</span><span>%</span></span>
                                <span style={{ fontSize }} className="aa"><span>体温</span> <span >{ecgData.temperature}</span><span>℃</span></span>
                                <span style={{ fontSize }} className="aa"><span>呼吸</span> <span >{ecgData.respRate}</span><span>次/分</span></span>
                                <span style={{ fontSize }} className="aa"><span>血压(SDM)</span><span >{ecgData.bloodPress}</span><span>mmHg</span></span>
                            </Wrap>
                        )
                }
            </div>
        )
    );
};


