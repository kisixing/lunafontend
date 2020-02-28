
import { useEffect, useState, useCallback } from 'react';
import request from "@lianmed/request";
// import { Editor } from "@lianmed/components";

// const { createEditorState, toggleSelectionColor } = Editor
// const getText = () => {
//     const g = (n?: any) => '【 】';
//     return `观察${g(0)}分钟，胎心基线${g(1)}bpm，胎动${g(2)}次，
// 胎动时胎心${g(3)}bpm, 持续时间${g(4)}s，胎心振幅范围${g(5)}bpm，NST${g(7)}反应。`
// }
// const raw = JSON.stringify({ blocks: [{ key: "fjqe2", text, type: "unstyled", depth: 0, inlineStyleRanges: [{ offset: 2, length: 1, "style": "COLOR - 07A9FE" }, { "offset": 12, "length": 1, "style": "COLOR - 07A9FE" }, { "offset": 3, "length": 10, "style": "BGCOLOR - 07A9FE" }, { "offset": 3, "length": 9, "style": "COLOR - FFFFFF" }, { "offset": 69, "length": 9, "style": "ITALIC" }], "entityRanges": [], "data": {} }], "entityMap": {} })

export default (docid: string) => {
    const [caEnable, setCaEnable] = useState(false)
    const [saveLoading, setSaveLoading] = useState(false)
    const [bizSn, setBizSn] = useState(docid)
    const save = useCallback(
        () => {
            setSaveLoading(true)
            request.post('/rep/save', { data: { bizSn } }).then(r => {
                r.sn && setBizSn(r.sn)
            }).finally(() => setSaveLoading(false))
        },
        [bizSn],
    )


    useEffect(() => {
        request.get('/ca/isEnable').then(r => {
            console.log('ca enable', r)
            setCaEnable(r)
        })
    }, [])
    return {
        caEnable,
        save,
        saveLoading
    }
}