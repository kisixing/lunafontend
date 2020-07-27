import React from "react";
import { AnalyseType } from "@lianmed/lmg/lib/interface"
import { Select } from "antd";
let id = 0
function Opts({ m, ...o }: { m: any[][] }) {

    return (
        <Select style={{ width: 280 }} {...o}>
            {
                m.map(([n, label]) => (
                    <Select.Option value={`00${n},${label}`} key={`00${n},${label},${++id}`}>{label}</Select.Option>
                ))
            }

        </Select>
    )

}
function getDeformedOptions(timeChecked = false) {
    return {
        S: (props) => {
            return (
                <Select style={{ width: 120 }} {...props}>
                    <Select.Option value={0}>正常</Select.Option>
                    <Select.Option value={1}>可疑</Select.Option>
                    <Select.Option value={2}>异常</Select.Option>
                    {
                        timeChecked ? <Select.Option value={3}>时长不足</Select.Option> : null
                    }
                </Select>
            )
        }
    }
}

const tableData: { [x in AnalyseType]: any } = {

    Fischer: [
        {
            name: '心率基线(bpm)',
            0: '<100,>180',
            1: '100~109,161~180',
            2: '110~160',
            key: 'bhr',
        },
        {
            name: '振幅变异(bpm)',
            0: '<5',
            1: '5~9,>30',
            2: '10~30',
            key: 'ltv',

        },
        {
            name: '周期变异(次)',
            0: '<2',
            1: '2~6',
            2: '>6',
            key: 'stv',

        },
        {
            name: '加速(次)',
            0: '无',
            1: '1～4',
            2: '>4',
            key: 'acc',
        },
        {
            name: '减速(次)',
            0: 'LD',
            1: 'VD',
            2: '无，其它',
            key: 'dec',
            R: (props) => {
                return (
                    <Opts m={[
                        [0, 'LD'],
                        [1, 'VD'],
                        [2.1, '无'],
                        [2.2, '其它'],

                    ]} {...props} />
                )
            }
        },
    ],
    Nst: [
        {
            name: '心率基线(bpm)',
            0: '<100',
            1: '100~109,>160',
            2: '110~160',
            key: 'bhr',
        },
        {
            name: '振幅变异(bpm)',
            0: '<5',
            1: '5~9,>30',
            2: '10~30',
            key: 'ltv',

        },
        {
            name: '胎动FHR上升时间(s)',
            0: '<10s',
            1: '10~14s',
            2: '≥15s',
            key: 'accduration',

        },
        {
            name: '胎动FHR变化(bpm)',
            0: '<10',
            1: '10~14',
            2: '≥15',
            key: 'accampl',
        },
        {
            name: '胎动次数(次)',
            0: '无',
            1: '1~2',
            2: '≥3',
            key: 'fm',
        },
    ],
    Krebs: [
        {
            name: '心率基线(bpm)',
            0: '<100,>180',
            1: '100~109,161~180',
            2: '110~160',
            key: 'bhr',
        },
        {
            name: '振幅变异(bpm)',
            0: '<5',
            1: '5~9,>25',
            2: '10~25',
            key: 'ltv',

        },
        {
            name: '周期变异(次)',
            0: '<3',
            1: '3~6',
            2: '>6',
            key: 'stv',

        },
        {
            name: '加速(次)',
            0: '0',
            1: '1~4',
            2: '>4',
            key: 'acc',
        },
        {
            name: '减速(次)',
            0: '≥2',
            1: '1',
            2: '无或早期减速',
            key: 'dec',
        },
        {
            name: '胎动(次)',
            0: '0',
            1: '1～4',
            2: '>4',
            key: 'fm',
        },
    ],
    Cst: [
        {
            name: '心率基线',
            0: '<100,>180',
            1: '100~109,161~180',
            2: '110~160',
            key: 'bhr',
        },
        {
            name: '振幅变异',
            0: '<5',
            1: '5~9,>30',
            2: '10~30',
            key: 'ltv',
        },
        {
            name: '周期变异',
            0: '<2',
            1: '2～6',
            2: '>6',
            key: 'stv',
        },
        {
            name: '加速',
            0: '无',
            1: '周期性',
            2: '散在性',
            key: 'acc',
            R: (props) => {
                return (
                    <Opts m={[
                        [0, '无'],
                        [1, '周期性'],
                        [2, '散在性'],

                    ]} {...props} />
                )
            }
        },
        {
            name: '减速',
            0: '晚期+其他',
            1: '变异减速',
            2: '无',
            key: 'dec',
            R: (props) => {
                return (
                    <Opts m={[
                        [0.1, '晚期'],
                        [0.2, '其他'],
                        [1, '基线变异'],
                        [2, '无'],

                    ]} {...props} />
                )
            }
        },
    ],
    Sogc: [
        {
            name: '胎心基线',
            0: '110~160bpm',
            1: '100~109bpm、>160bpm、基线上升',
            2: '基线过缓<100bpm、基线过速>160bpm、基线不确定',
            key: 'bhr',
            R: (props) => {
                return (

                    <Opts m={[
                        [0.0, '110~160bpm'],
                        [1.1, '100~109bpm'],
                        [1.2, '大于160bpm'],
                        [1.3, '基线上升'],
                        [2.1, '基线过缓小于00bpm'],
                        [2.2, '基线过速大于160bpm'],
                        [2.3, '基线不确定'],
                    ]} {...props} />



                )
            }
        },
        {
            name: '基线变异',
            0: '6~25次/分、≤5次/分<40分钟',
            1: '≤5次/分40~80分钟',
            2: '≤5次/分>80分钟、≥26次/分>10分钟、正弦型',
            key: 'ltv',
            R: (props) => {
                return (
                    <Opts m={[
                        [0.1, '6~25次/分'],
                        [0.2, '≤5次/分小于40分钟'],
                        [1.0, '≤5次/分40~80分钟'],
                        [2.1, '≤5次/分大于80分钟'],
                        [2.2, '≥26次/分大于10分钟'],
                        [2.3, '正弦型'],
                    ]} {...props} />
                )
            }
        },
        {
            name: '减速',
            0: '无减速或偶发变异减速<30秒',
            1: '变异减速30~60秒',
            2: '变异减速>60秒、晚期减速',
            key: 'dec',
            R: (props) => {
                return (
                    <Opts m={[
                        [0.1, '无减速'],
                        [0.2, '偶发变异减速小于30秒'],
                        [1.0, '变异减速30~60秒'],
                        [2.1, '变异减速大于60秒'],
                        [2.2, '晚期减速'],
                    ]} {...props} />
                )
            }
        },
        {
            // name: '加速(足月)',
            name: '加速',
            0: '≥2次40分钟内',
            1: '<2次40~80分钟',
            2: '<2次>80分钟',
            key: 'acc',
            timeChecked: true,
            R: (props) => {
                return (
                    <Opts m={[
                        [0, '≥2次40分钟内'],
                        [1, '小于2次40~80分钟'],
                        [2, '小于2次大于80分钟'],
                    ]} {...props} />
                )
            }
        },
        // {
        //     name: '加速(<32周)',
        //     0: '≥2次40分钟内',
        //     1: '<2次40~80分钟',
        //     2: '<2次>80分钟',
        //     key: 'ltv',
        // },
        // {
        //     name: '处理',
        //     0: '观察或者进一步评估',
        //     1: '需要进一步评估',
        //     2: '全面评估胎儿状况、及时终止妊娠',
        //     key: 'ltv',
        // },

    ].map(_ => ({ ..._, ...getDeformedOptions(_.timeChecked) })),
    Cstoct: [
        {
            name: '胎心基线',
            0: '110~160bpm',
            1: '<110bpm不伴基线变异缺失、>160bpm',
            2: '<100bpm伴基线变异缺失',
            key: 'bhr',
            R: (props) => {
                return (
                    <Opts m={[
                        [0.0, '110~160bpm'],
                        [1.1, '小于110bpm不伴基线变异缺失'],
                        [1.2, '大于160bpm'],
                        [2.0, '小于100bpm伴基线变异缺失'],

                    ]} {...props} />
                )
            }
        },
        {
            name: '基线变异',
            0: '6~25次/分(中变异)',
            1: '0次/分不伴反复出现的晚期减速、≤5次/分(小变异)、≥26次/分',
            2: '0次/分伴胎心过缓反复出现的变异减速或晚期减速',
            key: 'ltv',
            R: (props) => {
                return (
                    <Opts m={[
                        [0.0, '6~25次/分(中变异)'],
                        [1.1, '0次/分不伴反复出现的晚期减速'],
                        [1.2, '≤5次/分(小变异)'],
                        [1.3, '≥26次/分'],
                        [2.1, '0次/分伴胎心过缓反复出现的变异减速'],
                        [2.2, '晚期减速'],
                    ]} {...props} />
                )
            }
        },
        {
            name: '加速',
            0: '有',
            1: '刺激胎儿后仍缺失',
            2: '无',
            key: 'acc',
            R: (props) => {
                return (
                    <Opts m={[
                        [0, '有'],
                        [1, '刺激胎儿后仍缺失'],
                        [2, '无'],

                    ]} {...props} />
                )
            }
        },
        {
            name: '早期减速',
            0: '有',
            1: '',
            2: '',
            key: 'ed',
            R: (props) => {
                return (
                    <Opts m={[
                        [0.0, '有'],
                        [0.0, '无'],
                    ]} {...props} />
                )
            }
        },
        {
            name: '变异减速',
            0: '无',
            1: '反复出现伴小变异或中变异、延迟减速(>2分但<10分)、非特异性的变异减速',
            2: '反复出现伴基线变异缺失',
            key: 'vd',
            R: (props) => {
                return (
                    <Opts m={[
                        [0.0, '无'],
                        [1.1, '反复出现伴小变异或中变异'],
                        [1.2, '延迟减速(大于2分但小于10分)'],
                        [1.3, '非特异性的变异减速'],
                        [2.0, '反复出现伴基线变异缺失'],
                    ]} {...props} />
                )
            }
        },
        {
            name: '晚期减速',
            0: '无',
            1: '反复出现伴中变异',
            2: '反复出现伴基线变异缺失',
            key: 'ld',
            R: (props) => {
                return (
                    <Opts m={[
                        [0, '无'],
                        [1, '反复出现伴中变异'],
                        [2, '反复出现伴基线变异缺失'],

                    ]} {...props} />
                )
            }
        },
        {
            name: '正弦曲线',
            0: '无',
            1: '',
            2: '有',
            key: 'sinusoid',
            R: (props) => {
                return (
                    <Opts m={[
                        [0, '无'],
                        [2, '有'],

                    ]} {...props} />
                )
            }
        },
        // {
        //     name: '评估结果',
        //     0: '正常(I级)',
        //     1: '可疑(II级)',
        //     2: '异常(III级)',
        //     key: 'dec',
        // },

    ].map(_ => ({ ..._, ...getDeformedOptions() })),
}
tableData.Sogc.deformed = true
tableData.Cstoct.deformed = true
// delete tableData.Sogc
// delete tableData.Cst
// delete tableData.Cstoct
export { tableData }