import React from 'react';
import ReactDOM from 'react-dom';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Weakness from './Globals/Weakness.jsx';

function Types(){
    const [options_type, setOptions_type] = React.useState([]);
    const [weaknesses, setWeaknesses] = React.useState([[]]);
    const [selected_type_1, setSelected_type_1] = React.useState(0);
    const [selected_type_2, setSelected_type_2] = React.useState(0);
    React.useEffect(()=>{
        window.axios.get('/AllTypes').then(resultado=>{
            resultado.data.push({id:0,nombre:'Select...'});
            setOptions_type(resultado.data);
        });
    },[]);
    const Select_Type_Change = (event) => {
        switch(event.target.name){
            case "Type_1-name":
                setSelected_type_1(event.target.value);
                window.axios.post('/AllTypesFilter',{type_1:event.target.value, type_2:selected_type_2}).then(resultado=>{
                    setWeaknesses(resultado.data);
                });
                break;
            case "Type_2-name":
                setSelected_type_2(event.target.value);
                window.axios.post('/AllTypesFilter',{type_1:selected_type_1, type_2:event.target.value}).then(resultado=>{
                    setWeaknesses(resultado.data);
                });
                break;
        }
    };
    return(
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 mt-3">
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
                <div className="col-md-6 mt-3">
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
            <div className="container-fluid card-body mt-5">
                <h4>Weaknesses</h4>
                <hr/>
                <Weakness weaknesses={weaknesses}></Weakness>
            </div>
        </div>
    )
}

export default Types;

if (document.getElementById('table_types')) {
    ReactDOM.render(<Types/>, document.getElementById('table_types'));
}
