import { Tag } from 'antd';
import React, { memo, useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom'

interface IProps {
    alarmText: string
}



const C = (props: IProps) => {
    const { alarmText } = props;
    const ref = useRef()
    const flag = useRef(false)
    useEffect(() => {
        const d = ReactDOM.findDOMNode(ref.current) as HTMLElement
        const id = setInterval(() => {
            d && (d.style.background = flag.current ? 'red' : 'blue');
            flag.current = !flag.current
        }, 250)
        return () => {
            return clearInterval(id)
        }
    }, [])
    return (
        <Tag ref={ref} style={{ border: '2px solid #fff',color:'#fff', display: alarmText ? 'inline-block' : 'none' }} >
            ***{alarmText}
        </Tag>


    )


}
export default memo(C);
