export interface IState {
    leftLoader: boolean;
    rightLoader: boolean;
    chartLoader: boolean;
    districts: string[];
    currentDistrict : string;
    basemap: string;
    leftYear: string;
    rightYear: string;
    chartYears: string[];
    chartRainfalls: number[];
    leftMinMax: {r: number, n: string}[];
    rightMinMax: {r: number, n: string}[];
    mapKey: string;
    showBorders: boolean;
    isDrawerOpen: boolean;
}




