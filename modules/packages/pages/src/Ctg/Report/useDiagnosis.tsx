
import { useState, useEffect } from 'react';
// import { Editor } from "@lianmed/components";

// const { createEditorState, toggleSelectionColor } = Editor
const getText = (...args) => {
    const g = n => args[n] ? `【${args[n]}】` : '【 】';
    return `观察${g(0)}分钟，胎心基线${g(1)}bpm，胎动${g(2)}次，胎动时胎心${g(3)}bpm, 持续时间${g(4)}s，胎心振幅范围${g(5)}bpm${g(6)}NST${g(7)}反应。`
}
// const raw = JSON.stringify({ blocks: [{ key: "fjqe2", text, type: "unstyled", depth: 0, inlineStyleRanges: [{ offset: 2, length: 1, "style": "COLOR - 07A9FE" }, { "offset": 12, "length": 1, "style": "COLOR - 07A9FE" }, { "offset": 3, "length": 10, "style": "BGCOLOR - 07A9FE" }, { "offset": 3, "length": 9, "style": "COLOR - FFFFFF" }, { "offset": 69, "length": 9, "style": "ITALIC" }], "entityRanges": [], "data": {} }], "entityMap": {} })

export default (...args) => {
    const [diagnosis, setDiagnosis] = useState('')

    useEffect(() => {
        setDiagnosis(getText(args))
    },[args[0]])

    const fn = () => {
        // setDiagnosis(toggleSelectionColor(diagnosis, '#005cc5'))
    }
    useEffect(() => {
        console.log(diagnosis)
    }, [diagnosis])
    return {
        diagnosis, setDiagnosis, fn
    }
}