export declare const getOptions1: (data: any[], date: any[], title: string, name: string, unit: string, color: string) => {
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
    }[];
    dataZoom: ({
        type: string;
        startValue: number;
        endValue: number;
        start?: undefined;
        end?: undefined;
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
        startValue?: undefined;
        endValue?: undefined;
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
