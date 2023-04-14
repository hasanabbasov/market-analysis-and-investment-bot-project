import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Main from '../../frontend/src/page/main/Main'
import DiscoveryPage from '../../frontend/src/page/discovery-page/Main'
import Profile from '../../frontend/src/page/profile/Profile'
import Register from '../../frontend/src/page/register/Register'
import Login from '../../frontend/src/page/login/Login'
import Charts from './page/charts/Charts'
import Chart from './page/charts/Chart'
import Header from './component/header/Header'
import Footer from './component/footer/Footer'
import BuySell from './page/charts/BuyAndSell/BuySell'
import Modal from './page/charts/ModalChart/ModalForChart'
import Grid from "@mui/material/Grid";
import BalanceCard from "./page/main/balance-card/BalanceCard";
import {useState} from "react";
import SideMenu from "./component/side-menu/SideMenu";

export default function App() {
    const [sizes, setSize] = useState(false)

    const SideMenuBackground = (sizes) => {
        switch (sizes) {
            case false:
                return (<Grid item xs={2.5}><SideMenu size={sizes} onToggle={(newSize) => setSize(newSize)}/></Grid>);
            default:
                return (<Grid item xs={0.5}><SideMenu size={sizes} onToggle={(newSize) => setSize(newSize)}/></Grid>);
        }
    };

    return (
        <>
            <Header/>
            <Router>
                <div style={{background: "#EFEFEF"}}>
                    <Grid container spacing={2}>
                        <>{SideMenuBackground(sizes)}</>
                        <>
                            <Grid item>
                                <Routes>
                                    <Route path="/charts" element={<Charts/>}/>
                                    <Route path="/chart" element={<Chart/>}/>
                                    <Route path="/dashboard" element={<Main/>}/>
                                    <Route path="/buy" element={<BuySell/>}/>
                                    <Route path="/discovery" element={<DiscoveryPage/>}/>
                                    <Route path="/profile" element={<Profile/>}/>
                                    <Route path="/register" element={<Register/>}/>
                                    <Route path="/login" element={<Login/>}/>
                                    <Route path="/modal" element={<Modal/>}/>
                                </Routes>
                            </Grid>
                        </>
                    </Grid></div>

            </Router>
            <Footer/>
        </>
    );
}
