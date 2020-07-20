/// <reference types="react" />
declare const CTGChart: (docid: string, single?: boolean) => {
    ctgData: {
        fhr1?: string;
        fhr2?: string;
        fhr3?: string;
        toco?: string;
        fm?: string;
        docid?: string;
        fetalnum?: string;
        fetalposition?: any;
        _fhr1?: string;
        _fhr2?: string;
        _fhr3?: string;
    };
    loading: boolean;
    setFhr: (index: 2 | 1 | 3) => void;
    fetal: number;
    setFetal: import("react").Dispatch<import("react").SetStateAction<number>>;
    fetchData: () => void;
};
export default CTGChart;
