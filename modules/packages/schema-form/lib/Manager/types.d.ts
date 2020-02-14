import { IFormActions } from '@uform/types';
import { NamedExoticComponent } from 'react';
export interface IConfig {
    schemaUrl?: string;
    url?: string;
    schemaData?: Array<object>;
    interrupted?: boolean;
    cache?: boolean;
    getStorageName?: () => string;
    handleErr?: (arr: Array<IFormActions>) => any;
    name?: string | symbol;
    getDisplayName?: (name: string) => string;
    onSubmit?: (formData: Array<any>, status: boolean) => Promise<any>;
    mergeFormValues?: (arr: Array<IFormActions>) => Array<any>;
    forwardRef?: boolean;
    [x: string]: any;
}
export declare type manager = NamedExoticComponent<IConfig> & {
    Buttons: any;
};
