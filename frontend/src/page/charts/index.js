import React from 'react';
import {useState} from "react";
import Grid from "@mui/material/Grid";
import SideMenu from "../../component/side-menu/SideMenu"
import Chart from "./Chart/Chart"

const Index = () => {
    const [sizes, setSize] = useState(false)

    const SideMenuBackground = (sizes) => {
        switch (sizes) {
            case false:
                return (
                    <Grid item xs={2.5}><SideMenu size={sizes} onToggle={(newSize) => setSize(newSize)}/>
                    </Grid>
                );
            default:
                return (<Grid item xs={0.5}><SideMenu size={sizes} onToggle={(newSize) => setSize(newSize)}/></Grid>);
        }
    };

    const ChartBackground = (sizes) => {
        switch (sizes) {
            case false:
                return (
                    <Grid item xs={9.5}>
                        <Chart/>
                    </Grid>
                );
            default:
                return (<Grid item xs={11.5}><Chart/></Grid>);
        }
    }
    return (
        <div>
            <div style={{background: "#EFEFEF",marginTop:"16px"}} >
                <Grid container spacing={2}>
                    <>{SideMenuBackground(sizes)}</>
                    <>{ChartBackground(sizes)}</>
                </Grid></div>

        </div>
    );
};

export default Index;