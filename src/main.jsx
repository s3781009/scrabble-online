import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './css/index.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import JoinGame from "./pages/JoinGame";
import Play from "./pages/Play";
import NewGame from "./pages/NewGame";

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App/>}/>
            <Route path="/newgame" element={<NewGame/>}/>
            <Route path="/join" element={<JoinGame/>}/>
            <Route path="/play" element={<Play/>}/>
        </Routes>
    </BrowserRouter>)
