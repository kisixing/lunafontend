
// import React, { useState, useEffect } from 'react';
// import { Suit } from '@lianmed/lmg/lib/Ctg/Suit';

// import { WrappedFormUtils } from 'antd/lib/form/Form';
// import { Select, InputNumber, Input } from 'antd';

// const intervals = [20, 40]

// export default (v: { suit: Suit }) => {

//     const [interval, setInterval] = useState(20)
//     const [startTime, setStartTime] = useState(0)
//     useEffect(() => {
//         const s = (time) => {
//             setStartTime(time)
//         }
//         console.log('zzzz', v.suit.on)

//         v.suit && v.suit
//             .on('startTime', s)
//         return () => {
//             v.suit && v.suit
//                 .off('startTime', s)

//         };
//     }, [interval])

//     const IntervalRadio = () => {
//         return (
//             <span style={{ marginRight: 10 }}> 时长：
//                 <Select onChange={e => {
//                     const i = Number(e) || 20
//                     setInterval(i)
                 
//                 }} value={interval}>
//                     {
//                         intervals.map(value => (
//                             <Select.Option value={value} key={value}>{value + '分钟'}</Select.Option>
//                         ))
//                     }
//                 </Select>
//             </span>
//         )
//     }

//     const StartTime = () => {
//         return <span style={{marginRight:10}}>开始时间：{(startTime / 240).toFixed(1)}分</span>
//     }
//     const EndTime = () => {
//         return <span>结束时间：{(startTime / 240 + interval).toFixed(1)}分</span>
//     }
//     return { IntervalRadio, StartTime, EndTime }
// }



