import React from 'react';
import axios from 'axios';
import { useHistory, useRouteMatch } from 'react-router';
import useProducts from '../../../hooks/useProducts';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';

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


export default function ManageProducts() {
    // router hook
    const history = useHistory();
    const { path, url } = useRouteMatch();

    // user context
    const { products, setUpdate } = useProducts();

    const deleteProduct = (id) => {
        const confirm = window.confirm('Do you want to cancel the order?');
        if (confirm) {
            axios.delete(`http://localhost:5000/product/${id}`)
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
                        <StyledTableCell>Product Image</StyledTableCell>
                        <StyledTableCell>Product Name</StyledTableCell>
                        <StyledTableCell align="right">Price ($)</StyledTableCell>
                        <StyledTableCell align="right">Update Product</StyledTableCell>
                        <StyledTableCell align="right">Delete Product</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products?.map((product) => (
                        <StyledTableRow key={product._id}>
                            <StyledTableCell component="th" scope="row">
                                <img style={{ width: '100px' }} src={product.image} alt={product.name} />
                            </StyledTableCell>
                            <StyledTableCell style={{ textTransform: 'uppercase' }} component="th" scope="row">
                                <b>{product.name}</b>
                            </StyledTableCell>
                            <StyledTableCell align="right">{product.price}</StyledTableCell>
                            <StyledTableCell style={{ textTransform: 'capitalize' }} align="right">
                                <Button variant='contained' color="primary" onClick={() => history.push(`${url}/update/${product._id}`)}>Update</Button>
                            </StyledTableCell>
                            <StyledTableCell style={{ textTransform: 'capitalize' }} align="right">
                                <Button variant='contained' color="error" onClick={() => deleteProduct(product._id)}>Delete</Button>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
