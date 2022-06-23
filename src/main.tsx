import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './css/index.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import JoinGame from "./pages/JoinGame/JoinGame";
import Play from "./pages/Play/Play";
import NewGame from "./pages/NewGame/NewGame";
import {store} from "./redux/store";
import {Provider} from 'react-redux';

// @ts-ignore
ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                {/*<Route path="/" element={<App/>}/>*/}
                {/*<Route path="/newgame" element={<NewGame/>}/>*/}
                {/*<Route path="/join" element={<JoinGame/>}/>*/}
                <Route path="/" element={<Play/>}/>
            </Routes>
        </BrowserRouter>
    </Provider>)
