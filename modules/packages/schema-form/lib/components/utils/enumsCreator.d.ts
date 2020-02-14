import React from 'react';
interface datasetMap {
    value: string;
    label: string;
}
export declare const buttonGroupCreator: (dataset: datasetMap[], size?: string) => React.ComponentType<any>;
export declare const selectCreator: (dataset: datasetMap[], size?: string) => React.ComponentType<any>;
export {};
