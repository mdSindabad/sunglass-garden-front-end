import React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import axios from 'axios';

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

export default function Payment({ setUpdate, orders }) {
    const filteredOrders = orders.filter(order => order.payment.status === 'unpaid');

    const makePayment = (id) => {
        const confirm = window.confirm('Do you want to make the payment?');
        if (confirm) {
            axios.put(`https://whispering-gorge-61124.herokuapp.com/order/payment/${id}`)
                .then(res => setUpdate(true))
                .catch(err => console.log(err));
        } else {
            return
        }
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Product</StyledTableCell>
                        <StyledTableCell align="right">Price ($)</StyledTableCell>
                        <StyledTableCell align="right">Payment</StyledTableCell>
                        <StyledTableCell align="right">Delivery</StyledTableCell>
                        <StyledTableCell align="right">Make Payment</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredOrders?.map((row) => (
                        <StyledTableRow key={row._id}>
                            <StyledTableCell component="th" scope="row">
                                {row.product.name}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.product.price}</StyledTableCell>
                            <StyledTableCell style={{ textTransform: 'capitalize' }} align="right">{row.payment.status}</StyledTableCell>
                            <StyledTableCell style={{ textTransform: 'capitalize' }} align="right">{row.delivery.status}</StyledTableCell>
                            <StyledTableCell style={{ textTransform: 'capitalize' }} align="right">
                                <Button variant='contained' color="success" onClick={() => makePayment(row._id)} >Pay</Button>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
