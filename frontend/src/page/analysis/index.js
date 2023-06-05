import React, {useState} from 'react';
import Grid from "@mui/material/Grid";
import SideMenu from "../../component/side-menu/SideMenu";
import Main from "./analysis-background/AnalysisBackground"

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

    const AnalysisBackground = (sizes) => {
        switch (sizes) {
            case false:
                return (
                    <Grid item xs={9.5} >
                        <Main/>
                    </Grid>
                );
            default:
                return (<Grid item xs={11.5}>
                    <Main/>
                </Grid>);
        }
    }
    return (
        <div>
            <div style={{background: "#EFEFEF",marginTop:"16px"}} >
                <Grid container spacing={2}>
                    <>{SideMenuBackground(sizes)}</>
                    <>{AnalysisBackground(sizes)}</>
                </Grid>
            </div>
        </div>
    );
};

export default Index;