// 导入 React！
import React from 'react';
import { Editor } from 'slate-react';
export { State } from 'slate';
// 定义我们的应用…
function E(props) {
  const { eState, eOnChange, others } = props;

  // 渲染编辑器。
  return <Editor state={eState} onChange={eOnChange} {...others} />;
}

export default E;
