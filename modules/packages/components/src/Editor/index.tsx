import React from 'react';
import BraftEditor, { BraftEditorProps, EditorState } from 'braft-editor';
export { ContentUtils } from 'braft-utils';
import 'braft-editor/dist/index.css';
interface IProps extends BraftEditorProps {
  bordered?: boolean
}
// function C(props: IProps) {
//   const { bordered, style = {} } = props
//   return <BraftEditor {...props} style={{ ...style, border: bordered ? '1px solid #d9d9d9' : '' }} />;
// }
interface IState { value: EditorState }
class C extends React.Component<IProps, IState> {
  state: { value: EditorState } = { value: null }
  static getDerivedStateFromProps(p: IProps, s: IState) {
    if (s.value || !p.value) return {}

    const value = BraftEditor.createEditorState(p.value)
    return {
      value
    }
  }
  render() {
    const { bordered, style = {}, onChange } = this.props
    return <BraftEditor {...this.props} style={{ ...style, border: bordered ? '1px solid #d9d9d9' : '' }}
      onChange={e => {
        this.setState({ value: e })
        onChange(e.toHTML())
      }}
      value={this.state.value}
    />;
  }
}

export default C;
