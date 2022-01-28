import React from 'react';
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import './index.scss'
import {BrowserRouter, HashRouter, Navigate, Route, Routes} from "react-router-dom";

function App() {
    const authenticatedUser = localStorage.getItem("authenticatedUser")
    console.log(authenticatedUser)
    return (
        <HashRouter>
            <Routes>
                {/*{authenticatedUser ? <Home/> : <Auth/>}*/}
                {!authenticatedUser
                    ? <>
                        <Route path={'/auth'} element={<Auth/>}/>
                        <Route path={'*'} element={<Navigate to={'/auth'}/>}/>
                    </>
                    : <>
                        <Route path={'*'} element={<Home/>}/>
                    </>
                }
            </Routes>
        </HashRouter>
    );
}

export default App;
