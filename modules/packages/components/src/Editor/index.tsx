import React from 'react';
import BraftEditor, { BraftEditorProps } from 'braft-editor';
import 'braft-editor/dist/index.css';

function C(props: BraftEditorProps) {
  return <BraftEditor {...props} style={{ background: '#fff' }} />;
}

const Editor = Object.assign(C, BraftEditor);

export default Editor;
