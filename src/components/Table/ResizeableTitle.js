/**
 *  react-resizable 来实现可伸缩列
 */
import { Resizable } from 'react-resizable';
import styles from './ResizeableTitle.less';

const ResizeableTitle = props => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable width={width} height={0} onResize={onResize}  className={styles['components-table-resizable-column']} >
      <th {...restProps}/>
    </Resizable>
  );
};

export default ResizeableTitle;
