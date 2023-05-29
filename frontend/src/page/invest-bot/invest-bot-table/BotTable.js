import * as React from 'react';
import './botTable.css'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Loading from "../../../component/loading/Loading";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const BotTable = ({ positions, loading}) => { // props ismi yerine daha anlamlı bir isim olan positions kullanıldı.

    // console.log("positions",positions)
    // console.log("loading",loading)

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead >
                    <TableRow>
                        <StyledTableCell>Symbol</StyledTableCell>
                        <StyledTableCell align="right">Size</StyledTableCell>
                        <StyledTableCell align="right">Entry Price</StyledTableCell>
                        <StyledTableCell align="right">Mark Price</StyledTableCell>
                        <StyledTableCell align="right">Unrealized PNL (ROE%)</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading ? positions.map((position) => (
                        <StyledTableRow key={position.Symbol}>
                            <StyledTableCell component="th" scope="row">
                                {position.Symbol}
                            </StyledTableCell>
                            <StyledTableCell align="right">{position.Size}</StyledTableCell>
                            <StyledTableCell align="right">{position['Entry Price']}</StyledTableCell>
                            <StyledTableCell align="right">{position['Mark Price']}</StyledTableCell>
                            <StyledTableCell align="right">{position['Unrealized PNL (ROE%)']}</StyledTableCell>
                        </StyledTableRow>
                    )) :  <Loading value={"bot"}/>}

                    {loading && positions.length === 0 && <div className="bot-table-no-invest">
                        Bu kullanicinin aktive Trade'i yoktur
                    </div>}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default BotTable;
