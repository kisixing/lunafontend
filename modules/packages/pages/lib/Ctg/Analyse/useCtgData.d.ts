declare const CTGChart: (docid: string) => {
    ctgData: {
        fetalnum: string;
        docid?: string;
        fhr1?: any;
    };
    loading: boolean;
};
export default CTGChart;
