import React, { useEffect, useRef, useState } from 'react';
import { get } from '@lianmed/request';
import { IBloodListItem } from "@lianmed/lmg/lib/services/types";
import { getOptions1 } from "./options";
import { Table } from 'antd';
import { convertstarttime } from '@lianmed/lmg';
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/line');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/legend');
require('echarts/lib/component/title');
require("echarts/lib/component/dataZoom");

require("echarts/lib/component/dataZoomInside");
export interface IProps {
    docid: string
}

export const MultiParamDisplay = (props: IProps) => {
    const ref1 = useRef()
    const ref2 = useRef()
    const { docid } = props
    // const [hr, setHr] = useState([])
    // const [pulse, setPulse] = useState([])
    // const [temperature, setTemperature] = useState([])
    // const [spoz, setSpoz] = useState([])
    const [pressures, setPressures] = useState<IBloodListItem[]>([])
    useEffect(() => {
        var myChart1 = echarts.init(ref1.current);
        var myChart2 = echarts.init(ref2.current);
        get(`/ctg-exams-mother-data/${'1801_1_200524200942' && docid}`).then(r => {
            let { normals, pressures } = r
            normals = normals || []
            pressures = pressures || []
            setPressures(pressures.map(_ => ({ ..._, time: convertstarttime(_.time) })))

            const _hr = [], _pulse = [], _temperature = [], _spoz = []
            normals.forEach(_ => {
                _hr.push(_.hr)
                _pulse.push(_.pulse)
                _temperature.push(_.temperature)
                _spoz.push(_.spoz || undefined)
            });
            console.log(normals, _pulse);

            // setHr(_hr)
            // setPulse(_pulse)
            // setTemperature(_temperature)
            // setSpoz(_spoz)

            myChart1.setOption(getOptions1(_temperature, _temperature.map((_, i) => `${(i / 60).toFixed(0)}分${i % 60}秒`), '体温趋势图', '体温', '°C', 'blue'));
            myChart2.setOption(getOptions1(_spoz, _spoz.map((_, i) => `${(i / 60).toFixed(0)}分${i % 60}秒`), '血氧趋势图', '血氧', '%', 'red'));

        })
    }, [])
    // const onDownload = () => {

    //     const filePath = `${request.configure.apiPrefix}/ctg-exams-pdfurl/${docid}`
    //     window.open(filePath)
    // }

    // const v = useMemo(() => { return {} }, []);
    return (
        <div style={{ height: '100%', overflowY: 'scroll' }}>
            <div ref={ref1} style={{ width: '100%', height: 300 }}></div>
            <div ref={ref2} style={{ width: '100%', height: 300 }}></div>
            <Table size="small" style={{ margin: '0 10%' }}
                columns={[
                    { dataIndex: 'sbp', title: '收缩压' },
                    { dataIndex: 'dbp', title: '舒张压' },
                    { dataIndex: 'map', title: '平均压' },
                    { dataIndex: 'time', title: '时间' },
                ].map(_ => ({ ..._, align: 'center' }))}
                dataSource={pressures}
                pagination={{ pageSize: 6 }}
            >

            </Table>
        </div>
    );
}

