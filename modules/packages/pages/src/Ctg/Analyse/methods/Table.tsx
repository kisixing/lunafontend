import React, { forwardRef, memo } from 'react';
import { Table, Form, InputNumber, Input } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { AnalyseType } from '@lianmed/lmg/lib/interface';

import strategies from "./strategies";
import { obvue } from "@lianmed/f_types";



interface IProps {
    name: string
    dataSource: any[] & { deformed: boolean }
    hidden: boolean
    disabled: boolean
    mark: AnalyseType
    initData: obvue.ctg_exams_analyse

    [x: string]: any
}
// function RenderResult({ k, m, disabled }: { k: string, m: AnalyseType, disabled: boolean }) {
//     console.log('zz', k, m, disabled)
//     if (m === 'Cst') {
//         if (k === 'acc') {
//             return (
//                 <Select style={{ width: 100 }}>
//                     <Select.Option value="0">无</Select.Option>
//                     <Select.Option value="1">周期性</Select.Option>
//                     <Select.Option value="2">散在性</Select.Option>
//                 </Select>
//             )
//         }
//     }
//     return <Input disabled={disabled} style={{ width: 44 }} />
// }

const T = forwardRef<FormInstance, IProps>((props, ref) => {
    const { hidden, dataSource, disabled, mark, initData } = props
    const deformed = dataSource.deformed

    const columns: any = [
        {
            title: '项目',
            dataIndex: 'name',
            render(a: any) {
                return (
                    <span style={{ whiteSpace: 'nowrap', }}>{a}</span>
                )
            }
        },
        {
            title: deformed ? '正常' : '0分',
            dataIndex: '0'
        },
        {
            title: deformed ? '可疑' : '1分',
            dataIndex: '1'
        },
        {
            title: deformed ? '异常' : '2分',
            dataIndex: '2'
        },
        false ? null : {
            width: deformed ? 300 : undefined,
            title: '结果',
            dataIndex: 'result',
            render(a, { key, R }) {
                return (
                    <Form.Item name={`${key}value`} style={{ margin: -8 }}>
                        {
                            R ? <R disabled={disabled} /> : <Input disabled={disabled} style={{ width: 44 }} />

                        }
                    </Form.Item>
                )
            }
        },
        false ? null : {
            title: deformed ? '类型' : '得分',
            dataIndex: 'score',
            render(a, { key, S }) {
                return (

                    <Form.Item name={`${key}score`} style={{ margin: -8 }}>
                        {
                            S ? <S disabled={true} /> : <InputNumber disabled={true} style={{ width: 44 }} />

                        }
                    </Form.Item>
                )

            }
        },

    ]
        .filter(_ => !!_)
        .map(_ => ({ ..._, align: 'center' }))

    const [form] = Form.useForm()
    return (
        <Form ref={ref} form={form} size="small" style={{ display: hidden ? 'none' : 'block', position: 'relative' }} onValuesChange={(a, b) => {
            // const vk = Object.entries(b)
            // const k = Object.keys(a)[0]
            // if (/score$/.test(k)) {
            //     const total = vk
            //         .filter(([k, v]) => /score$/.test(k))
            //         .map(_ => _[1])
            //         .reduce((a, b) => a + b, 0)
            //     form.setFieldsValue({ total })
            // }
            const newData = strategies(mark, form.getFieldsValue(), initData)
            newData && form.setFieldsValue(newData)

        }}>
            <Form.Item name={deformed ? 'result' : 'total'} label={deformed ? '结果' : '总分'} style={{ position: 'absolute', top: -48, right: 200 }}>
                <InputNumber disabled style={{ width: 50 }} />
            </Form.Item>
            <Table bordered size="small" pagination={false} columns={columns} dataSource={dataSource} />
        </Form>
    );
})

export default memo(T)