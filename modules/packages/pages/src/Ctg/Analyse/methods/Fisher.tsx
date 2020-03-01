import React, { forwardRef } from 'react';
import { Table, Form, InputNumber } from 'antd';
import { FormInstance } from 'antd/lib/form';


// 'fhrbaseline_score',
// 'zhenfu_lv_score',
// 'zhouqi_lv_score',
// 'acc_score',
// 'dec_score',

const dataSource = [
    {
        name: '心率基线',
        0: '',
        1: '',
        2: '',
        key: 'bhr',
    },
    {
        name: '振幅变异',
        0: '',
        1: '',
        2: '',
        key: 'ltv',

    },
    {
        name: '周期变异',
        0: '',
        1: '',
        2: '',
        key: 'stv',

    },
    {
        name: '加速',
        0: '',
        1: '',
        2: '',
        key: 'acc',
    },
    {
        name: '减速',
        0: '',
        1: '',
        2: '',
        key: 'dec',
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
        <Form ref={ref} form={form} size="small" style={{ display: props.name !== 'Fischer' ? 'none' : 'block' }}>
            <Table size="small" pagination={false} columns={columns} dataSource={dataSource} />
        </Form>
    );
})