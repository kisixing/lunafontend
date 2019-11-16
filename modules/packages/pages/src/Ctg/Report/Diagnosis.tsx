import React from 'react';
import { Input } from 'antd';
// import { Editor } from "@lianmed/components";


interface IProps {
    value: any
    onChange: (e: any) => void
}
const Preview = (props: IProps) => {
    const { value, onChange } = props
    return (
        <div style={{ background: '#fff', width: 400, marginRight: 10, display: 'flex', flexDirection: 'column' }}>
            {/* <label>NST报告结果</label> */}
            {/* <Editor extendControls={[
                'separator',
                {
                    key: 'my-button', // 控件唯一标识，必传
                    type: 'button',
                    title: '这是一个自定义的按钮', // 指定鼠标悬停提示文案
                    className: 'my-button', // 指定按钮的样式名
                    html: null, // 指定在按钮中渲染的html字符串
                    text: 'Hello', // 指定按钮文字，此处可传入jsx，若已指定html，则text不会显示
                    onClick: fn,
                }
            ]} colors={['#07A9FE', '#fff']} value={diagnosis} style={{ height: '100%', border: 0 }} onChange={setDiagnosis} controls={['text-color', 'line-height', 'subscript']}>
            </Editor> */}
            <Input.TextArea value={value} onChange={e => onChange(e.target.value)} style={{ height: '100%', lineHeight: 2 }} />
        </div>
    );
}

export default Preview