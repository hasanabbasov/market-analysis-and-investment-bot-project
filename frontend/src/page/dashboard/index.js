import React, {useEffect} from 'react';
import {useState} from "react";
import Grid from "@mui/material/Grid";
import SideMenu from "../../component/side-menu/SideMenu";
import Main from "./dashboard/Main"

const Index = ({binanceInfoModalData}) => {
    const [sizes, setSize] = useState(false)
    console.log("binanceInfoModalData",binanceInfoModalData)

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

    const DashboardBackground = (sizes) => {
        switch (sizes) {
            case false:
                return (
                    <Grid item xs={9.5} ><Main/>
                    </Grid>
                );
            default:
                return (<Grid item xs={11.5} >
                    <Main sizes={sizes}/></Grid>);
        }
    }
    return (
        <div>
             <div style={{background: "#EFEFEF", marginTop: "16px"}}>
                <Grid container spacing={2}>
                    { (binanceInfoModalData.apiKey !== null)  &&
                        <><>{SideMenuBackground(sizes)}</>

                            <>{DashboardBackground(sizes)}</>
                        </>
                    }
                </Grid>
            </div>
        </div>
    );
};

export default Index;