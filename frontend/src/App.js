import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Main from './page/dashboard/index'
import DiscoveryPage from '../../frontend/src/page/discovery-page/Main'
import Profile from '../../frontend/src/page/profile/Profile'
import Register from '../../frontend/src/page/register/Register'
import Login from '../../frontend/src/page/login/Login'
import Chart from './page/charts/index'
import Header from './component/header/Header'
import Footer from './component/footer/Footer'
import BuySell from './page/charts/BuyAndSell/BuySell'
import Modal from './page/charts/ModalChart/ModalForChart'
import OpenPage from './page/open-page/OpenPage'
import BinanceModal from './component/binanceModal/BinanceModal'

export default function App() {
    return (
        <>
            <Header/>
            <BinanceModal/>
            <Router>
                <Routes>
                    <Route path="/" element={<OpenPage/>}/>
                    {localStorage.getItem("currentUserName") != null ?  <Route path="/chart" element={<Chart/>}/> : <Route path="/login" element={<Login/>}/> }
                    {localStorage.getItem("currentUserName") != null ? <Route path="/dashboard" element={<Main/>}/> : <Route path="/login" element={<Login/>}/> }
                    {localStorage.getItem("currentUserName") != null ? <Route path="/discovery" element={<DiscoveryPage/>}/> : <Route path="/login" element={<Login/>}/>}
                    {localStorage.getItem("currentUserName") != null ? <Route path="/profile" element={<Profile/>}/> : <Route path="/login" element={<Login/>}/>}
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login/>}/>
                </Routes>
            </Router>
            <Footer/>
        </>
    );
}
