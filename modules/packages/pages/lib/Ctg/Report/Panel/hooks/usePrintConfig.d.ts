import { RadioChangeEvent } from 'antd/lib/radio';
declare const _default: (value: any, print_interval: number) => {
    editable: boolean;
    selectAll: () => void;
    startingTime: number;
    endingTime: number;
    locking: boolean;
    customizable: boolean;
    total: number;
    remoteSetStartingTime: (v: number) => void;
    remoteSetEndingTime: (v: number) => void;
    toggleLocking: () => void;
    toggleCustomiz: () => void;
    backward: () => void;
    forward: () => void;
    outputType: string;
    setOutputType: (e: RadioChangeEvent) => void;
};
export default _default;
