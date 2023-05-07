import React, {useEffect, useState} from 'react';
import SideMenu from '../../../component/side-menu/SideMenu'
import BalanceCard from '../balance-card/BalanceCard'
import './main.css'
import Grid from '@mui/material/Grid';
import ActiveInvestCard from "../active-invest-card/ActiveInvestCard";
import ActiveInvestPieChart from "../active-invest-pie-chart/ActiveInvestPieChart";
import LineChartBalanceHistory from "../line-chart-balance-history/LineChartBalanceHistory";

const Main = () => {

    const [data, setData] = useState();
    console.log("yeter", data)

    useEffect(() => {
        fetch('http://127.0.0.1:5000/active_invest')
            .then((response) => response.json())
            .then((res) => {
                console.log("res", res)
                setData(res)
            })
    }, [])

    return (
        <div style={{paddingTop:'15px'}}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <BalanceCard/>
                    <ActiveInvestCard data={data}/>

                </Grid>
                <Grid item xs={6} style={{paddingRight:'15px'}}>
                    { data && <ActiveInvestPieChart data={data}/>}
                    <LineChartBalanceHistory/>
                </Grid>
            </Grid>
        </div>
    );
};

export default Main;