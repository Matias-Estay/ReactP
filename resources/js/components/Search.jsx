import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
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
import Input from '@mui/material/Input';
import Pokedex from './Pokedex.jsx';
function Search(){
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(7);
    const [items, setItems] = useState([]);
    const [search_input,setSearch_input] = useState("");

    useEffect(()=>{
        window.axios.get('/Pokemons',{}).then((resultado)=>{
            setItems(resultado.data);
        })
    },[]);
    const newItemsCheapestFirst = () => {
        var filtered = items.filter(x=>{return x.nombre.toLowerCase().includes(search_input)});
        return filtered;
    }

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
                        <TableCell>
                            <div className="row">
                                <div className="col-md-1">
                                    <SearchIcon/>
                                </div>
                                <div className="col-md-11">
                                    <Input style={{minWidth:'200px'}} placeholder='Search' value={search_input} onChange={e=>{setSearch_input(e.target.value)}}/>
                                </div>
                            </div>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Pokedex #</TableCell>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {(rowsPerPage > 0
                    ? newItemsCheapestFirst().slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : newItemsCheapestFirst()
                ).map((row) => (
                    <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            {row.pokedex}
                        </TableCell>
                        <TableCell align="center">
                            {row.nombre}
                        </TableCell>
                        <TableCell align="center">
                            <img src={'/images/sprites/'+ String(row.sprite)}></img>
                        </TableCell>
                        <TableCell align="center">
                            <Pokedex id={row.id}/>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[7, 10, 25, 50 , 100]}
                            count={newItemsCheapestFirst().length}
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