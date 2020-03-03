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
    const columns: any = [
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

    ].map(_ => ({ ..._, align: 'center' }))

    const [form] = Form.useForm()
    return (
        <Form ref={ref} form={form} size="small" style={{ display: hidden ? 'none' : 'block', position: 'relative' }} onValuesChange={(a, b) => {
            const k = Object.keys(a)[0]
            if (/score$/.test(k)) {
                const total = Object.entries(b)
                    .filter(([k, v]) => /score$/.test(k))
                    .map(_ => _[1])
                    .reduce((a, b) => a + b, 0)
                form.setFieldsValue({ total })
            }

        }}>
            <Form.Item name="total" label="总分" style={{ position: 'absolute', top: -28, right: 16 }}>
                <InputNumber disabled />
            </Form.Item>
            <Table bordered size="small" pagination={false} columns={columns} dataSource={dataSource} />
        </Form>
    );
})