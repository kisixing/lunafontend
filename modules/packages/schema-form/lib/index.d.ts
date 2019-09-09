import { Props } from 'react';
import 'antd/dist/antd.css';
import '@lianmed/schema-form-components';
interface IP extends Props<any> {
    schema: object;
    initialValues?: object;
    [x: string]: any;
}
declare const _SchemaForm: ({ schema, initialValues, ...props }: IP) => JSX.Element;
export declare const componentNameKey = "componentName";
export declare const componentName = 4660;
export default _SchemaForm;
