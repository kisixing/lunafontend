export declare function getThemeColor(color: any): {
    primaryColor: any;
    hoverColor: any;
    activeColor: any;
    shadowColor: any;
    lightColor: string;
    darkColor: string;
    isDark: boolean;
    isFucked: boolean;
};
export declare function applyAntdTheme(colorObj: any): void;
export declare function placementSketchPicker(placement: any): {
    marginLeft: string;
    marginTop?: undefined;
} | {
    marginLeft: string;
    marginTop: string;
} | {
    marginTop: string;
    marginLeft?: undefined;
};
