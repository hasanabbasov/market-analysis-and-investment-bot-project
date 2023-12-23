import React, {useState} from 'react';
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
import Output from '../../frontend/src/component/logout/logout'
import {useEffect} from "react";
import OtherUserProfile from "./page/social-media/profile/other-user-profile/OtherUserProfile";

export default function App() {
    const token = localStorage.getItem("tokenKey");
    const userId = localStorage.getItem("currentUserId")
    const userNick = localStorage.getItem("currentUserName")
    const apikey = localStorage.getItem("apiKey")
    const [binanceInfoModalData, setBinanceInfoModalData ] = useState('');

    useEffect(() => {
        // console.log("Hello")
        fetch(`/binance/getData/${userId}`)
            .then((response) => response.json())
            .then((res) => {
                setBinanceInfoModalData(res)
                console.log("BinanInfo",res)
                // localStorage.setItem("apiKey", res.apiKey);
                // localStorage.setItem("secrutyKey", res.secrutyKey);
                // console.log("binnanceGelen", res)
            })
            .catch((error) => console.error("Error: ", error))


        // fetch(`/binance/getData/${userId}`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({currentUserId : userId,
        //         urlId : null}),
        // })
        //     .then((response) => response.json())
        //     .then((data) => console.log("currenUserId send to flask" , data))
        //     .catch((error) => console.log(error));

    }, [])

    return (
        <>
            <Router>
                <Header/>
                <BinanceModal binanceInfoModalData={binanceInfoModalData}/>
                <Routes>
                    <Route path="/" element={<OpenPage/>}/>
                    {localStorage.getItem("currentUserName") != null ? <Route path="/chart" element={<Chart/>}/> :
                        <Route path="/login" element={<Login/>}/>}
                    {localStorage.getItem("currentUserName") != null ? <Route path="/dashboard" element={<Main binanceInfoModalData={binanceInfoModalData}/>}/> :
                        <Route path="/login" element={<Login/>}/>}
                    {localStorage.getItem("currentUserName") != null ?
                        <Route path="/history" element={<HistoryPage/>}/> : <Route path="/login" element={<Login/>}/>}
                    {localStorage.getItem("currentUserName") != null ?
                        <Route path="/analysis" element={<AnalysisPage/>}/> : <Route path="/login" element={<Login/>}/>}
                    {localStorage.getItem("currentUserName") != null ? <Route path="/bot" element={<InvestBotPage/>}/> :
                        <Route path="/login" element={<Login/>}/>}
                    {localStorage.getItem("currentUserName") != null ?
                        <Route path="/discovery" element={<DiscoveryPage/>}/> :
                        <Route path="/login" element={<Login/>}/>}
                    {localStorage.getItem("currentUserName") != null ?
                        <Route path="/profile/:userId" element={<Profile/>}/> :
                        <Route path="/login" element={<Login/>}/>}
                    {localStorage.getItem("currentUserName") != null ?
                        <Route path="/social-media" element={<SocialMedia/>}/> :
                        <Route path="/login" element={<Login/>}/>}
                    {localStorage.getItem("currentUserName") === null ?
                        <Route path="/register" element={<Register/>}/> : <Route path="/dashboard" element={<Login/>}/>}
                    {localStorage.getItem("currentUserName") === null ? <Route path="/login" element={<Login/>}/> :
                        <Route path="/dashboard" element={<Login/>}/>}

                    {localStorage.getItem("currentUserName") != null ? <Route path="/social-media/user/:userId" element={<OtherUserProfile/>}/> :
                        <Route path="/login" element={<Login/>}/>}

                    <Route path="/test" element={<BinanceModal/>}/>
                    <Route path="//output" element={<Output/>}/>
                </Routes>
            </Router>
            {/*<Footer/>*/}
        </>
    );
}
