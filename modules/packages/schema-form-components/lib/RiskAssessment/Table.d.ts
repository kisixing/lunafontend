/// <reference types="react" />
import { IValue } from './context';
interface ITable {
    editable?: boolean;
    value: IValue;
    onChange?: (value: IValue) => void;
}
declare function C(props: ITable): JSX.Element;
export default C;
