import React, {useEffect, useState} from 'react';
import "./topGainers.css"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const TopGainersAnsLosers = () => {
    const [topLoserData, setTopLoserData] = useState('');
    const [topGainersData, setTopGainersData] = useState('');
    const [show, setShow] = useState("Losers");
    const userId = localStorage.getItem("currentUserId")
    console.log("topLoserData", topLoserData)
    console.log("topGainersData", topGainersData)

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/top_change?userId=${userId}`)
            .then((response) => response.json())
            .then((res) => {
                setTopGainersData(res.gainers);
                setTopLoserData(res.losers)
            })
            .catch(console.error);
    }, [])

    return (
        <div>
            <>
                {show === "Losers" ?
                    <div className="gainers-background">
                        <div className="gainers-button-active" onClick={() => setShow("Losers")}>Losers 24H
                        </div>
                        <div className="gainers-button-passive" onClick={() => setShow(!show)}>Gainers 24H
                        </div>
                    </div> :
                    <div className="gainers-background">
                        <div className="gainers-button-passive" onClick={() => setShow("Losers")}>Losers 24H
                        </div>
                        <div className="gainers-button-active" onClick={() => setShow(!show)}>Gainers 24H
                        </div>
                    </div>
                }
            </>
            <div className="top-gainers-table">
                {show === "Losers" ? <TableContainer component={Paper} sx={{ borderBottomLeftRadius: '14px', borderBottomRightRadius:"14px", borderTopLeftRadius:"0", borderTopRightRadius:"0" , border: '1px solid #2C3E50', boxShadow: '0 4px 6px rgba(2, 56, 98, 0.9)', width: 292 }}>
                        <Table sx={{width: 292}} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{fontWeight:'bold'}}>Coin</TableCell>
                                    <TableCell align="right" style={{fontWeight:'bold'}}>Change %</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Object.entries(topLoserData).map(([key, value]) => (
                                    <TableRow
                                        key={key}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell component="th" scope="row">
                                            {key}
                                        </TableCell>
                                        <TableCell align="right" style={{color:"#ff7d7d"}}>{value}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer> :
                    <TableContainer component={Paper} sx={{ borderBottomLeftRadius: '14px', borderBottomRightRadius:"14px",borderTopLeftRadius:"0", borderTopRightRadius:"0" ,border: '1px solid #2C3E50', boxShadow: '0 4px 6px rgba(2, 56, 98, 0.9)', width: 292 }}>
                        <Table sx={{width: 292}} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{fontWeight:'bold'}}>Coin</TableCell>
                                    <TableCell align="right" style={{fontWeight:'bold'}}>Change %</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Object.entries(topGainersData).map(([key, value]) => (
                                    <TableRow
                                        key={key}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell component="th" scope="row">
                                            {key}
                                        </TableCell>
                                        <TableCell align="right" style={{color:"#19a25d"}}>{value}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>}
            </div>
        </div>
    );
};


export default TopGainersAnsLosers;