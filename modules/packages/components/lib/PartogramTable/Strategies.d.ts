/// <reference types="react" />
declare const _default: {
    string: ({ value, onChange, ...others }: {
        [x: string]: any;
        value: any;
        onChange: any;
    }) => JSX.Element;
    select: ({ dataset, ...o }: {
        [x: string]: any;
        dataset: any;
    }) => JSX.Element;
    date: (o: any) => JSX.Element;
    number: (o: any) => JSX.Element;
};
export default _default;
