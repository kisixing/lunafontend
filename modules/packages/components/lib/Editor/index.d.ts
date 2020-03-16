import React from 'react';
import { BraftEditorProps, EditorState } from 'braft-editor';
export { ContentUtils } from 'braft-utils';
import 'braft-editor/dist/index.css';
interface IProps extends BraftEditorProps {
  bordered?: boolean;
}
interface IState {
  value: EditorState;
}
declare class C extends React.Component<IProps, IState> {
  state: {
    value: EditorState;
  };
  static getDerivedStateFromProps(
    p: IProps,
    s: IState
  ):
    | {
        value?: undefined;
      }
    | {
        value: any;
      };
  handleUpload: ({
    file,
    progress,
    libraryId,
    success,
    error,
  }: {
    file: any;
    progress: any;
    libraryId: any;
    success: any;
    error: any;
  }) => void;
  render(): JSX.Element;
}
export default C;
