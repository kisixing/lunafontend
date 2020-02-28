import React, { useState, useEffect, forwardRef } from 'react';
import { Table, Form, Button, InputNumber, Select } from 'antd';
import { Suit } from '@lianmed/lmg/lib/Ctg/Suit';
import { FormInstance } from 'antd/lib/form';




const dataSource = [
    {
        name: '心率基线',
        0: '',
        1: '',
        2: '',
        key: 'fhrbaseline',
    },
    {
        name: '振幅变异',
        0: '',
        1: '',
        2: '',
        key: 'zhenfu_lv',

    },
    {
        name: '周期变异',
        0: '',
        1: '',
        2: '',
        key: 'zhouqi_lv',

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
    {
        name: '胎动',
        0: '',
        1: '',
        2: '',
        key: 'movement',
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
                    <Form.Item name={`${key}_result`} style={{ margin: -8 }}>
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
                    <Form.Item name={`${key}_score`} style={{ margin: -8 }}>
                        <InputNumber />
                    </Form.Item>
                )
            }
        },

    ]

    const [form] = Form.useForm()
    return (
        <Form ref={ref} form={form} size="small" style={{ display: props.name !== 'Kerbs' ? 'none' : 'block' }}>
            <Table size="small" pagination={false} columns={columns} dataSource={dataSource} />
        </Form>
    );
})