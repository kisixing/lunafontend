/// <reference types="react" />
import BraftEditor, { BraftEditorProps } from 'braft-editor';
import 'braft-editor/dist/index.css';
declare function C(props: BraftEditorProps): JSX.Element;
declare const Editor: typeof C & typeof BraftEditor & {
    toggleSelectionBackgroundColor: any;
};
export default Editor;
