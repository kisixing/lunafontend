import React from 'react';
import BraftEditor, { BraftEditorProps, EditorState } from 'braft-editor';
export { ContentUtils } from 'braft-utils';
import 'braft-editor/dist/index.css';
interface IProps extends BraftEditorProps {
  bordered?: boolean;
  onUpload: any;
}
// function C(props: IProps) {
//   const { bordered, style = {} } = props
//   return <BraftEditor {...props} style={{ ...style, border: bordered ? '1px solid #d9d9d9' : '' }} />;
// }
interface IState {
  value: EditorState;
}
class C extends React.Component<IProps, IState> {
  state: { value: EditorState } = { value: null };
  static getDerivedStateFromProps(p: IProps, s: IState) {
    if (s.value || !p.value) return {};

    const value = BraftEditor.createEditorState(p.value);
    return {
      value,
    };
  }

  // handleUpload = ({ file, progress, libraryId, success, error }) => {
  // console.log(file, progress, libraryId);
  // success({
  //   url: 'https://i.imgur.com/o4mZDai.jpg',
  // });
  // };

  render() {
    // TODO: 上传图片，由于上传图片至 OSS，需要验证 token，所以不在组件库中执行上传操作。
    const { bordered, style = {}, onChange, onUpload } = this.props;
    return (
      <BraftEditor
        {...this.props}
        style={{ ...style, border: bordered ? '1px solid #d9d9d9' : '' }}
        onChange={e => {
          this.setState({ value: e });
          onChange(e.toHTML());
        }}
        value={this.state.value}
        media={{
          uploadFn: onUpload,
        }}
      />
    );
  }
}

export default C;
