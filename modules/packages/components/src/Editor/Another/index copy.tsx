// import React, { useRef } from 'react';
// import { Editor } from 'slate-react';
// import { Value } from 'slate';
// import EButton from './EButton';
// import hasMark from './utils/hasMask';

// interface IProps {
//   value: any;
//   onChange: (value: any) => void;
// }

// interface IEditor {
//   (props: IProps): JSX.Element;
//   Value: any;
// }

// function BoldMark(props) {
//   return <strong>{props.children}</strong>;
// }
// const renderMark = (props, editor, next) => {
//   switch (props.mark.type) {
//     case 'bold':
//       return <BoldMark {...props} />;
//     default:
//       return next();
//   }
// };

// function C(props: IProps) {
//   const { value, onChange, ...others } = props;
//   const ref = useRef(null);

//   return (
//     <div style={{ border: '1px solid #eee' }}>
//       <link
//         rel="stylesheet"
//         type="text/css"
//         href="https://fonts.googleapis.com/icon?family=Material+Icons"
//       />
//       <link
//         rel="stylesheet"
//         type="text/css"
//         href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i&subset=latin-ext"
//       />
//       <div style={{ height: '30px', lineHeight: '30px', background: '#eee', padding: '0 4px' }}>
//         <EButton
//           editor={ref.current}
//           isActive={hasMark(value, 'bold')}
//           iconName="format_bold"
//           action="bold"
//         />
//       </div>
//       <div style={{ padding: '10px' }}>
//         <Editor ref={ref} value={value} onChange={onChange} {...others} renderMark={renderMark} />
//       </div>
//     </div>
//   );
// }
// C.Value = Value;

// export default C as IEditor;
