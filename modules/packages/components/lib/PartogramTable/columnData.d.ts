declare const _default: ({
    title: string;
    key: string;
    type: string;
    width: string;
    dataset?: undefined;
    disabled?: undefined;
} | {
    title: string;
    key: string;
    type: string;
    width?: undefined;
    dataset?: undefined;
    disabled?: undefined;
} | {
    title: string;
    key: string;
    type: string;
    dataset: {
        value: string;
        label: string;
    }[];
    width?: undefined;
    disabled?: undefined;
} | {
    title: string;
    key: string;
    type: string;
    width: number;
    dataset: {
        value: string;
        label: string;
    }[];
    disabled?: undefined;
} | {
    title: string;
    key: string;
    type: string;
    disabled: boolean;
    width?: undefined;
    dataset?: undefined;
})[];
export default _default;
