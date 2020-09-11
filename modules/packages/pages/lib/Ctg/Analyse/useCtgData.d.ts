/// <reference types="react" />
export declare const useCtgData: (docid: string, single?: boolean) => {
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
        selectBarHidden?: boolean;
    };
    loading: boolean;
    setFhr: (index: 0 | 2 | 1 | 3, from?: {
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
        selectBarHidden?: boolean;
    }) => void;
    fetal: 2 | 1 | 3;
    setFetal: import("react").Dispatch<import("react").SetStateAction<2 | 1 | 3>>;
    fetchData: () => Promise<void>;
};
export default useCtgData;
