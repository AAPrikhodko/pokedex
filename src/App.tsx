import React from 'react';
import {Route, Routes, BrowserRouter, Navigate} from "react-router-dom";
import './App.scss';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import SearchManager from "./pages/SearchManager/SearchManager";
import Favourites from "./pages/Favourites/Favourites";

function App() {
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <div className="header"><Header/></div>
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Navigate to="/search" replace/>}/>
                        <Route path="/search" element={<SearchManager/>}/>
                        <Route path="/favourites" element={<Favourites/>}/>
                        <Route path="/404" element={<NotFoundPage/>}/>
                        <Route path="*" element={<Navigate to="/404" replace/>}/>
                    </Routes>
                </div>
                <div className="footer"><Footer/></div>
            </div>
        </BrowserRouter>
    );
}

export default App;
