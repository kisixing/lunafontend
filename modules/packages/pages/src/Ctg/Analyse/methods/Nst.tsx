import React, {  forwardRef } from 'react';
import { Table, Form,  InputNumber } from 'antd';
import { FormInstance } from 'antd/lib/form';





const dataSource = [
    {
        name: '心率基线',
        0: '<100',
        1: '100~109,>160',
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
        name: '胎动FHR上升时间',
        0: '<10s',
        1: '10~14s',
        2: '>15s',
        key: 'accduration',

    },
    {
        name: '胎动FHR变化',
        0: '<10',
        1: '10~14',
        2: '>15',
        key: 'accampl',
    },
    {
        name: '胎动次数',
        0: '无',
        1: '1~2',
        2: '>3',
        key: 'fm',
    },
]


interface IProps {
    name: string
    [x: string]: any
}
export default forwardRef<FormInstance, IProps>((props, ref) => {

    const columns = [
        {
            title: '项目',
            dataIndex: 'name'
        },
        {
            title: '0分',
            dataIndex: '0'
        },
        {
            title: '1分',
            dataIndex: '1'
        },
        {
            title: '2分',
            dataIndex: '2'
        },
        {
            title: '结果',
            dataIndex: 'result',
            render(a, { key }) {
                return (
                    <Form.Item name={`${key}value`} style={{ margin: -8 }}>
                        <InputNumber />
                    </Form.Item>
                )
            }
        },
        {
            title: '得分',
            dataIndex: 'score',
            render(a, { key }) {
                return (
                    <Form.Item name={`${key}score`} style={{ margin: -8 }}>
                        <InputNumber />
                    </Form.Item>
                )
            }
        },

    ]

    const [form] = Form.useForm()
    return (
        <Form ref={ref} form={form} size="small" style={{ display: props.name !== 'Nst' ? 'none' : 'block' }}>
            <Table size="small" pagination={false} columns={columns} dataSource={dataSource} />
        </Form>
    );
})