import React from 'react';
import BraftEditor, { BraftEditorProps } from 'braft-editor';
import { ContentUtils } from 'braft-utils';
import 'braft-editor/dist/index.css';

const { toggleSelectionBackgroundColor } = ContentUtils
function C(props: BraftEditorProps) {
  return <BraftEditor {...props} style={{ background: '#fff' }} />;
}

const Editor = Object.assign(C, BraftEditor, { toggleSelectionBackgroundColor });

export default Editor;
