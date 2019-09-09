import { IFormActions } from '@uform/types';
export interface IConfig {
    interrupted?: boolean;
    cache?: boolean;
    getStorageName?: () => string;
    handleErr?: (arr: Array<IFormActions>) => any;
    name?: string | symbol;
    getDisplayName?: (name: string) => string;
    onSubmit?: (formData: Array<any>, status: boolean) => Promise<any>;
    mergeFormValues?: (arr: Array<IFormActions>) => Array<any>;
    forwardRef?: boolean;
}
