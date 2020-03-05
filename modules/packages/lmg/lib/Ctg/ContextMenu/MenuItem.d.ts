import { ComponentProps, FunctionComponent } from 'react';
interface IProps extends ComponentProps<any> {
    onClick?: any;
    [x: string]: any;
}
declare const M: FunctionComponent<IProps>;
export default M;
