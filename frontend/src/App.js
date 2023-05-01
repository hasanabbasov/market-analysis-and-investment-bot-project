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
import OpenPage from './page/open-page/OpenPage'
import BinanceModal from './component/binanceModal/BinanceModal'
import SocialMedia from './page/social-media/index'
import {useEffect} from "react";

export default function App() {

    useEffect(() => {
        console.log("Hello")

        const token = localStorage.getItem("tokenKey");

        fetch('http://localhost:8080/post/getPost')
            .then((response) => response.json())
            .then((res) => console.log("data",res))
            .catch((error) => console.error("Error: ", error));
    },[])


    return (
        <>
            <Router>
                <Header/>
                <BinanceModal/>
                <Routes>
                    <Route path="/" element={<OpenPage/>}/>
                    {localStorage.getItem("currentUserName") != null ?  <Route path="/chart" element={<Chart/>}/> : <Route path="/login" element={<Login/>}/> }
                    {localStorage.getItem("currentUserName") != null ? <Route path="/" element={<Main/>}/> : <Route path="/login" element={<Login/>}/> }
                    {localStorage.getItem("currentUserName") != null ? <Route path="/discovery" element={<DiscoveryPage/>}/> : <Route path="/login" element={<Login/>}/>}
                    {localStorage.getItem("currentUserName") != null ? <Route path="/profile" element={<Profile/>}/> : <Route path="/login" element={<Login/>}/>}
                    {localStorage.getItem("currentUserName") != null ? <Route path="/social-media" element={<SocialMedia/>}/> : <Route path="/login" element={<Login/>}/>}
                    {localStorage.getItem("currentUserName") === null ? <Route path="/register" element={<Register/>}/> : <Route path="/" element={<Login/>}/>}
                    {localStorage.getItem("currentUserName") === null ? <Route path="/login" element={<Login/>}/> : <Route path="/" element={<Login/>}/>}
                </Routes>
            </Router>
            {/*<Footer/>*/}
        </>
    );
}
