import React from 'react';
import { IConfig } from './types';
import Context from './Context';
export { Context };
export default function connectAdvanced({ interrupted, cache, getStorageName, handleErr, name, getDisplayName, onSubmit, mergeFormValues, forwardRef, }: IConfig): (WrappedComponent: any) => React.ComponentType<any>;
