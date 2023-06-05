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
        backgroundColor: theme.palette.common.white,
        color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const BotTable = ({ positions, loading}) => { // props ismi yerine daha anlamlı bir isim olan positions kullanıldı.
    return (
        <TableContainer component={Paper} sx={{borderBottomLeftRadius:"14px", borderBottomRightRadius:"14px",borderTopLeftRadius:"0", borderTopRightRadius:"0"}}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell><strong>Symbol</strong></StyledTableCell>
                        <StyledTableCell align="right"><strong>Size</strong></StyledTableCell>
                        <StyledTableCell align="right"><strong>Entry Price</strong></StyledTableCell>
                        <StyledTableCell align="right"><strong>Mark Price</strong></StyledTableCell>
                        <StyledTableCell align="right"><strong>Unrealized PNL (ROE%)</strong></StyledTableCell>
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
