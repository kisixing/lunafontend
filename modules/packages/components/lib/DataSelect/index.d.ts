/// <reference types="react" />
import { SelectProps } from 'antd/lib/select';
interface IProps extends SelectProps<any> {
    labelKey?: string;
    valueKey?: string;
    method?: string;
    url: string;
}
declare const _default: (props: IProps) => JSX.Element;
export default _default;
