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


export default function ManageOrders({ setUpdate, orders }) {

    const cancelOrder = (id) => {
        const confirm = window.confirm('Do you want to cancel the order?');
        if (confirm) {
            axios.delete(`https://whispering-gorge-61124.herokuapp.com/order/${id}`)
                .then(res => setUpdate(true))
                .catch(err => console.log(err));
        } else {
            return
        }
    };
    const makeDelivery = (id) => {
        const confirm = window.confirm('Do you want to make the delivery?');
        if (confirm) {
            axios.put(`https://whispering-gorge-61124.herokuapp.com/order/delivery/${id}`)
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
                        <StyledTableCell align="right">Payment Status</StyledTableCell>
                        <StyledTableCell align="right">Delivery Status</StyledTableCell>
                        <StyledTableCell align="right">Make Delivery</StyledTableCell>
                        <StyledTableCell align="right">Cancel Order</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders?.map((row) => (
                        <StyledTableRow key={row._id}>
                            <StyledTableCell component="th" scope="row">
                                <b>{row.product.name}</b>
                                <p style={{ textTransform: 'capitalize', margin: '5px 0 0 0' }}><b>Ordered By:</b> {row.customer.name}</p>
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.product.price}</StyledTableCell>
                            <StyledTableCell style={{ textTransform: 'capitalize' }} align="right">{row.payment.status}</StyledTableCell>
                            <StyledTableCell style={{ textTransform: 'capitalize' }} align="right">{row.delivery.status}</StyledTableCell>
                            <StyledTableCell style={{ textTransform: 'capitalize' }} align="right">
                                {row?.delivery?.status !== 'pending' || row?.payment?.status !== 'paid' ?
                                    <Button disabled variant='contained' color="success">Ship</Button> :
                                    <Button variant='contained' color="success" onClick={() => makeDelivery(row._id)}>Ship</Button>}
                            </StyledTableCell>
                            <StyledTableCell style={{ textTransform: 'capitalize' }} align="right">
                                {row?.payment?.status === 'paid' ?
                                    <Button disabled variant='contained' color="error">Cancel</Button> :
                                    <Button variant='contained' color="error" onClick={() => cancelOrder(row._id)}>Cancel</Button>}
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
