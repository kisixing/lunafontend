import { AntTreeNodeProps } from 'antd/lib/tree';
export interface IItem extends AntTreeNodeProps {
  title: string;
  key: string;
  pId?: string;
  children?: Array<IItem>;
}
export declare const listData: Array<IItem>;
export declare const treeData: IItem[];
