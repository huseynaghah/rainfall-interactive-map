import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IState} from './store';
import {v4 as uuidv4} from 'uuid';

const initialState: IState = {
    isDrawerOpen: false,
    basemap: 'arcgis/light-gray',
    showBorders: true,
    leftLoader: true,
    rightLoader: true,
    chartLoader: true,
    currentDistrict: 'all',
    leftYear: '2020',
    rightYear: '2024',
    districts: [],
    leftMinMax: [],
    rightMinMax: [],
    mapKey: 'initial-key',
    chartRainfalls: [],
    chartYears: []
};

export const rootSlice = createSlice({
    name: 'root',
    initialState,
    reducers: {
        setLeftLoader: (state: IState, action: PayloadAction<boolean>) => {
            state.leftLoader = action.payload;
        },
        setRightLoader: (state: IState, action: PayloadAction<boolean>) => {
            state.rightLoader = action.payload;
        },
        setChartLoader: (state: IState, action: PayloadAction<boolean>) => {
            state.chartLoader = action.payload;
        },
        setCurrentDistrict: (state: IState, action: PayloadAction<string>) => {
            state.currentDistrict = action.payload;
        },
        setLeftYear: (state: IState, action: PayloadAction<string>) => {
            state.leftYear = action.payload;
        },
        setRightYear: (state: IState, action: PayloadAction<string>) => {
            state.rightYear = action.payload;
        },
        setDistricts: (state: IState, action: PayloadAction<string[]>) => {
            state.districts = action.payload;
        },
        renderMap: (state: IState) => {
            state.mapKey = uuidv4();
        },
        setLeftMinMax(state: IState, action: PayloadAction<number[]>) {
            state.leftMinMax = action.payload;
        },
        setRightMinMax(state: IState, action: PayloadAction<number[]>) {
            state.rightMinMax = action.payload;
        },
        setChartRainfalls(state: IState, action: PayloadAction<number[]>) {
            state.chartRainfalls = action.payload;
        },
        setChartYears(state: IState, action: PayloadAction<string[]>) {
            state.chartYears = action.payload;
        },
        setBasemap(state: IState, action: PayloadAction<string>) {
            state.basemap = action.payload;
        },
        setShowBorders(state: IState, action: PayloadAction<boolean>) {
            state.showBorders = action.payload;
        },
        setIsDrawerOpen(state: IState, action: PayloadAction<boolean>) {
            state.isDrawerOpen = action.payload;
        }
    },
});

export const {
    setLeftLoader,
    setRightLoader,
    setChartLoader,
    setRightMinMax,
    setLeftMinMax,
    setCurrentDistrict,
    setLeftYear,
    setRightYear,
    setDistricts,
    renderMap,
    setChartYears,
    setChartRainfalls,
    setBasemap,
    setShowBorders,
    setIsDrawerOpen,
} = rootSlice.actions;

export default rootSlice.reducer;
