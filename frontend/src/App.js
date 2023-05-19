import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Main from './page/dashboard/index'
import DiscoveryPage from '../../frontend/src/page/discovery-page/Main'
import Profile from './page/social-media/profile/Profile'
import Register from '../../frontend/src/page/register/Register'
import Login from '../../frontend/src/page/login/Login'
import Chart from './page/charts/index'
import Header from './component/header/Header'
import Footer from './component/footer/Footer'
import OpenPage from './page/open-page/OpenPage'
import BinanceModal from './component/binanceModal/BinanceModal'
import SocialMedia from './page/social-media/index'
import InvestBotPage from './page/invest-bot/index'
import AnalysisPage from './page/analysis/index'
import HistoryPage from './page/history/index'
import {useEffect} from "react";

export default function App() {
    const token = localStorage.getItem("tokenKey");
    const userid = localStorage.getItem("currentUserId")

    useEffect(() => {
        console.log("Hello")
            fetch(`http://localhost:8080/binance/getData/${userid}`)
                .then((response) => response.json())
                .then((res) => {
                    localStorage.setItem("apiKey", res.apiKey);
                    localStorage.setItem("secrutyKey", res.secrutyKey);
                    console.log("binnanceGelen", res)
                })
                .catch((error) => console.error("Error: " ,error))
    },[])


    return (
        <>
            <Router>
                <Header/>
                <BinanceModal/>
                <Routes>
                    <Route path="/" element={<OpenPage/>}/>
                    {localStorage.getItem("currentUserName") != null ?  <Route path="/chart" element={<Chart/>}/> : <Route path="/login" element={<Login/>}/> }
                    {localStorage.getItem("currentUserName") != null ? <Route path="/dashboard" element={<Main/>}/> : <Route path="/login" element={<Login/>}/> }
                    {localStorage.getItem("currentUserName") != null ? <Route path="/history" element={<HistoryPage/>}/> : <Route path="/login" element={<Login/>}/>}
                    {localStorage.getItem("currentUserName") != null ? <Route path="/analysis" element={<AnalysisPage/>}/> : <Route path="/login" element={<Login/>}/>}
                    {localStorage.getItem("currentUserName") != null ? <Route path="/bot" element={<InvestBotPage/>}/> : <Route path="/login" element={<Login/>}/>}
                    {localStorage.getItem("currentUserName") != null ? <Route path="/discovery" element={<DiscoveryPage/>}/> : <Route path="/login" element={<Login/>}/>}
                    {localStorage.getItem("currentUserName") != null ? <Route path="/profile/:userId" element={<Profile/>}/> : <Route path="/login" element={<Login/>}/>}
                    {localStorage.getItem("currentUserName") != null ? <Route path="/social-media" element={<SocialMedia/>}/> : <Route path="/login" element={<Login/>}/>}
                    {localStorage.getItem("currentUserName") === null ? <Route path="/register" element={<Register/>}/> : <Route path="/dashboard" element={<Login/>}/>}
                    {localStorage.getItem("currentUserName") === null ? <Route path="/login" element={<Login/>}/> : <Route path="/dashboard" element={<Login/>}/>}
                </Routes>
            </Router>
            {/*<Footer/>*/}
        </>
    );
}
