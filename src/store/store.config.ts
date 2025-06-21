import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './store.reducer';
import {IState} from './store';
import {useSelector} from 'react-redux';

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const useStore = (key: keyof IState) => {
    return useSelector((state: IState) => state[key]);
};
