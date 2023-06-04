import React, {useEffect, useState} from 'react';
import SideMenu from '../../../component/side-menu/SideMenu'
import BalanceCard from '../balance-card/BalanceCard'
import './main.css'
import Grid from '@mui/material/Grid';
import ActiveInvestCard from "../active-invest-card/ActiveInvestCard";
import ActiveInvestPieChart from "../active-invest-pie-chart/ActiveInvestPieChart";
import LineChartBalanceHistory from "../line-chart-balance-history/LineChartBalanceHistory";
import TopGainersAnsLosers from "../24-hours-top-gainers-losers/TopGainersAnsLosers";
import TopVolumeGainers from "../24-hours-volume-gainers/TopVolumeGainers";

const Main = ({sizes}) => {

    const [activeInvestData, setActiveInvestData] = useState();
    const [bitcoinHoursData, setBitcoinHoursData] = useState();
    // console.log("data active invest card: ", activeInvestData)
    console.log("bitcoinHoursData: ", bitcoinHoursData)


    useEffect(() => {
        fetch('http://127.0.0.1:5000/active_invest')
            .then((response) => response.json())
            .then((res) => {
                // console.log("res", res)
                setActiveInvestData(res)
            })

        fetch('http://127.0.0.1:5000/btc_price_last_24_hours')
            .then((response) => response.json())
            .then((res) => {
                // console.log("res", res)
                setBitcoinHoursData(res)
            })
    }, [])

    return (
        <div style={{paddingTop: '15px'}}>
            <Grid container spacing={2}>
                {!sizes ?
                    <>
                        <Grid item xs={6}>
                            <BalanceCard/>
                            <ActiveInvestCard data={activeInvestData}/>

                        </Grid>
                        <Grid item xs={6} style={{paddingRight: '1px', display: "flex", flexWrap: "wrap"}}>
                            <div style={{display: "flex"}}>
                                {activeInvestData &&
                                    <ActiveInvestPieChart data={activeInvestData}/>
                                }
                                <div style={{width: "295px", paddingLeft: "5px"}}>
                                    <TopGainersAnsLosers/></div>
                            </div>
                            <div>
                                {bitcoinHoursData && <LineChartBalanceHistory bitcoinHoursData={bitcoinHoursData}/>}
                            </div>
                        </Grid>
                    </>

                    :


                    <>
                        <Grid item xs={5}>
                            <BalanceCard/>
                            <ActiveInvestCard data={activeInvestData}/>

                        </Grid>
                        <Grid item xs={4.9} style={{paddingRight: '1px', display: "flex", flexWrap: "wrap"}}>
                            <div style={{display: "flex"}}>
                                {activeInvestData &&
                                    <ActiveInvestPieChart data={activeInvestData}/>
                                }
                                <div style={{width: "295px", paddingLeft: "5px"}}>
                                    <TopGainersAnsLosers/></div>
                            </div>
                            <div>
                                {bitcoinHoursData && <LineChartBalanceHistory bitcoinHoursData={bitcoinHoursData}/>}
                            </div>
                        </Grid>
                        <Grid item xs={2.1}>
                            <TopVolumeGainers/>
                        </Grid>

                    </>

                }
            </Grid>
        </div>
    );
};

export default Main;