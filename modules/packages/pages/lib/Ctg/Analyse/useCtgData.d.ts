declare const CTGChart: (docid: string) => {
    ctgData: {
        fetalnum: string;
        docid?: string;
        fhr1?: any;
    };
    loading: boolean;
    setCtgData(data: {
        [x: string]: any;
    }): void;
};
export default CTGChart;
