export declare const getOptions1: (data: any[], date: any[], title: string, name: string, unit: string, color: string, min: number, max: number) => {
    tooltip: {
        trigger: string;
        position: (pt: any) => any[];
    };
    title: {
        left: string;
        text: string;
    };
    toolbox: {
        feature: {
            dataZoom: {
                yAxisIndex: string;
            };
            restore: {};
            saveAsImage: {};
        };
    };
    xAxis: {
        type: string;
        boundaryGap: boolean;
        data: any[];
    };
    yAxis: {
        type: string;
        boundaryGap: (string | number)[];
        name: string;
        min: number;
        max: number;
    }[];
    dataZoom: ({
        type: string;
        start: number;
        end: number;
        handleIcon?: undefined;
        handleSize?: undefined;
        zoomLock?: undefined;
        handleStyle?: undefined;
    } | {
        start: number;
        end: number;
        handleIcon: string;
        handleSize: string;
        zoomLock: boolean;
        handleStyle: {
            color: string;
            shadowBlur: number;
            shadowColor: string;
            shadowOffsetX: number;
            shadowOffsetY: number;
        };
        type?: undefined;
    })[];
    series: {
        name: string;
        type: string;
        smooth: boolean;
        symbol: string;
        sampling: string;
        itemStyle: {
            color: string;
        };
        data: any[];
    }[];
};
