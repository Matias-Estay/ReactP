import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import SearchIcon from '@mui/icons-material/Search';
import TablePagination from '@mui/material/TablePagination';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TableFooter } from '@mui/material';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Input from '@mui/material/Input';
import Pokedex from './Pokedex.jsx';
import Button from '@mui/material/Button';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import StarIcon from '@mui/icons-material/Star';
function Search(){
    const [page, setPage] = useState(0);
    const [favorites, setFavorites] = useState(false);
    const [selected_type_1, setSelected_type_1] = React.useState(0);
    const [selected_type_2, setSelected_type_2] = React.useState(0);
    const [options_type, setOptions_type] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(6);
    const [items, setItems] = useState([]);
    const [search_input,setSearch_input] = useState("");

    useEffect(()=>{
        Update_data();
    },[]);
    const Update_data = ()=>{
        window.axios.get('/Pokemons',{}).then((resultado)=>{
            setItems(resultado.data);
        });
        window.axios.get('/AllTypes').then(resultado=>{
            resultado.data.push({id:0,nombre:'Select...'});
            setOptions_type(resultado.data);
        });
    };

    const Select_Type_Change = (event) => {
        switch(event.target.name){
            case "Type_1-name":
                setSelected_type_1(event.target.value);
                break;
            case "Type_2-name":
                setSelected_type_2(event.target.value);
                break;
        }
    };

    const Favorites = ()=>{
        setFavorites(true);
    };

    const DeleleteFilter = ()=>{
        setSelected_type_1(0);
        setSelected_type_2(0);
        setFavorites(false);
    };

    const newItemsFiltered = () => {
        var filtered = items.filter(x=>{return x.nombre.toLowerCase().includes(search_input.toLowerCase().trim())});
        if(favorites){
            var filtered = filtered.filter(x=>{return x.favorite != null});
        }
        if(selected_type_1!=0 && selected_type_2!=0){
            return filtered.filter(x=>{return (x.id_tipo_1 == selected_type_1 || x.id_tipo_2==selected_type_1)  && (x.id_tipo_2==selected_type_2 || x.id_tipo_1 == selected_type_2)});
        }else if(selected_type_1 !=0){
            return filtered.filter(x=>{return x.id_tipo_1 == selected_type_1 || x.id_tipo_2==selected_type_1});
        }else if(selected_type_2!=0){
            return filtered.filter(x=>{return x.id_tipo_2 == selected_type_2 || x.id_tipo_1 == selected_type_2});
        }else{
            return filtered;
        }
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const SearchItems = (e)=>{
        setSearch_input(e.target.value);
    };
    return (
        <>
            <div className="continer-fluid">
                <div className="row">
                    <div className="col-sm-12 col-xl-1 mt-3">
                        <SearchIcon/>
                    </div>
                    <div className="col-sm-12 col-xl-3 mt-3">
                        <Input style={{width:'200px'}} placeholder='Search' value={search_input} onChange={SearchItems}/>
                    </div>
                    <div className="col-md-2 mt-2 align-self-center">
                        <Button variant="outlined" onClick={DeleleteFilter}>
                            <FilterAltOffIcon/>
                        </Button>
                        <Button variant="outlined" onClick={Favorites}>
                            <StarIcon/>
                        </Button>
                    </div>
                    <div className="col-sm-12 col-md-12 col-xl-3 mt-3">
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="Type_1-label">Type 1</InputLabel>
                                <Select
                                labelId="Type_1-label"
                                name="Type_1-name"
                                id="Type_1-id"
                                value={selected_type_1}
                                label="Type_1"
                                onChange={Select_Type_Change}
                                >
                                {options_type.map((item)=>{
                                    return(
                                    <MenuItem value={item.id} key={item.id}>{item.nombre}</MenuItem>
                                    )
                                })}
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                    <div className="col-sm-12 col-md-12 col-xl-3 mt-3">
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="Type_2-label">Type 2</InputLabel>
                                <Select
                                labelId="Type_2-label"
                                name="Type_2-name"
                                id="Type_2-id"
                                value={selected_type_2}
                                label="Type_2-id"
                                onChange={Select_Type_Change}
                                >
                                {options_type.map((item)=>{
                                    return(
                                    <MenuItem value={item.id} key={item.id+10}>{item.nombre}</MenuItem>
                                    )
                                })}
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                </div>
            </div>
            <TableContainer>
                <Table aria-label="simple-table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" sx={{width:'200px'}}>Pokedex # - Name</TableCell>
                            <TableCell align="center" sx={{width:'200px'}}></TableCell>
                            <TableCell align="center" sx={{width:'200px'}}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {(rowsPerPage > 0
                        ? newItemsFiltered().slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : newItemsFiltered()
                    ).map((row) => (
                        <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="left" sx={{width:'100px'}}>
                                {row.pokedex} - {row.nombre}
                            </TableCell>
                            <TableCell align="left">
                                <img src={'/images/sprites/'+ String(row.sprite)}></img>
                            </TableCell>
                            <TableCell align="center">
                                <Pokedex id={row.id} Update_data={Update_data}/>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[6, 10, 25, 50 , 100]}
                                count={newItemsFiltered().length}
                                page={page}
                                onPageChange={handleChangePage}
                                rowsPerPage={rowsPerPage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </>
    )
}

export default Search;

if (document.getElementById('index')) {
    ReactDOM.render(<Search/>, document.getElementById('index'));
}
