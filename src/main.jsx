import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './css/index.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import JoinGame from "./JoinGame";
import Play from "./Play";
import NewGame from "./NewGame";

ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App/>}/>
            <Route path="/newgame" element={<NewGame/>}/>
            <Route path="/join" element={<JoinGame/>}/>
            <Route path="/play" element={<Play/>}/>
        </Routes>
    </BrowserRouter>
</React.StrictMode>)
