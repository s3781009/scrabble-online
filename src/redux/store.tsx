import {configureStore} from '@reduxjs/toolkit';
import playerReducer from './PlayerSlice';
import reduxWebSocket from '@giantmachines/redux-websocket';

const reduxWebsocketMiddleware = reduxWebSocket();

export const store = configureStore({
    reducer: {
        player: playerReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(reduxWebsocketMiddleware)


})
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
