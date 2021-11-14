import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';

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


export default function MakeAdmin() {
    // local state
    const [users, setUsers] = useState([]);
    const [update, setUpdate] = useState(false);

    const makeAdmin = (id) => {
        const confirm = window.confirm('Do you want to make this user "Admin"?');
        if (confirm) {
            axios.put(`https://whispering-gorge-61124.herokuapp.com/user/update-role`, { id: id })
                .then(res => {
                    if (res.data.acknowledged) {
                        setUpdate(true);
                    }
                })
                .catch(err => console.log(err));
        } else {
            return
        }
    };

    useEffect(() => {
        setUpdate(false);
        axios.get('https://whispering-gorge-61124.herokuapp.com/users')
            .then(res => setUsers(res.data))
            .catch(err => console.log(err))
    }, [update]);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Image</StyledTableCell>
                        <StyledTableCell >Name</StyledTableCell>
                        <StyledTableCell align="right">Email</StyledTableCell>
                        <StyledTableCell align="right">Role</StyledTableCell>
                        <StyledTableCell align="right">Make Admin</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users?.map((user) => (
                        <StyledTableRow key={user._id}>
                            <StyledTableCell style={{ textTransform: 'capitalize' }} component="th" scope="row">
                                {
                                    user?.image ? <img style={{ width: '35px', borderRadius: '50%' }} src={user?.image} alt={user?.name?.split(" ")[0]} /> :
                                        <AccountCircle />
                                }
                            </StyledTableCell>
                            <StyledTableCell style={{ textTransform: 'capitalize' }} component="th" scope="row">
                                <b>{user.name}</b>
                            </StyledTableCell>
                            <StyledTableCell align="right">{user.email}</StyledTableCell>
                            <StyledTableCell style={{ textTransform: 'capitalize' }} align="right">{user.role}</StyledTableCell>
                            <StyledTableCell style={{ textTransform: 'capitalize' }} align="right">
                                {user.role === 'admin' ?
                                    <Button disabled variant='contained' color="success">Make Admin</Button> :
                                    <Button variant='contained' color="success" onClick={() => makeAdmin(user._id)}>Make Admin</Button>}
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
