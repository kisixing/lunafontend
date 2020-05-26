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
    const { docid } = props
    // const [hr, setHr] = useState([])
    // const [pulse, setPulse] = useState([])
    // const [temperature, setTemperature] = useState([])
    // const [spoz, setSpoz] = useState([])
    const [pressures, setPressures] = useState<IBloodListItem[]>([])
    useEffect(() => {
        var myChart = echarts.init(ref1.current);
        get(`/ctg-exams-mother-data/${'1801_1_200524200942' && docid}`).then(r => {
            const { normals = [], pressures = [] } = r
            setPressures(pressures.map(_ => ({ ..._, time: convertstarttime(_.time) })))

            const _hr = [], _pulse = [], _temperature = [], _spoz = []
            normals.forEach(_ => {
                _hr.push(_.hr)
                _pulse.push(_.pulse)
                _temperature.push(_.temperature)
                _spoz.push(_.spoz)
            });
            console.log(normals, _pulse);

            // setHr(_hr)
            // setPulse(_pulse)
            // setTemperature(_temperature)
            // setSpoz(_spoz)

            myChart.setOption(getOptions1(_hr, _pulse, _temperature, _spoz, _pulse.map((_, i) => `${(i / 60).toFixed(0)}分${i % 60}秒`)));

        })
    }, [])
    // const onDownload = () => {

    //     const filePath = `${request.configure.apiPrefix}/ctg-exams-pdfurl/${docid}`
    //     window.open(filePath)
    // }

    // const v = useMemo(() => { return {} }, []);
    return (
        <>
            <div ref={ref1} style={{ width: '100%', height: 400 }}></div>
            <Table size="small" style={{ margin: '0 10%' }}
                columns={[
                    { dataIndex: 'sbp', title: '收缩压' },
                    { dataIndex: 'dbp', title: '舒张压' },
                    { dataIndex: 'map', title: '平均压' },
                    { dataIndex: 'time', title: '时间' },
                ].map(_ => ({ ..._, align: 'center' }))}
                dataSource={pressures}
                pagination={{pageSize:6}}
            >

            </Table>
        </>
    );
}

