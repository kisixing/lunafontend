/// <reference types="react" />
export { sendTxtMessage } from '../utils/msgTool';
export declare function useIm(): {
    contacts: import("..").IContact[];
    currentMessage: import("../types/msg").IMessage[];
    setCurrent: import("react").Dispatch<import("react").SetStateAction<string>>;
    current: string;
};
