import React, {useEffect, useState} from 'react';
import "./topVolumeGainers.css"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const TopVolumeGainers = () => {
    const [top20VolumeGainers, setTop20VolumeGainers] = useState('');
    console.log("top20VolumeGainers", top20VolumeGainers)

    useEffect(() => {
        fetch("http://127.0.0.1:5000/top_volume")
            .then((response) => response.json())
            .then((res) => {
                setTop20VolumeGainers(res.high_volume);
            })
            .catch(console.error);
    }, [])

    const test ="Top 20 Volume Gainers"

    return (
        <>
            {top20VolumeGainers &&
                <div  className="top-volume-table-title-box"><TableContainer component={Paper} sx={{
                    borderRadius: '14px',
                    border: '1px solid #2C3E50',
                    boxShadow: '0 4px 6px rgba(2, 56, 98, 0.9)',
                    width: 240
                }}>
                    <p className="top-volume-table-title">{test}</p>
                    <Table sx={{width: 245}} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{fontWeight: 'bold'}}>Coin</TableCell>
                                <TableCell align="right" style={{fontWeight: 'bold'}}>Volume</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.entries(top20VolumeGainers).map(([key, value]) => (
                                <TableRow
                                    key={key}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        {key}
                                    </TableCell>
                                    <TableCell align="right" style={{color: "#6cb5ff"}}>{value}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer></div>}

        </>
    );
};

export default TopVolumeGainers;