import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../api/CounterSlice';

export const store =  configureStore({
    reducer: {

    }
})
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch