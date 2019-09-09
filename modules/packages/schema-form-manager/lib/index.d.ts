import React from 'react';
import { IConfig } from './types';
export default function connectAdvanced({ interrupted, cache, getStorageName, handleErr, name, getDisplayName, onSubmit, mergeFormValues, forwardRef, }: IConfig): (WrappedComponent: any) => React.ComponentType<any>;
