import React, { useEffect, useState } from 'react';
import TablePagination from '@mui/material/TablePagination';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ReactDOM from 'react-dom';
import { TableFooter } from '@mui/material';
import Pokedex from './Pokedex.jsx';
function Search(){
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(8);
    const [rows, setRows] = useState([]);

    useEffect(()=>{
        window.axios.get('/ObtenerPokemones',{}).then((resultado)=>{
            setRows(resultado.data);
        })
    },[]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple-table">
                <TableHead>
                    <TableRow>
                        <TableCell>Pokedex #</TableCell>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center">Favorite</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {(rowsPerPage > 0
                    ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : rows
                ).map((row) => (
                    <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            {row.id}
                        </TableCell>
                        <TableCell align="center">
                            {row.nombre}
                        </TableCell>
                        <TableCell align="center">
                            <img src={'/images/sprites/'+ String(row.id) +'.png'}></img>
                        </TableCell>
                        <TableCell align="center">
                            <Pokedex/>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[8, 10, 25, 50 , 100]}
                            count={rows.length}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
        
    )
}

export default Search;

if (document.getElementById('index')) {
    ReactDOM.render(<Search/>, document.getElementById('index'));
}