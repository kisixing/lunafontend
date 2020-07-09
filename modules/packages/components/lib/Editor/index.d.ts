import React from 'react';
import { BraftEditorProps, EditorState } from 'braft-editor';
export { ContentUtils } from 'braft-utils';
import 'braft-editor/dist/index.css';
interface IProps extends BraftEditorProps {
    bordered?: boolean;
    onUpload: any;
}
interface IState {
    value: EditorState;
}
declare class C extends React.Component<IProps, IState> {
    state: {
        value: EditorState;
    };
    static getDerivedStateFromProps(p: IProps, s: IState): {
        value?: undefined;
    } | {
        value: any;
    };
    render(): JSX.Element;
}
export default C;
