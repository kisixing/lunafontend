import React from 'react';
import { IFormActions } from '@uform/types';
interface actionItem extends IFormActions {
    name: string | symbol;
}
export default function connectAdvanced({ cache, getStorageName, handleErr, name, getDisplayName, onSubmit, mergeFormValues, forwardRef, }?: {
    cache?: boolean;
    getStorageName?: () => string;
    handleErr?: (arr: actionItem[]) => actionItem[];
    name?: string | symbol;
    getDisplayName?: (name: any) => string;
    onSubmit?: (formData: any[], status: boolean) => Promise<unknown>;
    mergeFormValues?: (arr: actionItem[]) => any[];
    forwardRef?: boolean;
}): (WrappedComponent: any) => React.ComponentType<any>;
export {};
