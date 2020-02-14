import { Props } from 'react';
import '../components';
interface IP extends Props<any> {
    schema?: object;
    initialValues?: object;
    formIndex?: number;
    [x: string]: any;
}
declare const _SchemaForm: ({ schema, initialValues, formIndex, ...props }: IP) => JSX.Element;
export declare const componentNameKey = "componentName";
export declare const componentName = 4660;
export default _SchemaForm;
