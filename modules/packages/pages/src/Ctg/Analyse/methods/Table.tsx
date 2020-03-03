import React, { forwardRef } from 'react';
import { Table, Form, InputNumber } from 'antd';
import { FormInstance } from 'antd/lib/form';





interface IProps {
    name: string
    dataSource: any
    hidden: boolean
    disabled: boolean
    [x: string]: any
}
export default forwardRef<FormInstance, IProps>((props, ref) => {
    const { hidden, dataSource, disabled } = props
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
                        <InputNumber disabled={disabled} />
                    </Form.Item>
                )
            }
        },
        {
            title: '得分',
            dataIndex: 'score',
            render(a, { key }) {
                return (
                    <Form.Item name={`${key}score`} style={{ margin: -8 }} >
                        <InputNumber disabled={disabled} />
                    </Form.Item>
                )
            }
        },

    ]

    const [form] = Form.useForm()
    return (
        <Form ref={ref} form={form} size="small" style={{ display: hidden ? 'none' : 'block' }}>
            <Table bordered size="small" pagination={false} columns={columns} dataSource={dataSource} />
        </Form>
    );
})