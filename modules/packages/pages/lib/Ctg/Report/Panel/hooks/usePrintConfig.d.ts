declare const _default: (value: any, print_interval: number, fetal: number) => {
    editable: boolean;
    selectAll: () => void;
    startingTime: number;
    endingTime: number;
    locking: boolean;
    customizable: boolean;
    remoteSetStartingTime: (v: number) => void;
    remoteSetEndingTime: (v: number) => void;
    toggleLocking: () => void;
    toggleCustomiz: () => void;
    backward: () => void;
    forward: () => void;
    outputType: string;
    setOutputType: (value: any) => void;
};
export default _default;
